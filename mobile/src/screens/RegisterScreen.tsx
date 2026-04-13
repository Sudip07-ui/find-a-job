// mobile/src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [role, setRole] = useState<'seeker' | 'employer'>('seeker');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!fullName || !email || !phone || !password) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    Alert.alert("Success", `Account created as ${role}!`);
    navigation.navigate('Home');
  };

  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.genderBtn, gender === 'male' && styles.active]} onPress={() => setGender('male')}>
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.genderBtn, gender === 'female' && styles.active]} onPress={() => setGender('female')}>
          <Text>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.genderBtn, gender === 'other' && styles.active]} onPress={() => setGender('other')}>
          <Text>Other</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Register as</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.roleBtn, role === 'seeker' && styles.active]} onPress={() => setRole('seeker')}>
          <Text>Job Seeker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roleBtn, role === 'employer' && styles.active]} onPress={() => setRole('employer')}>
          <Text>Employer</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 16, marginBottom: 16 },
  label: { fontWeight: '600', marginBottom: 8, marginTop: 10 },
  row: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  genderBtn: { flex: 1, padding: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  roleBtn: { flex: 1, padding: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  active: { backgroundColor: '#22c55e', borderColor: '#22c55e', color: '#fff' },
  button: { backgroundColor: '#22c55e', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  link: { textAlign: 'center', marginTop: 20, color: '#22c55e' },
});