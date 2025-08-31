import type { TextoConId } from "../types/Texto";
import { apiFetch } from "./client.fetch";

// Obtener todos los textos
export async function getTextos() {
  return apiFetch<TextoConId[]>("/textos");
}
