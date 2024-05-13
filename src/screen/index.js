import React, { useEffect, useState } from 'react';
import AppHeader from '../component/AppHeader';
import AppBodyContainer from '../component/AppBodyContainer';
import AppInputFooter from '../component/AppInputFooter';
import { useDispatch } from 'react-redux';
import { setTodos, setSearch, setTextInput, } from '../redux/counterSlice';
import { ApiCall, ApiMethod } from '../services/AxiosInstance';
import { DeviceEventEmitter } from 'react-native';
import { View, Text } from 'react-native';
import moment from 'moment';

export default function TodoApp ({}) {

    const dispatch = useDispatch();
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(setTextInput(''));
        fetchTodoFromDirectus();
        fetchWeatherFromDirectus();
    }, []);

    useEffect(() => {
        DeviceEventEmitter.addListener('fetch_todo', async () => {
            await fetchTodoFromDirectus();
        });
    }, []);

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

    const fetchWeatherFromDirectus = async () => {
        await ApiCall({
            apiEndpoint: '/weather?latitude=10.643016019199612&longitude=123.00650695598053',
            method: ApiMethod.GET,
        }).then((response) => {
            setWeatherData(response.data);
        }).catch((error) => {
            console.log("ERROR CUSTOM ENDPOINT: ", error);
        })
    };

    return (
        <>
            <AppHeader/>
            {weatherData && (
                <View style={{ padding: 10, backgroundColor: 'skyblue' }}>
                    <Text style={{color: '#FFF'}}>Temperature: {weatherData.current_weather.temperature} °C</Text>
                    <Text style={{color: '#FFF'}}>Date: {moment(weatherData.current_weather.time).format('YYYY-MM-DD')}</Text>
                    <Text style={{color: '#FFF'}}>Wind Direction: {weatherData.current_weather.winddirection}</Text>
                    <Text style={{color: '#FFF'}}>Wind Speed: {weatherData.current_weather.windspeed}</Text>
                </View>
            )}
            <AppBodyContainer/>
            <AppInputFooter/>
        </>
    );
};