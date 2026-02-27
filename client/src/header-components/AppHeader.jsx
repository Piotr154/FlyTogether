import { IconPlaneTilt } from '@tabler/icons-react';
import '../styles/AppHeader.css'


export const AppHeader = () => {
    return (
        <div className="app-header">
            <div className="app-header__first-row">
                <IconPlaneTilt className="app-header__icon" />
                <h1 className="app-header__title">
                    FlyTogether
                </h1>
            </div>
            <div className="app-header-second-row">
                <h2 className="app-header__subtitle">
                    Find the best flights from multiple cities to one destination
                </h2>
            </div>
        </div>
    )
}