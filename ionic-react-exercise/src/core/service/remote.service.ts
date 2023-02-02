import { IUrlOptions } from '../models/url-options';
import { SessionStorageService } from './session-storage.service';
import { useToast } from '@agney/ir-toast';

export class RemoteService {
    private Toast = useToast();

    public request(requestType: string, urlOptions: IUrlOptions, body?: any) {
        const sessionStorageService = new SessionStorageService();
        let user = sessionStorageService.getUser();

        var _headers = new Headers();
        _headers.append('Content-Type', 'application/json');
        _headers.append('Accept', 'application/json');
        _headers.append('Accept', 'application/vnd.api+json');
        if (user && user.access_token) {
            _headers.append('Authorization', `Bearer ${user.access_token}`);
        }

        return fetch(`${process.env.REACT_APP_API_URL}${urlOptions.endPoint}`, {
            method: requestType || 'GET',
            body: body ? JSON.stringify(body) : null,
            mode: 'cors',
            redirect: 'follow',
            headers: _headers,
        })
            .then((response) => {
                if (response.status !== 200) {
                    this.Toast.error('Something happend. Please contact support');
                    return;
                }
                return response.json();
            })
            .catch((error) => {
                this.Toast.error('Something happend. Please contact support');
            });
    }
}
