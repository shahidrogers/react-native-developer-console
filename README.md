# React Native Developer Console

A powerful, universal developer console for React Native applications with network logging, device information, and customizable debugging tools.

## Features

- 🔍 **Network Request Logging**: Automatic interception and logging of all network requests
- 📱 **Device Information**: Comprehensive device and app information display
- 🎨 **Customizable Theme**: Full theme customization support
- 🔧 **Custom Actions**: Add your own debug actions and tools
- 📊 **Network Statistics**: Real-time network performance metrics
- 🔁 **Request Repeating**: Easily repeat failed or successful requests
- 📋 **Clipboard Support**: Copy request/response data to clipboard
- 🔒 **Production Safe**: Built-in environment controls and gating
- 🎯 **Multi-Client Support**: Works with Axios, Fetch, and React Query

## Installation

```bash
npm install react-native-developer-console
# or
yarn add react-native-developer-console
```

## Quick Start

```tsx
import React from 'react';
import {
  DevConsoleProvider,
  DeveloperConsole,
} from 'react-native-developer-console';

function App() {
  return (
    <DevConsoleProvider>
      <YourApp />
      <DeveloperConsole />
    </DevConsoleProvider>
  );
}
```

## Network Logging Setup

### Automatic Setup (Recommended)

```tsx
import { setupNetworkLogging } from 'react-native-developer-console';

// Setup for different HTTP clients
setupNetworkLogging({
  axios: { instance: axiosInstance },
  fetch: { enabled: true },
  reactQuery: { enabled: true },
});
```

### Manual Setup

```tsx
import { getNetworkLogger } from 'react-native-developer-console';

// Get the logger instance
const logger = getNetworkLogger();

// Subscribe to logs
const unsubscribe = logger.subscribe(logs => {
  console.log('Network logs updated:', logs);
});

// Clear logs
logger.clearLogs();

// Get stats
const stats = logger.getNetworkStats();
```

## Configuration

### DevConsoleProvider Props

```tsx
<DevConsoleProvider
  enabled={__DEV__}                    // Enable/disable console
  enableGestures={true}               // Enable shake/double-tap gestures
  shakeThreshold={600}                // Shake detection threshold
  longPressDelay={1000}               // Long press delay in ms
  doubleTapDelay={300}                // Double tap delay in ms
  customActions={[                    // Custom debug actions
    {
      title: 'Reset User Data',
      onPress: () => console.log('Reset user data'),
    },
  ]}
>
```

### Theme Customization

```tsx
import { DevConsoleProvider } from 'react-native-developer-console';

const customTheme = {
  primary: '#00ff88',
  background: '#121212',
  surface: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#888888',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  border: '#2a2a2a',
};

<DevConsoleProvider theme={customTheme}>{/* Your app */}</DevConsoleProvider>;
```

## Usage Examples

### Network Monitoring

```tsx
import { useNetworkLogger } from 'react-native-developer-console';

function NetworkMonitor() {
  const { logs, filteredLogs, networkStats, clearLogs } = useNetworkLogger();

  return (
    <View>
      <Text>Total Requests: {networkStats?.totalRequests}</Text>
      <Text>Success Rate: {networkStats?.successRate}</Text>
      <Text>Avg Response Time: {networkStats?.averageResponseTime}ms</Text>

      <Button title="Clear Logs" onPress={clearLogs} />
    </View>
  );
}
```

### Custom Debug Actions

```tsx
const customActions = [
  {
    title: 'Clear Cache',
    onPress: async () => {
      await AsyncStorage.clear();
      alert('Cache cleared!');
    },
  },
  {
    title: 'Toggle Debug Mode',
    onPress: () => {
      // Your debug logic
    },
  },
  {
    title: 'Export Logs',
    onPress: () => {
      const logs = getNetworkLogs();
      shareLogs(logs);
    },
  },
];

<DevConsoleProvider customActions={customActions}>
  {/* Your app */}
</DevConsoleProvider>;
```

### Manual Console Control

```tsx
import { useDevConsole } from 'react-native-developer-console';

function DebugButton() {
  const { showConsole, hideConsole, toggleConsole } = useDevConsole();

  return (
    <View>
      <Button title="Show Console" onPress={showConsole} />
      <Button title="Hide Console" onPress={hideConsole} />
      <Button title="Toggle Console" onPress={toggleConsole} />
    </View>
  );
}
```

## API Reference

### Components

- **`DevConsoleProvider`**: Context provider for the developer console
- **`DeveloperConsole`**: Main console component with tabs and interface
- **`NetworkLogList`**: List of network requests with filtering
- **`NetworkLogDetail`**: Detailed view of individual network requests
- **`GeneralInfoPanel`**: Device and app information panel

### Hooks

- **`useNetworkLogger()`**: Access network logs and statistics
- **`useDevConsole()`**: Control console visibility and state

### Utilities

- **`getNetworkLogger()`**: Get the network logger instance
- **`setupNetworkLogging()`**: Setup automatic network interception
- **`subscribeToNetworkLogs()`**: Subscribe to log updates
- **`clearNetworkLogs()`**: Clear all network logs
- **`getNetworkLogs()`**: Get current network logs
- **`repeatNetworkRequest()`**: Repeat a network request
- **`getNetworkStats()`**: Get network statistics

## Types

```tsx
interface NetworkRequest {
  id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
  startTime: number;
}

interface NetworkResponse extends NetworkRequest {
  status: number;
  response?: any;
  error?: string;
  endTime: number;
  duration: number;
  isRepeated?: boolean;
}

interface NetworkStats {
  totalRequests: number;
  completedRequests: number;
  successRate: string;
  averageResponseTime: number;
  failedRequests: number;
  pendingRequests: number;
}

interface CustomAction {
  title: string;
  onPress: () => void;
}
```

## Environment Controls

The console automatically disables in production builds, but you can control this manually:

```tsx
<DevConsoleProvider
  enabled={process.env.NODE_ENV === 'development'}
  environment={__DEV__ ? 'development' : 'production'}
>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or issues, please open an issue on GitHub.
