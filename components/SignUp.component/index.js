import React from "react";
import { Text, View, Button, TextInput, } from "react-native";
import firebase from "../../firebase.js";
import { Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      error: null
    };
  }

  SignUp = (username, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in your Firebase realtime database

        return firebase
          .database()
          .ref(`users/${authUser.user.uid}`)
          .set({
            username,
            email
          });
      })
      .then(() => {
        this.setState({ username: "", email: "", password: "" });
        this.props.navigation.navigate("Memes");
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });
  };

  render() {
    const { email, password, username, error } = this.state;

    const isInvalid = password === "" || email === "" || username === "";

    return (
      <View>
        <Text style = {{borderBottomWidth: 2, borderBottomColor:'grey',  fontSize: 20, marginTop:10}}>Username:</Text>
        <Input style={{height: 40}}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={username => this.setState({ username })}
          leftIcon={<Icon name="user" size={24} color="black" />}
        />

        <Text style = {{borderBottomWidth: 2, borderBottomColor:'grey',  fontSize: 20,}}>Email:</Text>
        <Input style={{height: 40}}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={email => this.setState({ email })}
          leftIcon={{ type: "font-awesome", name: "at",  }}
        />

        <Text style = {{borderBottomWidth: 2, borderBottomColor:'grey',  fontSize: 20,}}>Password:</Text>
        <Input style={{height: 40}}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={password => this.setState({ password })}
          leftIcon={{ type: "font-awesome", name: "key",  }}
        />
        <Button
        
          title="Sing Up"
          color="#f57c00"
          accessibilityLabel="SignUp data submit button"
          //disabled={isInvalid}
          
          onPress={() => this.SignUp(username, email, password)}
        />
        {error && <Text>{error.message}</Text>}
      </View>
    );
  }
}

export default SignUp;
