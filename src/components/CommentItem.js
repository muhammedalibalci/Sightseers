import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import React, { useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { format } from 'timeago.js'
import { URL, URL_COMMENT } from '../store/apiUrl'
import { INCREASE_COMMENTS, ADD_REPLY } from '../store/types'
import BottomInput from './BottomInput'

export default function CommentItem({ comment, postId, comments, setComments }) {

    const time = format(comment.item.createdAt)
        
    return (
        <Card style={styles.container}>
            <View style={styles.topContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="user" size={15} />
                    <Text> {comment.item.user.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="clockcircleo" size={15} />
                    <Text> {time}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.content}>{comment.item.content}</Text>
            </View>
        </Card>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        fontSize: heightPercentageToDP('2.5%'),
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        height: 40,
        width: 70,
        backgroundColor: '#f14902',
        marginTop: 2,
        marginLeft: 5
    },

})