import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function DriverHome({ onSignOut }) {
  const [location, setLocation] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [lastLoc, setLastLoc] = useState(null);

  useEffect(() => {
    let subscription;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscription = await Location.watchPositionAsync({ distanceInterval: 5, timeInterval: 3000 }, (loc) => {
        setLocation(loc);
        if (lastLoc) {
          const d = distanceInMeters(lastLoc.coords.latitude, lastLoc.coords.longitude, loc.coords.latitude, loc.coords.longitude);
          const dt = (loc.timestamp - lastLoc.timestamp) / 1000; // seconds
          const speed = dt > 0 ? d / dt : 0;
          setIsMoving(speed > 1.5); // threshold 1.5 m/s (~5.4 km/h)
        }
        setLastLoc(loc);

        // TODO: write driver location and isMoving to Firestore driverLocations/{driverId}
      });
    })();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [lastLoc]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver — Go Taxi</Text>
      <Text style={styles.subtitle}>{location ? `Latitude: ${location.coords.latitude.toFixed(5)}, Longitude: ${location.coords.longitude.toFixed(5)}` : 'Waiting for location...'}</Text>
      <Text style={[styles.status, { color: isMoving ? 'green' : 'red' }]}>{isMoving ? 'Moving' : 'Stopped'}</Text>
      <View style={{ height: 12 }} />
      <Button title="Sign out" onPress={onSignOut} />
    </View>
  );
}

// Haversine formula to compute meters between coords
function distanceInMeters(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371000; // meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: '#0b5ed7' },
  subtitle: { marginTop: 8, color: '#333' },
  status: { marginTop: 12, fontSize: 18, fontWeight: '600' }
});
