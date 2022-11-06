import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './AddPostStyle';
import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from '@rneui/themed';

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            image: null,
        };
    }

    sendContent = () => {
        const { post, image } = this.state;
        const form = new FormData();
        form.append("content", post)
        RestApi.ApiPost('/comment', form).then((res) => {
            console.log(res)
        })
    }

    openImage = () => {
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
                    let image = {
                        uri: response.path,
                        name: img[img.length - 1],
                        type: response.mime
                    }
                    this.setState({ image })
                })
        } catch (error) {
            console.log(error);
        }
    }

    openCamera = () => {
        try {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(response => {
                var img = response.path.split("/");
                let image = {
                    uri: response.path,
                    name: img[img.length - 1],
                    type: response.mime
                }
                this.setState({ image })
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.form_in}>
                        <View style={styles.row}>
                            <Image source={require('../../../assets/image/user_blank.png')} style={styles.img_user} resizeMethod="resize" resizeMode='contain' />
                            <Text style={styles.tx_bold}>nanxshaw</Text>
                        </View>
                        <Text style={styles.tx_desc}>Anyone can see and share this post</Text>
                        <TextInput
                            placeholder="What's new?"
                            style={styles.in}
                            onChangeText={(post) => this.setState({ post })}
                            multiline
                            autoFocus
                        />
                        <TouchableOpacity activeOpacity={.7} onPress={this.sendContent}>
                            <Text>Post</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={this.openImage} style={styles.icon} activeOpacity={.7}>
                            <Icon style={styles.icon} name='image' type="font-awesome-5" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openCamera} style={styles.icon} activeOpacity={.7}>
                            <Icon name='camera' type="font-awesome-5" size={30} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default AddPost;
