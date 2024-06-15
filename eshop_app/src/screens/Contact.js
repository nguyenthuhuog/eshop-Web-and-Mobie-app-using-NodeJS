// src/screens/Contact.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet} from 'react-native';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ScrollView } from 'react-native-gesture-handler';
import { BASE_URL } from '../log/config';

const Contact = ({toggleSidebar}) => {
  const api = `${BASE_URL}/messages`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleInput = (name, value) => {
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(api, post);
      setIsModalOpen(true);
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
          <Button title="Submit" onPress={handleSubmit} />
      </View>

      <Modal visible={isModalOpen} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Thank you for contacting us! We will get back to you soon.</Text>
            <Button title="OK" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  </ScrollView>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default Contact;
