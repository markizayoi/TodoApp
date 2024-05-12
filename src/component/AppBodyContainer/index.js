import React from "react";
import { View, FlatList, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setSearch, setFilteredTodo } from "../../redux/counterSlice";
import ListItem from "./AppListItem/index";
import styles from "./styles";

export default function AppBodyContainer({}){

    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todoData.todos);
    const filteredTodo = useSelector((state) => state.todoData.filteredTodo);
    const search = useSelector((state) => state.todoData.search);

    const searchFilter = (text) => {
        if (text) {
            const newData = todos.filter((item) => {
                const itemData = item.todo_name ? item.todo_name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            dispatch(setFilteredTodo(newData));
            dispatch(setSearch(text));
        } else {
            dispatch(setFilteredTodo(todos));
            dispatch(setSearch(text));
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                value={search}
                placeholder="Search a Todo..."
                onChangeText={text => searchFilter(text)}
                style={styles.input}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 15, paddingBottom: 300 }}
                data={search == '' ? todos : filteredTodo}
                renderItem={({ item }) => <ListItem todo={item} />}
            />
        </View>
    )
}