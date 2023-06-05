import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSecureStore } from '../hooks';

const TransliterationContext = createContext({ showTransliteration: true, toggleTransliteration: () => {} });

export const useTransliteration = () => useContext(TransliterationContext);

export const TransliterationProvider = ({ children }) => {
    const [showTransliteration, setShowTransliteration] = useState(true);
    const { getItem, setItem } = useSecureStore()

    const toggleTransliteration = async (value) => {
        setShowTransliteration(value)
        try {
            await setItem('showTransliterations', JSON.stringify(value))
        } catch (e) {
            console.log('>>> ERROR CACHING SHOW TRANSLITERATION VALUE', e, value)
        }
    }

    useEffect(() => {
        ;(async () => {
            const showTransliteration = await getItem('showTransliterations');
            console.log('>>> CACHED VALUE', showTransliteration)
            if (showTransliteration) {
                setShowTransliteration(JSON.parse(showTransliteration))
            }
        })()
    }, [])

    return (
        <TransliterationContext.Provider value={{ showTransliteration, toggleTransliteration }}>
            {children}
        </TransliterationContext.Provider>
    )
}
