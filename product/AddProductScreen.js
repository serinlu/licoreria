import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { addProducts } from '../utils/HttpClient'; // Asegúrate de ajustar la ruta correctamente

export default function AddProductScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    descripcion: '',
    marca: '',
    precio: '',
  });

  const handleProductRegister = async () => {
    if (!product.descripcion || !product.marca || !product.precio) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      await addProducts({
        descripcion: product.descripcion,
        marca: product.marca,
        precio: parseFloat(product.precio),
        fecha: new Date().toISOString(),
      });
      Alert.alert("Éxito", "Producto agregado correctamente");
      navigation.navigate('Products');
    } catch (error) {
      console.error(error, 'Error registrando producto');
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={product.descripcion}
        onChangeText={(value) => setProduct({ ...product, descripcion: value })}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={product.marca}
        onChangeText={(value) => setProduct({ ...product, marca: value })}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={product.precio}
        keyboardType="numeric"
        onChangeText={(value) => setProduct({ ...product, precio: value })}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleProductRegister} disabled={loading}>
        <Text style={styles.registerButtonText}>
          {loading ? 'Cargando...' : 'Agregar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF200',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 80,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
  },
  imagePickerButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  imagePickerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  registerButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerOptions: {
    alignItems: 'center',
    marginTop: 20,
  },
  centeredOptionText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 10,
  },
});
