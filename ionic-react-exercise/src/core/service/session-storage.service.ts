import { IUser } from '../models/user';

export class SessionStorageService {
    private user!: IUser;

    constructor() {
        let userString = sessionStorage.getItem('user');
        if (userString) {
            this.user = JSON.parse(userString);
        }
    }

    setUser = (val: IUser) => {
        this.user = val;
        sessionStorage.setItem('user', JSON.stringify(val));
    };

    getUser = () => {
        return this.user;
    };

    clearData = () => {
        sessionStorage.clear();
    };
}
