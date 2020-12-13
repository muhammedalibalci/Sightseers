import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons'

function TopBar(
    {
        leftIcon,
        title,
        rightIcon,
        rightIconClick,
        leftIconClick,
    }
) {

    return (
        <View style={styles.container}>

            {leftIcon ? <Text onPress={leftIconClick}>
                <AntDesign name={leftIcon} size={20} color="black" />
            </Text>  : <View style={{ marginLeft: 20 }}></View>}

            <Text style={styles.title}>{title}</Text>

            {rightIcon ? <Text onPress={rightIconClick} style={{ justifyContent: 'center',marginRight:10 }} >
                <AntDesign name={rightIcon} size={20} color="black" />
            </Text> :  <View style={{ marginLeft: 10 }}></View> }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        padding: 10,
    },
    title: {
        fontSize: heightPercentageToDP('3%'),
        fontFamily:'Lato-Bold'
    },
})


export default TopBar