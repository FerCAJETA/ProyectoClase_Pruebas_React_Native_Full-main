import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({ searchQuery, onSearchChange, placeholder = "Buscar Pokémon..." }) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={onSearchChange}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#6366F1"
        inputStyle={styles.input}
        placeholderTextColor="#94A3B8"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    elevation: 0,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  input: {
    fontSize: 16,
    color: '#1E293B',
  },
});

export default SearchBar; 