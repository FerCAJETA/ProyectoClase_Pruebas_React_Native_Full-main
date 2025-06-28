// LuzCard.jsx
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Card, IconButton, Text, Switch, ProgressBar } from "react-native-paper";
import { estadoDevicesGlobal } from "../context/contexData";

export default function LuzCard({ luz, recargarLuces }) {
  const api = process.env.EXPO_PUBLIC_API_URL;

  // ----------------------------- Estados locales -----------------------------
  const [nombre, setNombre] = useState(luz.nombre || "");
  const [intensidad, setIntensidad] = useState(luz.intensidad || 0);

  const [modoEditarNombre, setModoEditarNombre] = useState(false);
  const [nombreTemp, setNombreTemp] = useState(nombre);

  // ----------------------------- Contexto global -----------------------------
  const { cambiarEstadoLuz, obtenerEstadoLuz } = useContext(estadoDevicesGlobal);
  const estado = obtenerEstadoLuz(luz.id); // Obtener estado individual de la luz

  // ----------------------------- useEffect de monitoreo -----------------------------
  useEffect(() => {
    console.log(`Luz ID ${luz.id} - nombre: ${nombre} - Estado: ${estado ? "Encendida" : "Apagada"} - Intensidad: ${intensidad}%`);
  }, [estado, nombre, intensidad]);

  // ----------------------------- Funciones de API -----------------------------
  const actualizarCampo = async (campo, valor) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: luz.id,
      nombre: campo === "nombre" ? valor : nombre,
      estado: campo === "estado" ? valor : estado ? "encendida" : "apagada",
      intensidad: campo === "intensidad" ? valor : intensidad,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/luces/actualizar`, requestOptions);
      const resultado = await response.json();
      console.log(`Campo ${campo} actualizado:`, resultado);
      recargarLuces();
    } catch (error) {
      console.error(`Error al actualizar ${campo}:`, error);
    }
  };

  const eliminarLuz = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ id: luz.id });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/luces/eliminar`, requestOptions);
      const resultado = await response.json();
      console.log(`Luz eliminada: ${nombre}`, resultado);
      recargarLuces();
    } catch (error) {
      console.error("Error al eliminar luz:", error);
    }
  };

  // ----------------------------- Funciones auxiliares -----------------------------
  const guardarNombre = () => {
    if (nombreTemp !== nombre) {
      setNombre(nombreTemp);
      actualizarCampo("nombre", nombreTemp);
    }
    setModoEditarNombre(false);
  };

  const actualizarEstado = () => {
    cambiarEstadoLuz(luz.id);
    actualizarCampo("estado", !estado ? "encendida" : "apagada");
  };

  const actualizarIntensidad = (valor) => {
    const nueva = Math.max(0, Math.min(100, valor));
    setIntensidad(nueva);
    actualizarCampo("intensidad", nueva);
  };

  // ----------------------------- Render UI -----------------------------
  return (
    <Card style={[styles.card, estado && styles.cardActive]}>
      <View style={[styles.cardGlow, estado && styles.cardGlowActive]} />
      
      <Card.Content style={styles.cardContent}>
        {/* Header con estado visual */}
        <View style={styles.headerContainer}>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, estado && styles.statusDotActive]} />
            <Text style={[styles.statusText, estado && styles.statusTextActive]}>
              {estado ? "💡 Encendida" : " Apagada"}
            </Text>
          </View>
          
          <Switch
            value={estado}
            onValueChange={actualizarEstado}
            trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
            thumbColor={estado ? "#8B5CF6" : "#9CA3AF"}
            style={styles.switch}
          />
        </View>

        {/* Nombre de la luz */}
        <View style={styles.nombreSection}>
          {modoEditarNombre ? (
            <View style={styles.nombreEditContainer}>
              <TextInput
                value={nombreTemp}
                onChangeText={setNombreTemp}
                style={styles.nombreInput}
                placeholder="Nombre de la luz"
                placeholderTextColor="#9CA3AF"
                autoFocus
              />
              <View style={styles.accionesEditar}>
                <IconButton 
                  icon="check" 
                  iconColor="#10B981" 
                  size={20}
                  style={styles.editButton}
                  onPress={guardarNombre} 
                />
                <IconButton 
                  icon="close" 
                  iconColor="#EF4444" 
                  size={20}
                  style={styles.editButton}
                  onPress={() => setModoEditarNombre(false)} 
                />
              </View>
            </View>
          ) : (
            <View style={styles.nombreDisplayContainer}>
              <Text
                onPress={() => setModoEditarNombre(true)}
                style={[styles.nombreTexto, estado && styles.nombreTextoActive]}
              >
                {nombre || " Sin nombre"}
              </Text>
              <IconButton 
                icon="delete" 
                iconColor="#EF4444" 
                size={20}
                style={styles.deleteButton}
                onPress={eliminarLuz} 
              />
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#EDE9FE",
    overflow: "hidden",
    position: "relative",
  },
  cardActive: {
    borderColor: "#8B5CF6",
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  cardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#E5E7EB",
  },
  cardGlowActive: {
    backgroundColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#9CA3AF",
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  statusTextActive: {
    color: "#7C3AED",
  },
  switch: {
    transform: [{ scale: 1.1 }],
  },
  nombreSection: {
    marginBottom: 20,
  },
  nombreEditContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nombreInput: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#8B5CF6",
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    backgroundColor: "#FAF5FF",
    borderRadius: 8,
    marginRight: 12,
  },
  accionesEditar: {
    flexDirection: "row",
  },
  editButton: {
    margin: 0,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  nombreDisplayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nombreTexto: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    flex: 1,
    letterSpacing: -0.3,
  },
  nombreTextoActive: {
    color: "#7C3AED",
  },
  deleteButton: {
    margin: 0,
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
  },
  intensidadSection: {
    backgroundColor: "#FDFBFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EDE9FE",
  },
  intensidadHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  intensidadLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  intensidadValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6B7280",
  },
  intensidadValueActive: {
    color: "#7C3AED",
  },
  intensidadControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  intensidadButton: {
    margin: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 2,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  barraProgreso: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F3F4F6",
  },
  barraProgresoActive: {
    backgroundColor: "#EDE9FE",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});