import { Platform } from 'react-native';
// Get method style based on HTTP method
export const getMethodStyle = (method, styles) => {
    switch (method === null || method === void 0 ? void 0 : method.toUpperCase()) {
        case 'GET':
            return styles.methodGet;
        case 'POST':
            return styles.methodPost;
        case 'PUT':
            return styles.methodPut;
        case 'DELETE':
            return styles.methodDelete;
        case 'PATCH':
            return styles.methodPatch;
        default:
            return styles.methodOther;
    }
};
// Format value for display
export const formatValue = (value) => {
    if (value === undefined || value === null)
        return 'Not set';
    if (typeof value === 'boolean')
        return value ? 'Yes' : 'No';
    if (typeof value === 'object')
        return JSON.stringify(value);
    return String(value);
};
// Get status indicator emoji
export const getStatusIndicator = (status) => {
    if (!status)
        return '⏳';
    if (status >= 200 && status < 300)
        return '✅';
    if (status >= 300 && status < 400)
        return '🔄';
    if (status >= 400 && status < 500)
        return '⚠️';
    if (status >= 500)
        return '❌';
    return '❓';
};
// Get duration color
export const getDurationColor = (duration) => {
    if (!duration)
        return '#faad14'; // warning yellow
    if (duration < 500)
        return '#52c41a'; // success green
    if (duration < 1000)
        return '#a8a8a8'; // default gray
    if (duration < 2000)
        return '#faad14'; // warning yellow
    return '#ff4d4f'; // error red
};
// Get appropriate value style based on content
export const getValueStyle = (value, isStatus) => {
    if (value === null ||
        value === undefined ||
        value === 'null' ||
        value === 'undefined') {
        return 'error';
    }
    if (isStatus && (value === 'active' || value === true || value === 'true')) {
        return 'success';
    }
    if (isStatus &&
        (value === 'inactive' ||
            value === 'suspended' ||
            value === false ||
            value === 'false')) {
        return 'warning';
    }
    if (typeof value === 'string' && value.includes('@')) {
        return 'highlight';
    }
    return 'default';
};
// Merge themes with default fallback
export const mergeThemes = (theme) => {
    const defaultTheme = {
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
    return Object.assign(Object.assign({}, defaultTheme), theme);
};
// Platform-specific font family
export const getFontFamily = () => {
    return Platform.OS === 'ios' ? 'Menlo' : 'monospace';
};
// Format timestamp
export const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
};
// Format full date
export const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
};
// Truncate text for display
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength)
        return text;
    return text.substring(0, maxLength - 3) + '...';
};
// Check if environment is development
export const isDevelopment = () => {
    return (process.env.NODE_ENV === 'development' ||
        (typeof __DEV__ !== 'undefined' && __DEV__));
};
// Check if environment is staging
export const isStaging = () => {
    // Add your staging detection logic here
    return (process.env.NODE_ENV === 'staging' ||
        (typeof __DEV__ !== 'undefined' &&
            __DEV__ &&
            process.env.REACT_APP_ENV === 'staging'));
};
// Safe JSON parse with fallback
export const safeJsonParse = (text, fallback = null) => {
    try {
        return JSON.parse(text);
    }
    catch (_a) {
        return fallback;
    }
};
// Copy text to clipboard with feedback
export const copyToClipboard = async (text) => {
    try {
        // Dynamic import to avoid requiring clipboard as a dependency
        const Clipboard = require('@react-native-clipboard/clipboard').default;
        await Clipboard.setString(text);
        return true;
    }
    catch (error) {
        console.warn('Failed to copy to clipboard:', error);
        return false;
    }
};
// Get device info (wrapper around react-native-device-info)
export const getDeviceInfo = async () => {
    try {
        const DeviceInfo = require('react-native-device-info').default;
        const [appVersion, buildNumber, bundleId, firstInstallTime, deviceId, deviceModel, systemName, systemVersion, manufacturer, totalMemory, batteryLevel, isEmulator,] = await Promise.all([
            DeviceInfo.getVersion(),
            DeviceInfo.getBuildNumber(),
            DeviceInfo.getBundleId(),
            DeviceInfo.getFirstInstallTime(),
            DeviceInfo.getDeviceId(),
            DeviceInfo.getModel(),
            DeviceInfo.getSystemName(),
            DeviceInfo.getSystemVersion(),
            DeviceInfo.getManufacturer(),
            DeviceInfo.getTotalMemory(),
            DeviceInfo.getBatteryLevel(),
            DeviceInfo.isEmulator(),
        ]);
        return {
            appVersion,
            buildNumber,
            bundleId,
            firstInstallTime: formatDate(firstInstallTime),
            deviceId,
            deviceModel,
            systemName,
            systemVersion,
            manufacturer,
            totalMemory: Math.round(totalMemory / (1024 * 1024 * 1024)),
            batteryLevel: Math.round(batteryLevel * 100),
            isEmulator,
        };
    }
    catch (error) {
        console.warn('Failed to get device info:', error);
        return null;
    }
};
// Get storage keys from AsyncStorage
export const getStorageKeys = async () => {
    try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        const keys = await AsyncStorage.getAllKeys();
        return keys;
    }
    catch (error) {
        console.warn('Failed to get storage keys:', error);
        return [];
    }
};
// Clear AsyncStorage
export const clearStorage = async () => {
    try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.clear();
        return true;
    }
    catch (error) {
        console.warn('Failed to clear storage:', error);
        return false;
    }
};
