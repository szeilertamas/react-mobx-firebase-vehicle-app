// src/pages/AboutPage.jsx

import React from "react";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="card border-0 rounded-3 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 text-center">Welcome to AutoConnect</h2>
            <p className="card-text">
              AutoConnect is a React-based web application for managing vehicle
              information.
            </p>
            <div className="markdown-body">
              <h3 className="text-start fw-bold text-decoration-underline">Features</h3>
              <ul>
                <li>View a list of vehicles with details</li>
                <li>Add new vehicles to the inventory</li>
                <li>Edit existing vehicle information</li>
                <li>Delete vehicles from the inventory</li>
                <li>Filtering, sorting, paging</li>
              </ul>

              <h3 className="text-start fw-bold text-decoration-underline">Technologies Used</h3>
              <ul>
                <li>React for building the user interface</li>
                <li>MobX for state management</li>
                <li>Firebase for data storage</li>
                <li>Bootstrap for styling</li>
              </ul>

              <h3 className="text-start fw-bold text-decoration-underline">Getting Started</h3>
              <p>To run this project locally, follow these steps:</p>
              <code>
                git clone https://github.com/szeilertamas/react-mobx-firebase-vehicle-app.git<br />
                cd react-mobx-firebase-vehicle-app<br />
                npm install<br />
                npm start
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
