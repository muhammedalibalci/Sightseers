import AsyncStorage from '@react-native-community/async-storage'
import React, { useState } from 'react'
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    Button,
    Text,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen'
import welcome from '../../../assets/welcome.png'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/actions/authAction'
import FlashMessage, { showMessage } from 'react-native-flash-message'

export default function Welcome({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let { error, loading } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const submit = async () => {
      await dispatch(login({ userName: username, password: password }))

        if (error)
            showMessage({
                message: 'Kullanıcı adı veya şifre hatalı!',
                type: 'danger',
            })
    }

    return (
        <SafeAreaView>
            <Spinner visible={loading} />
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
                    onChangeText={(username) => setUsername(username)}
                    value={username}
                ></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder="Parola"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
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
                    disabled={!(password && username)}
                    onPress={async () => { await submit()}}
                ></Button>
            </View>
            <FlashMessage position="top" />
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
