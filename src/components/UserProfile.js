import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/actions/authAction';

function UserProfile() {
    const { id, name, lastName, userName, storyCount, likeCount } = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(id))
    }, [])

    return (
        name ? <View style={styles.container}>

            <View style={styles.topContainer}>
                <Text style={styles.name}>{name} {lastName}</Text>
                <Text style={styles.username}>@{userName}</Text>
            </View>

            <View style={styles.bottomContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.countText}>Stories </Text>
                    <Text style={styles.count}> {storyCount} </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.countText}>Likes </Text>
                    <Text style={styles.count}> {likeCount} </Text>
                </View>
            </View>

        </View> : null
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        flexDirection: 'column',
        alignItems: 'center'
    },
    topContainer: {
        marginTop: 10
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    name: {
        fontSize: heightPercentageToDP('2.5%'),
        fontFamily: 'Lato-Bold'
    },
    username: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('2%'),
        fontFamily: 'Lato-Regular',
        marginTop: 5
    },
    countText: {
        fontSize: heightPercentageToDP('2.3%'),
        fontFamily: 'Lato-Regular',
        marginLeft: 20
    },
    count: {
        fontSize: heightPercentageToDP('2.3%'),
        fontFamily: 'Lato-Bold',
        marginRight: 20
    }
})


export default UserProfile
