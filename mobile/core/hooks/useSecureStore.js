import * as SecureStore from 'expo-secure-store'

export default function useSecureStore() {
    const setItem = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    }

    const getItem = async (key) => {
        const result = await SecureStore.getItemAsync(key);

        return result
    }

    return {
        setItem,
        getItem,
    }
}