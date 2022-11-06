import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import styles from './HomeStyle';
import { Icon } from '@rneui/themed';
import RestApi from '../../Rest/RestApi';
import { url_img, url_img_profile } from '../../Config/RouteUrl';
import Carousel, { Pagination } from "react-native-snap-carousel";
const width_hp = Dimensions.get('window').width;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      comment: null,
      activeSlide: 0,
    };
  }

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.listContent();
    });
    return unsubscribe;
  }

  listContent = () => {
    RestApi.ApiGet('/content', this.props.token).then((res) => {
      let item =  res.data.data;
      for (let i = 0; i < item.length; i++) {
        item[i].openComment = false;
      }
      this.setState({
        list: item
      })
    })
  }

  sendComment = (item, index) => {
    const { comment, list } = this.state;
    let data = {
      comment,
      id_content: item.id_content,
    }
    RestApi.ApiPost('/comment', data, this.props.token).then((res) => {
      if (res.status == 200) {
        this.textInput.clear();
        var row = list;
        row[index].comments.push({
          comment: data.comment,
          user: {
            username: this.props.user.username
          }
        })
        this.setState({
          list: row
        })
      }
    })
  }

  _renderItemSlider = (item) => {
    return (
      <Image source={{ uri: url_img + item.item.image }} style={styles.img} resizeMethod="resize" resizeMode='cover' />
    )
  }

  pagination(list) {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={list.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          marginBottom: 20,
          marginTop: -55,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          backgroundColor: '#FA8072',
          borderRadius: 10
        }}
        inactiveDotStyle={{
          backgroundColor: 'transparent',
          borderColor: '#676767',
          borderRadius: 10,
          width: 10,
          height: 10,
          borderWidth: 1,
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
    );
  }

  openComment = (item, index) => {
    const { list } = this.state;
    let row = list;
    row[index].openComment = !item.openComment;
    this.setState({
      comment:row
    })
  }

  render() {
    const { list } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.col6}>
            <Text style={styles.title}>Social Media</Text>
          </View>
          <View style={[styles.col6, { alignItems: "flex-end" }]}>
            <TouchableOpacity style={styles.icon} activeOpacity={.7} onPress={() => this.props.navigation.push('AddPost')}>
              <Icon name='plus-square' type='font-awesome-5' color="#FA8072" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <View style={styles.list}>
              <View style={styles.row}>
                <Image source={{ uri: url_img_profile + item.user.image }} style={styles.img_user} resizeMethod="resize" resizeMode='contain' />
                <Text style={styles.tx_bold}>{item.user.username}</Text>
              </View>
              {
                item.images.length > 0 ?
                  <View>
                    <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={item.images}
                      layout={'default'}
                      layoutCardOffset={9}
                      activeSlideOffset={0}
                      inactiveSlideScale={1}
                      renderItem={this._renderItemSlider}
                      sliderWidth={width_hp}
                      itemWidth={width_hp}
                      onSnapToItem={(index) => this.setState({ activeSlide: index })}
                      firstItem={(this.props, 'index', 0)}
                    />

                    {
                      item.images.length > 1 ?
                        this.pagination(item.images)
                        :
                        null
                    }
                  </View>
                  :
                  null
              }
              <View style={styles.form_in}>
                <Text numberOfLines={1} style={styles.tx_post}>{item.desc}</Text>
                {
                  item.comments.length > 0 ?
                    <TouchableOpacity onPress={() => this.openComment(item, index)} activeOpacity={.7} style={styles.row}>
                      <Icon style={{ marginRight: 5 }} name='comment' type='font-awesome-5' color="#FA8072" size={15} />
                      <Text style={styles.tx_comment}>Comment ({item.comments.length})</Text>
                    </TouchableOpacity>
                    :
                    null
                }
                {
                  item.comments.length > 0 && item.openComment == true ?
                    item.comments.map((key, i) => (
                      <View key={i} style={styles.row}>
                        <Text style={[styles.tx_bold, { marginRight: 10 }]}>{key.user.username}</Text>
                        <Text numberOfLines={1} style={styles.tx_post}>{key.comment}</Text>
                      </View>
                    ))
                    :
                    null
                }

                <View style={styles.row}>
                  <View style={styles.col_profile}>
                    <Image source={{ uri: url_img_profile + this.props.user.image }} style={styles.img_user} resizeMethod="resize" resizeMode='contain' />
                    <TextInput
                      ref={input => { this.textInput = input }}
                      placeholder='Add a comment...'
                      style={styles.in}
                      multiline
                      onChangeText={(comment) => this.setState({ comment })}
                    />
                  </View>
                  <TouchableOpacity style={styles.col2} activeOpacity={.7} onPress={() => this.sendComment(item, index)}>
                    <Text style={styles.tx_btn}>Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id_content.toString()}
        />
      </SafeAreaView>
    );
  }
}


const mapStateToProps = (state) => ({ token: state.token, user: state.user })

const connectComponent = connect(mapStateToProps);
export default connectComponent(Home);
