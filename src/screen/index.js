import React, { useEffect } from 'react';
import AppHeader from '../component/AppHeader';
import AppBodyContainer from '../component/AppBodyContainer';
import AppInputFooter from '../component/AppInputFooter';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, setSearch, setTextInput, } from '../redux/counterSlice';
import { ApiCall, ApiMethod } from '../services/AxiosInstance';

export default function TodoApp ({}) {

    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todoData.todos);

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(setTextInput(''));
    }, []);

    useEffect(() => {
        fetchTodoFromDirectus();
    }, [todos]);

    const fetchTodoFromDirectus = async () => {
        await ApiCall({
            apiEndpoint: '/items/todos',
            method: ApiMethod.GET,
        }).then((response) => {
            dispatch(setTodos(response.data.data));
        }).catch((error) => {
            console.log("ERROR: ", error);
        })
    };

    return (
        <>
            <AppHeader/>
            <AppBodyContainer/>
            <AppInputFooter/>
        </>
    );
};