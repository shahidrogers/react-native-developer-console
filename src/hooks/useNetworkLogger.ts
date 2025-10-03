import { useState, useEffect, useMemo } from 'react';
import {
  NetworkResponse,
  UseNetworkLoggerReturn,
  NetworkStats,
} from '../types';
import {
  subscribeToNetworkLogs,
  getNetworkLogs,
  clearNetworkLogs,
  repeatNetworkRequest,
  getNetworkStats,
} from '../utils';

export const useNetworkLogger = (): UseNetworkLoggerReturn => {
  const [logs, setLogs] = useState<NetworkResponse[]>(getNetworkLogs());
  const [searchedAPI, setSearchedAPI] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToNetworkLogs(updatedLogs => {
      setLogs(updatedLogs);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Filter logs based on search and status
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // URL search filter
      if (
        searchedAPI &&
        !log.url.toLowerCase().includes(searchedAPI.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (statusFilter.length > 0) {
        const isSuccess = log.status >= 200 && log.status < 300;
        const isError = log.status >= 400;
        const isPending = log.status === 0;

        if (statusFilter.includes('success') && !isSuccess) return false;
        if (statusFilter.includes('error') && !isError) return false;
        if (statusFilter.includes('pending') && !isPending) return false;
      }

      return true;
    });
  }, [logs, searchedAPI, statusFilter]);

  // Get network stats
  const networkStats = useMemo((): NetworkStats | null => {
    if (logs.length === 0) return null;

    const completedRequests = logs.filter(
      log => log.status >= 200 && log.status < 300,
    ).length;
    const failedRequests = logs.filter(log => log.status >= 400).length;
    const pendingRequests = logs.filter(log => log.status === 0).length;
    const totalRequests = logs.length;

    const totalResponseTime = logs
      .filter(log => log.duration > 0)
      .reduce((sum, log) => sum + log.duration, 0);
    const averageResponseTime =
      totalResponseTime > 0
        ? Math.round(
            totalResponseTime / logs.filter(log => log.duration > 0).length,
          )
        : 0;

    const successRate =
      totalRequests > 0
        ? `${Math.round((completedRequests / totalRequests) * 100)}%`
        : '0%';

    return {
      totalRequests,
      completedRequests,
      failedRequests,
      pendingRequests,
      averageResponseTime,
      successRate,
    };
  }, [logs]);

  return {
    logs,
    clearLogs: clearNetworkLogs,
    repeatRequest: async (log: NetworkResponse) => {
      await repeatNetworkRequest(log);
    },
    searchedAPI,
    setSearchedAPI,
    statusFilter,
    setStatusFilter,
    filteredLogs,
    networkStats,
  };
};
