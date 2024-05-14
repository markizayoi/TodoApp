import React, { useState } from "react";
import { View, Text, Alert, DeviceEventEmitter } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import SortModal from "../AppSortModal";
import styles from "./styles";
import { ApiCall, ApiMethod } from "../../services/AxiosInstance";

export default function AppHeader ({}){

    const [sortModal, setSortModal] = useState({ visible: false});

    const deleteAllTodoFromDirectus = async () => {
        Alert.alert('Confirmation!', 'Clear all todo?', [
            {
                text: 'Yes',
                onPress: async () => {
                    try {
                        await ApiCall({
                            apiEndpoint: `/api/test`,
                            method: ApiMethod.GET,
                        });
                        console.log("Successfully all deleted!");
                        DeviceEventEmitter.emit('fetch_todo');
                    } catch (error) {
                        console.log("ERROR DELETE ALL: ", error);
                    }
                }
            },
            {
                text: 'No',
            },
        ]);
    };

    const openSortModal = () => {
        setSortModal({visible: true});
    };
    
    return (
        <View style={styles.header}>
            <Text style={{fontWeight: 'bold', fontSize: 24, color: '#1f145c'}}>
                TODO APP DIRECTUS
            </Text>
            <View style={{ display: "flex", flexDirection: 'row'}}>
                <Icon name="sort" size={30} color="black" onPress={() => openSortModal()}  />
                <Icon name="delete" size={30} color="red" onPress={deleteAllTodoFromDirectus} />
            </View>
            <SortModal 
                visible = {sortModal.visible}
                toggleModal={() => setSortModal({ visible: false })}
            />
        </View>
    )
}