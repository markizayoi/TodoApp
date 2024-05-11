import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from "react-redux";
import { setTodos } from "../../redux/counterSlice";
import styles from "./styles";
import axios from 'axios';

export default function EditModal ({visible, toggleModal, taskId, taskName}){

    const dispatch = useDispatch();
    const [editInput, setEditInput] = useState('');

    const editTodo = () => {
        if (editInput == '') {
            Alert.alert('Ops!', 'Please input an edited todo.');
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    axios.put(`http://192.168.0.124:3300/todos/${taskId}`, {
                        "task_id": taskId,
                        "task_name": editInput,
                        "completed": false,
                    }).then(response => {
                        axios.get("http://192.168.0.124:3300/todos").then(response => {
                            resolve(dispatch(setTodos(response.data)))
                        })
                    }).catch(error => reject('There was an error: ' + error));
                    toggleModal();
                }, 10)        
            })
            
            
        }
    }

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
                            <TouchableOpacity onPress={editTodo}>
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