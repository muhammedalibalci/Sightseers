import AsyncStorage from '@react-native-community/async-storage'
import React from 'react'
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    Button,
} from 'react-native'
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen'
import welcome from '../../../assets/welcome.png'
import Signup from './Signup'

export default function Welcome({ navigation }) {
    return (
        <SafeAreaView>
            
            <View style={styles.container}>
                <ImageBackground
                    source={welcome}
                    style={styles.image}
                ></ImageBackground>
            </View>
            <View style={styles.loginView}>
                <TextInput
                    style={styles.input}
                    placeholder="Kullanıcı Adı"
                ></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder="Parola"
                    secureTextEntry={true}
                ></TextInput>
            </View>
            <View style={styles.buttonGroup}>
                <Button
                    title="Kayıt Ol"
                    color="#f14902"
                    style={styles.button}
                    onPress={() => navigation.navigate('Signup')}
                ></Button>
                <Button
                    title="Giriş yap"
                    color="#f14902"
                    style={styles.button}
                ></Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        height: heightPercentageToDP('100%'),
        width: widthPercentageToDP('100%'),
        flex: 1,
    },
    loginView: {
        color: 'white',
        marginTop: heightPercentageToDP('50%'),
    },
    buttonGroup: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    input: {
        height: 40,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    button: {
        height: 40,
        marginHorizontal: 20,
        marginVertical: 10,
    },
})