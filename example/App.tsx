import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { DevConsoleProvider, DeveloperConsole, useNetworkLogger } from '../src';

const TestApp: React.FC = () => {
  const { logs, clearLogs } = useNetworkLogger();

  const makeTestRequest = async () => {
    try {
      // Simulate a network request
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      );
      const data = await response.json();
      console.log('Test request successful:', data);
    } catch (error) {
      console.error('Test request failed:', error);
    }
  };

  const makeFailedRequest = async () => {
    try {
      // This will fail
      const response = await fetch(
        'https://nonexistent-domain-12345.com/api/test',
      );
      await response.json();
    } catch (error) {
      console.error('Expected failure:', error);
    }
  };

  return (
    <DevConsoleProvider>
      <SafeAreaView style={styles.container}>
        <DeveloperConsole />

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.title}>React Native Developer Console</Text>
          <Text style={styles.subtitle}>
            Test the developer console package
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Network Testing</Text>
            <Text style={styles.logCount}>Current logs: {logs.length}</Text>

            <TouchableOpacity style={styles.button} onPress={makeTestRequest}>
              <Text style={styles.buttonText}>Make Successful Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.failButton]}
              onPress={makeFailedRequest}
            >
              <Text style={styles.buttonText}>Make Failed Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={clearLogs}
            >
              <Text style={styles.buttonText}>Clear Logs</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instruction}>
              • Tap the buttons above to generate network logs{'\n'}• Shake the
              device or use gestures to open the console{'\n'}• View network
              logs in the Network tab{'\n'}• Check device info in the General
              tab
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </DevConsoleProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  logCount: {
    fontSize: 14,
    marginBottom: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  failButton: {
    backgroundColor: '#FF3B30',
  },
  clearButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  instruction: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
});

export default TestApp;
