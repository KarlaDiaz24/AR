export interface Lugar {
  descripcion: string;
  img: string;
  latitud: number;
  longitud: number;
  nombre: string;
}

export interface Estado {
  zonas: Lugar[];
}

