import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NetworkLogDetailProps } from '../types';
import { createStyles } from '../constants/styles';
import {
  getMethodStyle,
  copyToClipboard,
  formatTimestamp,
  formatDate,
} from '../utils';

interface CollapsibleSectionProps {
  title: string;
  isOpen?: boolean;
  children: React.ReactNode;
  icon?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen = false,
  children,
  icon,
}) => {
  const [expanded, setExpanded] = useState(isOpen);
  const styles = createStyles();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.detailSection}>
      <TouchableOpacity style={styles.collapsibleHeader} onPress={toggleExpand}>
        <Text style={styles.sectionTitle}>
          {icon && `${icon} `}
          {title}
        </Text>
        <Text style={styles.expandIcon}>{expanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>
      {expanded && <View style={styles.collapsibleContent}>{children}</View>}
    </View>
  );
};

const NetworkLogDetail: React.FC<NetworkLogDetailProps> = ({
  selectedLog,
  onBack,
  isRepeatingRequest,
  handleRepeatRequest,
  encryptionEnabled = false,
  onDecryptData,
}) => {
  const [copiedRequestFeedback, setCopiedRequestFeedback] = useState(false);
  const [copiedResponseFeedback, setCopiedResponseFeedback] = useState(false);
  const [copiedSummaryFeedback, setCopiedSummaryFeedback] = useState(false);
  const [copiedUrlFeedback, setCopiedUrlFeedback] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const styles = createStyles();

  if (!selectedLog) return null;

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(selectedLog.url);
    if (success) {
      setCopiedUrlFeedback(true);
      setTimeout(() => setCopiedUrlFeedback(false), 2000);
    }
  };

  const handleCopySummary = async () => {
    try {
      const summary: Record<string, any> = {
        requestDetails: {
          url: selectedLog.url,
          method: selectedLog.method,
          status: selectedLog.status,
          time: selectedLog.startTime
            ? formatDate(selectedLog.startTime)
            : 'Unknown',
          duration: selectedLog.duration
            ? `${selectedLog.duration}ms`
            : 'Pending',
          headers: selectedLog.headers,
          requestBody: decryptData(selectedLog.body),
          responseBody: decryptData(selectedLog.response),
        },
      };

      const success = await copyToClipboard(JSON.stringify(summary, null, 2));
      if (success) {
        setCopiedSummaryFeedback(true);
        setTimeout(() => setCopiedSummaryFeedback(false), 2000);
      }
    } catch (error) {
      console.error('Error copying summary:', error);
      Alert.alert('Error', 'Failed to copy summary. See console for details.');
    }
  };

  const handleCopyRequest = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedRequestFeedback(true);
      setTimeout(() => setCopiedRequestFeedback(false), 2000);
    }
  };

  const handleCopyResponse = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedResponseFeedback(true);
      setTimeout(() => setCopiedResponseFeedback(false), 2000);
    }
  };

  const decryptData = (data: any): any => {
    if (!encryptionEnabled || !onDecryptData) {
      return data;
    }

    try {
      if (typeof data === 'string') {
        const decrypted = onDecryptData(data);
        // Try to parse as JSON if it looks like JSON
        if (
          typeof decrypted === 'string' &&
          (decrypted.startsWith('{') || decrypted.startsWith('['))
        ) {
          try {
            return JSON.parse(decrypted);
          } catch {
            return decrypted;
          }
        }
        return decrypted;
      }
      return data;
    } catch (error) {
      console.warn('Decryption failed:', error);
      return '[Decryption failed]';
    }
  };

  return (
    <View style={styles.detailContainerWrapper}>
      <ScrollView ref={scrollViewRef} style={styles.detailContainer}>
        {/* Top Back Button */}
        <TouchableOpacity
          onPress={onBack}
          style={styles.topBackButtonContainer}
        >
          <Text style={styles.topBackButtonText}>← Back to Logs</Text>
        </TouchableOpacity>

        <View style={styles.detailHeader}>
          <View style={styles.statusRow}>
            <View style={[styles.statusRowBadge, styles.methodBadge]}>
              <Text
                style={[
                  styles.methodBadgeText,
                  getMethodStyle(selectedLog.method, styles),
                ]}
              >
                {selectedLog.method}
              </Text>
            </View>
            <View style={styles.statusRowBadge}>
              <Text
                style={[
                  styles.statusText,
                  selectedLog.status < 300 && selectedLog.status >= 200
                    ? styles.successStatus
                    : styles.errorStatus,
                ]}
              >
                {selectedLog.status || 'Pending'}
              </Text>
            </View>
            <View style={styles.statusRowBadge}>
              <Text style={styles.timeText}>
                {selectedLog.startTime
                  ? formatTimestamp(selectedLog.startTime)
                  : 'Unknown'}
              </Text>
            </View>
            <View style={styles.statusRowBadge}>
              <Text style={styles.durationText}>
                {selectedLog.duration ? `${selectedLog.duration}ms` : 'Pending'}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleCopyUrl} style={styles.urlContainer}>
            <Text style={styles.detailTitle} numberOfLines={3}>
              {selectedLog.url}
            </Text>
            <Text style={styles.copyUrlHint}>
              {copiedUrlFeedback ? '✓ URL Copied!' : 'Tap to copy URL'}
            </Text>
          </TouchableOpacity>

          <View style={styles.summaryActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.repeatButton]}
              onPress={handleCopySummary}
            >
              <Text style={styles.actionButtonText}>
                {copiedSummaryFeedback ? '✓ Copied!' : '📋 Copy Summary'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.repeatButton,
                isRepeatingRequest && styles.repeatRequestButtonDisabled,
              ]}
              onPress={() => handleRepeatRequest(selectedLog)}
              disabled={isRepeatingRequest}
            >
              <Text style={styles.actionButtonText}>
                {isRepeatingRequest ? '🔄 Repeating...' : '🔄 Repeat'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <CollapsibleSection title="Headers" icon="📋">
          <View style={styles.detailCard}>
            {Object.entries(selectedLog.headers || {}).map(([key, value]) => (
              <View key={key} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{key}:</Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => handleCopyRequest(String(value))}
                >
                  <Text style={styles.detailValue}>
                    {typeof value === 'object'
                      ? JSON.stringify(value)
                      : String(value)}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            {Object.keys(selectedLog.headers || {}).length === 0 && (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>No headers available</Text>
              </View>
            )}
          </View>
        </CollapsibleSection>

        {selectedLog.body && (
          <CollapsibleSection title="Request" icon="📤" isOpen={true}>
            <View style={styles.detailCard}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Request Body</Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => {
                    const decryptedBody = decryptData(selectedLog.body);
                    handleCopyRequest(
                      typeof decryptedBody === 'string'
                        ? decryptedBody
                        : JSON.stringify(decryptedBody, null, 2),
                    );
                  }}
                >
                  <Text style={styles.copyButtonText}>
                    {copiedRequestFeedback ? '✓ Copied!' : 'Copy'}
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal style={styles.codeScrollContainer}>
                <Text style={styles.jsonText}>
                  {(() => {
                    const decryptedBody = decryptData(selectedLog.body);
                    return typeof decryptedBody === 'string'
                      ? decryptedBody
                      : JSON.stringify(decryptedBody, null, 2);
                  })()}
                </Text>
              </ScrollView>
            </View>
          </CollapsibleSection>
        )}

        {selectedLog.response && (
          <CollapsibleSection title="Response" icon="📥" isOpen={true}>
            <View style={styles.detailCard}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Response Body</Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => {
                    const decryptedResponse = decryptData(selectedLog.response);
                    handleCopyResponse(
                      typeof decryptedResponse === 'string'
                        ? decryptedResponse
                        : JSON.stringify(decryptedResponse, null, 2),
                    );
                  }}
                >
                  <Text style={styles.copyButtonText}>
                    {copiedResponseFeedback ? '✓ Copied!' : 'Copy'}
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal style={styles.codeScrollContainer}>
                <Text style={styles.jsonText}>
                  {(() => {
                    const decryptedResponse = decryptData(selectedLog.response);
                    return typeof decryptedResponse === 'string'
                      ? decryptedResponse
                      : JSON.stringify(decryptedResponse, null, 2);
                  })()}
                </Text>
              </ScrollView>
            </View>
          </CollapsibleSection>
        )}

        {selectedLog.error && (
          <CollapsibleSection title="Error" icon="❌" isOpen={true}>
            <View style={[styles.detailCard, styles.errorCard]}>
              <ScrollView horizontal style={styles.codeScrollContainer}>
                <Text style={[styles.jsonText, styles.errorText]}>
                  {selectedLog.error}
                </Text>
              </ScrollView>
            </View>
          </CollapsibleSection>
        )}
      </ScrollView>

      <View style={styles.floatingControls}>
        <TouchableOpacity style={styles.floatingBackButton} onPress={onBack}>
          <Text style={styles.floatingBackButtonText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingScrollTopButton}
          onPress={() =>
            scrollViewRef.current?.scrollTo({ y: 0, animated: true })
          }
        >
          <Text style={styles.floatingScrollTopButtonText}>↑ Top</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NetworkLogDetail;
