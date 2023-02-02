import { Route } from 'react-router-dom';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Redirection from './pages/redirection/Redirection';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import Dashboard from './pages/dashboard/Dashboard';
import { ToastProvider } from '@agney/ir-toast';
import React, { useContext, useState } from 'react';

import './App.scss';

setupIonicReact();

const IonicApp: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useContext(UserContext);

    user.setIsLoggedIn = setIsLoggedIn;

    return (
        <IonApp>
            <ToastProvider value={{ color: 'primary', duration: 2000 }}>
                <IonReactRouter>
                    <Route path='/' component={isLoggedIn ? Dashboard : Redirection} />
                </IonReactRouter>
            </ToastProvider>
        </IonApp>
    );
};

interface IUserManager {
    setIsLoggedIn: Function;
}

const user: IUserManager = {
    setIsLoggedIn: () => {},
};

export const UserContext = React.createContext<IUserManager>(user);

const App: React.FC = () => {
    return (
        <UserContext.Provider value={user}>
            <IonicApp />
        </UserContext.Provider>
    );
};

export default App;
