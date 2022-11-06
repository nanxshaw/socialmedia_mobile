import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
        justifyContent:"center",
    },
    form_input:{
        margin:10
    },
    form_btn:{
        margin:10
    },
    in: {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      padding: 10,
      paddingLeft: 10,
      borderRadius:10,
      borderWidth:1,
      borderColor:"#c5c5c5",
      marginBottom:10
    },
    btn_primary: {
      backgroundColor: "#00BFFF",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      padding: 10,
      marginBottom:10
    },
    btn_outline:{
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#c5c5c5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom:10
    },
    tx_primary:{
        color:"#FFF",
        fontWeight:"bold"
    },
    tx_out:{
        color:"#666",
        fontWeight:"bold"
    },
    btn_google: {
        padding: 15,
        backgroundColor: '#F08080',
        borderRadius: 5,
        alignItems: 'flex-start',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_img: {
        width: 20,
        height: 20,
        marginRight:10
    },
})


export default styles;