import React from "react";
import { View, TouchableOpacity, TextInput, Alert, DeviceEventEmitter } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { setTextInput } from "../../redux/counterSlice";
import { ApiCall, ApiMethod } from "../../services/AxiosInstance";

export default function AppInputFooter ({}){

    const dispatch = useDispatch();
    const textInput = useSelector((state) => state.todoData.textInput);

    const addTodoToDirectus = async () => {
        if (textInput == '') {
            Alert.alert('Empty!', 'Please input a todo.');
        } else {
            const completed = 'Incomplete';
            await ApiCall({
                apiEndpoint: '/items/todos',
                method: ApiMethod.POST,
                apiData: {
                    todo_name: textInput,
                    todo_status: completed
                }
            }).then((response) => {
                console.log("Successfully added!");
                DeviceEventEmitter.emit('fetch_todo');
                dispatch(setTextInput(''));
            }).catch((error) => {
                console.log("ERROR: ", error);
            })
        }  
    };

    return (
        <View style={styles.footer}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={textInput}
                    placeholder={"Write a Todo..."}
                    onChangeText={text => dispatch(setTextInput(text))}
                />
            </View>
            <TouchableOpacity onPress={addTodoToDirectus}>
                <View style={styles.iconContainer}>
                    <Icon name="add" color="white" size={30} />
                </View>
            </TouchableOpacity>
        </View>
    )
}