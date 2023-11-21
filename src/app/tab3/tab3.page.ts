import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { GoogleMapsService } from '../services/google-maps.service';

declare var google: any;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  constructor(private db: ServicesService, private route: ActivatedRoute, private router: Router, private googleMapsService: GoogleMapsService) {}

  map = null;
  estado: any;
  zona: any;
  laZona: any;

  /* ngOnDestroy(): void {
    this.getZonas();
  } */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.estado = params['estado'];
      this.zona = params['zona'];
      console.log(this.estado, this.zona);
    });
    this.getZonas();
  }

  navigateBack() {
    this.router.navigate(['/tab2']);
  }

  async getZonas() {
    try {
      const data: any = await this.db.getDB().toPromise();
      this.laZona = data.estado[this.estado][this.zona];
      console.log(this.laZona);

      // Cargar el script de Google Maps cuando se obtengan las coordenadas
      await this.googleMapsService.loadGoogleMapsScript('AIzaSyBOjASnRadwzeIttNlc-Ul4Uq_X_PE76d4');

      // Llamar a la función initMap después de obtener las coordenadas
      this.initMap(this.laZona.latitud, this.laZona.longitud);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

 // maps
  initMap(latitud: number, longitud: number) {
  // Verificar si google.maps está definido antes de intentar usarlo
  if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
    const ubicacion = { lat: latitud, lng: longitud };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: ubicacion,
    });

    const marker = new google.maps.Marker({
      position: ubicacion,
      map: map,
      title: 'Ubicación deseada',
    });
  } else {
    console.error('Error: google maps no está definido.');
  }
}
}

