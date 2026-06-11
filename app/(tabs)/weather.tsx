import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { obtenerTiempo } from "@/services/weatherService";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

const COLORS = {
  fondo: "#FFF7D6",
  crema: "#FFFBEA",
  rosa: "#F47BB7",
  rosaFuerte: "#D9368B",
  texto: "#8A2B5F",
};

export default function WeatherScreen() {
  const params = useLocalSearchParams();

  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarTiempo();
  }, []);

  async function cargarTiempo() {
    try {
      const datos = await obtenerTiempo(
        params.latitud as string,
        params.longitud as string,
      );

      console.log("DATOS API:", datos);
      setWeather(datos);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  function irInfo() {
    router.push({
      pathname: "/info",
      params,
    });
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text style={styles.texto}>Cargando tiempo...</Text>
      </View>
    );
  }

  if (!weather || !weather.list) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No se han podido cargar los datos.</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.botonVolver}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const tiempoActual = weather.list[0];
  const proximasHoras = weather.list.slice(0, 8);
  const proximosDias = weather.list.filter(
    (_: any, index: number) => index % 8 === 0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-circle"
            size={34}
            color={COLORS.rosaFuerte}
          />
        </TouchableOpacity>

        <Text style={styles.titulo}>{params.nombre}</Text>

        <TouchableOpacity style={styles.botonInfo} onPress={irInfo}>
          <Ionicons
            name="information-circle"
            size={34}
            color={COLORS.rosaFuerte}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.actual}>
        <MaterialCommunityIcons
          name="weather-partly-cloudy"
          size={95}
          color={COLORS.rosaFuerte}
        />

        <Text style={styles.temp}>{Math.round(tiempoActual.main.temp)}°</Text>

        <Text style={styles.descripcion}>
          {tiempoActual.weather[0].description}
        </Text>
      </View>

      <Text style={styles.subtitulo}>Próximas horas</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={proximasHoras}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.hora}>
            <MaterialCommunityIcons
              name="weather-partly-cloudy"
              size={30}
              color={COLORS.rosaFuerte}
            />

            <Text style={styles.textoHora}>{Math.round(item.main.temp)}°</Text>

            <Text style={styles.horaTexto}>
              {item.dt_txt?.substring(11, 16)}
            </Text>
          </View>
        )}
      />

      <Text style={styles.subtitulo}>Próximos días</Text>

      <FlatList
        data={proximosDias}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dia}>
            <View style={styles.diaIzquierda}>
              <MaterialCommunityIcons
                name="weather-sunny"
                size={30}
                color={COLORS.rosaFuerte}
              />

              <Text style={styles.textoDia}>{Math.round(item.main.temp)}°</Text>
            </View>

            <Text style={styles.descripcionDia}>
              {item.weather[0].description}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: COLORS.fondo,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.fondo,
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  header: {
    backgroundColor: COLORS.crema,
    borderWidth: 3,
    borderColor: COLORS.rosaFuerte,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titulo: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.rosaFuerte,
  },

  botonInfo: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  actual: {
    alignItems: "center",
    backgroundColor: COLORS.crema,
    borderWidth: 3,
    borderColor: COLORS.rosa,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },

  temp: {
    fontSize: 64,
    fontWeight: "bold",
    color: COLORS.rosaFuerte,
  },

  descripcion: {
    fontSize: 20,
    color: COLORS.texto,
    textTransform: "capitalize",
    marginTop: 6,
  },

  subtitulo: {
    fontSize: 19,
    fontWeight: "bold",
    color: COLORS.rosaFuerte,
    marginTop: 18,
    marginBottom: 12,
  },

  hora: {
    backgroundColor: COLORS.crema,
    borderWidth: 2,
    borderColor: COLORS.rosa,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginRight: 12,
    alignItems: "center",
  },

  textoHora: {
    color: COLORS.texto,
    fontWeight: "bold",
    marginTop: 5,
  },

  horaTexto: {
    color: COLORS.texto,
    fontSize: 12,
    marginTop: 4,
  },

  dia: {
    backgroundColor: COLORS.crema,
    borderWidth: 2,
    borderColor: COLORS.rosa,
    borderRadius: 14,
    marginBottom: 10,
    paddingVertical: 16,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  diaIzquierda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  textoDia: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.texto,
  },

  descripcionDia: {
    color: COLORS.texto,
    textTransform: "capitalize",
  },

  texto: {
    color: COLORS.texto,
    marginTop: 10,
  },

  error: {
    fontSize: 18,
    color: COLORS.texto,
    textAlign: "center",
    marginVertical: 10,
  },

  botonVolver: {
    fontSize: 18,
    color: COLORS.rosaFuerte,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});
