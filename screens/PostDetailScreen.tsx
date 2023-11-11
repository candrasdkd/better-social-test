import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import IconBack from '../assets/back.png';
import IconBlock from '../assets/block.png';
import IconComment from '../assets/comment.png';
import IconDownvoteActive from '../assets/downvote_active.png';
import IconDownvoteInactive from '../assets/downvote_inactive.png';
import IconShare from '../assets/share.png';
import IconUpvoteActive from '../assets/upvote_active.png';
import IconUpvoteInactive from '../assets/upvote_inactive.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PostDetailScreen() {
  const min = 1;
  const max = 100;
  const randomNumber =
    Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(randomNumber);

  const route = useRoute<any>();
  const navigation = useNavigation();
  const [comment, setComment] = useState<String>('')
  const [newData, setNewData] = useState({})
  const commentInputRef = useRef<any>(null);
  const receivedData = Object.keys(newData).length > 0 ? newData : route.params?.data;
  const handleSend = async () => {
    if (comment !== '') {
      try {
        const existingData = await AsyncStorage.getItem('data');
        const dataArray = existingData ? JSON.parse(existingData) : [];
        const updatedListData = dataArray.map((item: any) => {
          if (item.id === receivedData.id) {
            const firstRandomNumber =
              Math.floor(Math.random() * (50 - 1 + 1)) + 1;
            const secondRandomNumber =
              Math.floor(Math.random() * (100 - 50 + 1)) + 50;
            const newComment = {
              id: `${firstRandomNumber}${secondRandomNumber}`,
              name: `Annonymous_${firstRandomNumber}_${secondRandomNumber}`,
              message: comment,
              picture: 'https://fastly.picsum.photos/id/92/3568/2368.jpg?hmac=k-61p7oMQe6U59dEgm0Gu6bWTJGPfHblWxMskxTBZMo'
            };
            item.dataComment.push({ ...newComment });
          }
          return item;
        });
        let filterData = updatedListData.find((item: any) => item.id === receivedData.id)
        setNewData(filterData)
        setComment('')
        commentInputRef.current?.clear();
        Keyboard.dismiss();
        await AsyncStorage.setItem('data', JSON.stringify(updatedListData));
      } catch (error: any) {
        Alert.alert(error.message)
      }
    } else {
      Alert.alert('Message is still empty')
    }
  }


  const handleUpVotes = async (idPost: number) => {
    const existingData = await AsyncStorage.getItem('data');
    const dataArray = existingData ? JSON.parse(existingData) : [];
    const updatedListData = dataArray.map((item: any) => {
      if (item.id === idPost) {
        if (item.upvotes) {
          return { ...item, tempVote: item.totalVote, upvotes: false, downvotes: false }
        } else {
          return { ...item, tempVote: item.totalVote + 1, upvotes: true, downvotes: false }
        }
      }
      return item;
    });
    let filterData = updatedListData.find((item: any) => item.id === receivedData.id)
    setNewData(filterData)
    await AsyncStorage.setItem('data', JSON.stringify(updatedListData));
  }

  const handleDownVotes = async (idPost: number) => {
    const existingData = await AsyncStorage.getItem('data');
    const dataArray = existingData ? JSON.parse(existingData) : [];
    const updatedListData = dataArray.map((item: any) => {
      if (item.id === idPost) {
        if (item.downvotes) {
          return { ...item, tempVote: item.totalVote, upvotes: false, downvotes: false }
        } else {
          return { ...item, tempVote: item.totalVote - 1, upvotes: false, downvotes: true }
        }
      }
      return item;
    });
    let filterData = updatedListData.find((item: any) => item.id === receivedData.id)
    setNewData(filterData)
    await AsyncStorage.setItem('data', JSON.stringify(updatedListData));
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack()
      return true;
    });

    // Cleanup the event listener when the component is unmounted
    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View
        style={{
          height: 64,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.goBack()}>
          <Image
            source={IconBack}
            height={20}
            width={20}
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>
        <Image
          source={{ uri: receivedData.picture, }}
          width={48}
          height={48}
          style={{ borderRadius: 24, marginLeft: 24 }}
        />
        <View style={{ marginLeft: 16 }}>
          <Text
            style={{ fontWeight: '600', fontSize: 14, lineHeight: 16.94, color: '#000' }}>
            {receivedData.name}
          </Text>
          <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 18, color: '#000' }}>
            {receivedData.date}
          </Text>
        </View>
      </View>
      <View style={{ height: 0.5, backgroundColor: '#C4C4C4' }} />
      <ScrollView style={{ marginBottom: 48 }} contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={{ height: 500 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ margin: 24, color: '#000', textAlign: 'justify' }}>
              {receivedData.body}
            </Text>
            <Image
              source={{ uri: receivedData.postImage, }}
              style={{ flex: 1 }}
            />
          </View>
          <View
            style={{
              height: 52,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <Image
                source={IconShare}
                height={18}
                width={18}
                style={{ marginLeft: 22 }}
              />
              <Image
                source={IconComment}
                height={18}
                width={18}
                style={{ marginLeft: 24 }}
              />
              <Text
                style={{
                  width: 24,
                  marginHorizontal: 4,
                  textAlign: 'center',
                  color: '#000'
                }}>
                {receivedData.dataComment.length}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={IconBlock}
                height={18}
                width={18}
                style={{ marginLeft: 22 }}
              />
              <TouchableOpacity onPress={() => handleDownVotes(receivedData.id)}>
                <Image
                  source={receivedData.downvotes === true ? IconDownvoteActive : IconDownvoteInactive}
                  height={18}
                  width={18}
                  style={{ marginLeft: 24 }}
                />
              </TouchableOpacity>
              {receivedData.tempVote === 0 &&
                <Text style={[styles.textInactive, styles.downvote]}>
                  {receivedData.tempVote}
                </Text>
              }
              {receivedData.downvotes &&
                <Text style={[styles.textDownvote, styles.downvote]}>
                  {receivedData.tempVote}
                </Text>
              }
              {receivedData.upvotes &&
                <Text style={[styles.textUpvote, styles.downvote]}>
                  {receivedData.tempVote}
                </Text>
              }
              <TouchableOpacity onPress={() => handleUpVotes(receivedData.id)}>
                <Image
                  source={receivedData.upvotes ? IconUpvoteActive : IconUpvoteInactive}
                  height={18}
                  width={18}
                  style={{ marginRight: 22 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {receivedData?.dataComment.length > 0 ?
          <View>
            {receivedData?.dataComment.map((item: any, index: number) => {
              return (
                <View key={item.id.toString()}>
                  <View style={{ height: index === 0 ? 4 : 0.5, backgroundColor: '#C4C4C4' }} />
                  <View
                    style={{
                      flexDirection: 'row',
                      minHeight: 72,
                      paddingVertical: 16,
                      paddingHorizontal: 24,
                    }}
                  >
                    <Image
                      source={{ uri: item.picture, }}
                      width={36}
                      height={36}
                      style={{ borderRadius: 24, marginRight: 16 }}
                    />
                    <View style={{ width: '90%' }}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 12,
                          lineHeight: 14.52,
                          color: '#828282',
                        }}>
                        {item.name}
                      </Text>
                      <Text style={{ fontWeight: '400', fontSize: 16, lineHeight: 19.36, color: '#000' }}>
                        {item.message}
                      </Text>
                    </View>
                  </View>
                  <View style={{ height: 0.5, backgroundColor: '#C4C4C4' }} />
                </View>
              )
            })}
          </View> :
          <>
            <View style={{ height: 0.5, backgroundColor: '#C4C4C4' }} />
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <Text style={{ fontWeight: '800', color: '#000' }}>No Comment Yet</Text>
            </View>
          </>
        }
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          ref={commentInputRef}
          placeholder="Enter Comment"
          placeholderTextColor={'#C4C4C4'}
          multiline
          style={styles.input}
          onChangeText={(e) => setComment(e)}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 15,
            right: 15,
          }}>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 10,
              backgroundColor: '#39A7FF'
            }}
            onPress={handleSend}
          >
            <Text style={{ fontWeight: '500', color: '#fff' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PostDetailScreen;

const styles = StyleSheet.create({
  textBody: { color: '#000' },
  textInactive: { color: '#C4C4C4' },
  textUpvote: { color: '#00ADB5' },
  textDownvote: { color: '#FF2E63' },
  footer: {
    flex: 1,
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 15,
    zIndex: 10,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: '#C4C4C4'
  },
  input: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '80%',
    color: '#000',
    borderRadius: 10,
    borderColor: '#C4C4C4',
    backgroundColor: 'rgba(222, 222, 222, 0.8)',
  },
  downvote: {
    width: 24,
    marginHorizontal: 5,
    textAlign: 'center',
  },
})
