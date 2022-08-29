import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.5)"
    },
    cancelContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    modalContainer: {
        width: "85%",
        height: "auto",
        backgroundColor: "white",
    },
    title : {
        fontSize: 25,
        color: "#FFFFFF",
        backgroundColor: "#1f145c",
        padding: 10,
        textTransform: "uppercase",
    },
    selectCategory:{
        fontSize: 20,
        color: "#1f145c",
        backgroundColor: "#FFFFFF",
        padding: 10,
        textAlign: "center",
    }
})

export default styles;