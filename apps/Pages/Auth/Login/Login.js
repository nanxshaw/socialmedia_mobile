import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import styles from './LoginStyle';
import { connect } from 'react-redux';
import { ADD_USER, DEL_USER } from '../../../Redux/actions/action';
import RestApi from '../../../Rest/RestApi';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            pass: null,
            loadingBtn: false
        };
    }

    componentDidMount() {
        this.props.delete_user();
        // GoogleSignin.configure({
        //     scopes: ['email'],
        //     // scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
        //     offlineAccess: true,
            
        //     webClientId: "420199211686-75ouh236u16kvfmjofcu2vvsu1tkb7d4.apps.googleusercontent.com",
        //     iosClientId:"420199211686-75ouh236u16kvfmjofcu2vvsu1tkb7d4.apps.googleusercontent.com"
        // })
    }


    // signInGoogle  = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log(userInfo);
    //         this.setState({ userInfo });
    //     } catch (error) {
    //         console.log(error)
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //         }
    //     }
    // }


    onLogin = () => {
        const { user, pass } = this.state;
        this.setState({ loadingBtn: true })
        if (user != null || user != '') {
            if (pass != null || pass != '') {
                var data = {
                    user: user,
                    password: pass
                }
                console.log(data)
                RestApi.ApiPost('/login', data).then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        this.setState({ loadingBtn: false })
                        this.props.add_user(res.data.data);
                        this.props.navigation.replace('Home');
                    } else {
                        this.setState({ loadingBtn: false })
                        Alert.alert('Notice', '404')
                    }
                })
            } else {
                this.setState({ loadingBtn: false })
                Alert.alert('Notice', 'Password is empty!')
            }
        } else {
            this.setState({ loadingBtn: false })
            Alert.alert('Notice', 'Username or E-mail is empty!')
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.form_input}>
                    <TextInput
                        placeholder='Username or E-mail'
                        style={styles.in}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(user) => this.setState({ user })}
                    />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry
                        style={styles.in}
                        onChangeText={(pass) => this.setState({ pass })}
                    />
                </View>
                <View style={styles.form_btn}>
                    <TouchableOpacity onPress={this.onLogin} style={styles.btn_primary} activeOpacity={.7}>
                        <Text style={styles.tx_primary}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn_outline} onPress={() => this.props.navigation.push('Register')} activeOpacity={.7}>
                        <Text style={styles.tx_out}>Register</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        onPress={() => this.signInGoogle()}
                        activeOpacity={.9}
                        style={styles.btn_google}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image resizeMethod="resize" source={require('../../../../assets/icon/google.png')} style={styles.icon_img} />
                            <Text style={styles.tx_primary}>Sign In Google</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    add_user: (body) => {
        dispatch(ADD_USER(body))
    },
    delete_user: () => {
        dispatch(DEL_USER())
    }
})

const connectComponent = connect(null, mapDispatchToProps)
export default connectComponent(Login);
