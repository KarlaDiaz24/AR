import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private scriptLoaded = false;

  loadGoogleMapsScript(apiKey: string): Promise<void> {
    if (this.scriptLoaded) {
      return Promise.resolve();
    }
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOjASnRadwzeIttNlc-Ul4Uq_X_PE76d4&callback=initMap" async defer></script>

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    const promise = new Promise<void>((resolve, reject) => {
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Error al cargar el script de Google Maps.'));
      };
    });

    document.head.appendChild(script);

    return promise;
  }
}
