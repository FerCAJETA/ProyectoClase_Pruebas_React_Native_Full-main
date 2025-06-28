// PuertasCasas.jsx
import React, { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { estadoDevicesGlobal } from "../../context/contexData";
import PuertaCard from "../../components/PuertaCard";
import BotonAddPuerta from "../../components/BotonAddPuerta";

export default function PuertasCasas() {
  const api = process.env.EXPO_PUBLIC_API_URL;
  const [puertas, setPuertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { ObtenerTodasPuertas, establecerEstadoPuertasDesdeLista } = useContext(estadoDevicesGlobal);

  const obtenerPuertas = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(`${api}/api/puertas`, requestOptions);
      const data = await response.json();
      if (Array.isArray(data.body)) {
        setPuertas(data.body);
        establecerEstadoPuertasDesdeLista(data.body);
        ObtenerTodasPuertas(true);
      } else {
        console.error("La propiedad 'body' no es un arreglo:", data.body);
      }
    } catch (error) {
      console.error("Error al obtener puertas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPuertas();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerGradient}>
          <Text style={styles.title}>🔐 Acceso Seguro</Text>
          <Text style={styles.subtitle}>Gestiona el ingreso con un solo toque</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{puertas.length}</Text>
              <Text style={styles.statLabel}>Entradas</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionSection}>
        <View style={styles.actionHeader}>
          <Text style={styles.sectionTitle}> Configuración Rápida</Text>
        </View>
        <BotonAddPuerta recargarPuertas={obtenerPuertas} />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}> Entradas Registradas</Text>

        {cargando ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <ActivityIndicator animating={true} color="#118AB2" size="large" />
              <Text style={styles.loadingText}>Sincronizando accesos disponibles...</Text>
              <View style={styles.loadingDots}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
            </View>
          </View>
        ) : puertas.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateContent}>
              <View style={styles.emptyIconContainer}>
                <Text style={styles.emptyStateIcon}>🔓</Text>
              </View>
              <Text style={styles.emptyStateTitle}>Sin puertas configuradas</Text>
              <Text style={styles.emptyStateSubtitle}>
                Agrega una entrada y comienza a controlar tu acceso desde el móvil.
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.puertasGrid}>
            {puertas.map((puerta) => (
              <PuertaCard 
                key={puerta.id} 
                puerta={puerta} 
                recargarPuertas={obtenerPuertas} 
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF8F8",
  },
  header: {
    marginBottom: 24,
  },
  headerGradient: {
    backgroundColor: "#06B6D4",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    elevation: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#E0F2FE",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#E0F2FE",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 20,
  },
  actionSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  actionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0369A1",
    marginBottom: 8,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  loadingContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#BAE6FD",
    elevation: 4,
  },
  loadingContent: {
    paddingVertical: 60,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#0284C7",
    marginTop: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  loadingDots: {
    flexDirection: "row",
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#7DD3FC",
    marginHorizontal: 4,
  },
  dot1: {
    opacity: 1,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 0.4,
  },
  emptyStateContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#BAE6FD",
    elevation: 4,
  },
  emptyStateContent: {
    paddingVertical: 48,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  emptyIconContainer: {
    backgroundColor: "#CCFBF1",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyStateIcon: {
    fontSize: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0369A1",
    textAlign: "center",
    marginBottom: 12,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    marginBottom: 32,
  },
  emptyFeatures: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: "#0EA5E9",
    fontWeight: "600",
    textAlign: "center",
  },
  puertasGrid: {
    marginTop: 12,
  },
});
