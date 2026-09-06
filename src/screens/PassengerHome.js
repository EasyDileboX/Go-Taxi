import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PassengerHome({ onSignOut }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passenger — Go Taxi</Text>
      <Text style={styles.subtitle}>This is a starter passenger screen.</Text>
      <Text style={styles.note}>Booking forms (daily shuttle, parcel, charter) will be available here.</Text>
      <View style={{ height: 12 }} />
      <Button title="Sign out" onPress={onSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: '#0b5ed7' },
  subtitle: { marginTop: 8, color: '#333' },
  note: { marginTop: 16, color: '#666', textAlign: 'center' }
});
