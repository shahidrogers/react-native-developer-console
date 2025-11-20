export class UniversalNetworkLogger {
    constructor(config) {
        this.logs = [];
        this.subscribers = [];
        this.pendingRequests = new Map();
        this.maxLogs = 500;
        this.ignoredUrls = [];
        this.ignoredHosts = [];
        this.enableBodyLogging = true;
        this.enableInProduction = false;
        if (config) {
            this.maxLogs = config.maxLogs || 500;
            this.ignoredUrls = config.ignoredUrls || [];
            this.ignoredHosts = config.ignoredHosts || [];
            this.enableBodyLogging = config.enableBodyLogging !== false;
            this.enableInProduction = config.enableInProduction || false;
        }
    }
    // Check if request should be logged
    shouldLogRequest(url) {
        // Skip if not in development and production logging is disabled
        if (!this.enableInProduction && process.env.NODE_ENV === 'production') {
            return false;
        }
        // Check ignored URLs
        if (this.ignoredUrls.some(ignoredUrl => url.includes(ignoredUrl))) {
            return false;
        }
        // Check ignored hosts
        try {
            const urlObj = new URL(url);
            if (this.ignoredHosts.some(ignoredHost => urlObj.hostname.includes(ignoredHost))) {
                return false;
            }
        }
        catch (_a) {
            // Invalid URL, continue with logging
        }
        return true;
    }
    // Generate unique request ID
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
    // Add log to storage and notify subscribers
    addLog(log) {
        // Prepend newest log
        this.logs.unshift(log);
        // Drop oldest if over capacity
        if (this.logs.length > this.maxLogs) {
            this.logs.pop();
        }
        this.notifySubscribers();
    }
    // Notify all subscribers of log changes
    notifySubscribers() {
        this.subscribers.forEach(callback => callback([...this.logs]));
    }
    // Log a network request
    logRequest(request) {
        if (!request.url || !this.shouldLogRequest(request.url)) {
            return null;
        }
        const id = this.generateId();
        const fullRequest = {
            id,
            url: request.url,
            method: request.method || 'GET',
            headers: request.headers || {},
            body: this.enableBodyLogging ? request.body : undefined,
            startTime: Date.now(),
        };
        this.pendingRequests.set(id, fullRequest);
        return id;
    }
    // Log a network response
    logResponse(requestId, response) {
        const request = this.pendingRequests.get(requestId);
        if (!request)
            return;
        const fullResponse = Object.assign(Object.assign({}, request), { status: response.status || 0, response: this.enableBodyLogging ? response.response : undefined, error: response.error, endTime: Date.now(), duration: Date.now() - request.startTime, isRepeated: response.isRepeated });
        this.pendingRequests.delete(requestId);
        this.addLog(fullResponse);
    }
    // Subscribe to log changes
    subscribe(callback) {
        this.subscribers.push(callback);
        // Immediately call with current logs
        callback([...this.logs]);
        // Return unsubscribe function
        return () => {
            const index = this.subscribers.indexOf(callback);
            if (index !== -1) {
                this.subscribers.splice(index, 1);
            }
        };
    }
    // Clear all logs
    clearLogs() {
        this.logs = [];
        this.pendingRequests.clear();
        this.notifySubscribers();
    }
    // Get all logs
    getLogs() {
        return [...this.logs];
    }
    // Get network statistics
    getNetworkStats() {
        if (this.logs.length === 0)
            return null;
        const completedRequests = this.logs.filter(log => log.status);
        const successfulRequests = this.logs.filter(log => log.status >= 200 && log.status < 300);
        const failedRequests = this.logs.filter(log => log.status >= 400);
        const totalDuration = completedRequests.reduce((sum, log) => sum + (log.duration || 0), 0);
        return {
            totalRequests: this.logs.length,
            completedRequests: completedRequests.length,
            successRate: completedRequests.length
                ? ((successfulRequests.length / completedRequests.length) *
                    100).toFixed(1)
                : 0,
            averageResponseTime: completedRequests.length
                ? Math.round(totalDuration / completedRequests.length)
                : 0,
            failedRequests: failedRequests.length,
            pendingRequests: this.logs.length - completedRequests.length,
        };
    }
    // Repeat a network request
    async repeatRequest(log) {
        const repeatId = `repeat-${log.id}-${Date.now()}`;
        const newLog = Object.assign(Object.assign({}, log), { id: repeatId, startTime: Date.now(), duration: 0, status: 0, response: undefined, error: undefined, isRepeated: true });
        // Add the repeated request to logs immediately
        this.addLog(newLog);
        try {
            const options = {
                method: log.method,
                headers: log.headers || {},
                body: log.body,
            };
            const startTime = Date.now();
            const response = await fetch(log.url, options);
            const responseText = await response.text();
            let responseData = responseText;
            const endTime = Date.now();
            const updatedLog = Object.assign(Object.assign({}, newLog), { status: response.status, response: responseData, endTime, duration: endTime - startTime });
            // Update the log with response data
            const logIndex = this.logs.findIndex(l => l.id === repeatId);
            if (logIndex !== -1) {
                this.logs[logIndex] = updatedLog;
                this.notifySubscribers();
            }
            return updatedLog;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const updatedLog = Object.assign(Object.assign({}, newLog), { error: errorMessage, endTime: Date.now(), duration: Date.now() - newLog.startTime });
            // Update the log with error data
            const logIndex = this.logs.findIndex(l => l.id === repeatId);
            if (logIndex !== -1) {
                this.logs[logIndex] = updatedLog;
                this.notifySubscribers();
            }
            return updatedLog;
        }
    }
    // Create Axios interceptor
    createAxiosInterceptor(axiosInstance) {
        const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
            var _a;
            const id = this.logRequest({
                url: config.url,
                method: (_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase(),
                headers: config.headers,
                body: config.data,
            });
            if (id) {
                config.headers = Object.assign(Object.assign({}, config.headers), { 'x-dev-console-id': id });
            }
            return config;
        }, (error) => Promise.reject(error));
        const responseInterceptor = axiosInstance.interceptors.response.use((response) => {
            var _a;
            const id = (_a = response.config.headers) === null || _a === void 0 ? void 0 : _a['x-dev-console-id'];
            if (id) {
                this.logResponse(id, {
                    status: response.status,
                    response: response.data,
                });
            }
            return response;
        }, (error) => {
            var _a, _b, _c, _d;
            const id = (_b = (_a = error.config) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b['x-dev-console-id'];
            if (id) {
                this.logResponse(id, {
                    status: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 0,
                    error: error.message,
                    response: (_d = error.response) === null || _d === void 0 ? void 0 : _d.data,
                });
            }
            return Promise.reject(error);
        });
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }
    // Create Fetch interceptor
    createFetchInterceptor() {
        const originalFetch = global.fetch;
        global.fetch = async (input, init) => {
            var _a;
            const url = typeof input === 'string'
                ? input
                : input instanceof URL
                    ? input.toString()
                    : input.url;
            const id = this.logRequest({
                url,
                method: ((_a = init === null || init === void 0 ? void 0 : init.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || 'GET',
                headers: init === null || init === void 0 ? void 0 : init.headers,
                body: init === null || init === void 0 ? void 0 : init.body,
            });
            try {
                const response = await originalFetch(input, init);
                if (id) {
                    let responseData;
                    try {
                        const clonedResponse = response.clone();
                        const contentType = clonedResponse.headers.get('content-type');
                        if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('application/json')) {
                            responseData = await clonedResponse.json();
                        }
                        else {
                            responseData = await clonedResponse.text();
                        }
                    }
                    catch (_b) {
                        responseData = '[Unable to read response body]';
                    }
                    this.logResponse(id, {
                        status: response.status,
                        response: responseData,
                    });
                }
                return response;
            }
            catch (error) {
                if (id) {
                    this.logResponse(id, {
                        status: 0,
                        error: error.message,
                    });
                }
                throw error;
            }
        };
        return () => {
            global.fetch = originalFetch;
        };
    }
}
// Global instance
let globalLogger = null;
// Get or create global logger instance
export function getNetworkLogger(config) {
    if (!globalLogger) {
        globalLogger = new UniversalNetworkLogger(config);
    }
    return globalLogger;
}
// Export convenience functions
export const subscribeToNetworkLogs = (callback) => getNetworkLogger().subscribe(callback);
export const clearNetworkLogs = () => getNetworkLogger().clearLogs();
export const getNetworkLogs = () => getNetworkLogger().getLogs();
export const repeatNetworkRequest = (log) => getNetworkLogger().repeatRequest(log);
export const getNetworkStats = () => getNetworkLogger().getNetworkStats();
