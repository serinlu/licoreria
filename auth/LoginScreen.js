import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from "../context/AuthContext";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const { login, loginwithGoogle } = useAuth();
  const [user, setUser] = useState({
    email:"",
    password:"",
  });

  const handleLogin = async () => {
    try {
      await login(user.email, user.password);
      navigation.navigate('Products'); 
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    await loginwithGoogle();
    console.log('Registrarse con Google');
  };

  const handleRegister = async () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={user.email}
        onChangeText={(value) => setUser({ ...user, email: value })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value })}
      />
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <View style={styles.centerOptions}>
        <TouchableOpacity>
          <Text style={styles.centeredOptionText} onPress={handleRegister}>Regístrate</Text>
        </TouchableOpacity>
      </View>
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
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 40,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    color: '#000',
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#F07343',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  facebookButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#3b5998',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  socialButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
