import React, { useEffect } from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../component/AppHeader';
import AppBodyContainer from '../component/AppBodyContainer';
import AppInputFooter from '../component/AppInputFooter';
import { useDispatch } from 'react-redux';
import { setTodos, setSearch, setTextInput, } from '../redux/counterSlice';
import axios from 'axios';
//import { db } from '../services/dbServices';

export default function TodoApp ({}) {

    const dispatch = useDispatch();

    {/*
    const createTables = () => {
        db.transaction(function (txn) {
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS todotask(task_id VARCHAR(5) PRIMARY KEY, taskname VARCHAR(20), date DATETIME, completed BOOLEAN)',
                []
            );
        });
    };
    */}

    {/*
    const getData = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM todotask', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                console.log(temp)
                dispatch(setTodos(temp));
            });
        });
    
    }
    */}

    const fetchData = () => {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                axios.get("http://192.168.1.102:3300/todos").then(response => {
                    resolve(dispatch(setTodos(response.data)));
                }).catch(error => reject('There was an error: ' + error));
            }, 50)
        })
        //const URL = "http://192.168.1.102:3300/todos";
        //fetch(URL).then((response) => response.json()).then((json) => dispatch(setTodos(json)))
    }

    useEffect(() => {
        //getTodosFromDevice();
        dispatch(setSearch(''));
        dispatch(setTextInput(''));
        //createTables();
        //getData();
        fetchData();
    }, []);

    {/* 
    {useEffect}(() => {
        saveTodoToDevice(todos);
    }, [todos]); 
    */}
     {/*
    const saveTodoToDevice = async todos => {
        try {
            const stringifyTodos = JSON.stringify(todos);
            await AsyncStorage.setItem('todos', stringifyTodos);
        } catch (error) {
            console.log(error);
        }
    };
    */}
    {/*
    const getTodosFromDevice = async () => {
        try {
            const todos = await AsyncStorage.getItem('todos');
            if (todos != null) {
                dispatch(setTodos(JSON.parse(todos)));
            }
        } catch (error) {
            console.log(error);
        }
    };
    */}

    return (
        <>
            <AppHeader/>
            <AppBodyContainer/>
            <AppInputFooter/>
        </>
    );
};