import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { View, Text, Image, StatusBar, ScrollView, FlatList, Platform, Keyboard, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { format } from 'timeago.js'
import { AntDesign } from '@expo/vector-icons'
import { Card as CardView } from 'react-native-elements'
import { URL, URL_COMMENT } from '../../store/apiUrl';
import { INCREASE_COMMENTS } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';

import TopBar from '../../components/topbar';
import LikeButton from '../../components/likeButton';
import BottomInput from '../../components/BottomInput';
import CommentItem from '../../components/CommentItem';

export default function PostDetail({ route, navigation }) {
  const { postId } = route.params;
  const post = useSelector(state => state.post).posts.find(x => x.id === postId);
  const time = format(post.createdAt)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [disabledAddCommentButton, setDisabledAddCommentButton] = useState(true)
  const [addLoadingComment, setAddLoadingComment] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    const token = await AsyncStorage.getItem('token')
    const response = await Axios.get(URL + URL_COMMENT + post.id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.data) {
      setComments(response.data)
    }
  }

  const onChange = (text) => {
    setComment(text)
    setDisabledAddCommentButton(false)
    if (text == "")
      setDisabledAddCommentButton(true)
  }
  const handleAddComment = async () => {
    const token = await AsyncStorage.getItem('token')
    setAddLoadingComment(true)
    const data = {
      content: comment,
      postId: post.id,
      commentId: -1
    }
    const response = await Axios.post(URL + URL_COMMENT, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.data) {
      response.data.replies = []
      comments.splice(0, 0, response.data);
      Keyboard.dismiss()
      setComment('')
      setDisabledAddCommentButton(true)
      dispatch({ type: INCREASE_COMMENTS, payload: post.id })
    }
    setAddLoadingComment(false)
  }

  const _renderComments = ( item ) => ( 
  <CommentItem comment={item} postId={post.id} comments={comments} setComments={setComments} />
  )

  const _renderPost = () => (
    <CardView>
          <View style={styles.headerContainer}>
            <View style={styles.headerText}>
              <AntDesign name="user" size={16} />
              <Text>{`${post.user.name} ${post.user.lastname}`}</Text>
            </View>
            <View style={styles.headerText}>
              <AntDesign name="clockcircleo" size={16} />

              <Text>{` ${time}`}</Text>
            </View>

          </View>
          <View>
            {post.imageUrl && <View height={300}>
              <Image source={{ uri: post.imageUrl }} style={styles.image} />
            </View>}
            <View style={styles.content}>
              <Text>{post.content}</Text>
            </View>
            <View style={styles.footer}>
              <View></View>
              <LikeButton post={post} />
            </View>
          </View>
        </CardView>
  )

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
      <TopBar title="Post Detail" leftIcon="left" leftIconClick={() => navigation.goBack()} />
        <FlatList
          data={comments}
          renderItem={_renderComments}
          //onEndReached={onEndReached}
          //ListHeaderComponent={_headerCompoenent}
          onEndReachedThreshold={1}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={_renderPost}
        />      
      <BottomInput
        onPressSend={handleAddComment}
        loading_process={addLoadingComment}
        onChange={onChange}
        disabledButton={disabledAddCommentButton}
        comment={comment}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderColor: 'gray',
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  commentsContainer: {

  }
});