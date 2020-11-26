import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { back } from "react-native/Libraries/Animated/src/Easing";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  // console.log("state", rooms);
  //set = mise en place
  //nul pour
  const GetRooms = async () => {
    try {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      // console.log(response.data);
      setIsLoading(false);
      setRooms(response.data);
    } catch (error) {
      alert("ca marche pas  ");
    }
  };

  //afficher directement devant ta tete

  useEffect(() => {
    GetRooms();
  }, []);

  return (
    <View>
      <ActivityIndicator animating={isLoading} size="small" color="#0000ff" />
      <Text>Welcome home!</Text>
      <Button title="salut ines " onPress={() => {}} />
      <>
        <FlatList
          data={rooms}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            //onPress={() => enclenche que quand on click
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Profile", { userId: item._id })
              }
            >
              <Image
                style={styles.img2}
                source={{
                  uri: item.photos[0].url,
                }}
              />

              <Text style={styles.price1}>{item.price}€</Text>
              <Text style={styles.title1}>{item.title}</Text>

              <Image
                style={styles.img3}
                source={{
                  uri: item.user.account.photo.url,
                }}
              />
            </TouchableOpacity>
          )}
        />
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img2: {
    height: 200,
    width: 380,
    marginLeft: 15,
    marginRight: 45,
  },
  price1: {
    flex: 1,
    position: "absolute",
    marginTop: 150,
    marginLeft: 15,
    backgroundColor: "black",
    color: "white",
    height: 40,
    width: 120,
    fontSize: 20,
  },

  title1: {
    fontSize: 25,
  },
  img3: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
