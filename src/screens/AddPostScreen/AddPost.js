import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, SafeAreaView, StatusBar, Platform } from 'react-native'
import { Input } from 'react-native-elements'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { Entypo } from '@expo/vector-icons'
import { addPost } from '../../store/actions/postAction'
import Spinner from 'react-native-loading-spinner-overlay'
import TopBar from '../../components/topbar'
import * as ImagePicker from 'expo-image-picker';

function AddPost({ navigation }) {

    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState('')
    const [loading, setLoading] = useState(false)

    const proceed = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            setPhoto(result);
        }
    }

    const handleChosePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        } else {
            proceed()
        }
    }

    const onPressSend = async () => {
        setLoading(true)
        let formData = new FormData();
        formData.append('content', content)
        if (photo) {
            formData.append('file', photo);
        }
        if (content.trim().length == 0) {
            alert("Content must be fill out")
            setLoading(false)
        }
        else if (content.trim().length > 300) {
            alert("Content must be 2 charcted at least")
            setLoading(false)
        }
        else {
            console.log(formData);
          /*  addPost(formData).then(res => {
                setLoading(false)
                setContent('')
                setPhoto('')
                navigation.navigate("Home", { screen: 'Home' })
            }).catch(() => {
                setLoading(false)
            })*/
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={loading}
            />
            <TopBar
                navigation={navigation}
                title="New Story"
                rightIcon="right"
                leftIcon="close"
                leftIconClick={() => navigation.goBack()}
                rightIconClick={onPressSend}
            />
            <View>
                <Input
                    placeholder="Share your story"
                    value={content}
                    onChangeText={(value) => setContent(value)}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.text}
                    multiline
                    autoFocus
                    numberOfLines={heightPercentageToDP('2%')} />
                <View style={styles.fileContainer}>
                    <Text onPress={handleChosePhoto} >
                        <Entypo name="folder-images" size={30} color="grey" />
                    </Text>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={{ uri: photo == "" ? null : photo.uri }}
                    style={styles.image}
                    resizeMode="stretch" />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor:'white'
    },
    inner: {
    },
    inputContainerStyle: {
        marginTop: 10,
        borderBottomWidth: 0,
    },
    text: {
        fontSize: heightPercentageToDP('3%'),
        textAlign: 'center',
        height: heightPercentageToDP('30%'),
        marginBottom: 20
    },
    fileContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
    },
    image: {
        height: 300,
        width: 300,

    }
})

export default AddPost