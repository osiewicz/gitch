import React from "react";
import { Text, View, Button } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../../firebase.js";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInWithEmail extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        console.log("zalogowano");
        this.props.navigation.navigate("User");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <View>

        <Input
          placeholder="      Email"
          autoCapitalize="none"
          leftIcon={<Icon name="at" size={24} color="black" />}
          onChangeText={email => this.setState({ email })}
        />

        <Input
          placeholder="     Password"
          autoCapitalize="none"
          secureTextEntry={true}
          leftIcon={{ type: "font-awesome", name: "key",  }}
          onChangeText={password => this.setState({ password })}
        />

        <Button
          title="Sign In With Email"
          color="#f57c00"
       //   disabled={isInvalid}
          onPress={this.onLogin}
        //  DisableStyle={{ backgroundColor: '#f57c00' }}
         />
        {error && <Text>{error.message}</Text>}
      </View>
    );
  }
}
export default SignInWithEmail;
