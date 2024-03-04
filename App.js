import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';

const AgeCalculator = () => {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  const calculateAge = () => {
  
if (!dob.trim()) {
Alert.alert('Entrada vazia', 'Por favor, insira uma data.');
      return;
    }
 const parts = dob.split('/');
 
    if (parts.length !== 3 || isNaN(parseInt(parts[0])) || isNaN(parseInt(parts[1])) || isNaN(parseInt(parts[2]))) {
 Alert.alert('Formato Incorreto', 'Por favor, insira uma data neste formato dd/mm/aaaa. (31/12/1999)');
      return;
    }
    const today = new Date();
    const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months = 12 + months;
    }

    if (days < 0) {
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days = prevMonthLastDay + days;
      months--;
    }

    setAge({ years, months, days });
  };

  return (
  <ImageBackground source={require('./a.jpeg')} style={styles.backgroundImage}>
    <View style={styles.container}>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Calculadora de Idade</Text>
      <View style={styles.inputContainer}>
        <TextInput 
        
        style={styles.input}  
         placeholder="__/__/____"
          placeholderTextColor="#391f8c"
          textAlign="center"
          value={dob || ''}
          onChangeText={(text) => setDob(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={calculateAge}>
        <Text style={styles.buttonText}>Calcular Idade</Text>
      </TouchableOpacity>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Idade: {age.years} anos, {age.months} meses, {age.days} dias
        </Text>
      </View>
      </View>
    </View>
   </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#20124d',
    textTransform: 'uppercase',
  },
  inputContainer: {
    marginBottom: 20,
 alignItems:'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: '#391f8c',
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: '#391f8c',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#20124d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#391f8c',
  },
  resultText: {
    fontSize: 22,
    color: '#20124d',
  },
});

export default AgeCalculator;
