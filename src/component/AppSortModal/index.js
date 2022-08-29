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
            a.task_name > b.task_name ? 1 : -1,);
        dispatch(setTodos(sortData))
        setCategory('todo name')
        dispatch(setSearch(''));
        toggleModal();
    }

    const selectedDateCategory = () => {
        const sortData = [...todos].sort((a, b) =>
            a.date > b.date ? 1 : -1);
        dispatch(setTodos(sortData))
        dispatch(setSearch(''));
        setCategory('date created')
        toggleModal();
    }
    const selectedCompletedCategory = () => {
        const sortData = [...todos].sort((a, b) => Number(b.completed) - Number(a.completed));
        dispatch(setTodos(sortData))
        dispatch(setSearch(''));
        setCategory('completed')
        toggleModal();
    }
    const selectedNotCompletedCategory = () => {
        const sortData = [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));
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