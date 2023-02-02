import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import './Dashboard.scss';
import { Redirect, Route } from 'react-router-dom';
import Products from '../products/Products';
import Orders from '../orders/Orders';
import { cube, basket } from 'ionicons/icons';

const Dashboard: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path='/products' render={() => <Products />} exact={true} />
                <Route path='/orders' render={() => <Orders />} exact={true} />
                <Redirect to='/products' />
            </IonRouterOutlet>
            <IonTabBar slot='bottom'>
                <IonTabButton tab='products' href='/products'>
                    <IonIcon icon={cube} />
                    <IonLabel>Products</IonLabel>
                </IonTabButton>
                <IonTabButton tab='orders' href='/orders'>
                    <IonIcon icon={basket} />
                    <IonLabel>Orders</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default Dashboard;
