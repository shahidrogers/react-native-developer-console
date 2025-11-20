import { ThemeConfig } from '../types';
export declare const createStyles: (theme?: ThemeConfig) => {
    container: {
        position: "absolute";
        top: number;
        left: number;
        right: number;
        bottom: number;
        backgroundColor: string;
        zIndex: number;
    };
    headerContainer: {
        paddingTop: number;
        borderBottomWidth: number;
        borderBottomColor: string;
        backgroundColor: string;
        position: "relative";
        overflow: "hidden";
    };
    matrixBackground: {
        position: "absolute";
        top: number;
        right: number;
        bottom: number;
        justifyContent: "center";
        alignItems: "flex-end";
        opacity: number;
        zIndex: number;
    };
    matrixText: {
        color: string;
        fontSize: number;
        fontFamily: string;
        fontWeight: "300";
        letterSpacing: number;
    };
    header: {
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "center";
        paddingVertical: number;
        paddingHorizontal: number;
        zIndex: number;
    };
    terminalHeader: {
        flexDirection: "row";
        alignItems: "center";
    };
    terminalPrompt: {
        color: string;
        fontSize: number;
        fontFamily: string;
        fontWeight: "600";
        marginRight: number;
    };
    headerText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        letterSpacing: number;
        fontFamily: string;
        textShadowColor: string;
        textShadowOffset: {
            width: number;
            height: number;
        };
        textShadowRadius: number;
    };
    cursor: {
        color: string;
        fontSize: number;
        fontWeight: "300";
        opacity: number;
    };
    closeButton: {
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        backgroundColor: string;
        borderWidth: number;
        borderColor: string;
    };
    closeButtonText: {
        color: string;
        fontSize: number;
        fontWeight: "700";
        fontFamily: string;
        letterSpacing: number;
    };
    tabContainer: {
        flexDirection: "row";
        borderBottomWidth: number;
        borderBottomColor: string;
        backgroundColor: string;
    };
    tab: {
        flex: number;
        paddingVertical: number;
        alignItems: "center";
        justifyContent: "center";
    };
    activeTab: {
        borderBottomWidth: number;
        borderBottomColor: string;
        backgroundColor: string;
    };
    tabText: {
        color: string;
        fontSize: number;
        fontWeight: "500";
        letterSpacing: number;
    };
    activeTabText: {
        color: string;
        fontWeight: "600";
    };
    actionsContainer: {
        flexDirection: "column";
        justifyContent: "flex-end";
        padding: number;
        borderBottomWidth: number;
        borderBottomColor: string;
        backgroundColor: string;
    };
    clearButton: {
        backgroundColor: string;
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        minHeight: number;
        alignItems: "center";
        justifyContent: "center";
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    clearButtonText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        letterSpacing: number;
    };
    searchBar: {
        backgroundColor: string;
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        marginTop: number;
        color: string;
        flex: number;
        fontSize: number;
        fontWeight: "500";
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    logsContainer: {
        flex: number;
    };
    logItem: {
        paddingVertical: number;
        paddingHorizontal: number;
        borderBottomWidth: number;
        borderBottomColor: string;
        backgroundColor: string;
        marginHorizontal: number;
        marginVertical: number;
        marginBottom: number;
    };
    logHeader: {
        flexDirection: "row";
        justifyContent: "space-between";
        marginBottom: number;
        alignItems: "center";
    };
    methodContainer: {
        borderRadius: number;
        paddingVertical: number;
        paddingHorizontal: number;
        backgroundColor: string;
    };
    method: {
        fontWeight: "700";
        fontSize: number;
        letterSpacing: number;
    };
    methodGet: {
        color: string;
    };
    methodPost: {
        color: string;
    };
    methodPut: {
        color: string;
    };
    methodDelete: {
        color: string;
    };
    methodPatch: {
        color: string;
    };
    methodOther: {
        color: string;
    };
    statusContainer: {
        borderRadius: number;
        paddingVertical: number;
        paddingHorizontal: number;
        backgroundColor: string;
    };
    status: {
        fontWeight: "700";
        fontSize: number;
        letterSpacing: number;
    };
    successStatus: {
        color: string;
    };
    errorStatus: {
        color: string;
    };
    url: {
        color: string;
        fontSize: number;
        marginBottom: number;
        fontFamily: string;
        lineHeight: number;
        fontWeight: "400";
    };
    logFooter: {
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "center";
        paddingTop: number;
    };
    time: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        fontFamily: string;
    };
    timestamp: {
        color: string;
        fontSize: number;
        fontFamily: string;
        fontWeight: "500";
    };
    viewDetailsText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        letterSpacing: number;
    };
    emptyContainer: {
        alignItems: "center";
        justifyContent: "center";
        paddingTop: number;
        paddingHorizontal: number;
        flex: number;
    };
    emptyText: {
        color: string;
        fontSize: number;
        textAlign: "center";
        marginBottom: number;
        fontWeight: "600";
        letterSpacing: number;
    };
    emptySubtext: {
        color: string;
        fontSize: number;
        textAlign: "center";
        lineHeight: number;
        marginBottom: number;
        opacity: number;
    };
    detailContainerWrapper: {
        flex: number;
        backgroundColor: string;
    };
    detailContainer: {
        flex: number;
        padding: number;
    };
    detailHeader: {
        marginBottom: number;
        backgroundColor: string;
        borderRadius: number;
        padding: number;
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    topBackButtonContainer: {
        marginBottom: number;
        alignSelf: "flex-start";
    };
    topBackButtonText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        letterSpacing: number;
    };
    backButton: {
        marginBottom: number;
    };
    backButtonText: {
        color: string;
        fontSize: number;
    };
    detailTitleContainer: {
        flexDirection: "row";
        alignItems: "flex-start";
        marginBottom: number;
    };
    methodBadge: {};
    methodBadgeText: {
        fontWeight: "700";
        fontSize: number;
        letterSpacing: number;
        textAlign: "center";
        lineHeight: number;
        includeFontPadding: false;
    };
    detailTitle: {
        color: string;
        fontSize: number;
        fontWeight: "500";
        fontFamily: string;
        lineHeight: number;
    };
    detailSection: {
        marginBottom: number;
    };
    sectionTitle: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        letterSpacing: number;
    };
    subsectionTitle: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        letterSpacing: number;
    };
    detailCard: {
        backgroundColor: string;
        borderRadius: number;
        padding: number;
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    errorCard: {
        borderLeftWidth: number;
        borderLeftColor: string;
        backgroundColor: string;
    };
    detailRow: {
        flexDirection: "row";
        marginBottom: number;
        paddingBottom: number;
        borderBottomWidth: number;
        borderBottomColor: string;
    };
    detailLabel: {
        color: string;
        fontSize: number;
        width: number;
        fontWeight: "600";
        marginRight: number;
    };
    detailValue: {
        color: string;
        fontSize: number;
        fontFamily: string;
        lineHeight: number;
    };
    codeScrollContainer: {
        marginVertical: number;
        backgroundColor: string;
        padding: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
    };
    jsonText: {
        color: string;
        fontFamily: string;
        fontSize: number;
        lineHeight: number;
        flexShrink: number;
    };
    errorText: {
        color: string;
    };
    infoCard: {
        backgroundColor: string;
        borderRadius: number;
        margin: number;
        marginBottom: number;
        overflow: "hidden";
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    infoHeader: {
        padding: number;
        backgroundColor: string;
        borderBottomWidth: number;
        borderBottomColor: string;
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "space-between";
    };
    infoHeaderText: {
        color: string;
        fontSize: number;
        fontWeight: "700";
        letterSpacing: number;
    };
    infoHeaderIcon: {
        width: number;
        height: number;
        tintColor: string;
    };
    infoContainer: {
        padding: number;
        borderBottomWidth: number;
        borderBottomColor: string;
        flexDirection: "row";
        alignItems: "flex-start";
        minHeight: number;
    };
    infoLabel: {
        color: string;
        fontSize: number;
        width: number;
        fontWeight: "600";
        marginRight: number;
        paddingTop: number;
    };
    infoValue: {
        color: string;
        fontSize: number;
        flex: number;
        lineHeight: number;
        fontWeight: "400";
    };
    subsectionHeader: {
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "center";
        marginBottom: number;
        paddingBottom: number;
        borderBottomWidth: number;
        borderBottomColor: string;
    };
    copyButton: {
        backgroundColor: string;
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    copyButtonText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        letterSpacing: number;
    };
    actionButton: {
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "center";
        minWidth: number;
        backgroundColor: string;
        borderWidth: number;
        borderColor: string;
        margin: number;
        marginBottom: number;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    actionButtonText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        textAlign: "center";
        letterSpacing: number;
    };
    actionButtonTextDanger: {
        color: string;
        fontSize: number;
        fontWeight: "700";
        letterSpacing: number;
    };
    actionButtonPrimary: {
        backgroundColor: string;
        borderColor: string;
    };
    actionButtonPrimaryText: {
        color: string;
    };
    actionButtonDanger: {
        backgroundColor: string;
        borderColor: string;
    };
    storageKeyText: {
        color: string;
        fontSize: number;
        fontFamily: string;
        backgroundColor: string;
        padding: number;
        borderRadius: number;
        marginVertical: number;
        borderLeftWidth: number;
        borderLeftColor: string;
    };
    storageKeysContainer: {
        maxHeight: number;
        paddingHorizontal: number;
        paddingBottom: number;
    };
    infoValueHighlight: {
        color: string;
        fontWeight: "600";
    };
    infoValueSuccess: {
        color: string;
        fontWeight: "600";
    };
    infoValueWarning: {
        color: string;
        fontWeight: "600";
    };
    infoValueError: {
        color: string;
        fontWeight: "600";
    };
    emptyStateContainer: {
        alignItems: "center";
        justifyContent: "center";
        padding: number;
    };
    emptyStateIcon: {
        fontSize: number;
        color: string;
        marginBottom: number;
    };
    emptyStateText: {
        color: string;
        fontSize: number;
        textAlign: "center";
        marginBottom: number;
        fontWeight: "500";
    };
    statsContainer: {
        backgroundColor: string;
        paddingVertical: number;
        borderBottomWidth: number;
        borderBottomColor: string;
        borderRadius: number;
        marginBottom: number;
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    statsRow: {
        flexDirection: "row";
        paddingHorizontal: number;
        alignItems: "center";
        justifyContent: "space-evenly";
        minHeight: number;
    };
    statItem: {
        alignItems: "center";
        justifyContent: "center";
        paddingHorizontal: number;
        minWidth: number;
        height: number;
    };
    statValue: {
        color: string;
        fontSize: number;
        fontWeight: "700";
        fontFamily: string;
        marginBottom: number;
        textAlign: "center";
        lineHeight: number;
    };
    statLabel: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        textTransform: "uppercase";
        letterSpacing: number;
        textAlign: "center";
        lineHeight: number;
    };
    statDivider: {
        width: number;
        height: number;
        backgroundColor: string;
        alignSelf: "center";
    };
    successText: {
        color: string;
    };
    repeatRequestButton: {
        backgroundColor: string;
        padding: number;
        borderRadius: number;
        alignItems: "center";
        marginTop: number;
    };
    repeatRequestButtonDisabled: {
        backgroundColor: string;
    };
    repeatRequestButtonText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
    };
    statusFilterContainer: {
        flexDirection: "row";
        marginTop: number;
        paddingHorizontal: number;
        flexWrap: "wrap";
        gap: number;
    };
    statusFilterButton: {
        backgroundColor: string;
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    statusFilterButtonActive: {
        backgroundColor: string;
        borderColor: string;
        shadowOpacity: number;
    };
    statusFilterText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        letterSpacing: number;
    };
    statusFilterTextActive: {
        color: string;
        fontWeight: "700";
    };
    urlContainer: {
        flex: number;
        backgroundColor: string;
        padding: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        marginBottom: number;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    copyUrlHint: {
        color: string;
        fontSize: number;
        marginTop: number;
        opacity: number;
        fontWeight: "500";
    };
    summaryActions: {
        flexDirection: "row";
        justifyContent: "center";
    };
    repeatButton: {
        backgroundColor: string;
        borderColor: string;
    };
    floatingControls: {
        position: "absolute";
        bottom: number;
        right: number;
        flexDirection: "row";
        gap: number;
    };
    floatingBackButton: {
        backgroundColor: string;
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    floatingBackButtonText: {
        color: string;
        fontWeight: "600";
        fontSize: number;
        letterSpacing: number;
    };
    floatingScrollTopButton: {
        backgroundColor: string;
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    floatingScrollTopButtonText: {
        color: string;
        fontWeight: "600";
        fontSize: number;
        letterSpacing: number;
    };
    collapsibleHeader: {
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "center";
        padding: number;
        backgroundColor: string;
        borderBottomWidth: number;
        borderBottomColor: string;
        borderRadius: number;
        marginBottom: number;
        borderWidth: number;
        borderColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    expandIcon: {
        color: string;
        fontSize: number;
        fontWeight: "700";
        minWidth: number;
        textAlign: "center";
    };
    collapsibleContent: {
        padding: number;
        backgroundColor: string;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        marginBottom: number;
    };
    statusRow: {
        flexDirection: "row";
        alignItems: "center";
        marginBottom: number;
        gap: number;
        flexWrap: "wrap";
    };
    statusRowBadge: {
        backgroundColor: string;
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        height: number;
        justifyContent: "center";
        alignItems: "center";
    };
    statusText: {
        fontSize: number;
        fontWeight: "700";
        fontFamily: string;
        textAlign: "center";
        lineHeight: number;
        includeFontPadding: false;
    };
    timeText: {
        fontSize: number;
        color: string;
        fontFamily: string;
        fontWeight: "500";
        textAlign: "center";
        lineHeight: number;
        includeFontPadding: false;
    };
    durationText: {
        fontSize: number;
        color: string;
        fontFamily: string;
        fontWeight: "600";
        textAlign: "center";
        lineHeight: number;
        includeFontPadding: false;
    };
    controlsBar: {
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "center";
        paddingVertical: number;
        marginBottom: number;
    };
    controlButton: {
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        backgroundColor: string;
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "center";
        minHeight: number;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    searchToggleButton: {
        flex: number;
        marginRight: number;
        justifyContent: "flex-start";
        paddingLeft: number;
        position: "relative";
    };
    controlButtonText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        letterSpacing: number;
    };
    activeIndicator: {
        position: "absolute";
        top: number;
        right: number;
        width: number;
        height: number;
        borderRadius: number;
        backgroundColor: string;
    };
    searchSection: {
        flexDirection: "row";
        alignItems: "center";
        backgroundColor: string;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        marginBottom: number;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    searchInput: {
        flex: number;
        paddingVertical: number;
        paddingHorizontal: number;
        color: string;
        fontSize: number;
        fontWeight: "400";
    };
    clearSearchButton: {
        padding: number;
        marginRight: number;
        backgroundColor: string;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
    };
    clearSearchText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
    };
    headerTitle: {
        color: string;
        fontSize: number;
        fontWeight: "700";
        letterSpacing: number;
    };
    tabBadge: {
        color: string;
        fontSize: number;
    };
    content: {
        flex: number;
        backgroundColor: string;
    };
    generalContainer: {
        flex: number;
        padding: number;
    };
    statusFilterChip: {
        paddingHorizontal: number;
        paddingVertical: number;
        borderRadius: number;
        backgroundColor: string;
        borderWidth: number;
        borderColor: string;
        marginRight: number;
    };
    statusFilterChipActive: {
        backgroundColor: string;
        borderColor: string;
    };
    statusFilterChipText: {
        color: string;
        fontSize: number;
        fontWeight: "600";
    };
    statusFilterChipTextActive: {
        color: string;
    };
    emptySubText: {
        color: string;
        fontSize: number;
        textAlign: "center";
        marginTop: number;
    };
    infoRow: {
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "center";
        paddingVertical: number;
        borderBottomWidth: number;
        borderBottomColor: string;
    };
    infoSection: {
        backgroundColor: string;
        borderRadius: number;
        padding: number;
        marginBottom: number;
        borderWidth: number;
        borderColor: string;
    };
};
export default createStyles;
