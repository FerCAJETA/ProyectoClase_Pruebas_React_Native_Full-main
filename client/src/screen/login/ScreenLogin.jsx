import React, { useState, useContext } from "react";
import { Alert, View, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { estadoLoginGlobal } from "../../context/contexData";

const { width } = Dimensions.get('window');

export default function ScreenLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verpw, setVerpw] = useState(true);
  const rutasLogin = useNavigation();

  const api = process.env.EXPO_PUBLIC_API_URL;
  const { login } = useContext(estadoLoginGlobal);

  const handlogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Atención", "Rellena todos los campos");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user: email,
      password: password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch(`${api}/api/usuario/login`, requestOptions);
      const result = await response.json(); 

      if (result.body.status === true) {
        Alert.alert("Bienvenido", result.body.user.nombre);
        login();
      } else {
        Alert.alert("Mensaje", result.body.mensaje);
      }
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="pokeball" size={60} color="#6366F1" />
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.cardTitle}>Iniciar Sesión</Text>

          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
            left={<TextInput.Icon icon="account" color="#6366F1" />}
            mode="outlined"
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
          />

          <TextInput
            style={styles.input}
            label="Contraseña"
            value={password}
            secureTextEntry={verpw}
            right={<TextInput.Icon icon="eye" onPress={() => setVerpw(!verpw)} color="#6366F1" />}
            left={<TextInput.Icon icon="key" color="#6366F1" />}
            onChangeText={setPassword}
            mode="outlined"
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
          />

          <Button
            style={styles.loginButton}
            icon="login"
            mode="contained"
            onPress={handlogin}
            buttonColor="#6366F1"
            textColor="#FFFFFF"
          >
            Iniciar Sesión
          </Button>

          <Button
            style={styles.registerButton}
            icon="account-plus"
            mode="outlined"
            onPress={() => rutasLogin.push('crearcuenta')}
            textColor="#6366F1"
            outlineColor="#6366F1"
          >
            Crear cuenta
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
  loginButton: {
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 12,
    paddingVertical: 8,
  },
  registerButton: {
    borderRadius: 12,
    paddingVertical: 8,
  },
});
