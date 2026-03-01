import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    }

    useEffect(() =>{
        const metaThemeColor = document.getElementById('theme-meta');
        
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            if (metaThemeColor) metaThemeColor.setAttribute('content', '#1a1b1e');
        } else {
            document.documentElement.classList.remove('dark-mode');
            if (metaThemeColor) metaThemeColor.setAttribute('content', '#f5f5f5');
        }
    }, [isDarkMode])

    return(
        <ThemeContext.Provider value = {{isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);