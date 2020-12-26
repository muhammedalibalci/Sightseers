import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addPoint, removePoint } from '../store/actions/postAction'

function LikeButton({ post }) {
    const dispatch = useDispatch()

    return (
        <View style={styles.textAndIconContainer}>
            <Text>{post.likeCount} </Text>
            {post.isLiked ? (
                <TouchableOpacity onPress={() => dispatch(removePoint(post.id))}>
                    <AntDesign name="upcircle" color="#f14902" size={20} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => dispatch(addPoint(post.id))}>
                    <AntDesign name="upcircleo" color="black" size={20} />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    textAndIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default LikeButton
