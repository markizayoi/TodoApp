import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "../../../redux/counterSlice";
//import { db } from "../../../services/dbServices";
import EditModal from "../../AppEditModal";
import styles from "./styles";
import axios from 'axios';

export default function ListItem ({todo}){

    const dispatch = useDispatch();
    //const todos = useSelector((state) => state.todoData.todos);
    const [editModal, setEditModal] = useState({ visible: false });
    const [taskId, setTaskID] = useState('');
    const [taskName, setTaskName] = useState('');

    const deleteTodo = todoId => {
        {/*
        db.transaction((del) => {
            del.executeSql(
                'DELETE FROM todotask where task_id=?',
                [todoId],
            );
            const newTodosItem = todos.filter(item => item.task_id != todoId);
            dispatch(setTodos(newTodosItem))
        });  
        */}
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.delete(`http://192.168.1.102:3300/todos/${todoId}`);
                axios.get("http://192.168.1.102:3300/todos").then(response => {
                    resolve(dispatch(setTodos(response.data)));
                }).catch(error => alert('There was an error:' + error));
            }, 10)
        })
    };

    const openEditModal = todoId => {
        setEditModal({ visible: true })
        setTaskID(todoId)
        setTaskName(todo.task_name);
    }

    const markTodoComplete = todoId => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const completed = true;
                axios.put(`http://192.168.1.102:3300/todos/${todoId}`, {
                    "task_id": todoId,
                    "task_name": todo.task_name,
                    "completed": completed,
                }).then(response => {
                    axios.get("http://192.168.1.102:3300/todos").then(response => {
                        resolve(dispatch(setTodos(response.data)))
                    })
                }).catch(error => alert('There was an error:' + error));
            }, 10)
        })     
        {/*
        db.transaction((update) => {
            const completed = true;
            update.executeSql(
                'UPDATE todotask set completed = ? where task_id=?',
                [completed, todoId],
            );
            const newTodosItem = todos.map(item => {
                if (item.task_id == todoId) {
                    return { ...item, completed: true };
                }
                return item;
            });
            dispatch(setTodos(newTodosItem))
        }); 
        */}
    };

    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: '#1f145c',
                        textDecorationLine: todo?.completed ? 'line-through' : 'none',
                    }}>
                    {todo?.task_name}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        color: '#1f145c',
                        textDecorationLine: todo?.completed ? 'line-through' : 'none',
                        textAlign: 'right',
                        marginTop: 10,
                        marginRight: 5,
                    }}>
                    {todo?.date}
                </Text>
            </View>
            {!todo?.completed && (
                <TouchableOpacity onPress={() => markTodoComplete(todo.task_id)}>
                    <View style={[styles.actionIcon, { backgroundColor: 'green' }]}>
                        <Icon name="done" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            )}
            {!todo?.completed &&(<TouchableOpacity onPress={() => openEditModal(todo.task_id)}>
                <View style={[styles.actionIcon, { backgroundColor: 'blue' } ]}>
                    <Icon name="edit" size={20} color="white" />
                </View>
            </TouchableOpacity>)}
            <TouchableOpacity onPress={() => deleteTodo(todo.task_id)}>
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