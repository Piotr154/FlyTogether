import { IconPlaneTilt, IconSun, IconMoonStars  } from '@tabler/icons-react';
import { Switch } from '@mantine/core';
import { useTheme } from '../context/ThemeContext.jsx';
import '../styles/AppHeader.css';


export const AppHeader = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="app-header">
            <div className="app-header__first-row">
                <div className="app-header__icon-title">
                    <IconPlaneTilt className="app-header__icon" />
                    <h1 className="app-header__title">
                        FlyTogether
                    </h1>
                </div>
                
                <Switch
                    className="app-header__darkmode-toggle"
                    size="xl"
                    color="dark.4"
                    offLabel={<IconSun size={24} stroke={2.5} color="#00c6ff" />}
                    onLabel={<IconMoonStars size={24} stroke={2.5} color="white" />}
                    checked={isDarkMode}
                    onChange={toggleTheme}
                />
            </div>
            <div className="app-header__second-row">
                <h2 className="app-header__subtitle">
                    Find the best flights from multiple cities to one destination
                </h2>
            </div>
        </div>
    );
}