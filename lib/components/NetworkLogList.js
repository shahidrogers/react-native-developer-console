import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList, } from 'react-native';
import { createStyles } from '../constants/styles';
import LogItem from './LogItem';
// Enhanced stats display component
const NetworkStatsCard = ({ networkStats, styles, }) => (_jsx(ScrollView, Object.assign({ horizontal: true, showsHorizontalScrollIndicator: false, style: styles.statsContainer }, { children: _jsxs(View, Object.assign({ style: styles.statsRow }, { children: [_jsxs(View, Object.assign({ style: styles.statItem }, { children: [_jsx(Text, Object.assign({ style: styles.statValue }, { children: networkStats.totalRequests })), _jsx(Text, Object.assign({ style: styles.statLabel }, { children: "Total" }))] })), _jsx(View, { style: styles.statDivider }), _jsxs(View, Object.assign({ style: styles.statItem }, { children: [_jsx(Text, Object.assign({ style: [
                            styles.statValue,
                            networkStats.pendingRequests > 0
                                ? styles.infoValueWarning
                                : { color: '#888' },
                        ] }, { children: networkStats.pendingRequests })), _jsx(Text, Object.assign({ style: styles.statLabel }, { children: "Pending" }))] })), _jsx(View, { style: styles.statDivider }), _jsxs(View, Object.assign({ style: styles.statItem }, { children: [_jsxs(Text, Object.assign({ style: [
                            styles.statValue,
                            networkStats.failedRequests > 0
                                ? styles.errorText
                                : styles.successText,
                        ] }, { children: [networkStats.successRate, "%"] })), _jsx(Text, Object.assign({ style: styles.statLabel }, { children: "Success" }))] })), _jsx(View, { style: styles.statDivider }), _jsxs(View, Object.assign({ style: styles.statItem }, { children: [_jsxs(Text, Object.assign({ style: [
                            styles.statValue,
                            networkStats.averageResponseTime > 1000
                                ? styles.infoValueWarning
                                : networkStats.averageResponseTime > 2000
                                    ? styles.infoValueError
                                    : networkStats.averageResponseTime < 500
                                        ? styles.infoValueSuccess
                                        : undefined,
                        ] }, { children: [networkStats.averageResponseTime, "ms"] })), _jsx(Text, Object.assign({ style: styles.statLabel }, { children: "Avg Time" }))] })), _jsx(View, { style: styles.statDivider }), _jsxs(View, Object.assign({ style: styles.statItem }, { children: [_jsx(Text, Object.assign({ style: [
                            styles.statValue,
                            networkStats.failedRequests > 0
                                ? styles.errorText
                                : styles.successText,
                        ] }, { children: networkStats.failedRequests })), _jsx(Text, Object.assign({ style: styles.statLabel }, { children: "Failed" }))] }))] })) })));
// Always visible controls bar
const ControlsBar = ({ clearLogs, isSearchExpanded, onToggleSearch, hasSearchValue, styles, }) => (_jsxs(View, Object.assign({ style: styles.controlsBar }, { children: [_jsxs(TouchableOpacity, Object.assign({ style: [styles.controlButton, styles.searchToggleButton], onPress: onToggleSearch }, { children: [_jsxs(Text, Object.assign({ style: styles.controlButtonText }, { children: [isSearchExpanded ? '▼' : '▶', " search / filter"] })), hasSearchValue && _jsx(View, { style: styles.activeIndicator })] })), _jsx(TouchableOpacity, Object.assign({ style: [styles.controlButton, styles.clearButton], onPress: clearLogs }, { children: _jsx(Text, Object.assign({ style: styles.clearButtonText }, { children: "[clear all]" })) }))] })));
// Search input section
const SearchSection = ({ searchedAPI, setSearchedAPI, styles }) => (_jsxs(View, Object.assign({ style: styles.searchSection }, { children: [_jsx(TextInput, { autoCapitalize: "none", autoCorrect: false, style: styles.searchInput, placeholder: "search api url or endpoint...", placeholderTextColor: '#888', value: searchedAPI, onChangeText: setSearchedAPI }), searchedAPI.length > 0 && (_jsx(TouchableOpacity, Object.assign({ style: styles.clearSearchButton, onPress: () => setSearchedAPI('') }, { children: _jsx(Text, Object.assign({ style: styles.clearSearchText }, { children: "\u2715" })) })))] })));
// Collapsible search and filters section
const CollapsibleSearchSection = ({ isExpanded, searchedAPI, setSearchedAPI, renderStatusFilters, styles, }) => {
    if (!isExpanded)
        return null;
    return (_jsxs(View, Object.assign({ style: styles.collapsibleContent }, { children: [_jsx(SearchSection, { searchedAPI: searchedAPI, setSearchedAPI: setSearchedAPI, styles: styles }), _jsx(View, Object.assign({ style: styles.statusFilterContainer }, { children: renderStatusFilters() }))] })));
};
const NetworkLogList = ({ networkStats, searchedAPI, setSearchedAPI, clearLogs, renderStatusFilters, filteredLogs, setSelectedLogId, renderEmptyList, }) => {
    // State for collapsible search section (collapsed by default)
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const styles = createStyles();
    return (_jsxs(View, Object.assign({ style: { flex: 1 } }, { children: [_jsxs(View, Object.assign({ style: styles.actionsContainer }, { children: [networkStats && (_jsx(NetworkStatsCard, { networkStats: networkStats, styles: styles })), _jsx(ControlsBar, { clearLogs: clearLogs, isSearchExpanded: isSearchExpanded, onToggleSearch: () => setIsSearchExpanded(!isSearchExpanded), hasSearchValue: searchedAPI.length > 0, styles: styles }), _jsx(CollapsibleSearchSection, { isExpanded: isSearchExpanded, searchedAPI: searchedAPI, setSearchedAPI: setSearchedAPI, renderStatusFilters: renderStatusFilters, styles: styles })] })), _jsx(FlatList, { style: [styles.logsContainer, { backgroundColor: '#121212' }], data: filteredLogs, renderItem: ({ item }) => (_jsx(LogItem, { log: item, onPress: setSelectedLogId })), keyExtractor: log => log.id, ListEmptyComponent: renderEmptyList, initialNumToRender: 10, maxToRenderPerBatch: 10, windowSize: 10, showsVerticalScrollIndicator: false, contentContainerStyle: filteredLogs.length === 0 ? { flex: 1 } : { paddingBottom: 16 } })] })));
};
export default NetworkLogList;
