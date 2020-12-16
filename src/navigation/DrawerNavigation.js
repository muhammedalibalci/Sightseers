import * as React from 'react'
import { Button } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/authAction'
import PrivateNavigation from './PrivateNavigation'

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logout())
    }

    return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={PrivateNavigation} />
            </Drawer.Navigator>
    )
}
