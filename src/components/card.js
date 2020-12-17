import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
} from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { format } from 'timeago.js'
import { Card as CardView } from 'react-native-elements'
import LikeButton from './likeButton'
import { widthPercentageToDP } from 'react-native-responsive-screen'
function Card({ navigation, post }) {
    const time = format(new Date(post.createdAt))
    const { width } = Dimensions.get('window')

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

            <View style={{ height: 100 }}>
                <Image
                    style={styles.image}
                    resizeMode={'center'}
                    source={{ uri: post.imageUrl }}
                />
            </View>

            <View style={{paddingVertical: 50, textAlign: 'left'}}>
                {/** Title */}
                {post.content != null && (
                    <Text style={styles.titleText}>{post.content}</Text>
                )}
            </View>

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
                        <Text> {post.commentCount} </Text>
                        <AntDesign name="aliwangwang-o1" size={16} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.textAndIconContainer}
                    onPress={() => console.log('Detaya tıkladı')}
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
        padding: 10,
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
        fontSize: heightPercentageToDP('2.3%'),
        fontFamily: 'lato-Regular',
    },
    titleText: {
        marginBottom: 10,
        fontSize: heightPercentageToDP('2.5%'),
        fontFamily: 'lato-Regular',
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
