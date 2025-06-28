import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Card, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ScreenHome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Centro de Control Doméstico</Text>
      <View style={styles.headerDecoration} />

      <View style={styles.row}>
        <Card style={[styles.card, styles.cardLuces]}>
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons name="ceiling-light-multiple" size={40} color="#FFD166" />
            <Text style={styles.cardTitle}>Iluminación</Text>
            <Text style={styles.cardDescription}>Administra la luz ambiente</Text>
            <Button
              mode="contained"
              onPress={() => navigation.push('lucescasas')}
              style={[styles.button, styles.buttonLuces]}
              labelStyle={styles.buttonLabel}
            >
              Ingresar
            </Button>
          </Card.Content>
        </Card>

        <Card style={[styles.card, styles.cardPuertas]}>
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons name="door" size={40} color="#118AB2" />
            <Text style={styles.cardTitle}>Accesos</Text>
            <Text style={styles.cardDescription}>Supervisa tus entradas</Text>
            <Button
              mode="contained"
              onPress={() => navigation.push('puertacasa')}
              style={[styles.button, styles.buttonPuertas]}
              labelStyle={styles.buttonLabel}
            >
              Ingresar
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F9FB',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1B263B',
  },
  headerDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#D3EFFF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    opacity: 0.3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    paddingVertical: 16,
  },
  cardContent: {
    alignItems: 'center',
    // paddingHorizontal: 10, // eliminado para que el botón use 100%
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#1B263B',
  },
  cardDescription: {
    fontSize: 13,
    color: '#5C677D',
    marginBottom: 14,
    textAlign: 'center',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 16,
    width: '100%',
    elevation: 0,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonLuces: {
    backgroundColor: '#FFD166',
  },
  buttonPuertas: {
    backgroundColor: '#118AB2',
  },
});
