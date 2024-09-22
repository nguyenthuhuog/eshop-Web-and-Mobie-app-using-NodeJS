import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/homepage.css';
import '../css/aboutus.css';

const projectData = {
    group: 'H2T',
    projectIdea: 'Creating a Website and Application for an Electronics Store specializing in products like computers, keyboards, mice, and headsets.',
    needFinding: 'The demand for a seamless and user-friendly platform for customers to browse and purchase electronic items, such as computers and peripherals, is increasing. Current platforms may lack the necessary features like detailed product comparisons, personalized recommendations, and a smooth checkout process that today\'s tech-savvy consumers expect. The proposed solution aims to address these needs by offering an intuitive interface with advanced filtering options, customer reviews, and integrated payment gateways for a more satisfying shopping experience.',
    conceptVideo: '[Link to Concept Video]',
    lowFiPrototype: '[Link to Low-fi Prototype]',
    hiFiPrototype: '[Link to Hi-fi Prototype]',
  };
  
  function AboutUs() {
    return (
        <div className="container">
            <div className="item">
                <div className="aboutus">
                    <header>
                    <h1>Welcome to HCI Project: Group I (H2T)</h1>
                    <p>Course: AC4150E – ET-E16 - 20241</p>
                    <p>Instructors: Prof. Thanh-Hai Tran, Dr. Viet-Tung Nguyen</p>
                    </header>
                    <main>
                    <table id="project-info">
                        <thead>
                        <tr>
                            <th>Group Presentation</th>
                            <th>Project Idea</th>
                            <th>Need Finding</th>
                            <th>Concept Video</th>
                            <th>Low-fi Prototype</th>
                            <th>Hi-fi Prototype</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{projectData.group}</td>
                            <td>{projectData.projectIdea}</td>
                            <td>{projectData.needFinding}</td>
                            <td>{projectData.conceptVideo}</td>
                            <td>{projectData.lowFiPrototype}</td>
                            <td>{projectData.hiFiPrototype}</td>
                        </tr>
                        </tbody>
                    </table>
                    </main>
                    <footer>
                    <p>&copy; 2024 HCI Project. All rights reserved.</p>
                    </footer>
                </div>
                </div>
                </div>
    );
  }
  
  export default AboutUs;