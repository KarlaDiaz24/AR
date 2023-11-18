import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl: string = 'https://catar-2f4b0-default-rtdb.firebaseio.com/.json';

  constructor(private http: HttpClient) { }

  getDB() {
    return this.http.get(this.baseUrl);
  }

  getZones(){

  }
}
