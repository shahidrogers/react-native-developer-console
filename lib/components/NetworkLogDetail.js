import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { createStyles } from '../constants/styles';
import { getMethodStyle, copyToClipboard, formatTimestamp, formatDate, } from '../utils';
const CollapsibleSection = ({ title, isOpen = false, children, icon, }) => {
    const [expanded, setExpanded] = useState(isOpen);
    const styles = createStyles();
    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    return (_jsxs(View, Object.assign({ style: styles.detailSection }, { children: [_jsxs(TouchableOpacity, Object.assign({ style: styles.collapsibleHeader, onPress: toggleExpand }, { children: [_jsxs(Text, Object.assign({ style: styles.sectionTitle }, { children: [icon && `${icon} `, title] })), _jsx(Text, Object.assign({ style: styles.expandIcon }, { children: expanded ? '▼' : '▶' }))] })), expanded && _jsx(View, Object.assign({ style: styles.collapsibleContent }, { children: children }))] })));
};
const NetworkLogDetail = ({ selectedLog, onBack, isRepeatingRequest, handleRepeatRequest, encryptionEnabled = false, onDecryptData, }) => {
    const [copiedRequestFeedback, setCopiedRequestFeedback] = useState(false);
    const [copiedResponseFeedback, setCopiedResponseFeedback] = useState(false);
    const [copiedSummaryFeedback, setCopiedSummaryFeedback] = useState(false);
    const [copiedUrlFeedback, setCopiedUrlFeedback] = useState(false);
    const scrollViewRef = useRef(null);
    const styles = createStyles();
    if (!selectedLog)
        return null;
    const handleCopyUrl = async () => {
        const success = await copyToClipboard(selectedLog.url);
        if (success) {
            setCopiedUrlFeedback(true);
            setTimeout(() => setCopiedUrlFeedback(false), 2000);
        }
    };
    const handleCopySummary = async () => {
        try {
            const summary = {
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
        }
        catch (error) {
            console.error('Error copying summary:', error);
            Alert.alert('Error', 'Failed to copy summary. See console for details.');
        }
    };
    const handleCopyRequest = async (text) => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopiedRequestFeedback(true);
            setTimeout(() => setCopiedRequestFeedback(false), 2000);
        }
    };
    const handleCopyResponse = async (text) => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopiedResponseFeedback(true);
            setTimeout(() => setCopiedResponseFeedback(false), 2000);
        }
    };
    const decryptData = (data) => {
        if (!encryptionEnabled || !onDecryptData) {
            return data;
        }
        try {
            if (typeof data === 'string') {
                const decrypted = onDecryptData(data);
                // Try to parse as JSON if it looks like JSON
                if (typeof decrypted === 'string' &&
                    (decrypted.startsWith('{') || decrypted.startsWith('['))) {
                    try {
                        return JSON.parse(decrypted);
                    }
                    catch (_a) {
                        return decrypted;
                    }
                }
                return decrypted;
            }
            return data;
        }
        catch (error) {
            console.warn('Decryption failed:', error);
            return '[Decryption failed]';
        }
    };
    return (_jsxs(View, Object.assign({ style: styles.detailContainerWrapper }, { children: [_jsxs(ScrollView, Object.assign({ ref: scrollViewRef, style: styles.detailContainer }, { children: [_jsx(TouchableOpacity, Object.assign({ onPress: onBack, style: styles.topBackButtonContainer }, { children: _jsx(Text, Object.assign({ style: styles.topBackButtonText }, { children: "\u2190 Back to Logs" })) })), _jsxs(View, Object.assign({ style: styles.detailHeader }, { children: [_jsxs(View, Object.assign({ style: styles.statusRow }, { children: [_jsx(View, Object.assign({ style: [styles.statusRowBadge, styles.methodBadge] }, { children: _jsx(Text, Object.assign({ style: [
                                                styles.methodBadgeText,
                                                getMethodStyle(selectedLog.method, styles),
                                            ] }, { children: selectedLog.method })) })), _jsx(View, Object.assign({ style: styles.statusRowBadge }, { children: _jsx(Text, Object.assign({ style: [
                                                styles.statusText,
                                                selectedLog.status < 300 && selectedLog.status >= 200
                                                    ? styles.successStatus
                                                    : styles.errorStatus,
                                            ] }, { children: selectedLog.status || 'Pending' })) })), _jsx(View, Object.assign({ style: styles.statusRowBadge }, { children: _jsx(Text, Object.assign({ style: styles.timeText }, { children: selectedLog.startTime
                                                ? formatTimestamp(selectedLog.startTime)
                                                : 'Unknown' })) })), _jsx(View, Object.assign({ style: styles.statusRowBadge }, { children: _jsx(Text, Object.assign({ style: styles.durationText }, { children: selectedLog.duration ? `${selectedLog.duration}ms` : 'Pending' })) }))] })), _jsxs(TouchableOpacity, Object.assign({ onPress: handleCopyUrl, style: styles.urlContainer }, { children: [_jsx(Text, Object.assign({ style: styles.detailTitle, numberOfLines: 3 }, { children: selectedLog.url })), _jsx(Text, Object.assign({ style: styles.copyUrlHint }, { children: copiedUrlFeedback ? '✓ URL Copied!' : 'Tap to copy URL' }))] })), _jsxs(View, Object.assign({ style: styles.summaryActions }, { children: [_jsx(TouchableOpacity, Object.assign({ style: [styles.actionButton, styles.repeatButton], onPress: handleCopySummary }, { children: _jsx(Text, Object.assign({ style: styles.actionButtonText }, { children: copiedSummaryFeedback ? '✓ Copied!' : '📋 Copy Summary' })) })), _jsx(TouchableOpacity, Object.assign({ style: [
                                            styles.actionButton,
                                            styles.repeatButton,
                                            isRepeatingRequest && styles.repeatRequestButtonDisabled,
                                        ], onPress: () => handleRepeatRequest(selectedLog), disabled: isRepeatingRequest }, { children: _jsx(Text, Object.assign({ style: styles.actionButtonText }, { children: isRepeatingRequest ? '🔄 Repeating...' : '🔄 Repeat' })) }))] }))] })), _jsx(CollapsibleSection, Object.assign({ title: "Headers", icon: "\uD83D\uDCCB" }, { children: _jsxs(View, Object.assign({ style: styles.detailCard }, { children: [Object.entries(selectedLog.headers || {}).map(([key, value]) => (_jsxs(View, Object.assign({ style: styles.detailRow }, { children: [_jsxs(Text, Object.assign({ style: styles.detailLabel }, { children: [key, ":"] })), _jsx(TouchableOpacity, Object.assign({ style: { flex: 1 }, onPress: () => handleCopyRequest(String(value)) }, { children: _jsx(Text, Object.assign({ style: styles.detailValue }, { children: typeof value === 'object'
                                                    ? JSON.stringify(value)
                                                    : String(value) })) }))] }), key))), Object.keys(selectedLog.headers || {}).length === 0 && (_jsx(View, Object.assign({ style: styles.emptyStateContainer }, { children: _jsx(Text, Object.assign({ style: styles.emptyStateText }, { children: "No headers available" })) })))] })) })), selectedLog.body && (_jsx(CollapsibleSection, Object.assign({ title: "Request", icon: "\uD83D\uDCE4", isOpen: true }, { children: _jsxs(View, Object.assign({ style: styles.detailCard }, { children: [_jsxs(View, Object.assign({ style: styles.subsectionHeader }, { children: [_jsx(Text, Object.assign({ style: styles.subsectionTitle }, { children: "Request Body" })), _jsx(TouchableOpacity, Object.assign({ style: styles.copyButton, onPress: () => {
                                                const decryptedBody = decryptData(selectedLog.body);
                                                handleCopyRequest(typeof decryptedBody === 'string'
                                                    ? decryptedBody
                                                    : JSON.stringify(decryptedBody, null, 2));
                                            } }, { children: _jsx(Text, Object.assign({ style: styles.copyButtonText }, { children: copiedRequestFeedback ? '✓ Copied!' : 'Copy' })) }))] })), _jsx(ScrollView, Object.assign({ horizontal: true, style: styles.codeScrollContainer }, { children: _jsx(Text, Object.assign({ style: styles.jsonText }, { children: (() => {
                                            const decryptedBody = decryptData(selectedLog.body);
                                            return typeof decryptedBody === 'string'
                                                ? decryptedBody
                                                : JSON.stringify(decryptedBody, null, 2);
                                        })() })) }))] })) }))), selectedLog.response && (_jsx(CollapsibleSection, Object.assign({ title: "Response", icon: "\uD83D\uDCE5", isOpen: true }, { children: _jsxs(View, Object.assign({ style: styles.detailCard }, { children: [_jsxs(View, Object.assign({ style: styles.subsectionHeader }, { children: [_jsx(Text, Object.assign({ style: styles.subsectionTitle }, { children: "Response Body" })), _jsx(TouchableOpacity, Object.assign({ style: styles.copyButton, onPress: () => {
                                                const decryptedResponse = decryptData(selectedLog.response);
                                                handleCopyResponse(typeof decryptedResponse === 'string'
                                                    ? decryptedResponse
                                                    : JSON.stringify(decryptedResponse, null, 2));
                                            } }, { children: _jsx(Text, Object.assign({ style: styles.copyButtonText }, { children: copiedResponseFeedback ? '✓ Copied!' : 'Copy' })) }))] })), _jsx(ScrollView, Object.assign({ horizontal: true, style: styles.codeScrollContainer }, { children: _jsx(Text, Object.assign({ style: styles.jsonText }, { children: (() => {
                                            const decryptedResponse = decryptData(selectedLog.response);
                                            return typeof decryptedResponse === 'string'
                                                ? decryptedResponse
                                                : JSON.stringify(decryptedResponse, null, 2);
                                        })() })) }))] })) }))), selectedLog.error && (_jsx(CollapsibleSection, Object.assign({ title: "Error", icon: "\u274C", isOpen: true }, { children: _jsx(View, Object.assign({ style: [styles.detailCard, styles.errorCard] }, { children: _jsx(ScrollView, Object.assign({ horizontal: true, style: styles.codeScrollContainer }, { children: _jsx(Text, Object.assign({ style: [styles.jsonText, styles.errorText] }, { children: selectedLog.error })) })) })) })))] })), _jsxs(View, Object.assign({ style: styles.floatingControls }, { children: [_jsx(TouchableOpacity, Object.assign({ style: styles.floatingBackButton, onPress: onBack }, { children: _jsx(Text, Object.assign({ style: styles.floatingBackButtonText }, { children: "\u2190 Back" })) })), _jsx(TouchableOpacity, Object.assign({ style: styles.floatingScrollTopButton, onPress: () => { var _a; return (_a = scrollViewRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ y: 0, animated: true }); } }, { children: _jsx(Text, Object.assign({ style: styles.floatingScrollTopButtonText }, { children: "\u2191 Top" })) }))] }))] })));
};
export default NetworkLogDetail;
