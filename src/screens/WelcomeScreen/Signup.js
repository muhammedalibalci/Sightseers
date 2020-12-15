import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../store/actions/authAction'

import {
    ImageBackground,
    StyleSheet,
    View,
    TextInput,
    Button,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import FlashMessage, { showMessage } from 'react-native-flash-message'

import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen'
import welcome from '../../../assets/welcome.png'

export default function Signup({ navigation }) {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastname] = useState('')
    let { error, loading } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const register = async () => {
        await dispatch(
            signUp({
                name: name,
                lastName: lastName,
                userName: userName,
                password: password,
            })
        )

        // if (error) {
        //     showMessage({
        //         message: 'Bir hata meydana geldi!',
        //         type: 'danger',
        //     })
        //     return;
        // }
    }

    return (
        <View>
            <View style={styles.container}>
                <ImageBackground
                    source={welcome}
                    style={styles.image}
                ></ImageBackground>
            </View>
            <View style={styles.loginView}>
                <TextInput
                    style={styles.input}
                    placeholder="Ad"
                    value={name}
                    onChangeText={(name) => setName(name)}
                ></TextInput>

                <TextInput
                    style={styles.input}
                    placeholder="Soyad"
                    value={lastName}
                    onChangeText={(lastName) => setLastname(lastName)}
                ></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder="Kullanıcı Adı"
                    value={userName}
                    onChangeText={(userName) => setUsername(userName)}
                ></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder="Parola"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                ></TextInput>
            </View>
            <View style={styles.buttonGroup}>
                <Button
                    title="Geri Dön"
                    color="#f14902"
                    style={styles.button}
                    onPress={() => navigation.navigate('Welcome')}
                ></Button>
                <Button
                    title="Kayıt Ol"
                    color="#f14902"
                    style={styles.button}
                    disabled={!(userName && password && name && lastName)}
                    onPress={async () => {
                        await register()
                    }}
                ></Button>
            </View>
            <Spinner visible={loading}></Spinner>
            <FlashMessage position="top" />
        </View>
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
        margin: 50,
    },
    buttonGroup: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10,
        justifyContent: 'space-between',
    },
})
