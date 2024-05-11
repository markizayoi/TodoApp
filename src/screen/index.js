import React, { useEffect } from 'react';
import AppHeader from '../component/AppHeader';
import AppBodyContainer from '../component/AppBodyContainer';
import AppInputFooter from '../component/AppInputFooter';
import { useDispatch } from 'react-redux';
import { setTodos, setSearch, setTextInput, } from '../redux/counterSlice';
import axios from 'axios';

export default function TodoApp ({}) {

    const dispatch = useDispatch();

    const fetchData = () => {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                axios.get("http://192.168.0.124:3300/todos").then(response => {
                    resolve(dispatch(setTodos(response.data)));
                }).catch(error => reject('There was an error: ' + error));
            }, 50)
        })
    }

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(setTextInput(''));
        fetchData();
    }, []);

    return (
        <>
            <AppHeader/>
            <AppBodyContainer/>
            <AppInputFooter/>
        </>
    );
};