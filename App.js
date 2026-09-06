import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import RoleSelection from './src/screens/RoleSelection';
import PassengerHome from './src/screens/PassengerHome';
import DriverHome from './src/screens/DriverHome';
import { initFirebase } from './src/firebase/firebase';

export default function App() {
  const [role, setRole] = useState(null); // 'passenger' | 'driver'

  useEffect(() => {
    initFirebase();
  }, []);

  if (!role) {
    return <RoleSelection onSelect={setRole} />;
  }

  return (
    <View style={styles.container}>
      {role === 'passenger' ? (
        <PassengerHome onSignOut={() => setRole(null)} />
      ) : (
        <DriverHome onSignOut={() => setRole(null)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
