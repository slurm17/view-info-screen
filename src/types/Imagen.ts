export type Imagen = {
  id: number;
  url: string;
  titulo?: string;
  descripcion?: string;
  activa: boolean;
  orden: number | null;
};

export type ImagenSinId = Omit<Imagen, "id">;
