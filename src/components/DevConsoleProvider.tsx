import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Platform, BackHandler } from 'react-native';
import { DevConsoleContextType, DevConsoleProviderProps } from '../types';
import { getNetworkLogger } from '../utils/networkLogger';

const DevConsoleContext = createContext<DevConsoleContextType | null>(null);

export const useDevConsole = () => {
  const context = useContext(DevConsoleContext);
  if (!context) {
    throw new Error('useDevConsole must be used within DevConsoleProvider');
  }
  return context;
};

export const DevConsoleProvider: React.FC<DevConsoleProviderProps> = ({
  children,
  enabled = __DEV__,
  enableGestures = true,
  shakeThreshold = 600,
  longPressDelay = 1000,
  doubleTapDelay = 300,
  customActions = [],
  encryptionEnabled = false,
  onDecryptData,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); // Start with Network tab (index 0)
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  // Gesture handling refs
  const lastTapRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastShakeTimeRef = useRef<number>(0);

  const networkLogger = getNetworkLogger();

  // Toggle console visibility
  const toggleConsole = () => {
    setIsVisible(prev => !prev);
  };

  const showConsole = () => setIsVisible(true);
  const hideConsole = () => {
    setIsVisible(false);
    setSelectedLogId(null);
    setSelectedTab(0);
  };

  // Handle back button on Android
  useEffect(() => {
    if (Platform.OS === 'android' && isVisible) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (selectedLogId) {
            setSelectedLogId(null);
            return true;
          } else if (isVisible) {
            hideConsole();
            return true;
          }
          return false;
        },
      );

      return () => backHandler.remove();
    }
  }, [isVisible, selectedLogId]);

  // Shake detection
  useEffect(() => {
    if (!enableGestures || !enabled) return;

    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;

    const handleShake = (acceleration: { x: number; y: number; z: number }) => {
      const currentTime = Date.now();
      if (currentTime - lastShakeTimeRef.current < 1000) return;

      const deltaX = Math.abs(acceleration.x - lastX);
      const deltaY = Math.abs(acceleration.y - lastY);
      const deltaZ = Math.abs(acceleration.z - lastZ);

      if (deltaX + deltaY + deltaZ > shakeThreshold) {
        lastShakeTimeRef.current = currentTime;
        toggleConsole();
      }

      lastX = acceleration.x;
      lastY = acceleration.y;
      lastZ = acceleration.z;
    };

    // Note: In a real implementation, you'd integrate with react-native-sensors
    // For now, we'll skip actual shake detection as it requires additional dependencies

    return () => {
      // Cleanup sensors if implemented
    };
  }, [enableGestures, enabled, shakeThreshold]);

  // Touch gesture handlers
  const handleTouchStart = () => {
    if (!enableGestures || !enabled) return;

    longPressTimerRef.current = setTimeout(() => {
      toggleConsole();
    }, longPressDelay);
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleDoubleTap = () => {
    if (!enableGestures || !enabled) return;

    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - lastTapRef.current;

    if (timeSinceLastTap < doubleTapDelay) {
      toggleConsole();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = currentTime;
    }
  };

  const contextValue: DevConsoleContextType = {
    isVisible,
    selectedTab,
    selectedLogId,
    networkLogger,
    toggleConsole,
    showConsole,
    hideConsole,
    setSelectedTab,
    setSelectedLogId,
    customActions,
    encryptionEnabled,
    onDecryptData,
  };

  return (
    <DevConsoleContext.Provider value={contextValue}>
      {children}
    </DevConsoleContext.Provider>
  );
};
