import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

function BottomInput({
    loading_process,
    onPressSend,
    disabledButton,
    onChange,
    comment,
    replies
}) {

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "android" ? "height" : "padding"}  >
            <View style={[styles.container, !replies ? { borderTopWidth: StyleSheet.hairlineWidth } : { marginLeft: 15 }]}>
                <View style={[styles.inputContainer, replies && { borderWidth: StyleSheet.hairlineWidth, borderColor: 'gray' }]}>
                    <TextInput
                        placeholder="Write something..."
                        placeholderTextColor="#657786"
                        style={[styles.input, { width: !replies ? widthPercentageToDP('75%') : widthPercentageToDP('57%') }]}
                        value={comment}
                        onChangeText={(value) => onChange(value)} />
                </View>
                <Button
                    title="Send"
                    onPress={onPressSend}
                    disabled={disabledButton}
                    disabledStyle={{ backgroundColor: "gray" }}
                    loading={loading_process}
                    buttonStyle={styles.button}
                    titleStyle={{ fontSize: heightPercentageToDP('2%') }} />
            </View>
        </KeyboardAvoidingView >
    )
}
export default BottomInput
const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'row',
        borderColor: 'gray',
        backgroundColor: 'white',
        marginTop: 10,
    },
    inputContainer: {
        alignItems: 'center'
    },
    input: {
        paddingLeft: 10,
        paddingTop: Platform.OS == "android" ? heightPercentageToDP('1%') : heightPercentageToDP('2%'),
        color: "black",
    },
    buttonContainer: {
        marginRight: widthPercentageToDP('7.5%'),
        alignSelf: 'flex-end',
        width: 70
    },
    button: {
        height: 40,
        width: 70,
        backgroundColor: '#21618C',
        marginTop: 2,
        marginLeft: 5
    },
})