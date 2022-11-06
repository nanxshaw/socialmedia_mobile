import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from './HomeStyle';
import { Icon } from '@rneui/themed';
import RestApi from '../../Rest/RestApi';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      comment: null
    };
  }

  componentDidMount(){
    this.listContent();
  }

  listContent = () => {
    RestApi.ApiGet('/content',this.props.token).then((res) => {
      this.setState({
        list:res.data.data
      })
    })
  }

  sendComment = () => {
    const { comment } = this.state;
    let data = {
      comment
    }
    RestApi.ApiPost('/comment',data).then((res) => {
        console.log(res)
    })
  }

  render() {
    const { list } = this.state;
    let url_img_profile = 'http://localhost:8080/image_profile/';
    let url_img = 'http://localhost:8080/images/';
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
                <Image source={require('../../../assets/image/user_blank.png')} style={styles.img_user} resizeMethod="resize" resizeMode='contain' />
                <Text style={styles.tx_bold}>nanxshaw</Text>
              </View>
              <Image source={{ uri: url_img + item.image }} style={styles.img} resizeMethod="resize" resizeMode='cover' />
              <View style={styles.form_in}>
                <Text numberOfLines={1} style={styles.tx_post}>{item.desc}</Text>
                <View style={styles.row}>
                  <Image source={{uri:url_img_profile + this.props.user.image}} style={styles.img_user} resizeMethod="resize" resizeMode='contain' />
                  <TextInput
                    placeholder='Add a comment...'
                    style={styles.in}
                    onChangeText={(comment) => this.setState({ comment })}
                  />
                  <TouchableOpacity activeOpacity={.7} onPress={this.sendComment}>
                    <Text>Post</Text>
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


const mapStateToProps = (state) => ({ token: state.token, user:state.user })

const connectComponent = connect(mapStateToProps);
export default connectComponent(Home);
