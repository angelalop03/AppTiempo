import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function InfoScreen() {
  const {
    nombre,
    provincia,
    comunidad,
    latitud,
    longitud,
    poblacion,
    hombres,
    mujeres,
  } = useLocalSearchParams();

  const lat = Number(latitud);
  const lon = Number(longitud);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nombre}</Text>

      <Text style={styles.texto}>Provincia: {provincia}</Text>
      <Text style={styles.texto}>Comunidad: {comunidad}</Text>

      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: lat,
            longitude: lon,
          }}
          title={nombre as string}
        />
      </MapView>

      <View style={styles.filaDato}>
        <Ionicons name="people" size={24} color="#D9368B" />
        <Text style={styles.texto}>Total: {poblacion || "No disponible"}</Text>
      </View>

      <View style={styles.filaDato}>
        <Ionicons name="man" size={24} color="#D9368B" />
        <Text style={styles.texto}>Hombres: {hombres || "No disponible"}</Text>
      </View>

      <View style={styles.filaDato}>
        <Ionicons name="woman" size={24} color="#D9368B" />
        <Text style={styles.texto}>Mujeres: {mujeres || "No disponible"}</Text>
      </View>
    </View>
  );
}
const COLORS = {
  fondo: "#FFF7D6",
  crema: "#FFFBEA",
  rosa: "#F47BB7",
  rosaFuerte: "#D9368B",
  verde: "#B7D87A",
  texto: "#8A2B5F",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fondo,
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.rosaFuerte,
    textAlign: "center",
    marginBottom: 10,
  },

  texto: {
    fontSize: 17,
    color: COLORS.texto,
    textAlign: "center",
    marginVertical: 4,
  },

  mapa: {
    height: 300,
    borderRadius: 20,
    marginVertical: 20,
    borderWidth: 3,
    borderColor: COLORS.rosaFuerte,
  },

  card: {
    backgroundColor: COLORS.crema,
    borderWidth: 3,
    borderColor: COLORS.rosa,
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
  },

  subtitulo: {
    fontSize: 21,
    fontWeight: "bold",
    color: COLORS.rosaFuerte,
    marginBottom: 10,
    textAlign: "center",
  },
  filaDato: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginVertical: 6,
  },
});
