import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext"; 
const API_KEY = '943616e7';
const BASE_URL = 'http://www.omdbapi.com/';


export default function Home() {
  const [movies, setMovies] = useState<{ imdbID: string; Poster: string; Title: string; Year: string; }[]>([]);
  const { clickCount, setClickCount, yourName } = useContext(ClickCountContext); // Access context values
    useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?s=batman&apikey=${API_KEY}`);
      setMovies(response.data.Search); 
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Handle item clicks
  const handleItemClick = () => {
    console.log(clickCount);
    setClickCount(clickCount + 1); // Update click count using context
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Welcome, {yourName} </Text>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <Image source={{ uri: item.Poster }} style={styles.image} />
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.year}>{item.Year}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: { marginBottom: 20, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', padding: 10 },
  image: { width: '100%', height: 300, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
  year: { fontSize: 14, color: '#666' },
  
  topBar: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#8159FA",
    padding: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  topBarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: "#8159FA",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});



