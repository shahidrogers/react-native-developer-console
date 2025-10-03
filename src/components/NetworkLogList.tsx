import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { NetworkLogListProps } from '../types';
import { createStyles } from '../constants/styles';
import LogItem from './LogItem';

// Enhanced stats display component
const NetworkStatsCard: React.FC<{ networkStats: any; styles: any }> = ({
  networkStats,
  styles,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.statsContainer}
  >
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{networkStats.totalRequests}</Text>
        <Text style={styles.statLabel}>Total</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text
          style={[
            styles.statValue,
            networkStats.pendingRequests > 0
              ? styles.infoValueWarning
              : { color: '#888' },
          ]}
        >
          {networkStats.pendingRequests}
        </Text>
        <Text style={styles.statLabel}>Pending</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text
          style={[
            styles.statValue,
            networkStats.failedRequests > 0
              ? styles.errorText
              : styles.successText,
          ]}
        >
          {networkStats.successRate}%
        </Text>
        <Text style={styles.statLabel}>Success</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text
          style={[
            styles.statValue,
            networkStats.averageResponseTime > 1000
              ? styles.infoValueWarning
              : networkStats.averageResponseTime > 2000
              ? styles.infoValueError
              : networkStats.averageResponseTime < 500
              ? styles.infoValueSuccess
              : undefined,
          ]}
        >
          {networkStats.averageResponseTime}ms
        </Text>
        <Text style={styles.statLabel}>Avg Time</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text
          style={[
            styles.statValue,
            networkStats.failedRequests > 0
              ? styles.errorText
              : styles.successText,
          ]}
        >
          {networkStats.failedRequests}
        </Text>
        <Text style={styles.statLabel}>Failed</Text>
      </View>
    </View>
  </ScrollView>
);

// Always visible controls bar
const ControlsBar: React.FC<{
  clearLogs: () => void;
  isSearchExpanded: boolean;
  onToggleSearch: () => void;
  hasSearchValue: boolean;
  styles: any;
}> = ({
  clearLogs,
  isSearchExpanded,
  onToggleSearch,
  hasSearchValue,
  styles,
}) => (
  <View style={styles.controlsBar}>
    <TouchableOpacity
      style={[styles.controlButton, styles.searchToggleButton]}
      onPress={onToggleSearch}
    >
      <Text style={styles.controlButtonText}>
        {isSearchExpanded ? '▼' : '▶'} search / filter
      </Text>
      {hasSearchValue && <View style={styles.activeIndicator} />}
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.controlButton, styles.clearButton]}
      onPress={clearLogs}
    >
      <Text style={styles.clearButtonText}>[clear all]</Text>
    </TouchableOpacity>
  </View>
);

// Search input section
const SearchSection: React.FC<{
  searchedAPI: string;
  setSearchedAPI: (text: string) => void;
  styles: any;
}> = ({ searchedAPI, setSearchedAPI, styles }) => (
  <View style={styles.searchSection}>
    <TextInput
      autoCapitalize="none"
      autoCorrect={false}
      style={styles.searchInput}
      placeholder="search api url or endpoint..."
      placeholderTextColor={'#888'}
      value={searchedAPI}
      onChangeText={setSearchedAPI}
    />
    {searchedAPI.length > 0 && (
      <TouchableOpacity
        style={styles.clearSearchButton}
        onPress={() => setSearchedAPI('')}
      >
        <Text style={styles.clearSearchText}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Collapsible search and filters section
const CollapsibleSearchSection: React.FC<{
  isExpanded: boolean;
  searchedAPI: string;
  setSearchedAPI: (text: string) => void;
  renderStatusFilters: () => React.ReactNode;
  styles: any;
}> = ({
  isExpanded,
  searchedAPI,
  setSearchedAPI,
  renderStatusFilters,
  styles,
}) => {
  if (!isExpanded) return null;

  return (
    <View style={styles.collapsibleContent}>
      <SearchSection
        searchedAPI={searchedAPI}
        setSearchedAPI={setSearchedAPI}
        styles={styles}
      />
      <View style={styles.statusFilterContainer}>{renderStatusFilters()}</View>
    </View>
  );
};

const NetworkLogList: React.FC<NetworkLogListProps> = ({
  networkStats,
  searchedAPI,
  setSearchedAPI,
  clearLogs,
  renderStatusFilters,
  filteredLogs,
  setSelectedLogId,
  renderEmptyList,
}) => {
  // State for collapsible search section (collapsed by default)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const styles = createStyles();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.actionsContainer}>
        {/* Network Statistics - Always visible */}
        {networkStats && (
          <NetworkStatsCard networkStats={networkStats} styles={styles} />
        )}

        {/* Always visible controls bar */}
        <ControlsBar
          clearLogs={clearLogs}
          isSearchExpanded={isSearchExpanded}
          onToggleSearch={() => setIsSearchExpanded(!isSearchExpanded)}
          hasSearchValue={searchedAPI.length > 0}
          styles={styles}
        />

        {/* Collapsible Search and Filters */}
        <CollapsibleSearchSection
          isExpanded={isSearchExpanded}
          searchedAPI={searchedAPI}
          setSearchedAPI={setSearchedAPI}
          renderStatusFilters={renderStatusFilters}
          styles={styles}
        />
      </View>

      {/* Network Logs List */}
      <FlatList
        style={[styles.logsContainer, { backgroundColor: '#121212' }]}
        data={filteredLogs}
        renderItem={({ item }) => (
          <LogItem log={item} onPress={setSelectedLogId} />
        )}
        keyExtractor={log => log.id}
        ListEmptyComponent={renderEmptyList as React.ComponentType<any>}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          filteredLogs.length === 0 ? { flex: 1 } : { paddingBottom: 16 }
        }
      />
    </View>
  );
};

export default NetworkLogList;
