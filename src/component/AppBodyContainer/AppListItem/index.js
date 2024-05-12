import React, { useState } from "react";
import { View, Text, TouchableOpacity, DeviceEventEmitter } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditModal from "../../AppEditModal";
import styles from "./styles";
import { ApiCall, ApiMethod } from "../../../services/AxiosInstance";

export default function ListItem ({todo}){

    const [editModal, setEditModal] = useState({ visible: false });
    const [taskId, setTaskID] = useState('');
    const [taskName, setTaskName] = useState('');

    const deleteTodoFromDirectus = async (todo_id) => {
        await ApiCall({
            apiEndpoint: `/items/todos/${todo_id}`,
            method: ApiMethod.DELETE,
        }).then((response) => {
            DeviceEventEmitter.emit('fetch_todo');
            console.log("Successfully deleted!");
        }).catch((error) => {
            console.log("ERROR DELETE: ", error);
        })
    };

    const openEditModal = (todo_id) => {
        setEditModal({ visible: true });
        setTaskID(todo_id);
        setTaskName(todo.todo_name);
    };

    const updateTodoStatusInDirectus = async (todo_id) => {
        const completed = 'Complete';
        await ApiCall({
            apiEndpoint: `/items/todos/${todo_id}`,
            method: ApiMethod.PATCH,
            apiData: {
                todo_status: completed
            }
        }).then((response) => {
            DeviceEventEmitter.emit('fetch_todo');
            console.log("Successfully updated!");
        }).catch((error) => {
            console.log("ERROR UPDATE: ", error);
        })
    };

    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: '#1f145c',
                        textDecorationLine: todo?.todo_status === 'Complete' ? 'line-through' : 'none',
                    }}>
                    {todo?.todo_name}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        color: '#1f145c',
                        textDecorationLine: todo?.todo_status  === 'Complete' ? 'line-through' : 'none',
                        textAlign: 'right',
                        marginTop: 10,
                        marginRight: 5,
                    }}>
                    {todo?.date_created}
                </Text>
            </View>
            {todo?.todo_status === 'Incomplete' && (
                <TouchableOpacity onPress={() => updateTodoStatusInDirectus(todo.id)}>
                    <View style={[styles.actionIcon, { backgroundColor: 'green' }]}>
                        <Icon name="done" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            )}
            {todo?.todo_status === 'Incomplete' && (<TouchableOpacity onPress={() => openEditModal(todo.id)}>
                <View style={[styles.actionIcon, { backgroundColor: 'blue' } ]}>
                    <Icon name="edit" size={20} color="white" />
                </View>
            </TouchableOpacity>)}
            <TouchableOpacity onPress={() => deleteTodoFromDirectus(todo.id)}>
                <View style={styles.actionIcon}>
                    <Icon name="delete" size={20} color="white" />
                </View>
            </TouchableOpacity>
            <EditModal
                visible = {editModal.visible}
                toggleModal={() => setEditModal({ visible: false })}
                taskId = {taskId}
                taskName = {taskName}
            />
        </View>
    );

}