import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logout = () => {
    Alert.alert(
        'Message',
        'Do you want to log out',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    this.props.navigation.replace('Login');
                }
            },
        ],
        { cancelable: false },
    );
  }

  render() {
    const { user } = this.props;
    return (
        <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Text>{user.username}</Text>
            <Text>{user.email}</Text>
            <TouchableOpacity style={{marginTop:10}} activeOpacity={.7} onPress={this.logout}>
                <Text style={{fontWeight:"bold",fontSize:20,color:"#FA8072"}}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
  }
}


const mapStateToProps = (state) => ({ token: state.token, user: state.user })


const connectComponent = connect(mapStateToProps);
export default connectComponent(Profile);
