import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const { width } = Dimensions.get('window');
const cardWidth = width > 600 ? (width - 48) / 3 : (width - 24) / 2;

const PokemonCard = ({ pokemon, onPress }) => {
  const getTypeColor = (type) => {
    const colors = {
      normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
      grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
      ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
      rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
      steel: '#B8B8D0', fairy: '#EE99AC'
    };
    return colors[type] || '#A8A878';
  };

  const getCardStyle = () => {
    if (!pokemon.types?.length) return { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' };
    const primaryType = pokemon.types[0].type.name;
    const color = getTypeColor(primaryType);
    return {
      backgroundColor: color + '15',
      borderColor: color,
      borderWidth: 2
    };
  };

  return (
    <TouchableOpacity onPress={() => onPress(pokemon)} style={styles.touchable}>
      <Card style={[styles.card, getCardStyle()]}>
        <Card.Cover 
          source={{ uri: pokemon.sprites?.front_default || 'https://via.placeholder.com/150' }} 
          style={styles.image}
        />
        <Card.Content style={styles.content}>
          <Title style={styles.title} numberOfLines={1}>
            {pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1) || 'Pokémon'}
          </Title>
          <Paragraph style={styles.id}>#{pokemon.id || '???'}</Paragraph>
          <View style={styles.typesContainer}>
            {pokemon.types?.map((type, index) => (
              <View key={index} style={[styles.typeBadge, { backgroundColor: getTypeColor(type.type.name) }]}>
                <Text style={styles.typeText}>{type.type.name.toUpperCase()}</Text>
              </View>
            )) || (
              <View style={[styles.typeBadge, { backgroundColor: '#94A3B8' }]}>
                <Text style={styles.typeText}>NORMAL</Text>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: cardWidth,
    margin: 4,
  },
  card: {
    width: '100%',
    elevation: 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    height: 120,
    resizeMode: 'contain',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  content: {
    padding: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
    color: '#1E293B',
  },
  id: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  typeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '700',
  },
});

export default PokemonCard; 