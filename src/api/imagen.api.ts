import type { Imagen } from "../types/Imagen";
import { apiFetch } from "./client.fetch";

// Obtener todas las imágenes
export async function getImagenes() {
  return apiFetch<Imagen[]>("/imagenes");
}
