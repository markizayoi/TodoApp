import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    listItem: {
        padding: 20,
        backgroundColor: '#f5d00a',
        flexDirection: 'row',
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,
        alignItems: 'center',
    },
    actionIcon: {
        height: 25,
        width: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        marginLeft: 15,
        borderRadius: 3,
    },
})

export default styles;