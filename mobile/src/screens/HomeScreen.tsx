// mobile/src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const jobs = [
  { id: '1', title: "Frontend Developer", company: "Tech Nepal Pvt Ltd", location: "Kathmandu", salary: "40,000 - 65,000 NPR", type: "Full-time" },
  { id: '2', title: "Digital Marketing Executive", company: "Himalaya Marketing", location: "Pokhara", salary: "28,000 - 45,000 NPR", type: "Full-time" },
  { id: '3', title: "Node.js Backend Developer", company: "Cloud Solutions", location: "Lalitpur", salary: "55,000 - 85,000 NPR", type: "Full-time" },
];

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const navigation = useNavigation<any>();

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (job: any) => {
    Alert.alert(
      "Login Required",
      "You need to login to apply for this job.",
      [
        { text: "Cancel" },
        { text: "Login", onPress: () => navigation.navigate('Login') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find your dream job</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search jobs or companies..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <TextInput
        style={styles.searchInput}
        placeholder="Location (Kathmandu, Pokhara...)"
        value={selectedLocation === 'All' ? '' : selectedLocation}
        onChangeText={setSelectedLocation}
      />

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.jobCard} onPress={() => handleApply(item)}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.details}>📍 {item.location} • 💰 {item.salary}</Text>
            <TouchableOpacity style={styles.applyButton} onPress={() => handleApply(item)}>
              <Text style={styles.applyText}>Apply Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  jobTitle: { fontSize: 18, fontWeight: '600' },
  company: { fontSize: 15, color: '#666', marginVertical: 4 },
  details: { fontSize: 14, color: '#444' },
  applyButton: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  applyText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});