import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Modal, Portal, Provider } from 'react-native-paper';
import { BASE_URL } from '../log/config';

const Contact = ({ toggleSidebar }) => {
  const api = `${BASE_URL}/messages`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState('');

  const handleInput = (name, value) => {
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async () => {
    if (!post.firstName || !post.lastName || !post.email || !post.message) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.post(api, post, {withCredentials: true});
      setIsModalOpen(true);
      setError('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPost({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    });
  };

  return (
    <Provider>
      <ScrollView style={styles.mainContainer}>
        <Navbar toggleSidebar={toggleSidebar} />
        <View style={styles.container}>
          <Text style={styles.heading}>Contact Us</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={post.firstName}
              onChangeText={(value) => handleInput('firstName', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={post.lastName}
              onChangeText={(value) => handleInput('lastName', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={post.email}
              onChangeText={(value) => handleInput('email', value)}
            />
            <TextInput
              style={styles.textarea}
              placeholder="Message"
              value={post.message}
              onChangeText={(value) => handleInput('message', value)}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Portal>
          <Modal visible={isModalOpen} onDismiss={closeModal} contentContainerStyle={styles.modalContent}>
            <Text>Thank you for contacting us! We will get back to you soon.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  textarea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#4682A9',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#4682A9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Contact;
