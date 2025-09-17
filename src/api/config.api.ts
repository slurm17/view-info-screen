import { apiFetch } from "./client.fetch";

interface Config {
    duracion_img_seg: number
}
export async function getConfig() {
    return apiFetch<Config>("/config");
}