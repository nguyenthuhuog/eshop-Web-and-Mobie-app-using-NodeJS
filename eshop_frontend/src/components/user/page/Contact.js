import React, { useState } from 'react';
import axios from 'axios';
import '../../../css/contact.css';
import '../../../css/homepage.css';

const Contact = () => {
    var api = 'http://localhost:8080/api/messages';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [post, setPost] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    })
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value}) // đổi event thành value -> lưu đc giá trị input vào biến này (lỗi syntax)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(post);
            // Send a POST request with the form data
            const response = await axios.post(api, post); // ban đầu là {post}, t bỏ cái ngoặc thôi :v, input là 1 phần tử chứ k phải 1 list ý
            // .then(response => console.log(response));
    
            console.log('Message sent successfully:', response.data); // chỗ này lỗi đọc data, bỏ dòng then bên trên là hết, chắc kiểu nếu then rồi thì sau đó response bị giải phóng luôn idk
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <h1 style={{ paddingTop: '60px' }}>Contact Us</h1>
            <div className="contact-form-footer">
                <h2>Get in Touch</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="first-name">First Name</label>
                            <input type="text" id="first-name" name="firstName" onChange={handleInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">Last Name</label>
                            <input type="text" id="last-name" name="lastName" onChange={handleInput} required />
                        </div>
                    </div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleInput} required />
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" onChange={handleInput} required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>

            {isModalOpen && (
                <div id="thankYouModal" className="modal">
                    <div className="modal-content">
                        <p>Thank you for contacting us! We will get back to you soon.</p>
                        <button onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
