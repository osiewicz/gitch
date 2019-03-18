import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  View
} from "react-native";
import { Permissions, Notifications } from "expo";
import firebase from "firebase";

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.registerForPushNotifications();
  }

  registerForPushNotifications = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
 
    if (status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();

    firebase
      .database()
      .ref("users")
      .child(this.props.user.uid)
      .update({
        expoPushToken: token
      });
  };

  render() {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    padding: 8
  },
  text: {
    paddingBottom: 2,
    padding: 8
  },
  container: {
    flex: 1,
    paddingTop: 40
  },
  touchable: {
    borderWidth: 1,
    borderRadius: 4,
    margin: 8,
    padding: 8,
    width: "95%"
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 8,
    padding: 8,
    width: "95%"
  }
});
