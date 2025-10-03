import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from '../constants/styles';
import { getMethodStyle, getStatusIndicator, getDurationColor, formatTimestamp, } from '../utils';
const LogItem = ({ log, onPress }) => {
    const styles = createStyles();
    const statusIndicator = getStatusIndicator(log.status);
    const durationColor = getDurationColor(log.duration);
    return (_jsxs(TouchableOpacity, Object.assign({ style: styles.logItem, onPress: () => onPress(log.id) }, { children: [_jsxs(View, Object.assign({ style: styles.logHeader }, { children: [_jsx(View, Object.assign({ style: styles.methodContainer }, { children: _jsx(Text, Object.assign({ style: [styles.method, getMethodStyle(log.method, styles)] }, { children: log.method })) })), _jsx(View, Object.assign({ style: styles.statusContainer }, { children: _jsxs(Text, Object.assign({ style: [
                                styles.status,
                                log.status < 300 && log.status >= 200
                                    ? styles.successStatus
                                    : styles.errorStatus,
                            ] }, { children: [statusIndicator, " ", log.status || 'Pending'] })) }))] })), _jsx(Text, Object.assign({ style: styles.url, numberOfLines: 2, ellipsizeMode: "tail" }, { children: log.url })), _jsxs(View, Object.assign({ style: styles.logFooter }, { children: [_jsx(Text, Object.assign({ style: [styles.time, { color: durationColor }] }, { children: log.duration ? `⚡ ${log.duration}ms` : '⏳ Pending...' })), _jsx(Text, Object.assign({ style: styles.timestamp }, { children: log.startTime ? formatTimestamp(log.startTime) : '' })), _jsx(Text, Object.assign({ style: styles.viewDetailsText }, { children: "more \u2192" }))] }))] })));
};
export default LogItem;
