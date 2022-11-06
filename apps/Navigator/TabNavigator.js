import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import Home from '../Pages/Home/Home';
import Profile from '../Pages/Profile/Profile';

const Tab = createBottomTabNavigator();
class TabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#FA8072',
            tabBarActiveBackgroundColor: '#FFF',
            tabBarInactiveTintColor: '#676767',
            tabBarInactiveBackgroundColor: '#FFF',
          }}
          initialRouteName="Dashboard"
        >
          <Tab.Screen
            name="Dashboard"
            component={Home}
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Icon name='home' type='font-awesome-5' color={color} size={size} />
                ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Icon name='user' type='font-awesome-5' color={color} size={size} />
                ),
            }}
          />
        </Tab.Navigator>
    );
  }
}

export default TabNavigator;
