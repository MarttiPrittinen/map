import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const App = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Ota sijaintipalvelut käyttöön käyttääksesi tätä ominaisuutta.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  const handleLongPress = (event) => {
    setMarkers([...markers, event.nativeEvent.coordinate]);
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          onLongPress={handleLongPress}
        >
          {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker} />
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default App;
