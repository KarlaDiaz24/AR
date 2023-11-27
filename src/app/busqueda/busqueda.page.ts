import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../services/services.service';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  zonasArqueologicas: any[] = [];
  zonas: any;
  searchTerm: string = '';
  zonasFiltradas: any;
  laZona: any;


  constructor(private http: HttpClient, private db: ServicesService) {
    this.ObtenerZonas();
    this.filtrarZonas();
    this.getZonas();

  }

  ngOnInit(): void {
    this.filtrarZonas();
    this.getZonas();
  }

  ObtenerZonas(){
    this.db.getDB().subscribe(
      (respuesta) => {
        console.log(respuesta)
        this.zonas = respuesta
        this.obtenerSoloZonas(this.zonas.estado)
        console.log(this.zonas.estado)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  obtenerSoloZonas(data: any) {

    for(const estado in data){
      for(const zonas in data[estado]){
        const zona = data[estado][zonas];
        this.zonasArqueologicas.push({
          nombre: zona.nombre,
          descripcion: zona.descripcion
        });
      }
    }

    console.log('Zonas Aqueologicas', this.zonasArqueologicas)
  }

    /* Funcion para filtrar y buscar contactos por su nombre */
    getZonas(){
      this.db.getZones().subscribe((data: any) => {
        this.zonas = data;
        console.log(this.zonas);
      });
    }

      filtrarZonas() {
        if (this.searchTerm.trim() === '') {

          this.zonasFiltradas = this.zonas;
        }
        else {
          this.zonasFiltradas = this.zonas!.filter((zona: any) =>
          this.normalizarTexto(zona.zona).includes(this.normalizarTexto(this.searchTerm))
        );
          console.log(this.zonasFiltradas);
        }
      }
      private normalizarTexto(texto: string): string {
        return texto
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
      }
}
