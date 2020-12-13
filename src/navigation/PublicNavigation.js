import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/WelcomeScreen/Welcome';
import Signup from '../screens/WelcomeScreen/Signup';

const AuthStack = createStackNavigator();

function PublicNavigation() {
  return (
    <AuthStack.Navigator headerMode="none" >
        <AuthStack.Screen name="Welcome" component={Welcome} />
        <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
}
export default PublicNavigation