import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import firebase, { provider } from "../../firebase.js";

import { Facebook } from "expo";

class SignInWithFacebook extends Component {
  constructor() {
    super();
    state = {
      email: "",
      password: ""
    };
  }

  logIn = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "2294826057457909",
        {
          permissions: ["public_profile"]
        }
      );
      if (type === "success") {
        // Get the user's name using Facebook's Graph API

        firebase
          .auth()
          .signInWithEmailAndPassword("piotrek@gmail.com", "chuj123")
          .catch(error => {
            this.setState({ error });
          });

        alert("Logged in!");
        this.props.navigation.navigate("User");
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <View style={{ paddingLeft: 60 }}>
        <TouchableOpacity onPress={this.logIn}>
          <Image source={require("../../assets/images/facebook.png")} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignInWithFacebook;
