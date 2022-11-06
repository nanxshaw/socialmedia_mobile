import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Auth/Login/Login';
import Register from '../Pages/Auth/Register/Register';
import Home from '../Pages/Home/Home';
import AddPost from '../Pages/Post/AddPost';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

class AppNavigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={this.props.user != null ? 'Home' : 'Login'}>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="AddPost" component={AddPost} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state) => ({ user: state.user })

const connectComponent = connect(mapStateToProps)
export default connectComponent(AppNavigator);