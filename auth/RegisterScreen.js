import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    if (user.password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      await signup(user.email, user.password);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error, 'Error registrando usuario');
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={user.username}
        onChangeText={(value) => setUser({ ...user, username: value })}
        autoCapitalize="none"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
        <Text style={styles.registerButtonText}>
          {loading ? 'Cargando...' : 'Registrarse'}
        </Text>
      </TouchableOpacity>
      <View style={styles.centerOptions}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.centeredOptionText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
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
