import AsyncStorage from '@react-native-community/async-storage'
import React from 'react'
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import welcome from '../../../assets/welcome.png'
export default function Welcome() {

    return (
        <ImageBackground source={welcome} style={styles.image}>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        height: heightPercentageToDP('100%'),
        width: widthPercentageToDP('100%')
    }
})
