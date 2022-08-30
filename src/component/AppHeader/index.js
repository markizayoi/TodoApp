import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from "react-redux";
import { setTodos } from "../../redux/counterSlice";
import SortModal from "../AppSortModal";
//import { db } from "../../services/dbServices";
import styles from "./styles";
import axios from 'axios';

export default function AppHeader ({}){

    const dispatch = useDispatch();
    const [sortModal, setSortModal] = useState({ visible: false});

    const clearAllTodos = () => {
        Alert.alert('Confirmation!', 'Clear all todo?', [
            {
                text: 'Yes',
                onPress: () => {
                    {/*
                    db.transaction((del) => {
                        del.executeSql(
                            'DELETE FROM todotask',
                        );
                    }); 
                    dispatch(setTodos([]))
                    */}
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            axios.delete('http://192.168.1.102:3300/todos');
                            axios.get("http://192.168.1.102:3300/todos").then(response => {
                                resolve(dispatch(setTodos(response.data)))
                            }).catch(error => reject('There was an error: ' + error));
                        }, 10)
                    }) 
                } ,
            },
            {
                text: 'No',
            },
        ]);
    };

    const openSortModal = () => {
        setSortModal({visible: true})
    }
    
    return (
        <View style={styles.header}>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    color: '#1f145c',
                }}>
                TODO APP v2
            </Text>
            <Icon name="sort" size={30} color="black" onPress={() => openSortModal()}  />
            <Icon name="delete" size={30} color="red" onPress={clearAllTodos} />
            <SortModal 
                visible = {sortModal.visible}
                toggleModal={() => setSortModal({ visible: false })}
            />
        </View>
        
    )
}