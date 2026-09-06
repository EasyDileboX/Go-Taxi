import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RoleSelection({ onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Go Taxi</Text>
      <Text style={styles.subtitle}>Choose your role to continue</Text>
      <View style={styles.buttons}>
        <Button title="Passenger" onPress={() => onSelect('passenger')} />
        <View style={{ height: 12 }} />
        <Button title="Driver" onPress={() => onSelect('driver')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#0b5ed7', marginBottom: 6 },
  subtitle: { fontSize: 16, color: '#333', marginBottom: 24 },
  buttons: { width: '100%' }
});
