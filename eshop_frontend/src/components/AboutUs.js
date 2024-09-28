import React, { useState } from 'react';
import '../css/homepage.css';
import '../css/aboutus.css';

const groupInfo = [
    { name: 'Bui Hanh Trang', ID: '20210851', interest: 'Interaction Design', scpecialities: 'Usability Testing, User Research' },
    { name: 'Nguyen Thi Thanh Hang', ID: '20213570', interest: 'Web Development', scpecialities: 'Responsive Design, HTML/CSS' },
    { name: 'Nguyen Thu Huong', ID: '20210423', interest: 'Product Design', scpecialities: 'Illustration, Prototyping' },
];

const draftIdea = [
    { idea: 'Classify products by categories' },
    { idea: 'Responsive designs for laptop, tablet and phone users' },
    { idea: 'Allow customers to review and rate the products' },
    { idea: 'Chatbox for customers to ask the administrators lively' }
]
const interactionImprovements = [
    { type: 'Instructive', improvements: 'Provide clear guidance to users through tools like tutorial or onboarding, tooltips, and FAQs.' },
    { type: 'Exploring', improvements: 'Improve search tools, product filtering, and smart product recommendations.' },
    { type: 'Conversing', improvements: 'Add smart chatbots, live chat support, and user reviews.' },
    { type: 'Manipulating', improvements: 'Enable product customization, and dynamic cart management.' }
];

const interfaceImprovements = [
    { type: 'Web Interface', improvements: 'Optimize responsive design, product sliders, and product comparisons.' },
    { type: 'Form Fill-In Interface', improvements: 'Simplify forms with auto-complete and error checking.' },
    { type: 'Query Interface', improvements: 'Enhance search functionality using natural language processing and filters.' },
];

function AboutUs() {
    const [showGroup, setShowGroup] = useState(false);
    const [showImprove, setShowImprove] = useState(false);

    return (
        <div className="container">
            <div className="item">
                <div className="aboutus">
                    <header>
                        <h1>Welcome to HCI Project: Group 8 (H2T)</h1>
                        <p>Course: AC4050E – ET-E16 - 20241</p>
                        <p>Instructors: Prof. Thanh-Hai Tran, Dr. Viet-Tung Nguyen</p>
                    </header>
                    <div className="section">
                        <h1 onClick={() => setShowGroup(!showGroup)} style={{ cursor: 'pointer' }}>
                            Group Presentation {showGroup ? '▲' : '▼'}
                        </h1>
                        {showGroup && (
                            <div>
                                <div class="subsection">
                                <h2>Members</h2>
                                    <table id="project-info">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Student ID</th>
                                                <th>Interest</th>
                                                <th>Specialties in Design</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {groupInfo.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.ID}</td>
                                                    <td>{item.interest}</td>
                                                    <td>{item.scpecialities}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="subsection">
                                    <h2>History</h2>
                                    <p>
                                        We have collaborated on many projects in the past and have found that our synergy in work has helped us achieve the best results. Among these projects is a web project that is already quite complete, and we want to continue developing it. This will not only save time but also allow us to review and refine the aspects that are still not fully finished in that project.
                                    </p>
                                </div>
                                <div class="subsection">
                                    <h2>Slogan</h2>
                                    <blockquote style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'black' }}>
                                        "Highly Higher Tech"
                                    </blockquote>
                                </div>
                            </div>)}
                    </div>

                    <div className="section">
                        <h1 onClick={() => setShowImprove(!showImprove)} style={{ cursor: 'pointer' }}>
                            Project Ideas {showImprove ? '▲' : '▼'}
                        </h1>
                        {showImprove && (
                            <div>
                                <div class="subsection">
                                    <h2> Draft Idea</h2>
                                    <table id="draft-table">
                                        <thead>
                                            <tr>
                                                <th>Idea</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {draftIdea.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.idea}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="subsection">
                                    <h2> Refined Idea</h2>
                                    <table id="interaction-table">
                                        <thead>
                                            <tr>
                                                <th>Interaction Type</th>
                                                <th>Improvements</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {interactionImprovements.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.type}</td>
                                                    <td>{item.improvements}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <table id="interface-table">
                                        <thead>
                                            <tr>
                                                <th>Interface Type</th>
                                                <th>Improvements</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {interfaceImprovements.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.type}</td>
                                                    <td>{item.improvements}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                    <footer>
                        <p>&copy; 2024 HCI Project. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
