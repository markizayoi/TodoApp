import { openDatabase } from "react-native-sqlite-storage";

export const db = openDatabase(
    {
        name: 'TodoApp',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);