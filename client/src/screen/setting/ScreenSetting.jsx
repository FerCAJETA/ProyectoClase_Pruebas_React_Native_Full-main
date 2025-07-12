import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, List, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BotonLogout from '../../components/ButtonLogout';
import { estadoLoginGlobal } from '../../context/contexData';

export default function ScreenSetting() {
  const { isLogin } = useContext(estadoLoginGlobal);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="cog" size={40} color="#6366F1" />
        <Text style={styles.headerTitle}>Configuración</Text>
        <Text style={styles.headerSubtitle}>Gestiona tu cuenta y preferencias</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          
          <List.Item
            title="Perfil de Usuario"
            description="Edita tu información personal"
            left={(props) => <List.Icon {...props} icon="account" color="#6366F1" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" color="#94A3B8" />}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Aplicación</Text>
          
          <List.Item
            title="Acerca de"
            description="Información sobre la aplicación"
            left={(props) => <List.Icon {...props} icon="information" color="#6366F1" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" color="#94A3B8" />}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
          />
        </Card.Content>
      </Card>

      <View style={styles.logoutSection}>
        <BotonLogout />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  listDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  logoutSection: {
    padding: 16,
    marginBottom: 32,
  },
});