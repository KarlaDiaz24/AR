import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

declare var google: any;
interface Marker {
  position: {
    lat: number,
    lng: number,
  };
}
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  constructor(private db: ServicesService, private route: ActivatedRoute, private router: Router) { }

  map = null;
  estado: any;
  zona: any;
  laZona: any;
  markers: Marker | undefined;
  //map
  @ViewChild('map') mapView!: ElementRef;


  ionViewWillEnter() {
    this.getZonas();
  }
  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map')!;
    // create LatLng object
    const myLatLng = { lat: this.laZona.latitud, lng: this.laZona.longitud };
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }
  renderMarkers() {
    this.addMarker();
  }

  addMarker() {
    return new google.maps.Marker({
      position: {
        lat: this.laZona.latitud,
        lng: this.laZona.longitud,
      },
      map: this.map,
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.estado = params['estado'];
      this.zona = params['zona'];
      console.log(this.estado, this.zona);
    });
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
