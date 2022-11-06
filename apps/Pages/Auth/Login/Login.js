import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import styles from './LoginStyle';
import { connect } from 'react-redux';
import { ADD_USER } from '../../../Redux/actions/action';
import RestApi from '../../../Rest/RestApi';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            pass: null,
            loadingBtn: false
        };
    }

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
                    if (res.status == 200) {
                        this.setState({ loadingBtn: false })
                        this.props.add_user(res.data.data);
                        this.props.navigation.replace('Home');
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
            // this.toast.show('Username or E-mail is empty!', 1000)
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
                </View>
                {/* <Toast ref={(toast) => this.toast = toast} /> */}
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    add_user: (body) => {
        dispatch(ADD_USER(body))
    }
})

const connectComponent = connect(null,mapDispatchToProps)
export default connectComponent(Login);
