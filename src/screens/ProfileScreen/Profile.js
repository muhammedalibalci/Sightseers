import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import TopBar from '../../components/topbar'
import UserProfile from '../../components/UserProfile'
import Card from '../../components/card'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts } from '../../store/actions/postAction'
import { ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'

const post = {
    user: {
        name: 'ali',
        lastName: 'balci',
    },
    content: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Wikipedi    ',
    commentCount: 2,
    createdAt: 100000,
    imageUrl: 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg'
}


function Profile({ navigation }) {

    const [loader, setLoader] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const { myPosts, loading, pagination } = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchUserPosts(pageNumber)
    }, [])

    const fetchUserPosts = (pageNumber) => {
        dispatch(getUserPosts(pageNumber))
    }

    const _renderItem = ({ item }) => (
        <Card navigation={navigation} post={item} />
    )

    const _headerCompoenent = () => {
        return (
            loading ? <ActivityIndicator
                size="small"
                color="gray"
                style={{ paddingTop: 15 }}
            /> : <UserProfile />
        )
    }

    const onEndReached = () => {
        const { HasNext, CurrentPage } = pagination

        setLoader(true)
        if (HasNext && pageNumber != CurrentPage) {
            setPageNumber(CurrentPage)
            fetchUserPosts(CurrentPage + 1)
        }
        setTimeout(() => {
            setLoader(false)
        }, 200)
    }

    const handleRefreshing = () => {
        setRefreshing(true)
        fetchUserPosts(1)
        setTimeout(() => {
            setRefreshing(false)
        }, 300);
    }

    const _footerCompoenent = () => {
        if (
            loader &&
            myPosts.length >= pagination.PageSize &&
            !pagination.HasNext
        ) {
            return <ActivityIndicator size="small" color="gray" />
        }
        return <View style={{ paddingVertical: 20 }} />
    }


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                paddingTop: Platform.OS === 'android' ? 20 : 0,
            }}
        >

            <TopBar title="Profile" />
            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'gray' }} />

            <FlatList
                data={myPosts}
                renderItem={_renderItem}
                onEndReached={onEndReached}
                ListHeaderComponent={_headerCompoenent}
                ListFooterComponent={_footerCompoenent}
                onEndReachedThreshold={1}
                onRefresh={handleRefreshing}
                refreshing={refreshing}
                keyExtractor={(item, index) => index.toString()}
            />


        </SafeAreaView>
    )
}

export default Profile