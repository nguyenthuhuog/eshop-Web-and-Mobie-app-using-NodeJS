import React, { useState } from 'react';
import axios from 'axios';
import '../../../css/contact.css';
import '../../../css/homepage.css';

const AboutUs = () => {
    const api = 'http://localhost:8080/api/messages';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [post, setPost] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(post);
            // Send a POST request with the form data
            const response = await axios.post(api, post, {withCredentials: true});
            // .then(response => console.log(response));
    
            console.log('Message sent successfully:', response.data);
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
            message: ''
        });
    };

    return (
        <div className="container">
            <div className="item">
                <h2>About us</h2>
                <p>
                Welcome to Tech Haven! We're your premier destination for high-quality computers, 
                accessories, and exceptional tech support. Whether you're a gamer, professional, 
                or casual user, we offer a wide range of products to meet your needs. Our team of experts 
                is dedicated to providing personalized service, ensuring you find the perfect computer solution. 
                We pride ourselves on our competitive prices and reliable customer service.           
                </p>
            </div>
            
        </div>
    );
};

export default AboutUs;
