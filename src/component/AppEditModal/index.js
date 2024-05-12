import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import { ApiCall, ApiMethod } from "../../services/AxiosInstance";

export default function EditModal ({visible, toggleModal, taskId, taskName}){

    const [editInput, setEditInput] = useState('');

    const editTodoInDirectus = async () => {
        if (editInput == '') {
            Alert.alert('Ops!', 'Please input an edited todo.');
        } else {
            await ApiCall({
                apiEndpoint: `/items/todos/${taskId}`,
                method: ApiMethod.PATCH,
                apiData: {
                    todo_name: editInput
                }
            }).then((response) => {
                console.log("Successfully updated!");
                toggleModal();
            }).catch((error) => {
                console.log("ERROR UPDATE EDIT: ", error);
            })
        }
    };

    return (
        <Modal transparent visible={visible} onRequestClose={toggleModal}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.cancel} onPress={toggleModal} />
                <View style={styles.modalContainer}>
                    <View>
                        <Text style={styles.title}>EDIT TASK NAME </Text>
                        <View style = {styles.editContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput               
                                    defaultValue={taskName}
                                    onChangeText={text => setEditInput(text)}
                                />
                            </View>
                            <TouchableOpacity onPress={editTodoInDirectus}>
                                <View style={styles.icon}>
                                    <Icon name="check" color="white" size={30} />
                                </View>
                            </TouchableOpacity>
                        </View>                      
                    </View>
                </View>
            </View>
        </Modal>
    )

}