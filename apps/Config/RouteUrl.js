import { Platform } from "react-native";

const base_url = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://192.168.1.4:8080';
const url_link = base_url + '/api';
const  url_img_profile =base_url + '/image_profile/';
const url_img = base_url + '/images/';

export {
    url_img_profile,
    url_img,
    url_link
} 