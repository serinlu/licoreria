import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { AntDesign } from '@expo/vector-icons';

export default function ProductDetailScreen({route, navigation }) {
    const { product } = route.params;
    const { addToCart } = useContext(CartContext);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleCart = () => {
        navigation.navigate('Cart');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={handleBack} >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleCart}>
                    <Ionicons name="cart-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.productImageContainer}>
                <Image source={  product.image  } style={styles.productImage} />
            </View>
            <View style={styles.productInfoContainer}>
                <Text style={styles.productName}>{product.descripcion}</Text>
                <Text style={styles.productSize}>{product.marca}</Text>
            </View>
            <View style={styles.productDetailsContainer}>
                <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={24} color="gold" />
                    <Text style={styles.ratingText}>4.9</Text>
                </View>
                <Text style={styles.descriptionTitle}>Descripción</Text>
                <Text style={styles.descriptionText}>* Este producto está limitado a 6 unidades por compra.</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.productPrice}>S/.{product.precio}</Text>
                <TouchableOpacity style={styles.addButton} onPress={(product) => addToCart()}>
                    <Text style={styles.addButtonText}>AÑADIR AL CARRITO</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    addButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: '#FFF200',
    },
    iconButton: {
        padding: 10,
    },
    productImageContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF200',
        paddingVertical: 20,
    },
    productImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    productInfoContainer: {
        alignItems: 'center',
        padding: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productSize: {
        fontSize: 18,
        color: '#555',
    },
    addButton: {
        marginTop: 10,
    },
    productDetailsContainer: {
        padding: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 18,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    descriptionText: {
        fontSize: 16,
        color: '#555',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF200',
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buyButton: {
        backgroundColor: '#000',
        borderRadius: 25,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    buyButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
