import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { GeneralInfoPanelProps } from '../types';
import { createStyles } from '../constants/styles';

const GeneralInfoPanel: React.FC<GeneralInfoPanelProps> = ({
  customActions,
  loadStorageKeys,
  isLoadingStorage,
  storageKeys,
  deviceInfo,
  onClearStorage,
}) => {
  const styles = createStyles();

  const handleClearStorage = () => {
    Alert.alert(
      'Clear Storage',
      'Are you sure you want to clear all storage data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: onClearStorage },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.generalContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Device Information */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Device Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>App Version:</Text>
          <Text style={styles.infoValue}>{deviceInfo.appVersion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Build Number:</Text>
          <Text style={styles.infoValue}>{deviceInfo.buildNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>System:</Text>
          <Text style={styles.infoValue}>
            {deviceInfo.systemName} {deviceInfo.systemVersion}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Device Model:</Text>
          <Text style={styles.infoValue}>{deviceInfo.deviceModel}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Manufacturer:</Text>
          <Text style={styles.infoValue}>{deviceInfo.manufacturer}</Text>
        </View>
      </View>

      {/* Storage Management */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Storage Management</Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={loadStorageKeys}
          disabled={isLoadingStorage}
        >
          <Text style={styles.actionButtonText}>
            {isLoadingStorage ? 'Loading...' : 'Load Storage Keys'}
          </Text>
        </TouchableOpacity>

        {storageKeys.length > 0 && (
          <View style={styles.storageKeysContainer}>
            <Text style={styles.sectionTitle}>Storage Keys:</Text>
            {storageKeys.map((key, index) => (
              <Text key={index} style={styles.storageKeyText}>
                • {key}
              </Text>
            ))}
            <TouchableOpacity
              style={[styles.actionButton, styles.clearButton]}
              onPress={handleClearStorage}
            >
              <Text style={styles.clearButtonText}>Clear All Storage</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Custom Actions */}
      {customActions.length > 0 && (
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Custom Actions</Text>
          {customActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionButton}
              onPress={action.onPress}
            >
              <Text style={styles.actionButtonText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Export Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Share Debug Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Test Network Connection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default GeneralInfoPanel;
