import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.5)"
    },
    cancel: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    modalContainer: {
        width: "85%",
        height: "auto",
        backgroundColor: "white",
    },
    title: {
        fontSize: 25,
        color: "#FFFFFF",
        backgroundColor: "#1f145c",
        padding: 10,
        textTransform: "uppercase",
    },
    editContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    inputContainer: {
        height: 50,
        paddingHorizontal: 10,
        elevation: 40,
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginVertical: 10,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    icon: {
        height: 50,
        width: 50,
        backgroundColor: '#1f145c',
        elevation: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },   
})

export default styles;