import { Dimensions, StyleSheet } from "react-native";

const width_hp = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
        justifyContent:"center",
    },
    header:{
        flexDirection:"row",
        alignItems:"center",
        padding:5
    },
    title:{
        fontWeight:"bold",
        fontSize:20,
        color:"#FA8072"
    },
    icon:{
        margin:10
    },
    col6:{
        width:"50%"
    },
    list:{
        marginTop:10,
        marginBottom:10
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
        padding:5
    },
    img_user:{
        height:30,
        width:30,
        marginRight:10
    },
    img:{
        height:width_hp / 2,
        width:width_hp
    },
    tx_bold:{
        fontWeight:"bold"
    },
    tx_post:{
        color:"#666",
        fontSize:13
    },
    form_in:{
        padding:5
    },
    in:{
        padding:5,
        borderBottomWidth:1,
        borderBottomColor:"#F2F2F2",
    }
})


export default styles;