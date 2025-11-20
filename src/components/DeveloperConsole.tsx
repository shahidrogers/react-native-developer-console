import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StatusBar,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useDevConsole } from './DevConsoleProvider';
import { useNetworkLogger } from '../hooks/useNetworkLogger';
import { NetworkResponse } from '../types';
import { createStyles } from '../constants/styles';
import NetworkLogList from './NetworkLogList';
import NetworkLogDetail from './NetworkLogDetail';
import GeneralInfoPanel from './GeneralInfoPanel';

const DeveloperConsole: React.FC = () => {
  const {
    isVisible,
    selectedTab,
    selectedLogId,
    networkLogger,
    hideConsole,
    setSelectedTab,
    setSelectedLogId,
    customActions,
    encryptionEnabled,
    onDecryptData,
  } = useDevConsole();

  const {
    logs,
    clearLogs,
    repeatRequest,
    searchedAPI,
    setSearchedAPI,
    statusFilter,
    setStatusFilter,
    filteredLogs,
    networkStats,
  } = useNetworkLogger();

  const [isRepeatingRequest, setIsRepeatingRequest] = useState(false);
  const [storageKeys, setStorageKeys] = useState<string[]>([]);
  const [isLoadingStorage, setIsLoadingStorage] = useState(false);

  const styles = createStyles();

  // Get selected log
  const selectedLog = logs.find(log => log.id === selectedLogId);

  // Handle repeat request
  const handleRepeatRequest = useCallback(
    async (log: any) => {
      setIsRepeatingRequest(true);
      try {
        await repeatRequest(log);
      } catch (error) {
        console.error('Failed to repeat request:', error);
      } finally {
        setIsRepeatingRequest(false);
      }
    },
    [repeatRequest],
  );

  // Handle storage operations
  const loadStorageKeys = useCallback(async () => {
    setIsLoadingStorage(true);
    try {
      // In a real implementation, you'd get actual storage keys
      // For now, we'll use mock data
      setStorageKeys(['userToken', 'appSettings', 'cacheData', 'preferences']);
    } catch (error) {
      console.error('Failed to load storage keys:', error);
    } finally {
      setIsLoadingStorage(false);
    }
  }, []);

  const handleClearStorage = useCallback(async () => {
    try {
      // In a real implementation, you'd clear actual storage
      console.log('Clearing storage...');
      setStorageKeys([]);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }, []);

  // Status filter handlers
  const handleStatusFilterChange = useCallback(
    (status: string) => {
      const currentFilter = statusFilter;
      const newFilter = currentFilter.includes(status)
        ? currentFilter.filter((s: string) => s !== status)
        : [...currentFilter, status];
      setStatusFilter(newFilter);
    },
    [statusFilter, setStatusFilter],
  );

  const renderStatusFilters = () => (
    <View style={styles.statusFilterContainer}>
      {['success', 'error', 'pending'].map(status => (
        <TouchableOpacity
          key={status}
          style={[
            styles.statusFilterChip,
            statusFilter.includes(status) && styles.statusFilterChipActive,
          ]}
          onPress={() => handleStatusFilterChange(status)}
        >
          <Text
            style={[
              styles.statusFilterChipText,
              statusFilter.includes(status) &&
                styles.statusFilterChipTextActive,
            ]}
          >
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Render empty state
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No network logs found</Text>
      <Text style={styles.emptySubText}>
        Make some API calls to see them here
      </Text>
    </View>
  );

  // Tab content renderers
  const renderTabContent = () => {
    if (selectedLogId && selectedLog) {
      return (
        <NetworkLogDetail
          selectedLog={selectedLog}
          onBack={() => setSelectedLogId(null)}
          isRepeatingRequest={isRepeatingRequest}
          handleRepeatRequest={handleRepeatRequest}
          encryptionEnabled={encryptionEnabled}
          onDecryptData={onDecryptData}
        />
      );
    }

    switch (selectedTab) {
      case 0: // Network tab (index 0 in tabs array)
        return (
          <NetworkLogList
            networkStats={networkStats}
            searchedAPI={searchedAPI}
            setSearchedAPI={setSearchedAPI}
            clearLogs={clearLogs}
            renderStatusFilters={renderStatusFilters}
            filteredLogs={filteredLogs}
            setSelectedLogId={setSelectedLogId}
            renderEmptyList={renderEmptyList}
          />
        );
      case 1: // General tab (index 1 in tabs array)
        return (
          <GeneralInfoPanel
            customActions={customActions}
            loadStorageKeys={loadStorageKeys}
            isLoadingStorage={isLoadingStorage}
            storageKeys={storageKeys}
            deviceInfo={{
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
            }}
            onClearStorage={handleClearStorage}
          />
        );
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

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={hideConsole}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Developer Console</Text>
          <TouchableOpacity onPress={hideConsole} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation - Only show when not viewing log detail */}
        {!selectedLogId && (
          <View style={styles.tabContainer}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, selectedTab === index && styles.activeTab]}
                onPress={() => setSelectedTab(index)}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === index && styles.activeTabText,
                  ]}
                >
                  {tab.title}
                  {tab.key === 'network' && logs.length > 0 && (
                    <Text style={styles.tabBadge}> ({logs.length})</Text>
                  )}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Tab Content */}
        <View style={styles.content}>{renderTabContent()}</View>
      </SafeAreaView>
    </Modal>
  );
};

export default DeveloperConsole;
