import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useContext, useEffect } from 'react';
import './Redirection.scss';
import { useHistory } from 'react-router-dom';
import { IUrlOptions } from '../../core/models/url-options';
import { RemoteService } from '../../core/service/remote.service';
import { SessionStorageService } from '../../core/service/session-storage.service';
import { UserContext } from '../../App';

const Redirection: React.FC = () => {
    const router = useHistory();
    const remoteService = new RemoteService();
    const sessionStorageService = new SessionStorageService();
    const user = useContext(UserContext);
    let isLoading = false;

    useEffect(() => {
        if (!sessionStorageService.getUser() || !sessionStorageService.getUser().access_token) {
            if (!isLoading) {
                router.push('/');

                isLoading = true;

                const options: IUrlOptions = {
                    endPoint: `login`,
                    restOfUrl: '',
                    isSecure: true,
                    contentType: 'application/json',
                };
                const formDataObj = {
                    email: 'testtask1@packiyo.com',
                    password: 'acKSoMbiCkbu',
                };

                remoteService
                    .request('POST', options, formDataObj)
                    .then((data) => {
                        if (data) {
                            sessionStorageService.setUser(data.user);
                            user.setIsLoggedIn(true);
                            setTimeout(() => {
                                router.push('/products');
                            }, 1000);
                        }
                    })
                    .finally(() => {
                        isLoading = false;
                    });
            }
        } else {
            user.setIsLoggedIn(true);
            setTimeout(() => {
                router.push('/products');
            }, 1000);
        }
    }, []);

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='spinner'>
                    <IonSpinner name='circles'></IonSpinner>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Redirection;
