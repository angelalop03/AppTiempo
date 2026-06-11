import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as Location from "expo-location";
import { router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import municipios from "../../data/municipios.json";

export default function HomeScreen() {
  const [busqueda, setBusqueda] = useState("");

  const municipiosOrdenados = [...municipios].sort((a, b) =>
    a.Población.localeCompare(b.Población),
  );

  const municipiosFiltrados = municipiosOrdenados.filter((municipio) =>
    municipio.Población.toLowerCase().includes(busqueda.toLowerCase()),
  );

  async function irUbicacionActual() {
    const permiso = await Location.requestForegroundPermissionsAsync();

    if (!permiso.granted) {
      alert("Debes conceder permisos de ubicación");
      return;
    }

    const posicion = await Location.getCurrentPositionAsync({});

    router.push({
      pathname: "/weather",
      params: {
        nombre: "Mi ubicación",
        latitud: posicion.coords.latitude.toString(),
        longitud: posicion.coords.longitude.toString(),
      },
    });
  }

  function irAlTiempo(municipio: any) {
    router.push({
      pathname: "/weather",
      params: {
        nombre: municipio.Población,
        provincia: municipio.Provincia,
        comunidad: municipio.Comunidad,

        latitud: municipio.Latitud.replace(",", "."),
        longitud: municipio.Longitud.replace(",", "."),

        poblacion: municipio.Habitantes.toString(),
        hombres: municipio.Hombres.toString(),
        mujeres: municipio.Mujeres.toString(),
      },
    });
  }

  return (
    <View style={styles.container}>
      {/* Buscador */}

      <View style={styles.buscadorContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar municipio..."
          value={busqueda}
          onChangeText={setBusqueda}
        />

        <TouchableOpacity
          style={styles.botonUbicacion}
          onPress={irUbicacionActual}
        >
          <Ionicons name="location-sharp" size={28} color="#D9368B" />
        </TouchableOpacity>
      </View>

      {/* Lista */}

      <FlatList
        data={municipiosFiltrados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => irAlTiempo(item)}
          >
            <Text style={styles.nombreMunicipio}>{item.Población}</Text>

            <Text style={styles.flecha}>›</Text>
          </TouchableOpacity>
        )}
      />
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
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.rosaFuerte,
    textAlign: "center",
    marginBottom: 18,
  },

  buscadorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  input: {
    flex: 1,
    height: 52,
    backgroundColor: COLORS.crema,
    borderWidth: 3,
    borderColor: COLORS.rosaFuerte,
    borderRadius: 16,
    paddingHorizontal: 14,
    color: COLORS.texto,
    fontSize: 16,
  },

  botonUbicacion: {
    width: 52,
    height: 52,
    marginLeft: 10,
    backgroundColor: COLORS.rosa,
    borderWidth: 3,
    borderColor: COLORS.rosaFuerte,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  icono: {
    fontSize: 24,
  },

  item: {
    backgroundColor: COLORS.crema,
    borderWidth: 2,
    borderColor: COLORS.rosa,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nombreMunicipio: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.texto,
  },

  flecha: {
    fontSize: 26,
    color: COLORS.rosaFuerte,
    fontWeight: "bold",
  },
  filaDato: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginVertical: 6,
  },
});
