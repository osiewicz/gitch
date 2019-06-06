import React from "react";
import { Text, View, Button, Alert } from "react-native";
import { ImagePicker, Permissions } from "expo";
import firebase, { serverValue } from "../../firebase.js";
import uuid from "uuid";
import { Input } from "react-native-elements";

class UploadImgFromGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = { uploading: false, image: "", title: "", tags: "" };
  }
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  onSerializeTags = () => this.state.tags.split(" ");

  onCreateMem = () => {
    let tags = [];

    firebase
      .database()
      .ref("memes")
      .push({
        url: this.state.image,
        userId: this.props.authUser.uid,
        username: "Piotrek",
        createdAt: serverValue.TIMESTAMP,
        title: this.state.title,
        tags: this.onSerializeTags(),
        comments: []
      });

    this.setState({ image: "", title: "", tags: "" });
  };

  onChooseImagePress = async () => {
    //let result = await ImagePicker.launchCameraAsync();
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
      this.onCreateMem();
      alert("Successfully added Mem to database");
      this.props.navigation.navigate("Memes");
    }
  };

  render() {
    const { title, tags, image } = this.state;
    const isInvalid = title === "" || tags === "";
    return (
      <View>
        <Input
          placeholder="Input title"
          autoCapitalize="none"
          onChangeText={title => this.setState({ title })}
        />

        <Input
          placeholder="Input tags in '#tag #tag"
          autoCapitalize="none"
          onChangeText={tags => this.setState({ tags })}
        />
        <Button
          title="Choose image..."
          onPress={this.onChooseImagePress}
          color="#f57c00"
        />
      </View>
    );
  }
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
export default UploadImgFromGallery;
