import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  constructor(private db: ServicesService, private route: ActivatedRoute, private router: Router) {}

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
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

}
