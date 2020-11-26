import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken, setUserToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  console.log("state", password);

  const SignIn = async () => {
    if (email && password) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.status);
        if (response.status === 200) {
          console.log(response.data.token);
          setToken(response.data.token);
          alert("ca marche");
        }
      } catch (error) {
        alert("ca marche pas  ");

        console.log(error);
      }
    } else {
      if (!email && !password) {
        alert("merci de rentrer l'email et le mot de passe ");
      } else if (!email) {
        alert("merci de rentrer l'email ");
      } else if (!password) {
        alert("merci de rentrer le mot de passe ");
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaView}>
      <SafeAreaView>
        <View>
          <Text>Email: </Text>
          <TextInput
            placeholder="email"
            onChangeText={(email) => {
              setEmail(email);
              // console.log("email", email);
            }}
            value={email}
          />

          <Text>Password: </Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => {
              setPassword(password);
              console.log("password", password);
            }}
            value={password}
          />
          <Button
            title="Sign in"
            onPress={
              async () => {
                SignIn();
                // const userToken = "secret-token";
                // console.log("usertoken", userToken);
                // setToken(userToken);
              }
              // () => SignIn()
            }
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account, Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 2,
    justifyContent: "center",
  },
});
