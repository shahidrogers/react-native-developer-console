import React from 'react';

// Core Network Types
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

// Theme Configuration
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

// Custom Actions for General Tab
export interface CustomAction {
  id: string;
  title: string;
  icon?: string;
  onPress: () => void | Promise<void>;
  variant?: 'primary' | 'danger' | 'default';
  disabled?: boolean;
}

// Environment Configuration
export interface EnvironmentConfig {
  enabledInProduction?: boolean;
  stagingEnvironments?: string[];
  customEnvironmentCheck?: () => boolean;
}

// Device Information
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

// Network Statistics
export interface NetworkStats {
  totalRequests: number;
  completedRequests: number;
  successRate: string;
  averageResponseTime: number;
  failedRequests: number;
  pendingRequests: number;
}

// Status Filter Types
export type StatusFilter = 'all' | '2xx' | '4xx' | '5xx';

// Tab Types
export type ActiveTab = 'network' | 'general';

// Main Component Props
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

// Provider Props
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

// Network Logger Hook Return Type
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

// Network Interceptor Configuration
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

// Setup Network Logging Options
export interface SetupNetworkLoggingOptions {
  clients?: Array<'axios' | 'fetch' | 'react-query'>;
  axios?: any;
  fetch?: boolean;
  reactQuery?: any;
  config?: NetworkInterceptorConfig['config'];
}

// Context Type
export interface DevConsoleContextType {
  isVisible: boolean;
  selectedTab: number;
  selectedLogId: string | null;
  networkLogger: any; // Using any to avoid circular dependency
  toggleConsole: () => void;
  showConsole: () => void;
  hideConsole: () => void;
  setSelectedTab: (tab: number) => void;
  setSelectedLogId: (id: string | null) => void;
  customActions: CustomAction[];
  encryptionEnabled: boolean;
  onDecryptData?: (encryptedData: string) => string;
}

// Component Props for Sub-components
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

// Default Theme
export const defaultTheme: Required<ThemeConfig> = {
  primary: '#00ff88',
  background: '#121212',
  surface: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#888888',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  border: '#2a2a2a',
};
