import React from 'react';
export interface NetworkRequest {
    id: string;
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: any;
    startTime: number;
}
export interface NetworkResponse extends NetworkRequest {
    status: number;
    response?: any;
    error?: string;
    endTime: number;
    duration: number;
    isRepeated?: boolean;
}
export interface ThemeConfig {
    primary?: string;
    background?: string;
    surface?: string;
    text?: string;
    textSecondary?: string;
    success?: string;
    warning?: string;
    error?: string;
    border?: string;
}
export interface CustomAction {
    id: string;
    title: string;
    icon?: string;
    onPress: () => void | Promise<void>;
    variant?: 'primary' | 'danger' | 'default';
    disabled?: boolean;
}
export interface EnvironmentConfig {
    enabledInProduction?: boolean;
    stagingEnvironments?: string[];
    customEnvironmentCheck?: () => boolean;
}
export interface DeviceInfo {
    appVersion: string;
    buildNumber: string;
    bundleId: string;
    firstInstallTime: string;
    deviceId: string;
    deviceModel: string;
    systemName: string;
    systemVersion: string;
    manufacturer: string;
    totalMemory: number;
    batteryLevel: number;
    isEmulator: boolean;
}
export interface NetworkStats {
    totalRequests: number;
    completedRequests: number;
    successRate: string;
    averageResponseTime: number;
    failedRequests: number;
    pendingRequests: number;
}
export type StatusFilter = 'all' | '2xx' | '4xx' | '5xx';
export type ActiveTab = 'network' | 'general';
export interface DeveloperConsoleProps {
    visible?: boolean;
    onClose?: () => void;
    theme?: ThemeConfig;
    environment?: 'development' | 'staging' | 'production';
    customActions?: CustomAction[];
    encryptionEnabled?: boolean;
    onDecryptData?: (encryptedData: string) => string;
    maxLogs?: number;
    ignoredUrls?: string[];
    ignoredHosts?: string[];
}
export interface DevConsoleProviderProps {
    children: React.ReactNode;
    theme?: ThemeConfig;
    environment?: 'development' | 'staging' | 'production';
    showDebugButton?: boolean;
    enabled?: boolean;
    enableGestures?: boolean;
    shakeThreshold?: number;
    longPressDelay?: number;
    doubleTapDelay?: number;
    customActions?: CustomAction[];
    encryptionEnabled?: boolean;
    onDecryptData?: (encryptedData: string) => string;
}
export interface UseNetworkLoggerReturn {
    logs: NetworkResponse[];
    clearLogs: () => void;
    repeatRequest: (log: NetworkResponse) => Promise<void>;
    searchedAPI: string;
    setSearchedAPI: (text: string) => void;
    statusFilter: string[];
    setStatusFilter: (filters: string[]) => void;
    filteredLogs: NetworkResponse[];
    networkStats: NetworkStats | null;
}
export interface NetworkInterceptorConfig {
    axios?: {
        instance?: any;
        enableRequestLogging?: boolean;
        enableResponseLogging?: boolean;
    };
    fetch?: {
        enableRequestLogging?: boolean;
        enableResponseLogging?: boolean;
    };
    reactQuery?: {
        client?: any;
        enableRequestLogging?: boolean;
        enableResponseLogging?: boolean;
    };
    config?: {
        maxLogs?: number;
        ignoredUrls?: string[];
        ignoredHosts?: string[];
        enableBodyLogging?: boolean;
        enableInProduction?: boolean;
    };
}
export interface SetupNetworkLoggingOptions {
    clients?: Array<'axios' | 'fetch' | 'react-query'>;
    axios?: any;
    fetch?: boolean;
    reactQuery?: any;
    config?: NetworkInterceptorConfig['config'];
}
export interface DevConsoleContextType {
    isVisible: boolean;
    selectedTab: number;
    selectedLogId: string | null;
    networkLogger: any;
    toggleConsole: () => void;
    showConsole: () => void;
    hideConsole: () => void;
    setSelectedTab: (tab: number) => void;
    setSelectedLogId: (id: string | null) => void;
    customActions: CustomAction[];
    encryptionEnabled: boolean;
    onDecryptData?: (encryptedData: string) => string;
}
export interface GeneralInfoPanelProps {
    customActions: CustomAction[];
    loadStorageKeys: () => void;
    isLoadingStorage: boolean;
    storageKeys: string[];
    deviceInfo: DeviceInfo;
    onClearStorage: () => void;
}
export interface NetworkLogListProps {
    networkStats: NetworkStats | null;
    searchedAPI: string;
    setSearchedAPI: (text: string) => void;
    clearLogs: () => void;
    renderStatusFilters: () => React.ReactNode;
    filteredLogs: NetworkResponse[];
    setSelectedLogId: (id: string | null) => void;
    renderEmptyList: () => React.ReactNode;
}
export interface NetworkLogDetailProps {
    selectedLog: NetworkResponse;
    onBack: () => void;
    isRepeatingRequest: boolean;
    handleRepeatRequest: (log: NetworkResponse) => void;
    encryptionEnabled?: boolean;
    onDecryptData?: (encryptedData: string) => string;
}
export interface LogItemProps {
    log: NetworkResponse;
    onPress: (logId: string) => void;
}
export declare const defaultTheme: Required<ThemeConfig>;
