import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/WelcomeScreen/Welcome';

const AuthStack = createStackNavigator();

function PublicNavigation() {
  return (
    <AuthStack.Navigator headerMode="none" >
        <AuthStack.Screen name="Welcome" component={Welcome} />
    </AuthStack.Navigator>
  );
}
export default PublicNavigation