import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

declare var google: any;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  constructor(private db: ServicesService, private route: ActivatedRoute, private router: Router) {}

   //map = null;
  estado: any;
  zona: any;
  laZona: any;

//map
  @ViewChild('map')mapRef!: ElementRef;
  map!: GoogleMap;

  ionViewDidEnter() {
    this.getZonas().then(() => {
      this.CreateMap();
    })
  }

  async CreateMap() {
    this.map = await GoogleMap.create({
    id: 'my-map',
    apiKey: environment.mapsKey,
    element: this.mapRef.nativeElement,
    forceCreate: true,
    config: {
      center: {
        lat: this.laZona.latitud,
        lng: this.laZona.longitud,
      },
      zoom: 15,
    },
    });
    this.addMarkers();
  }
  async addMarkers() {
    if (this.laZona && this.laZona.latitud && this.laZona.longitud) {
    const markers: Marker =
      {
        coordinate: {
          lat: this.laZona.latitud,
        lng: this.laZona.longitud,
        }
      };
    const result = await this.map.addMarker(markers);
    console.log(result);

    this.map.setOnMarkerClickListener(async (marker) => {
      console.log(marker);
    });
  }
}

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

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }
}

