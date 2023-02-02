import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private httpc:HttpClient) {
        console.log("constructor");
    }

    public getData(from, to, tmt: number = 1000*60*60) {
        let param = {
            from: from,
            to: to
        };
        return this.httpc.get(window.__env.api_url+"/data", {params : param})
        .pipe(
            take(1),
            timeout(tmt) 
        );   
    }
}