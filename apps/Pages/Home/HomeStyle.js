import { Dimensions, StyleSheet } from "react-native";

const width_hp = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#FA8072"
    },
    icon: {
        margin: 10
    },
    col6: {
        width: "50%"
    },
    list: {
        marginTop: 10,
        marginBottom: 10
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5
    },
    img_user: {
        height: 30,
        width: 30,
        padding:5,
        borderWidth: 1,
        borderColor: "#C5C5C5",
        borderRadius:15,
        marginRight:10
    },
    img: {
        height: width_hp / 2,
        width: width_hp
    },
    tx_bold: {
        fontWeight: "bold"
    },
    tx_post: {
        color: "#666",
        fontSize: 13
    },
    form_in: {
        padding: 5
    },
    in: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        width:width_hp - 100
    },
    tx_btn: {
        color: "#FA8072",
        fontWeight: "bold"
    },
    col_profile: {
        flexDirection: "row",
        alignItems: "center",
        width:width_hp - 50
    },
    col2: {
        width: 50
    },
    tx_comment:{
        fontSize:12,
        color:"#FA8072"
    }
})


export default styles;