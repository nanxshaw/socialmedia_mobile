import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import RestApi from '../../../Rest/RestApi';
import styles from './RegisterStyle';
import ImagePicker from 'react-native-image-crop-picker';
// import Toast from 'react-native-easy-toast';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      password: null,
      image: null,
      loadingBtn: false
    };
  }

  onRegister = () => {
    const { username, email, password, image } = this.state;
    if (username != null || username != '') {
      if (email != null || email != '') {
        if (password != null || password != '') {
          const form = new FormData();
          form.append("username", username)
          form.append("email", email)
          form.append("password", password)
          form.append("image", image)
          RestApi.ApiPost('/register', form).then((res) => {
            if (res.status == 200) {
              this.setState({ loadingBtn: false })
              // this.toast.show('Register Success!', 1000)
              this.props.navigation.pop();
            } else {
              this.setState({ loadingBtn: false })
              // this.toast.show('404', 1000)
            }
          })
        } else {
          this.setState({ loadingBtn: false })
          // this.toast.show('Password is empty!', 1000)
        }
      } else {
        this.setState({ loadingBtn: false })
        // this.toast.show('E-mail is empty!', 1000)
      }
    } else {
      this.setState({ loadingBtn: false })
      // this.toast.show('Username is empty!', 1000)
    }
  }

  openImage = () => {
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        compressImageMaxHeight: 400,
        compressImageMaxWidth: 400,
        cropping: true,
      })
        .then(response => {
          var img = response.path.split("/");
          let image = {
            uri: response.path,
            name: img[img.length - 1],
            type: response.mime
          }
          this.setState({ image })
        })
    } catch (error) {
      console.log(error);
    }
  }

  imageShow = () => {
    const { image } = this.state;
    if (image != null)
      return { uri: image.uri };
    else
      return require('../../../../assets/image/user_add.png');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={this.openImage} activeOpacity={.7} style={styles.span_img} >
          <Image source={this.imageShow()} style={styles.img} resizeMethod="resize" resizeMode='contain' />
          <Text style={styles.tx_img}>Upload Image</Text>
        </TouchableOpacity>
        <View style={styles.form_input}>
          <TextInput
            placeholder='Username'
            style={styles.in}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(username) => this.setState({ username })}
          />
          <TextInput
            placeholder='E-mail'
            style={styles.in}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            placeholder='Password'
            secureTextEntry
            style={styles.in}
            onChangeText={(pass) => this.setState({ pass })}
          />
        </View>
        <View style={styles.form_btn}>
          <TouchableOpacity onPress={this.onRegister} style={styles.btn_primary} activeOpacity={.7}>
            <Text style={styles.tx_primary}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_outline} onPress={() => this.props.navigation.pop()} activeOpacity={.7}>
            <Text style={styles.tx_out}>Back to Login</Text>
          </TouchableOpacity>
        </View>
        {/* <Toast ref={(toast) => this.toast = toast} /> */}
      </SafeAreaView>
    );
  }
}

export default Register;
