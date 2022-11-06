import { Dimensions, StyleSheet } from "react-native";

const width_hp = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
    },
    form_in:{
        margin:10
    },
    img_user:{
        height:30,
        width:30,
        marginRight:10
    },
    tx_bold:{
        fontWeight:"bold"
    },
    in:{
        marginBottom:15,
        marginTop:15
    },
    tx_desc:{
        color:"#666",
        fontSize:12
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
    },
    icon:{
        width:"50%",
        justifyContent:"center",
        alignItems:"center"
    }
})


export default styles;