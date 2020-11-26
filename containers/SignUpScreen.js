import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function SignUpScreen({ setToken, userToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const SignUp = async () => {
    if (password === confirmPassword) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",

          {
            email: email,
            username: username,
            description: description,
            password: password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response);
        //   if(response.)
        // } else {
        //   alert("ca marche pas  ");
        // }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaView}>
      <View>
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

          <Text>UserName: </Text>
          <TextInput
            placeholder="username"
            onChangeText={(username) => {
              setUsername(username);
              // console.log("email", email);
            }}
            value={username}
          />

          <Text>description: </Text>
          <TextInput
            placeholder="description"
            onChangeText={(description) => {
              setDescription(description);
              // console.log("email", email);
            }}
            value={description}
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

          <Text>Confirm Password: </Text>
          <TextInput
            placeholder="confirmer le mot de Password"
            secureTextEntry={true}
            onChangeText={(confirmPassword) => {
              setConfirmPassword(confirmPassword);
            }}
            value={confirmPassword}
          />

          <Button
            title="Sign up"
            onPress={async () => {
              SignUp();
              // const userToken = "secret-token";
              // setToken(userToken);
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 2,
    justifyContent: "flex-end",
  },
});
