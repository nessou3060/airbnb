import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { ActivityIndicator, Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import MapView from "react-native-maps";

export default function ProfileScreen() {
  const { params } = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const GetRoom = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${params.userId}`
      );
      setIsLoading(false);
      setRoom(response.data);

      console.log(response.data);
    } catch (error) {
      alert("ca marche pas  ");
    }
  };
  useEffect(() => {
    GetRoom();
  }, []);

  // quand y en a plusieur j'ai besoin de lui aussi
  // const markers = [
  //   {
  //     id: 1,
  //     latitude: room.location[0],
  //     longitude: room.location[1],
  //     title: room.title,
  //     description: room.description,
  //   },
  // ];

  return (
    <SafeAreaView>
      <ActivityIndicator animating={isLoading} size="small" color="#0000ff" />
      <View>
        <Image
          style={styles.img5}
          source={{
            uri: room.photos && room.photos[0].url,
          }}
        />
        <Text style={styles.price2}>{room.price}€</Text>
        <Text style={styles.price2}>{room.title}</Text>
        <Image
          style={styles.img6}
          source={{
            uri: room.user && room.user.account.photo.url,
          }}
        />
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
        >
          <MapView.Marker
            coordinate={{
              latitude: room.location[1],
              longitude: room.location[0],
            }}
            title={room.title}
            description={room.description}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img5: {
    height: 200,
    width: 380,
    marginLeft: 15,
    marginRight: 45,
  },
  img6: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
