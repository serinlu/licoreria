import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { CartContext } from '../context/CartContext';
import { getProducts } from '../utils/HttpClient';

const bannerImage = require('../assets/banner.png');

export default function ProductScreen({ navigation }) {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }

    fetchProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <View style={styles.productCard}>
        <Text style={styles.productName}>{item.descripcion}</Text>
        <Text style={styles.productSize}>{item.marca}</Text>
        <Text style={styles.productPrice}>S/.{item.precio}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const AddProductHandler = () => {
    navigation.navigate("AddProduct");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={bannerImage} style={styles.bannerImage} />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>🍾</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>🥃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={AddProductHandler}>
          <Text style={styles.filterButtonText}>🍺</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: 200,
    backgroundColor: '#FFF200',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#F0F0F0',
  },
  filterButton: {
    backgroundColor: '#FFF200',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  filterButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  productList: {
    padding: 10,
  },
  productCard: {
    backgroundColor: '#FFF200',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productSize: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 20,
  },
  cartButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
