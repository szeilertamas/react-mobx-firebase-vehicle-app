# 🚗 React-MobX-Firebase App 🚀

This is a minimalistic web app built with React, MobX, and Firebase, ideal for learning full-stack web development.

### Live Demo

You can see the live demo [here](https://react-mobx-firebase-app-c6627.web.app/).

## Features

- **CRUD Operations:** Perform CRUD (Create, Read, Update, Delete) operations on vehicle data
- **Real-time Updates:** Utilize Firebase to provide real-time updates to the vehicle data
- **Sorting:** Allow users to sort vehicles based on different criteria
- **Filtering:** Enable users to filter vehicles based on specific criteria
- **Pagination:** Implement pagination for displaying a large number of vehicles
- **Form Validation:** Implement form validation to ensure data integrity when adding or updating vehicles

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **MobX**: A state management library for React applications
- **Firebase**: A platform for building web and mobile applications
- **Bootstrap**: A front-end framework for building responsive and mobile-first websites
- **MobX React Form**: A form library for MobX-powered React applications
- **Validatorjs**: A data validation library for JavaScript
- **dotenv**: A module that loads environment variables from a `.env` file

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository:
   ```sh
   git clone https://github.com/szeilertamas/react-mobx-firebase-vehicle-app.git
   ```
2. Navigate into the project directory:
   ```sh
   cd react-mobx-firebase-vehicle-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```
5. Open your browser and visit http://localhost:3000 to view the app.

## Configuration

Before running the application, ensure you have set up Firebase Firestore and obtained the necessary environment variables. Create a `.env` file in the project root directory and add the following variables:

``````
REACT_APP_FIREBASE_API_KEY=<your-firebase-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<your-firebase-project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
REACT_APP_FIREBASE_APP_ID=<your-firebase-app-id>
``````

## Project Structure

- `src/components`: Contains React components for rendering UI elements
- `src/pages`: Contains components representing different pages of the application
- `src/services`: Contains service classes for interacting with Firebase
- `src/stores`: Contains MobX store classes for managing application state
- `src/utils`: Contains utility functions and configurations
- `src/App.js`: The main component where the application starts
- `src/index.js`: Entry point of the application


## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.
