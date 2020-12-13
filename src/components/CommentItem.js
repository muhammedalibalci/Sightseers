import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import React, { useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { useDispatch } from 'react-redux'
import { format } from 'timeago.js'
import { URL, URL_COMMENT } from '../store/apiUrl'
import { INCREASE_COMMENTS, ADD_REPLY } from '../store/types'
import BottomInput from './BottomInput'

export default function CommentItem({ comment, postId, comments, setComments }) {

    const dispatch = useDispatch()
    const time = format(
        comment.createdAt.split('T')[0] + ' ' + comment.createdAt.split('T')[1]
    )

    const [addLoadingComment, setAddLoadingComment] = useState(false)
    const [disabledAddCommentButton, setDisabledAddCommentButton] = useState(true)
    const [reply, setReply] = useState('')
    const [reliesNumber, setReliesNumber] = useState(5)

    const onChange = (text) => {
        setReply(text)
        setDisabledAddCommentButton(false)
        if (text == "")
            setDisabledAddCommentButton(true)
    }

    const handleAddComment = async () => {
        const token = await AsyncStorage.getItem('token')
        setAddLoadingComment(true)
        const data = {
            content: reply,
            postId,
            commentId: comment.id
        }
        const response = await Axios.post(URL + URL_COMMENT, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data) {
            Keyboard.dismiss()
            setReply('')
            setComments(comments.filter(c => c.id == comment.id ? c.replies = [response.data].concat(c.replies) : c))
            setDisabledAddCommentButton(true)
            dispatch({ type: INCREASE_COMMENTS, payload: postId })
        }
        setAddLoadingComment(false)
    }

    const replies = (
        comment.replies.length != 0 && <View>
            {comment.replies.slice(0, reliesNumber).map(r => (
                <Card key={r.id} >
                    <View style={[styles.topContainer]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="user" size={15} />
                            <Text> {r.user.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="clockcircleo" size={15} />
                            <Text> {r.createdAt && format(r.createdAt.split('T')[0] + ' ' + r.createdAt.split('T')[1])
                            }</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.content}>{r.content}</Text>
                    </View>
                </Card>
            ))}
            {comment.replies.length > reliesNumber && <Text style={{ textAlign: 'center' }} onPress={() => setReliesNumber(10)}>Load more</Text>}
        </View>
    )

    return (
        <Card style={styles.container}>
            <View style={styles.topContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="user" size={15} />
                    <Text> {comment.user.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="clockcircleo" size={15} />
                    <Text> {time}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.content}>{comment.content}</Text>
            </View>
            {replies}
            <BottomInput
                replies={true}
                onPressSend={handleAddComment}
                loading_process={addLoadingComment}
                onChange={onChange}
                disabledButton={disabledAddCommentButton}
                comment={reply}
            />
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
        fontFamily: 'lato-Regular',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        height: 40,
        width: 70,
        backgroundColor: '#21618C',
        marginTop: 2,
        marginLeft: 5
    },

})