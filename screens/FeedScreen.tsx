import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IconBlock from '../assets/block.png';
import IconComment from '../assets/comment.png';
import IconDownvoteActive from '../assets/downvote_active.png';
import IconDownvoteInactive from '../assets/downvote_inactive.png';
import IconShare from '../assets/share.png';
import IconUpvoteActive from '../assets/upvote_active.png';
import IconUpvoteInactive from '../assets/upvote_inactive.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FeedScreen() {
  const navigation = useNavigation<any>();
  const [listData, setListData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const totalVote = 0
  const dummyData = [
    {
      id: 1,
      picture: 'https://picsum.photos/id/65/367/267',
      name: 'Usup Suparma',
      date: 'Mar 27, 2023',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, `,
      postImage: 'https://picsum.photos/id/103/367/267',
      totalVote: totalVote,
      tempVote: totalVote,
      showFullText: false,
      upvotes: false,
      downvotes: false,
      dataComment: []
    },
    {
      id: 2,
      picture: 'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4',
      name: 'Usup Suparma',
      date: 'Mar 27, 2023',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum.`,
      postImage: 'https://picsum.photos/id/42/367/267',
      totalVote: totalVote,
      tempVote: totalVote,
      showFullText: false,
      upvotes: false,
      downvotes: false,
      dataComment: []
    },
    {
      id: 3,
      picture: 'https://picsum.photos/id/31/367/267',
      name: 'Usup Suparma',
      date: 'Mar 27, 2023',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum.`,
      postImage: 'https://fastly.picsum.photos/id/68/4608/3072.jpg?hmac=0KfOS12jehkc6HbfMXWj3GMFve9kVs82dYsN12Npn2Y',
      totalVote: totalVote,
      tempVote: totalVote,
      showFullText: false,
      upvotes: false,
      downvotes: false,
      dataComment: []
    },
  ];
  const dummyDataString = JSON.stringify(dummyData);

  const storeData = async () => {
    const existingData: any = await AsyncStorage.getItem('data');
    const dataArray = existingData ? JSON.parse(existingData) : [];

    if (dataArray.length > 0) {
      console.log('tes1');

      try {
        await AsyncStorage.setItem('data', JSON.stringify(dataArray));
        setListData(dataArray)
        setLoading(false)
      } catch (e: any) {
        Alert.alert(e || e.message)
      };
    } else {
      console.log('tes2');
      try {
        await AsyncStorage.setItem('data', dummyDataString);
        setListData(dummyData)
        setLoading(false)
      } catch (e: any) {
        Alert.alert(e || e.message)
      };
    }
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('data');
      setListData(jsonValue != null ? JSON.parse(jsonValue) : [])
      setLoading(false)
    } catch (e: any) {
      Alert.alert(e || e.message)
    }
  };

  const toggleTextForItem = (itemId: number) => {
    setListData((prevListData: any) =>
      prevListData.map((item: any) =>
        item.id === itemId ? { ...item, showFullText: !item.showFullText } : item
      )
    );
  };

  const handleUpVotes = async (idPost: number) => {
    const updatedListData = listData.map((item: any) => {
      if (item.id === idPost) {
        if (item.upvotes) {
          return { ...item, tempVote: item.totalVote, upvotes: false, downvotes: false }
        } else {
          return { ...item, tempVote: item.totalVote + 1, upvotes: true, downvotes: false }
        }
      }
      return item;
    });
    setListData(updatedListData)
    await AsyncStorage.setItem('data', JSON.stringify(updatedListData));
  }

  const handleDownVotes = async (idPost: number) => {
    const updatedListData = listData.map((item: any) => {
      if (item.id === idPost) {
        if (item.downvotes) {
          return { ...item, tempVote: item.totalVote, upvotes: false, downvotes: false }
        } else {
          return { ...item, tempVote: item.totalVote - 1, upvotes: false, downvotes: true }
        }
      }
      return item;
    });
    setListData(updatedListData)
    await AsyncStorage.setItem('data', JSON.stringify(updatedListData));
  }

  useEffect(() => {
    storeData()
  }, [])

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // When the screen gains focus, fetch the data
      getData();
    });

    return () => {
      // Cleanup the subscription when the component unmounts
      unsubscribeFocus();
    };
  }, [navigation]);


  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} animated />
      {loading === true && listData?.length === 0 ?
        <View style={{ height: '100%', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
        :
        <ScrollView>
          {listData.map((item: any) => {
            return (
              <Pressable onPress={() => navigation.navigate('post-detail', { data: item })} key={item.id}>
                <View style={{ height: 547 }}>
                  <View style={styles.row}>
                    <Image
                      source={{ uri: item.picture, }}
                      width={48}
                      height={48}
                      style={styles.avatar}
                    />
                    <View style={{ marginLeft: 16 }}>
                      <Text
                        style={[styles.fullname, styles.textBody]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.datePost, styles.textBody]}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                  <View style={{ height: 0.5, backgroundColor: '#C4C4C4' }} />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[styles.contentPost, styles.textBody, { marginBottom: item.body.length <= 160 ? 15 : 0 }]}
                      numberOfLines={item.body.length > 160 && !item.showFullText ? 3 : undefined}
                    >
                      {item.body}
                    </Text>
                    {item.body.length > 160 &&
                      <TouchableOpacity
                        style={styles.buttonDetail}
                        onPress={() => toggleTextForItem(item.id)} >
                        <Text style={{ color: '#39A7FF' }}>
                          {!item.showFullText ? 'Show More >>' : 'Show Less <<'}
                        </Text>
                      </TouchableOpacity>
                    }
                    <Image
                      source={{ uri: item.postImage }}
                      style={{ flex: 1 }}
                    />
                  </View>

                </View>
                <View style={styles.footer}>
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
                      style={[item.dataComment.length === 0 ? styles.textInactive : styles.textBody, styles.comment]}>
                      {item.dataComment.length}
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
                    <TouchableOpacity onPress={() => handleDownVotes(item.id)}>
                      <Image
                        source={item.downvotes === true ? IconDownvoteActive : IconDownvoteInactive}
                        height={18}
                        width={18}
                        style={{ marginLeft: 24 }}
                      />
                    </TouchableOpacity>
                    {item.tempVote === 0 &&
                      <Text style={[styles.textInactive, styles.downvote]}>
                        {item.tempVote}
                      </Text>
                    }
                    {item.downvotes &&
                      <Text style={[styles.textDownvote, styles.downvote]}>
                        {item.tempVote}
                      </Text>
                    }
                    {item.upvotes &&
                      <Text style={[styles.textUpvote, styles.downvote]}>
                        {item.tempVote}
                      </Text>
                    }
                    <TouchableOpacity onPress={() => handleUpVotes(item.id)}>
                      <Image
                        source={item.upvotes ? IconUpvoteActive : IconUpvoteInactive}
                        height={18}
                        width={18}
                        style={{ marginRight: 20 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ height: 4, backgroundColor: '#C4C4C4' }} />
              </Pressable>
            )
          })}
        </ScrollView>
      }
    </SafeAreaView>
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  row: {
    height: 64,
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: { borderRadius: 24, marginLeft: 24 },
  fullname: { fontWeight: '600', fontSize: 14, lineHeight: 16.94 },
  datePost: { fontWeight: '400', fontSize: 12, lineHeight: 18 },
  textBody: { color: '#000' },
  textInactive: { color: '#C4C4C4' },
  textUpvote: { color: '#00ADB5' },
  textDownvote: { color: '#FF2E63' },
  contentPost: { marginHorizontal: 24, marginTop: 24, textAlign: 'justify' },
  footer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonDetail: {
    padding: 5,
    width: 100,
    marginRight: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  comment: {
    width: 24,
    marginHorizontal: 4,
    textAlign: 'center',
  },
  downvote: {
    width: 24,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  upvote: {
    width: 24,
    marginLeft: 5,
    marginRight: 10,
    textAlign: 'center',
  },
})
