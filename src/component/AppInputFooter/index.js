import React from "react";
import { View, TouchableOpacity, TextInput, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { setTodos, setTextInput } from "../../redux/counterSlice";
import axios from 'axios';

export default function AppInputFooter ({}){

    const dispatch = useDispatch();
    const textInput = useSelector((state) => state.todoData.textInput);

    const addData = () => {
        if (textInput == '') {
            Alert.alert('Empty!', 'Please input a todo.');
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const myDate = moment().format('YYYY-MM-DD')
                    const completed = false;
                    axios.post('http://192.168.0.124:3300/todos', {
                        "task_name": textInput,
                        "date": myDate,
                        "completed": completed,
                    }).then(response => {
                        dispatch(setTextInput(''));
                        axios.get("http://192.168.0.124:3300/todos").then(response => {
                            resolve(dispatch(setTodos(response.data)))
                        })
                    }).catch(error => reject('There was an error: ' + error));
                }, 10)
            })
            
        }  
    }

    return (
        <View style={styles.footer}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={textInput}
                    placeholder={"Write a Todo..."}
                    onChangeText={text => dispatch(setTextInput(text))}
                />
            </View>
            <TouchableOpacity onPress={addData}>
                <View style={styles.iconContainer}>
                    <Icon name="add" color="white" size={30} />
                </View>
            </TouchableOpacity>
        </View>
    )
}