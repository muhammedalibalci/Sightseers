import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { View } from 'react-native'
import Posts from '../screens/HomeScreen/Posts';
import { AntDesign } from '@expo/vector-icons'
import AddPost from '../screens/AddPostScreen/AddPost';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Profile from '../screens/ProfileScreen/Profile';
import PostDetail from '../screens/HomeScreen/PostDetail';

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation, route }) {
    
    const routeName = getFocusedRouteNameFromRoute(route)
    React.useEffect(() => {
        if (routeName == "PostDetail") {
            navigation.setOptions({ tabBarVisible: false });
        }
        else{
            navigation.setOptions({ tabBarVisible: true });
        }
    }, [route])

    return (
        <HomeStack.Navigator headerMode="none">
            <HomeStack.Screen name="Posts" component={Posts} />
            <HomeStack.Screen name="PostDetail" component={PostDetail} />
        </HomeStack.Navigator>
    );
}

const AddPostStack = createStackNavigator();

function AddPostStackScreen() {
    return (
        <AddPostStack.Navigator headerMode="none">
            <AddPostStack.Screen name="Add" component={AddPost} />
        </AddPostStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator headerMode="none">
            <ProfileStack.Screen name="Profile" component={Profile} />
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
                return <View style={{ backgroundColor: "#f14902", padding: 10, borderRadius: 50 }}>
                    <AntDesign name="plus" size={20} color="white" />
                </View>
            }
            else if (route.name === 'ProfileScreen') {
                iconName = focused ? 'user' : 'user';
            }
            return <AntDesign name={iconName} size={size} color={color} />;
        },

    })

    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={handleTabBarIcon} tabBarOptions={{ activeTintColor:"#f14902", showLabel: false, inactiveTintColor: 'grey', }}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Add" component={AddPostStackScreen} />
            <Tab.Screen name="ProfileScreen" component={ProfileStackScreen} />
        </Tab.Navigator>
    )
}
