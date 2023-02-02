import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { star } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import NewProduct, { INewProject } from '../../components/NewProduct';
import { IProduct } from '../../core/models/product';
import { IUrlOptions } from '../../core/models/url-options';
import { RemoteService } from '../../core/service/remote.service';
import { SessionStorageService } from '../../core/service/session-storage.service';

import './Products.scss';

const Products: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [isCreating, setCreating] = useState(false);
    const [isOpen, setOpen] = useState(false);

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
                endPoint: `products?customer_id=3`,
                restOfUrl: '',
                isSecure: true,
                contentType: 'application/json',
            };
            remoteService
                .request('GET', options)
                .then((data) => {
                    if (data) {
                        const products: IProduct[] = data.data;
                        setProducts(products);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isLoading]);

    const openNewUserClosed = (result: boolean, data: INewProject | null) => {
        setOpen(false);

        if (result) {
            // setCreating(true);
            const options: IUrlOptions = {
                endPoint: `products`,
                restOfUrl: '',
                isSecure: true,
                contentType: 'application/json',
            };

            remoteService
                .request('POST', options, [data])
                .then((response) => {
                    if (response) {
                        setProducts(products.concat(response.data));
                    }
                })
                .finally(() => {
                    // setCreating(false);
                });
        }
    };

    const openNewUserOpen = () => {
        setOpen(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Products </IonTitle>
                    <IonButton size='default' slot='end' onClick={() => openNewUserOpen()}>
                        <IonIcon slot='start' icon={star}></IonIcon>
                        Add
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {(isLoading || isCreating) && (
                    <div className='spinner'>
                        <IonSpinner name='circles'></IonSpinner>
                    </div>
                )}
                {!(isLoading || isCreating) && (
                    <div>
                        {products.map((val, index) => {
                            return (
                                <IonCard key={val.id}>
                                    <IonCardHeader>
                                        <IonCardSubtitle>{val.attributes.sku}</IonCardSubtitle>
                                        <IonCardTitle>{val.attributes.name}</IonCardTitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        <IonLabel>Price:</IonLabel> {val.attributes.price}
                                    </IonCardContent>
                                </IonCard>
                            );
                        })}
                    </div>
                )}
                <NewProduct {...{ closedCallback: openNewUserClosed, isOpen: isOpen }} />
            </IonContent>
        </IonPage>
    );
};

export default Products;
