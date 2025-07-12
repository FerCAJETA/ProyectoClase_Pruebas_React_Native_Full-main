import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Alert, ScrollView, Dimensions } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PokemonCard from '../../components/PokemonCard';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function ScreenHome() {
  const navigation = useNavigation();
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

  const fetchTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      const validTypes = response.data.results.filter(t => 
        t.name !== 'unknown' && t.name !== 'shadow' && t.name !== 'stellar'
      );
      setTypes(validTypes);
    } catch (error) {
      setTypes([]);
    }
  };

  const fetchPokemons = async (limit = 20) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          return detailResponse.data;
        })
      );
      
      if (offset === 0) {
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } else {
        setPokemons(prev => [...prev, ...pokemonDetails]);
        setFilteredPokemons(prev => [...prev, ...pokemonDetails]);
      }
      setHasMore(response.data.next !== null);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los Pokémon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons;
    if (selectedType !== 'all') {
      filtered = filtered.filter(pokemon => pokemon.types.some(t => t.type.name === selectedType));
    }
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.id.toString().includes(searchQuery)
      );
    }
    setFilteredPokemons(filtered);
  }, [searchQuery, pokemons, selectedType]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setOffset(prev => prev + 20);
      fetchPokemons(20);
    }
  };

  const handlePokemonPress = (pokemon) => {
    navigation.navigate('DetallesPokemon', { pokemon });
  };

  const renderPokemon = ({ item }) => (
    <PokemonCard pokemon={item} onPress={handlePokemonPress} />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  };

  const renderTypeFilters = () => (
    <View style={styles.filtersContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.typeScroll}
        contentContainerStyle={styles.typeScrollContent}
      >
        <Chip
          selected={selectedType === 'all'}
          onPress={() => setSelectedType('all')}
          style={[styles.typeChip, selectedType === 'all' && styles.typeChipSelected]}
          textStyle={[styles.typeChipText, selectedType === 'all' && styles.typeChipTextSelected]}
        >
          Todos
        </Chip>
        {types.map((type) => (
          <Chip
            key={type.name}
            selected={selectedType === type.name}
            onPress={() => setSelectedType(type.name)}
            style={[styles.typeChip, selectedType === type.name && styles.typeChipSelected]}
            textStyle={[styles.typeChipText, selectedType === type.name && styles.typeChipTextSelected]}
          >
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Pokédex</Text>
          <MaterialCommunityIcons name="pokeball" size={32} color="#6366F1" />
        </View>
        <View style={styles.headerDecoration} />
      </View>
      
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Buscar Pokémon..."
      />
      
      {renderTypeFilters()}
      
      <FlatList
        data={filteredPokemons}
        renderItem={renderPokemon}
        keyExtractor={(item) => item.id.toString()}
        numColumns={width > 600 ? 3 : 2}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 16,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: width > 600 ? 36 : 28,
    fontWeight: '800',
    color: '#1E293B',
    marginRight: 12,
  },
  headerDecoration: {
    height: 3,
    backgroundColor: '#6366F1',
    marginHorizontal: 40,
    borderRadius: 2,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  typeScroll: {
    flexGrow: 0,
  },
  typeScrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  typeChip: {
    marginHorizontal: 4,
    backgroundColor: '#F1F5F9',
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  typeChipSelected: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  typeChipText: {
    fontWeight: '600',
    color: '#475569',
    fontSize: 12,
  },
  typeChipTextSelected: {
    color: '#FFFFFF',
  },
  flatList: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 24,
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  loadingFooter: {
    paddingVertical: 24,
    alignItems: 'center',
  },
});
