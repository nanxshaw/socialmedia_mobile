import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import styles from './AddPostStyle';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from '@rneui/themed';
import { url_img_profile } from '../../Config/RouteUrl';
import RestApi from '../../Rest/RestApi';

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            image: [],
        };
    }

    sendContent = () => {
        const { post, image } = this.state;
        if (post != null || post != '' || image.length > 0) {
            const form = new FormData();
            form.append("desc", post);
            for (let i = 0; i < image.length; i++) {
                form.append("image", image[i]);
            }
            RestApi.ApiPost('/content', form, this.props.token, 'form').then((res) => {
                if (res.status == 200) {
                    this.props.navigation.pop();
                }
            })
        } else {
            Alert.alert('Notice','Field is empty!')
        }
    }

    openImage = () => {
        const { image } = this.state;
        try {
            ImagePicker.openPicker({
                width: 400,
                height: 400,
                compressImageMaxHeight: 400,
                compressImageMaxWidth: 400,
                cropping: true,
            })
                .then(response => {
                    var img = response.path.split("/");
                    let imgs = {
                        uri: response.path,
                        name: img[img.length - 1],
                        type: response.mime
                    }
                    image.push(imgs);
                    this.setState({ image })
                })
        } catch (error) {
            console.log(error);
        }
    }

    openCamera = () => {
        const { image } = this.state;
        try {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(response => {
                var img = response.path.split("/");
                let imgs = {
                    uri: response.path,
                    name: img[img.length - 1],
                    type: response.mime
                }
                image.push(imgs);
                this.setState({ image })
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { image } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.col_left}>
                        <TouchableOpacity style={styles.span_icon} activeOpacity={.7} onPress={() => this.props.navigation.pop()}>
                            <Icon name='chevron-left' type="font-awesome-5" color="#666" size={18} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Social Media</Text>
                    </View>
                    <View style={styles.col_right}>
                        <TouchableOpacity activeOpacity={.7} onPress={this.sendContent}>
                            <Text style={styles.tx_btn}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.form_in}>
                        <View style={styles.row}>
                            <Image source={{ uri: url_img_profile + this.props.user.image }} style={styles.img_user} resizeMethod="resize" resizeMode='contain' />
                            <Text style={styles.tx_bold}>{this.props.user.username}</Text>
                        </View>
                        <Text style={styles.tx_desc}>Anyone can see and share this post</Text>
                        <TextInput
                            placeholder="What's new?"
                            style={styles.in}
                            onChangeText={(post) => this.setState({ post })}
                            multiline
                            autoFocus
                        />
                        {
                            image.length > 0 ?
                                <FlatList
                                    horizontal
                                    data={image}
                                    renderItem={({ item, index }) => (
                                        <Image source={{ uri: item.uri }} style={styles.img} resizeMethod="resize" resizeMode='cover' />
                                    )}
                                />
                                :
                                null
                        }
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={this.openImage} style={styles.icon} activeOpacity={.7}>
                            <Icon style={styles.icon} name='image' type="font-awesome-5" size={30} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openCamera} style={styles.icon} activeOpacity={.7}>
                            <Icon name='camera' type="font-awesome-5" size={30} color="#666" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => ({ token: state.token, user: state.user })

const connectComponent = connect(mapStateToProps);
export default connectComponent(AddPost);
