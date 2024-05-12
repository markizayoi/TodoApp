import React, { useState } from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setTodos } from "../../redux/counterSlice";
import styles from "./styles";

export default function SortModal ({visible, toggleModal}){

    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todoData.todos);
    const [category, setCategory] = useState('none');

    const selectedTaskCategory = () => {
        const sortData = [...todos].sort((a, b) =>
            a.todo_name > b.todo_name ? 1 : -1,);
        dispatch(setTodos(sortData))
        setCategory('todo name')
        dispatch(setSearch(''));
        toggleModal();
    }

    const selectedDateCategory = () => {
        const sortData = [...todos].sort((a, b) =>
            a.date_created > b.date_created ? 1 : -1);
        dispatch(setTodos(sortData))
        dispatch(setSearch(''));
        setCategory('date created')
        toggleModal();
    }
    const selectedCompletedCategory = () => {
        const sortData = [...todos].sort((a, b) => Number(b.todo_status) - Number(a.todo_status));
        dispatch(setTodos(sortData))
        dispatch(setSearch(''));
        setCategory('completed')
        toggleModal();
    }
    const selectedNotCompletedCategory = () => {
        const sortData = [...todos].sort((a, b) => Number(a.todo_status) - Number(b.todo_status));
        dispatch(setTodos(sortData))
        dispatch(setSearch(''));
        setCategory('not completed')
        toggleModal();
    }
    const selectedNoneCategory = () => {
        const sortData = [...todos].sort(function () {
            return 0.5 - Math.random();
        });
        dispatch(setTodos(sortData))
        dispatch(setSearch(''));
        setCategory('none')
        toggleModal();
    }

    return (
        <Modal transparent visible={visible} onRequestClose={toggleModal}>
            <View style = {styles.container}>
                <TouchableOpacity style={styles.cancelContainer} onPress={toggleModal} />
                <View style = {styles.modalContainer}>
                    <View style = {styles.titleContainer}>
                        <Text style={styles.title}>SORT BY: {category} </Text>
                        <TouchableOpacity onPress={() => selectedTaskCategory()}>
                            <Text style = {styles.selectCategory}>TODO NAME</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectedDateCategory()}>
                            <Text style={styles.selectCategory}>DATE CREATED</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectedCompletedCategory()}>
                            <Text style={styles.selectCategory}>COMPLETED</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectedNotCompletedCategory()}>
                            <Text style={styles.selectCategory}>NOT COMPLETED</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectedNoneCategory()}>
                            <Text style={styles.selectCategory}>NONE</Text>
                        </TouchableOpacity>
                    </View>
                </View>      
            </View>
        </Modal>
    )
}