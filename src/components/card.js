import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { format } from 'timeago.js'
import { Card as CardView } from 'react-native-elements'
import LikeButton from './likeButton'

function Card({ navigation, post }) {
    const time = format(post.createdAt)

    return (
        <CardView>
            {/**Header */}
            <View style={styles.headerContainer}>
                <View style={styles.textAndIconContainer}>
                    <AntDesign name="user" size={16} />
                    <Text style={styles.nameText}>
                        {' '}
                        {post.user.name} {post.user.lastname}
                    </Text>
                </View>
                <View style={styles.textAndIconContainer}>
                    <AntDesign name="clockcircleo" size={16} />
                    <Text style={styles.timeText}> {time}</Text>
                </View>
            </View>


            <View >
                {post.content != null && (
                    <Text style={styles.titleText}>{post.content}</Text>
                )}
            </View>

            {post.imageUrl && <View style={{ height: 200, width: widthPercentageToDP('84%') }}>
                <Image source={{ uri: post.imageUrl }} style={styles.image} />
            </View>}

            {/** Footer */}
            <View style={styles.footer}>
                <View style={{ flexDirection: 'row' }}>
                    <LikeButton post={post} />
                    <TouchableOpacity
                        style={styles.textAndIconContainer}
                        onPress={() =>
                            navigation.navigate('Home', {
                                screen: 'Comments',
                                params: { postId: post.id },
                            })
                        }
                    >
                        <Text>    </Text>
                        <AntDesign name="aliwangwang-o1" size={16} />
                        <Text> {post.commentCount} </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.textAndIconContainer}
                    onPress={() =>
                        navigation.navigate('Home', {
                            screen: 'PostDetail',
                            params: { postId: post.id },
                        })
                    }
                >
                    <Text>Detaylar </Text>
                    <AntDesign name="doubleright" size={16} />
                </TouchableOpacity>
            </View>
        </CardView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3,
        marginBottom: 15,
        marginTop: 15,
    },
    textAndIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 2,
    },
    nameText: {
        fontSize: heightPercentageToDP('2.5%'),
        fontFamily: 'Lato-Regular',
    },
    titleText: {
        marginBottom: 10,
        fontSize: heightPercentageToDP('2.5%'),
        fontFamily: 'Lato-Regular',
    },
    timeText: {
        fontSize: heightPercentageToDP('2%'),
        fontFamily: 'Lato-Regular',
    },
    image: {
        borderRadius: 20,
        width: widthPercentageToDP('100%'),
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15,
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
})

export default Card
