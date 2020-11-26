import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Location from "expo-location";
import { Text, SafeAreaView } from "react-native";
import MapView from "react-native-maps";

export default function AroundMeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const Carte = async () => {
    try {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms/around"
      );
      setIsLoading(false);
    } catch (error) {
      alert("ca marche pas  ");
    }
  };
  useEffect(() => {
    Carte();
  }, []);

  return (
    <SafeAreaView>
      <Text>hello</Text>

      <MapView
        // La MapView doit obligatoirement avoir des dimensions
        //pas besoin de flex sinon marche pas
        style={{ width: 400, height: 300 }}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
        //montré le point bleu "t'es la "
      ></MapView>
    </SafeAreaView>
  );
}
