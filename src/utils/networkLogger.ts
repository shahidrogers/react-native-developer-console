import {
  NetworkRequest,
  NetworkResponse,
  NetworkInterceptorConfig,
} from '../types';

export class UniversalNetworkLogger {
  private logs: NetworkResponse[] = [];
  private subscribers: Array<(logs: NetworkResponse[]) => void> = [];
  private pendingRequests = new Map<string, NetworkRequest>();
  private maxLogs: number = 500;
  private ignoredUrls: string[] = [];
  private ignoredHosts: string[] = [];
  private enableBodyLogging: boolean = true;
  private enableInProduction: boolean = false;

  constructor(config?: NetworkInterceptorConfig['config']) {
    if (config) {
      this.maxLogs = config.maxLogs || 500;
      this.ignoredUrls = config.ignoredUrls || [];
      this.ignoredHosts = config.ignoredHosts || [];
      this.enableBodyLogging = config.enableBodyLogging !== false;
      this.enableInProduction = config.enableInProduction || false;
    }
  }

  // Check if request should be logged
  private shouldLogRequest(url: string): boolean {
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
      if (
        this.ignoredHosts.some(ignoredHost =>
          urlObj.hostname.includes(ignoredHost),
        )
      ) {
        return false;
      }
    } catch {
      // Invalid URL, continue with logging
    }

    return true;
  }

  // Generate unique request ID
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  // Add log to storage and notify subscribers
  private addLog(log: NetworkResponse): void {
    // Prepend newest log
    this.logs.unshift(log);

    // Drop oldest if over capacity
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    this.notifySubscribers();
  }

  // Notify all subscribers of log changes
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback([...this.logs]));
  }

  // Log a network request
  logRequest(request: Partial<NetworkRequest>): string | null {
    if (!request.url || !this.shouldLogRequest(request.url)) {
      return null;
    }

    const id = this.generateId();
    const fullRequest: NetworkRequest = {
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
  logResponse(requestId: string, response: Partial<NetworkResponse>): void {
    const request = this.pendingRequests.get(requestId);
    if (!request) return;

    const fullResponse: NetworkResponse = {
      ...request,
      status: response.status || 0,
      response: this.enableBodyLogging ? response.response : undefined,
      error: response.error,
      endTime: Date.now(),
      duration: Date.now() - request.startTime,
      isRepeated: response.isRepeated,
    };

    this.pendingRequests.delete(requestId);
    this.addLog(fullResponse);
  }

  // Subscribe to log changes
  subscribe(callback: (logs: NetworkResponse[]) => void): () => void {
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
  clearLogs(): void {
    this.logs = [];
    this.pendingRequests.clear();
    this.notifySubscribers();
  }

  // Get all logs
  getLogs(): NetworkResponse[] {
    return [...this.logs];
  }

  // Get network statistics
  getNetworkStats(): any {
    if (this.logs.length === 0) return null;

    const completedRequests = this.logs.filter(log => log.status);
    const successfulRequests = this.logs.filter(
      log => log.status >= 200 && log.status < 300,
    );
    const failedRequests = this.logs.filter(log => log.status >= 400);
    const totalDuration = completedRequests.reduce(
      (sum, log) => sum + (log.duration || 0),
      0,
    );

    return {
      totalRequests: this.logs.length,
      completedRequests: completedRequests.length,
      successRate: completedRequests.length
        ? (
            (successfulRequests.length / completedRequests.length) *
            100
          ).toFixed(1)
        : 0,
      averageResponseTime: completedRequests.length
        ? Math.round(totalDuration / completedRequests.length)
        : 0,
      failedRequests: failedRequests.length,
      pendingRequests: this.logs.length - completedRequests.length,
    };
  }

  // Repeat a network request
  async repeatRequest(log: NetworkResponse): Promise<NetworkResponse> {
    const repeatId = `repeat-${log.id}-${Date.now()}`;

    const newLog: NetworkResponse = {
      ...log,
      id: repeatId,
      startTime: Date.now(),
      duration: 0,
      status: 0,
      response: undefined,
      error: undefined,
      isRepeated: true,
    };

    // Add the repeated request to logs immediately
    this.addLog(newLog);

    try {
      const options: RequestInit = {
        method: log.method,
        headers: log.headers || {},
        body: log.body,
      };

      const startTime = Date.now();
      const response = await fetch(log.url, options);
      const responseText = await response.text();
      let responseData = responseText;

      const endTime = Date.now();
      const updatedLog: NetworkResponse = {
        ...newLog,
        status: response.status,
        response: responseData,
        endTime,
        duration: endTime - startTime,
      };

      // Update the log with response data
      const logIndex = this.logs.findIndex(l => l.id === repeatId);
      if (logIndex !== -1) {
        this.logs[logIndex] = updatedLog;
        this.notifySubscribers();
      }

      return updatedLog;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const updatedLog: NetworkResponse = {
        ...newLog,
        error: errorMessage,
        endTime: Date.now(),
        duration: Date.now() - newLog.startTime,
      };

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
  createAxiosInterceptor(axiosInstance: any): () => void {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config: any) => {
        const id = this.logRequest({
          url: config.url,
          method: config.method?.toUpperCase(),
          headers: config.headers,
          body: config.data,
        });

        if (id) {
          config.headers = { ...config.headers, 'x-dev-console-id': id };
        }
        return config;
      },
      (error: any) => Promise.reject(error),
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: any) => {
        const id = response.config.headers?.['x-dev-console-id'];
        if (id) {
          this.logResponse(id, {
            status: response.status,
            response: response.data,
          });
        }
        return response;
      },
      (error: any) => {
        const id = error.config?.headers?.['x-dev-console-id'];
        if (id) {
          this.logResponse(id, {
            status: error.response?.status || 0,
            error: error.message,
            response: error.response?.data,
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }

  // Create Fetch interceptor
  createFetchInterceptor(): () => void {
    const originalFetch = global.fetch;

    global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url =
        typeof input === 'string'
          ? input
          : input instanceof URL
          ? input.toString()
          : input.url;
      const id = this.logRequest({
        url,
        method: init?.method?.toUpperCase() || 'GET',
        headers: init?.headers as Record<string, string>,
        body: init?.body,
      });

      try {
        const response = await originalFetch(input, init);

        if (id) {
          let responseData;
          try {
            const clonedResponse = response.clone();
            const contentType = clonedResponse.headers.get('content-type');
            if (contentType?.includes('application/json')) {
              responseData = await clonedResponse.json();
            } else {
              responseData = await clonedResponse.text();
            }
          } catch {
            responseData = '[Unable to read response body]';
          }

          this.logResponse(id, {
            status: response.status,
            response: responseData,
          });
        }

        return response;
      } catch (error: any) {
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
let globalLogger: UniversalNetworkLogger | null = null;

// Get or create global logger instance
export function getNetworkLogger(
  config?: NetworkInterceptorConfig['config'],
): UniversalNetworkLogger {
  if (!globalLogger) {
    globalLogger = new UniversalNetworkLogger(config);
  }
  return globalLogger;
}

// Export convenience functions
export const subscribeToNetworkLogs = (
  callback: (logs: NetworkResponse[]) => void,
) => getNetworkLogger().subscribe(callback);

export const clearNetworkLogs = () => getNetworkLogger().clearLogs();

export const getNetworkLogs = () => getNetworkLogger().getLogs();

export const repeatNetworkRequest = (log: NetworkResponse) =>
  getNetworkLogger().repeatRequest(log);

export const getNetworkStats = () => getNetworkLogger().getNetworkStats();
