import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonLabel,
    IonPage,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { IOrder } from '../../core/models/order';
import { IUrlOptions } from '../../core/models/url-options';
import { RemoteService } from '../../core/service/remote.service';
import { SessionStorageService } from '../../core/service/session-storage.service';

import './Orders.scss';

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isLoading, setLoading] = useState(false);

    const remoteService = new RemoteService();
    const sessionStorageService = new SessionStorageService();

    useEffect(() => {
        if (!isLoading) {
            if (sessionStorageService.getUser() && sessionStorageService.getUser().access_token) {
                setLoading(true);
            }
        }
    }, []);

    useEffect(() => {
        if (isLoading) {
            const options: IUrlOptions = {
                endPoint: `orders?customer_id=3`,
                restOfUrl: '',
                isSecure: true,
                contentType: 'application/json',
            };
            remoteService
                .request('GET', options)
                .then((data) => {
                    if (data) {
                        const orders: IOrder[] = data.data;
                        setOrders(orders);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isLoading]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Orders </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {isLoading && (
                    <div className='spinner'>
                        <IonSpinner name='circles'></IonSpinner>
                    </div>
                )}
                {!isLoading && (
                    <div>
                        {orders.map((val, index) => {
                            return (
                                <IonCard key={val.id}>
                                    <IonCardHeader>
                                        <IonCardSubtitle>{val.attributes.number}</IonCardSubtitle>
                                        <IonCardTitle>{val.attributes.shipping_method_name}</IonCardTitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        <IonLabel>Shipping name:</IonLabel> {val.attributes.shipping_contact_information.name}
                                        <IonLabel>Shipping address:</IonLabel> {val.attributes.shipping_contact_information.address}
                                        <IonLabel>Shipping zip:</IonLabel> {val.attributes.shipping_contact_information.zip}
                                        <IonLabel>Shipping city:</IonLabel> {val.attributes.shipping_contact_information.city}
                                        <IonLabel>Shipping country id:</IonLabel> {val.attributes.shipping_contact_information.country_id}
                                        <IonLabel>Shipping email:</IonLabel> {val.attributes.shipping_contact_information.email}
                                        <IonLabel>Shipping phone:</IonLabel> {val.attributes.shipping_contact_information.phone}
                                    </IonCardContent>
                                </IonCard>
                            );
                        })}
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Orders;
