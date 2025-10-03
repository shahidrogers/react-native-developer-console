import { getNetworkLogger } from './networkLogger';
// Setup network logging for different HTTP clients
export function setupNetworkLogging(options = {}) {
    const { clients = ['axios', 'fetch'], axios: axiosInstance, fetch: enableFetch = true, reactQuery: queryClient, config, } = options;
    const logger = getNetworkLogger(config);
    const cleanupFunctions = [];
    // Setup Axios interceptor
    if (clients.includes('axios') && axiosInstance) {
        try {
            // Dynamic import to avoid requiring axios as a dependency
            const axios = require('axios');
            const instance = axiosInstance || axios.default;
            const cleanup = logger.createAxiosInterceptor(instance);
            cleanupFunctions.push(cleanup);
        }
        catch (error) {
            console.warn('Axios not found, skipping axios interceptor setup');
        }
    }
    // Setup Fetch interceptor
    if (clients.includes('fetch') && enableFetch) {
        try {
            const cleanup = logger.createFetchInterceptor();
            cleanupFunctions.push(cleanup);
        }
        catch (error) {
            console.warn('Failed to setup fetch interceptor:', error);
        }
    }
    // Setup React Query interceptor (placeholder for future implementation)
    if (clients.includes('react-query') && queryClient) {
        try {
            // React Query integration would go here
            console.warn('React Query integration not yet implemented');
        }
        catch (error) {
            console.warn('Failed to setup React Query interceptor:', error);
        }
    }
    // Return cleanup function
    return () => {
        cleanupFunctions.forEach(cleanup => {
            try {
                cleanup();
            }
            catch (error) {
                console.warn('Error during cleanup:', error);
            }
        });
    };
}
// Auto-setup function that tries to detect available clients
export function autoSetupNetworkLogging(config) {
    const clients = [];
    let axiosInstance = null;
    let queryClient = null;
    // Try to detect axios
    try {
        const axios = require('axios');
        if (axios.default) {
            clients.push('axios');
            axiosInstance = axios.default;
        }
    }
    catch (_a) {
        // Axios not available
    }
    // Always include fetch (it's built-in)
    clients.push('fetch');
    // Try to detect React Query
    try {
        const { QueryClient } = require('@tanstack/react-query');
        if (QueryClient) {
            clients.push('react-query');
            // Note: We can't automatically get the query client instance
            // Users would need to provide it manually
        }
    }
    catch (_b) {
        // React Query not available
    }
    return setupNetworkLogging({
        clients,
        axios: axiosInstance,
        fetch: true,
        reactQuery: queryClient,
        config,
    });
}
