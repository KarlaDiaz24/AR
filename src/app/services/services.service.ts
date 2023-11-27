import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl: string = 'https://catar-2f4b0-default-rtdb.firebaseio.com/.json';

  constructor(private http: HttpClient) { }

  getDB() {
    return this.http.get(this.baseUrl);
  }

  getZones(): Observable<any[]> {
    return this.http.get(this.baseUrl)
      .pipe(map(data => this.processZones(data)));
  }

  private processZones(response: any): any[] {
    const zones: any[] = [];
    for (const estado in response.estado) {
      const zonasDeEstado = response.estado[estado];
      for (const key in zonasDeEstado) {
        const zona = zonasDeEstado[key];

        zones.push({ estado: estado, zona: zona.nombre });
      }
    }
    return zones
  }

}
