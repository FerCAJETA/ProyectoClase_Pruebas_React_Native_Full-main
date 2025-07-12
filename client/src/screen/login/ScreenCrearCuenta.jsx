import React, { useState, useContext } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { estadoLoginGlobal } from "../../context/contexData";

export default function ScreenCrearCuenta() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verpw, setVerpw] = useState(true);
  const rutasSignup = useNavigation();

  const api = process.env.EXPO_PUBLIC_API_URL;
  const { login } = useContext(estadoLoginGlobal);

  const handleCrearCuenta = async () => {
    if (nombre.trim() === "" || email.trim() === "" || password.trim() === "") {
      Alert.alert("Atención", "Todos los campos son obligatorios");
      return;
    }
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: 0,
      nombre: nombre,
      pw: password,
      email: email,
      status: 1,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/usuario/agregar`, requestOptions);
      const result = await response.json();

      if (result.body?.status === true) {
        Alert.alert("Éxito", result.body.mensaje || "Cuenta creada exitosamente.");
        login();
      } else {
        Alert.alert("Mensaje", result.body?.mensaje || "Ocurrió un error.");
      }
    } catch (error) {
      console.error("Error en crear cuenta:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="pokeball" size={60} color="#6366F1" />
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>Crea tu cuenta para comenzar</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.cardTitle}>Crear Cuenta</Text>

          <TextInput
            style={styles.input}
            label="Nombre"
            value={nombre}
            onChangeText={setNombre}
            left={<TextInput.Icon icon="account" color="#6366F1" />}
            mode="outlined"
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
          />

          <TextInput
            style={styles.input}
            label="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon icon="email" color="#6366F1" />}
            mode="outlined"
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
          />

          <TextInput
            style={styles.input}
            label="Contraseña"
            secureTextEntry={verpw}
            value={password}
            onChangeText={setPassword}
            left={<TextInput.Icon icon="lock" color="#6366F1" />}
            right={<TextInput.Icon icon="eye" onPress={() => setVerpw(!verpw)} color="#6366F1" />}
            mode="outlined"
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
          />

          <Button 
            mode="contained" 
            icon="account-plus" 
            style={styles.createButton}
            onPress={handleCrearCuenta}
            buttonColor="#6366F1"
            textColor="#FFFFFF"
          >
            Crear cuenta
          </Button>

          <Button 
            mode="text" 
            style={styles.loginLink}
            onPress={() => rutasSignup.push("login")}
            textColor="#6366F1"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  createButton: {
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 12,
    paddingVertical: 8,
  },
  loginLink: {
    marginTop: 8,
  },
});
