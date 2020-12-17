import * as React from 'react'
import { Button, StyleSheet } from 'react-native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/authAction'
import PrivateNavigation from './PrivateNavigation'

function CustomDrawerContent(props) {
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout())
    }
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={style.content}>
        <DrawerItemList {...props} />
        <DrawerItem label="Çıkış" onPress={() => logOut()} />
      </DrawerContentScrollView>
    );
  }

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logout())
    }

    return (
        <Drawer.Navigator 
            initialRouteName="Home" 
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerStyle={style.drawer}
        >
            <Drawer.Screen name="Ana sayfa" component={PrivateNavigation} />
        </Drawer.Navigator>
    )
}

const style = StyleSheet.create({
    content: {
        flex: 1,  
        flexDirection: 'column', 
        justifyContent: 'space-between'
    }, 
});
