import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DetallesPokemon = ({ route }) => {
  const { pokemon } = route.params;

  const getTypeColor = (type) => {
    const colors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return colors[type] || '#A8A878';
  };

  const formatStatName = (statName) => {
    const statNames = {
      hp: 'HP',
      attack: 'Ataque',
      defense: 'Defensa',
      'special-attack': 'Ataque Especial',
      'special-defense': 'Defensa Especial',
      speed: 'Velocidad'
    };
    return statNames[statName] || statName;
  };

  const calculateStatBar = (baseStat) => {
    return (baseStat / 255) * 100;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header con imagen */}
      <View style={styles.header}>
        <Card.Cover 
          source={{ uri: pokemon.sprites?.front_default }} 
          style={styles.pokemonImage}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.pokemonName}>
            {pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}
          </Text>
          <Text style={styles.pokemonId}>#{pokemon.id}</Text>
          <View style={styles.typesContainer}>
            {pokemon.types?.map((type, index) => (
              <Chip
                key={index}
                style={[styles.typeChip, { backgroundColor: getTypeColor(type.type.name) }]}
                textStyle={styles.typeText}
              >
                {type.type.name.toUpperCase()}
              </Chip>
            ))}
          </View>
        </View>
      </View>

      {/* Información básica */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Información Básica</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Altura:</Text>
            <Text style={styles.infoValue}>{pokemon.height / 10}m</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Peso:</Text>
            <Text style={styles.infoValue}>{pokemon.weight / 10}kg</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Experiencia base:</Text>
            <Text style={styles.infoValue}>{pokemon.base_experience}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Estadísticas */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          {pokemon.stats?.map((stat, index) => (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statLabel}>{formatStatName(stat.stat.name)}</Text>
              <View style={styles.statBarContainer}>
                <View style={[styles.statBar, { width: `${calculateStatBar(stat.base_stat)}%` }]} />
              </View>
              <Text style={styles.statValue}>{stat.base_stat}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  pokemonImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#f5f5f5',
    borderRadius: 100,
  },
  headerInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  pokemonId: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  typeChip: {
    marginHorizontal: 4,
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    width: 120,
    fontSize: 14,
    color: '#666',
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  statBar: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  statValue: {
    width: 40,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default DetallesPokemon; 