import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, StatusBar, Platform, SafeAreaView, } from 'react-native';
import { useDevConsole } from './DevConsoleProvider';
import { useNetworkLogger } from '../hooks/useNetworkLogger';
import { createStyles } from '../constants/styles';
import NetworkLogList from './NetworkLogList';
import NetworkLogDetail from './NetworkLogDetail';
import GeneralInfoPanel from './GeneralInfoPanel';
const DeveloperConsole = () => {
    const { isVisible, selectedTab, selectedLogId, networkLogger, hideConsole, setSelectedTab, setSelectedLogId, customActions, encryptionEnabled, onDecryptData, } = useDevConsole();
    const { logs, clearLogs, repeatRequest, searchedAPI, setSearchedAPI, statusFilter, setStatusFilter, filteredLogs, networkStats, } = useNetworkLogger();
    const [isRepeatingRequest, setIsRepeatingRequest] = useState(false);
    const [storageKeys, setStorageKeys] = useState([]);
    const [isLoadingStorage, setIsLoadingStorage] = useState(false);
    const styles = createStyles();
    // Get selected log
    const selectedLog = logs.find(log => log.id === selectedLogId);
    // Handle repeat request
    const handleRepeatRequest = useCallback(async (log) => {
        setIsRepeatingRequest(true);
        try {
            await repeatRequest(log);
        }
        catch (error) {
            console.error('Failed to repeat request:', error);
        }
        finally {
            setIsRepeatingRequest(false);
        }
    }, [repeatRequest]);
    // Handle storage operations
    const loadStorageKeys = useCallback(async () => {
        setIsLoadingStorage(true);
        try {
            // In a real implementation, you'd get actual storage keys
            // For now, we'll use mock data
            setStorageKeys(['userToken', 'appSettings', 'cacheData', 'preferences']);
        }
        catch (error) {
            console.error('Failed to load storage keys:', error);
        }
        finally {
            setIsLoadingStorage(false);
        }
    }, []);
    const handleClearStorage = useCallback(async () => {
        try {
            // In a real implementation, you'd clear actual storage
            console.log('Clearing storage...');
            setStorageKeys([]);
        }
        catch (error) {
            console.error('Failed to clear storage:', error);
        }
    }, []);
    // Status filter handlers
    const handleStatusFilterChange = useCallback((status) => {
        const currentFilter = statusFilter;
        const newFilter = currentFilter.includes(status)
            ? currentFilter.filter((s) => s !== status)
            : [...currentFilter, status];
        setStatusFilter(newFilter);
    }, [statusFilter, setStatusFilter]);
    const renderStatusFilters = () => (_jsx(View, Object.assign({ style: styles.statusFilterContainer }, { children: ['success', 'error', 'pending'].map(status => (_jsx(TouchableOpacity, Object.assign({ style: [
                styles.statusFilterChip,
                statusFilter.includes(status) && styles.statusFilterChipActive,
            ], onPress: () => handleStatusFilterChange(status) }, { children: _jsx(Text, Object.assign({ style: [
                    styles.statusFilterChipText,
                    statusFilter.includes(status) &&
                        styles.statusFilterChipTextActive,
                ] }, { children: status })) }), status))) })));
    // Render empty state
    const renderEmptyList = () => (_jsxs(View, Object.assign({ style: styles.emptyContainer }, { children: [_jsx(Text, Object.assign({ style: styles.emptyText }, { children: "No network logs found" })), _jsx(Text, Object.assign({ style: styles.emptySubText }, { children: "Make some API calls to see them here" }))] })));
    // Tab content renderers
    const renderTabContent = () => {
        if (selectedLogId && selectedLog) {
            return (_jsx(NetworkLogDetail, { selectedLog: selectedLog, onBack: () => setSelectedLogId(null), isRepeatingRequest: isRepeatingRequest, handleRepeatRequest: handleRepeatRequest, encryptionEnabled: encryptionEnabled, onDecryptData: onDecryptData }));
        }
        switch (selectedTab) {
            case 0: // Network tab (index 0 in tabs array)
                return (_jsx(NetworkLogList, { networkStats: networkStats, searchedAPI: searchedAPI, setSearchedAPI: setSearchedAPI, clearLogs: clearLogs, renderStatusFilters: renderStatusFilters, filteredLogs: filteredLogs, setSelectedLogId: setSelectedLogId, renderEmptyList: renderEmptyList }));
            case 1: // General tab (index 1 in tabs array)
                return (_jsx(GeneralInfoPanel, { customActions: customActions, loadStorageKeys: loadStorageKeys, isLoadingStorage: isLoadingStorage, storageKeys: storageKeys, deviceInfo: {
                        appVersion: '1.0.0',
                        buildNumber: '1',
                        bundleId: 'com.example.app',
                        firstInstallTime: '2024-01-01',
                        deviceId: 'device123',
                        deviceModel: 'Unknown',
                        systemName: Platform.OS,
                        systemVersion: String(Platform.Version),
                        manufacturer: 'Unknown',
                        totalMemory: 1024,
                        batteryLevel: 100,
                        isEmulator: __DEV__,
                    }, onClearStorage: handleClearStorage }));
            default:
                return null;
        }
    };
    // Tab headers
    const tabs = [
        { key: 'network', title: 'Network' },
        { key: 'general', title: 'General' },
    ];
    if (!isVisible) {
        return null;
    }
    return (_jsx(Modal, Object.assign({ visible: isVisible, animationType: "slide", presentationStyle: "fullScreen", onRequestClose: hideConsole }, { children: _jsxs(SafeAreaView, Object.assign({ style: styles.container }, { children: [_jsx(StatusBar, { barStyle: "light-content", backgroundColor: "#000" }), _jsxs(View, Object.assign({ style: styles.header }, { children: [_jsx(Text, Object.assign({ style: styles.headerTitle }, { children: "Developer Console" })), _jsx(TouchableOpacity, Object.assign({ onPress: hideConsole, style: styles.closeButton }, { children: _jsx(Text, Object.assign({ style: styles.closeButtonText }, { children: "\u2715" })) }))] })), !selectedLogId && (_jsx(View, Object.assign({ style: styles.tabContainer }, { children: tabs.map((tab, index) => (_jsx(TouchableOpacity, Object.assign({ style: [styles.tab, selectedTab === index && styles.activeTab], onPress: () => setSelectedTab(index) }, { children: _jsxs(Text, Object.assign({ style: [
                                styles.tabText,
                                selectedTab === index && styles.activeTabText,
                            ] }, { children: [tab.title, tab.key === 'network' && logs.length > 0 && (_jsxs(Text, Object.assign({ style: styles.tabBadge }, { children: [" (", logs.length, ")"] })))] })) }), tab.key))) }))), _jsx(View, Object.assign({ style: styles.content }, { children: renderTabContent() }))] })) })));
};
export default DeveloperConsole;
