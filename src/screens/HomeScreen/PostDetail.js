import React from 'react';
import { View, Text, Image, StatusBar, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { format } from 'timeago.js'

import TopBar from '../../components/topbar';

export default function PostDetail({ route, navigation }) {
  const { post } = route.params;
  const time = format(post.createdAt)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
      <TopBar title="Post Detail" leftIcon="left" leftIconClick={() => navigation.goBack()} />
      <View style={styles.headerContainer}>
        <Text>{post.user.username}</Text>
        <Text>{time}</Text>
      </View>
      <View>
        {post.imageUrl && <View height={300}>
          <Image source={{ uri: post.imageUrl }} style={styles.image} />
        </View>}
        <View>
          <Text>{post.content}</Text>
        </View>
        <View>
          <Text>
            Give Point
          </Text>
        </View>
        <View>
          <Text>
            Comments
          </Text>
        </View>
      </View>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover',
  },
});