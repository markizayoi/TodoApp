import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    inputContainer: {
        height: 50,
        paddingHorizontal: 20,
        elevation: 40,
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    iconContainer: {
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