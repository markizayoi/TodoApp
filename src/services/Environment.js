const ENV = {
    dev: {
        env: 'development',
        apiUrl: ''
    },
    devlocal: {
        env: 'local',
        apiUrl: "http://192.168.0.124:8055"
    },
    prod: {
        env: 'production',
        apiUrl: ''
    },
}

export const getEnvVars = () => {
    return ENV.devlocal;
}