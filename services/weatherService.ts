const API_KEY = "767fa6bb34802d2894b895b3f5fc18be";

export async function obtenerTiempo(latitud: string, longitud: string) {
  const url =
    `https://api.openweathermap.org/data/2.5/forecast` +
    `?lat=${latitud}` +
    `&lon=${longitud}` +
    `&units=metric` +
    `&appid=${API_KEY}` +
    `&lang=es`;

  const response = await fetch(url);
  const datos = await response.json();

  return datos;
}
