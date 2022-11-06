import { Dimensions, StyleSheet } from "react-native";

const width_hp = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
    },
    header:{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomColor:"#CCC",
        borderBottomWidth:1,
    },
    span_icon:{
        marginRight:10,
    },
    title:{
        fontSize:20,
        color:"#555"
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
    },
    tx_btn:{
        color:"#FA8072",
        fontWeight:"bold"
    },
    col_left:{
        width:"80%",
        flexDirection:"row",
        alignItems:"center"
    },
    col_right:{
        width:"20%",
        alignItems:"flex-end",
        paddingRight:5
    },
    img:{
        height: 100,
        width: 100,
        padding:10,
        borderWidth: 1,
        borderColor: "#C5C5C5",
        borderRadius:10,
        marginTop:10
    }
})


export default styles;