import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LogItemProps } from '../types';
import { createStyles } from '../constants/styles';
import {
  getMethodStyle,
  getStatusIndicator,
  getDurationColor,
  formatTimestamp,
} from '../utils';

const LogItem: React.FC<LogItemProps> = ({ log, onPress }) => {
  const styles = createStyles();
  const statusIndicator = getStatusIndicator(log.status);
  const durationColor = getDurationColor(log.duration);

  return (
    <TouchableOpacity style={styles.logItem} onPress={() => onPress(log.id)}>
      <View style={styles.logHeader}>
        <View style={styles.methodContainer}>
          <Text style={[styles.method, getMethodStyle(log.method, styles)]}>
            {log.method}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.status,
              log.status < 300 && log.status >= 200
                ? styles.successStatus
                : styles.errorStatus,
            ]}
          >
            {statusIndicator} {log.status || 'Pending'}
          </Text>
        </View>
      </View>

      <Text style={styles.url} numberOfLines={2} ellipsizeMode="tail">
        {log.url}
      </Text>

      <View style={styles.logFooter}>
        <Text style={[styles.time, { color: durationColor }]}>
          {log.duration ? `⚡ ${log.duration}ms` : '⏳ Pending...'}
        </Text>
        <Text style={styles.timestamp}>
          {log.startTime ? formatTimestamp(log.startTime) : ''}
        </Text>
        <Text style={styles.viewDetailsText}>more →</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LogItem;
