import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  constructor(private db: ServicesService, private route: ActivatedRoute, private router: Router) {}


  estado: any;
  zonas: any[] = [];

  /* ngOnDestroy(): void {
    this.getZonas();
  } */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.estado = params['estado']
      console.log(this.estado);
    });
    this.getZonas();
  }

  navigateBack() {
    this.router.navigate(['/tab1']);
  }

  async getZonas() {
    try {
      const data: any = await this.db.getDB().toPromise();
      this.zonas = data.estado[this.estado];
      console.log(this.zonas);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

}
