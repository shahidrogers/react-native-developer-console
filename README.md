# React Native Developer Console

_A powerful, universal developer console for React Native applications with network logging, device information, and customizable debugging tools. Built primarily for **Axios** with support for alternative HTTP clients and **encryption/decryption** capabilities._

## Table of Contents

- [✨ Features](#-features)
- [🚀 Installation](#-installation)
- [⚡ Quick Start](#-quick-start)
- [📡 Network Logging Setup](#-network-logging-setup)
  - [Automatic Setup (Recommended)](#automatic-setup-recommended)
  - [Manual Setup](#manual-setup)
- [⚙️ Configuration](#️-configuration)
  - [DevConsoleProvider Props](#devconsoleprovider-props)
  - [Theme Customization](#theme-customization)
- [💡 Usage Examples](#-usage-examples)
  - [Network Monitoring](#network-monitoring)
  - [Custom Debug Actions](#custom-debug-actions)
  - [Manual Console Control](#manual-console-control)
  - [Encryption/Decryption Support](#encryptiondecryption-support)
- [📚 API Reference](#-api-reference)
  - [Components](#components)
  - [Hooks](#hooks)
  - [Utilities](#utilities)
- [🔧 TypeScript Types](#-typescript-types)
- [🔒 Environment Controls](#-environment-controls)
- [📋 Changelog](#-changelog)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [💬 Support](#-support)

---

## ✨ Features

- 🔍 **Network Request Logging**: Automatic interception and logging of all network requests
- 📱 **Device Information**: Comprehensive device and app information display
- 🎨 **Customizable Theme**: Full theme customization support
- 🔧 **Custom Actions**: Add your own debug actions and tools
- 📊 **Network Statistics**: Real-time network performance metrics
- 🔁 **Request Repeating**: Easily repeat failed or successful requests
- 📋 **Clipboard Support**: Copy request/response data to clipboard
- 🔒 **Production Safe**: Built-in environment controls and gating
- 🔐 **Encryption Support**: Decrypt request/response bodies with custom decryption functions
- 🎯 **Multi-Client Support**: **Primary support for Axios** with alternatives for Fetch and React Query

## 🚀 Installation

Get started with a single command:

```bash
npm install react-native-developer-console
# or
yarn add react-native-developer-console
```

## ⚡ Quick Start

Get up and running in minutes with these simple steps:

### Step 1: Install the Package

```bash
npm install react-native-developer-console axios
# or
yarn add react-native-developer-console axios
```

### Step 2: Modify Your App Entry File

**File: `App.tsx` or `index.js`**

```tsx
import React from 'react';
import axios from 'axios';
import {
  DevConsoleProvider,
  DeveloperConsole,
  setupNetworkLogging,
} from 'react-native-developer-console';

// Create your Axios instance (if you don't have one)
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Your API base URL
  timeout: 10000,
});

// Setup network logging - DO THIS ONCE at app startup
setupNetworkLogging({
  axios: { instance: axiosInstance },
});

function App() {
  return (
    <DevConsoleProvider>
      <YourApp />
      <DeveloperConsole />
    </DevConsoleProvider>
  );
}

export default App;
```

### Step 3: Use Your Axios Instance

**File: Anywhere you make API calls**

```tsx
import axiosInstance from './api/axios'; // Import your configured instance

// Make API calls as usual - they'll be automatically logged
const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
  }
};
```

### Step 4: Access the Console

- **Shake your device** (or use gestures) to open the console
- Check the **Network tab** to see all your API calls
- View detailed request/response information

> **🎯 That's it!** Your network requests are now being logged automatically.

## 📡 Network Logging Setup

The Developer Console is **primarily designed for Axios** but provides flexible setup options for different HTTP clients.

---

### 🔥 Option 1: Axios Setup (Recommended)

**Best for:** Most applications, full feature support, automatic interception

#### File: `src/api/axios.ts` (Create this file)

```tsx
import axios from 'axios';
import { setupNetworkLogging } from 'react-native-developer-console';

// Create and configure your Axios instance
export const axiosInstance = axios.create({
  baseURL: __DEV__ ? 'https://api-dev.example.com' : 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup network logging - CALL THIS ONCE
setupNetworkLogging({
  axios: {
    instance: axiosInstance,
    enableRequestLogging: true, // Log outgoing requests
    enableResponseLogging: true, // Log incoming responses
  },
});

export default axiosInstance;
```

#### File: `App.tsx` (Import and use)

```tsx
import React from 'react';
import {
  DevConsoleProvider,
  DeveloperConsole,
} from 'react-native-developer-console';
// Import your configured axios instance
import './src/api/axios'; // This runs the setup

function App() {
  return (
    <DevConsoleProvider>
      <YourApp />
      <DeveloperConsole />
    </DevConsoleProvider>
  );
}
```

#### File: Any service file (Use the instance)

```tsx
import axiosInstance from '../api/axios';

export const userService = {
  getUsers: () => axiosInstance.get('/users'),
  createUser: data => axiosInstance.post('/users', data),
};
```

---

### 🌐 Option 2: Fetch Setup (Basic Support)

**Best for:** Simple apps, minimal dependencies, basic logging only

#### File: `src/api/fetch-setup.ts` (Create this file)

```tsx
import { setupNetworkLogging } from 'react-native-developer-console';

// Setup fetch logging
setupNetworkLogging({
  fetch: {
    enabled: true,
    // Note: Fetch provides basic logging only
  },
});
```

#### File: `App.tsx`

```tsx
import React from 'react';
import {
  DevConsoleProvider,
  DeveloperConsole,
} from 'react-native-developer-console';
import './src/api/fetch-setup'; // Run setup

function App() {
  return (
    <DevConsoleProvider>
      <YourApp />
      <DeveloperConsole />
    </DevConsoleProvider>
  );
}
```

---

### ⚛️ Option 3: React Query Setup (Advanced)

**Best for:** Apps using React Query for data fetching

#### File: `src/api/react-query-setup.ts` (Create this file)

```tsx
import { setupNetworkLogging } from 'react-native-developer-console';

// Setup React Query logging
setupNetworkLogging({
  reactQuery: {
    enabled: true,
    // Works with your existing React Query setup
  },
});
```

---

### 🛠️ Option 4: Manual Setup (Advanced Users)

**Best for:** Custom HTTP clients, special requirements, fine-grained control

#### File: `src/api/manual-logger.ts` (Create this file)

```tsx
import { getNetworkLogger } from 'react-native-developer-console';

// Get the logger instance
const logger = getNetworkLogger();

// Manual logging function
export const logRequest = (request: {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
}) => {
  logger.logRequest({
    ...request,
    id: generateId(),
    startTime: Date.now(),
  });
};

export const logResponse = (response: {
  url: string;
  status: number;
  response?: any;
  error?: string;
}) => {
  logger.logResponse({
    ...response,
    endTime: Date.now(),
    duration: Date.now() - response.startTime,
  });
};
```

#### File: Your HTTP client wrapper

```tsx
import { logRequest, logResponse } from './manual-logger';

export const customApiClient = {
  async get(url: string) {
    const request = { url, method: 'GET', headers: {} };
    logRequest(request);

    try {
      const response = await fetch(url);
      const data = await response.json();
      logResponse({ url, status: response.status, response: data });
      return data;
    } catch (error) {
      logResponse({ url, status: 0, error: error.message });
      throw error;
    }
  },
};
```

---

### 📋 Setup Summary

| Setup Method            | File to Create                 | Features         | Difficulty  |
| ----------------------- | ------------------------------ | ---------------- | ----------- |
| **Axios** (Recommended) | `src/api/axios.ts`             | ✅ Full Features | ⭐ Easy     |
| **Fetch**               | `src/api/fetch-setup.ts`       | ⚠️ Basic Only    | ⭐ Easy     |
| **React Query**         | `src/api/react-query-setup.ts` | ⚠️ Basic Only    | ⭐⭐ Medium |
| **Manual**              | `src/api/manual-logger.ts`     | ✅ Full Control  | ⭐⭐⭐ Hard |

> **💡 Pro Tip**: Start with the Axios setup for the best experience. You can always switch to manual setup later if you need more control.

## ⚙️ Configuration

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
  encryptionEnabled={true}            // Enable decryption for request/response bodies
  onDecryptData={(encryptedData) => { // Custom decryption function
    return decryptFunction(encryptedData);
  }}
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

## 💡 Usage Examples

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

### Encryption/Decryption Support

The developer console now supports automatic decryption of request and response bodies, making it easy to debug encrypted API communications.

#### Basic Setup

```tsx
import { DevConsoleProvider } from 'react-native-developer-console';
import { decryptFunction } from './utils/encryption';

function App() {
  return (
    <DevConsoleProvider
      encryptionEnabled={true}
      onDecryptData={(encryptedData) => {
        try {
          return decryptFunction(encryptedData);
        } catch (error) {
          console.warn('Decryption failed:', error);
          return encryptedData; // Return original if decryption fails
        }
      }}
    >
      <YourApp />
      <DeveloperConsole />
    </DevConsoleProvider>
  );
}
```

#### Advanced Example with CryptoHelper

```tsx
import { DevConsoleProvider } from 'react-native-developer-console';
import CryptoHelper from 'common/util/crypto';

function App() {
  return (
    <DevConsoleProvider
      encryptionEnabled={true}
      onDecryptData={(encryptedData: string) => {
        try {
          const decrypted = CryptoHelper.decrypt(encryptedData);
          // The console will automatically parse JSON if the decrypted data looks like JSON
          return decrypted;
        } catch (error) {
          console.warn('Failed to decrypt data:', error);
          return encryptedData; // Return original if decryption fails
        }
      }}
    >
      <YourApp />
      <DeveloperConsole />
    </DevConsoleProvider>
  );
}
```

#### Features

- **🔐 Automatic Decryption**: Request and response bodies are automatically decrypted when displayed
- **📄 JSON Parsing**: Decrypted strings that look like JSON are automatically parsed for better formatting
- **🛡️ Error Handling**: Graceful fallback if decryption fails - shows original encrypted data
- **📋 Copy Support**: Copy functions also use decrypted data
- **📊 Summary Export**: Export summary includes decrypted data
- **🔧 Type Safety**: Full TypeScript support with proper types

#### When to Use

- Your API uses encrypted request/response bodies
- You want to debug the actual data being sent/received
- You need to inspect encrypted payloads during development
- You want to copy/share decrypted data for debugging

## 📚 API Reference

### Components

- **`DevConsoleProvider`**: Context provider for the developer console
  - `encryptionEnabled?: boolean` - Enable/disable decryption support
  - `onDecryptData?: (encryptedData: string) => string` - Custom decryption function
- **`DeveloperConsole`**: Main console component with tabs and interface
- **`NetworkLogList`**: List of network requests with filtering (Axios-optimized)
- **`NetworkLogDetail`**: Detailed view of individual network requests with decryption support
- **`GeneralInfoPanel`**: Device and app information panel

### Hooks

- **`useNetworkLogger()`**: Access network logs and statistics
- **`useDevConsole()`**: Control console visibility and state

### Utilities

- **`getNetworkLogger()`**: Get the network logger instance
- **`setupNetworkLogging()`**: **Setup automatic Axios interception** (recommended)
- **`subscribeToNetworkLogs()`**: Subscribe to log updates
- **`clearNetworkLogs()`**: Clear all network logs
- **`getNetworkLogs()`**: Get current network logs
- **`repeatNetworkRequest()`**: Repeat a network request (Axius-optimized)
- **`getNetworkStats()`**: Get network statistics

## 🔧 TypeScript Types

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

// New in v1.1.0 - Decryption Support
interface DevConsoleProviderProps {
  children: React.ReactNode;
  encryptionEnabled?: boolean;
  onDecryptData?: (encryptedData: string) => string;
  // ... other props
}

interface NetworkLogDetailProps {
  selectedLog: NetworkResponse;
  onBack: () => void;
  isRepeatingRequest: boolean;
  handleRepeatRequest: (log: NetworkResponse) => void;
  encryptionEnabled?: boolean;
  onDecryptData?: (encryptedData: string) => string;
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

## 📋 Changelog

### [1.1.1] - 2024-01-XX

#### 🔧 Improvements
- **Network tab now shows by default** - better developer experience
- **Swapped tab order** - Network tab appears first, General tab second

### [1.1.0] - 2024-01-XX

#### 🚀 Migration Guide

**Upgrading from v1.0.0 to v1.1.0:**

No breaking changes! The new decryption features are completely optional and backward compatible.

**To add decryption support:**
```tsx
// Before (v1.0.0)
<DevConsoleProvider>
  <YourApp />
  <DeveloperConsole />
</DevConsoleProvider>

// After (v1.1.0) - with decryption
<DevConsoleProvider
  encryptionEnabled={true}
  onDecryptData={(encryptedData) => {
    return yourDecryptFunction(encryptedData);
  }}
>
  <YourApp />
  <DeveloperConsole />
</DevConsoleProvider>
```

**Existing code will continue to work without any changes.**

#### ✨ New Features
- **🔐 Encryption/Decryption Support**: Added comprehensive support for decrypting request and response bodies
  - Custom decryption functions via `onDecryptData` prop
  - Automatic JSON parsing of decrypted data
  - Graceful error handling with fallback to original data
  - Support for both request and response body decryption
  - Decryption applied to copy functions and summary export

#### 🔧 Improvements
- Enhanced `NetworkLogDetail` component with decryption capabilities
- Updated `DevConsoleProvider` to support encryption configuration
- **Network tab now shows by default** - better developer experience
- **Swapped tab order** - Network tab appears first, General tab second
- Improved TypeScript types for better developer experience
- Enhanced error handling and logging

#### 📚 Documentation
- Added comprehensive encryption/decryption usage examples
- Updated API reference with new props
- Enhanced README with encryption feature documentation

### [1.0.0] - 2024-01-XX

#### 🎉 Initial Release
- Network request logging with Axios, Fetch, and React Query support
- Device information display
- Customizable themes
- Custom debug actions
- Network statistics and performance metrics
- Request repeating functionality
- Clipboard support for copying data
- Production-safe environment controls
- Comprehensive TypeScript support

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
