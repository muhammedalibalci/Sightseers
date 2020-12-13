import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { View } from 'react-native'
import Posts from '../screens/HomeScreen/Posts';
import { AntDesign } from '@expo/vector-icons'
import AddPost from '../screens/AddPostScreen/AddPost';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation, route }) {
    
    const routeName = getFocusedRouteNameFromRoute(route)
    React.useEffect(() => {
        if (routeName == "PostWebView" || routeName == "Comments") {
            navigation.setOptions({ tabBarVisible: false });
        }
        else{
            navigation.setOptions({ tabBarVisible: true });
        }
    }, [route])

    return (
        <HomeStack.Navigator headerMode="none">
            <HomeStack.Screen name="Posts" component={Posts} />
        </HomeStack.Navigator>
    );
}

const AddPostStack = createStackNavigator();

function ProfileStackScreen() {
    return (
        <AddPostStack.Navigator headerMode="none">
            <AddPostStack.Screen name="Add" component={AddPost} />
        </AddPostStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function AddPostStackScreen() {
    return (
        <ProfileStack.Navigator headerMode="none">
            <ProfileStack.Screen name="Add" component={AddPost} />
        </ProfileStack.Navigator>
    );
}


const Tab = createBottomTabNavigator();

export default function PrivateNavigation() {

    const handleTabBarIcon = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
            }
            else if (route.name === 'Add') {
                iconName = focused ? 'plus' : 'plus';
                return <View style={{ backgroundColor: "#21618C", padding: 10, borderRadius: 50 }}>
                    <AntDesign name="plus" size={20} color="white" />
                </View>
            }
            else if (route.name === 'Profile') {
                iconName = focused ? 'user' : 'user';
            }
            return <AntDesign name={iconName} size={size} color={color} />;
        },

    })

    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={handleTabBarIcon} tabBarOptions={{ activeTintColor:"#21618C", showLabel: false, inactiveTintColor: 'grey', }}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Add" component={AddPostStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
    )
}
