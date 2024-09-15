# Automated Blogging Assistant

A comprehensive blogging platform with an elegant frontend built using React and Material-UI and a robust backend using Node.js, Express, and MongoDB. This project provides user authentication, blog draft creation, and AI-powered content generation.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication:** Secure user login and registration.
- **Draft Management:** Create, view, and manage blog drafts.
- **Content Generation:** AI-powered content generation based on user input.
- **Private Routes:** Only accessible by authenticated users.
- **Responsive UI:** Built with Material-UI for a modern, mobile-friendly interface.
- **RESTful API:** Backend API built with Express, including authentication and data management.

## Project Structure
The project is organized into two main parts: the `client` (frontend) and `server` (backend).

```
automated-blogging-assistant/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   ├── Blog/
│   │   │   │   ├── CreateDraft.jsx
│   │   │   │   ├── ViewDrafts.jsx
│   │   │   │   ├── GenerateContent.jsx
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.js
│   ├── package.json
│   ├── .env
│   ├── README.md
├── server/
│   ├── config/
│   │   ├── db.js
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   ├── draftsController.js
│   ├── middleware/
│   │   ├── auth.js
│   ├── models/
│   │   ├── draft.js
│   │   ├── user.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── draftRoutes.js
│   ├── .env
│   ├── server.js
│   ├── package.json
```

### Key Files:
- **Frontend (`client/`):** Contains all React components, services, and context for state management.
- **Backend (`server/`):** Express server with controllers, middleware, models, and routes.
- **`.env` files:** Store environment variables for both frontend and backend.
- **`server/config/db.js`**: Database connection configuration for MongoDB.
- **`server/controllers/`**: Contains business logic for user authentication, AI content generation, and drafts management.

## Technologies Used
### Frontend:
- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **Material-UI**: For responsive UI components.
- **Axios**: For making HTTP requests.

### Backend:
- **Node.js**: Server environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and drafts.
- **Mongoose**: For object data modeling (ODM) with MongoDB.
- **JWT**: For user authentication.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed and running (locally or on a cloud service like MongoDB Atlas).

## Installation
### 1. Clone the Repository
```bash
git clone https://github.com/your-username/automated-blogging-assistant.git
cd automated-blogging-assistant
```

### 2. Setup the Backend (Server)
1. Navigate to the `server` directory:
    ```bash
    cd server
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the `server` directory and configure your environment variables:
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    JWT_SECRET=your-secret-key
    GROQ_API_KEY=your-groq-api-key
    ```
4. Start the server:
    ```bash
    npm start
    ```
   The backend server will run on `http://localhost:5000`.

### 3. Setup the Frontend (Client)
1. Navigate to the `client` directory:
    ```bash
    cd ../client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the client:
    ```bash
    npm start
    ```
   The frontend will run on `http://localhost:3000`.

## Usage
1. **Register a User:** Navigate to `http://localhost:3000/register` and create a new account.
2. **Login:** Go to `http://localhost:3000/login` to authenticate.
3. **Create Drafts:** Once logged in, you can create new drafts at `/create-draft`.
4. **View Drafts:** Access all your saved drafts at `/view-drafts`.
5. **Generate Content:** Utilize the AI-powered content generation feature at `/generate-content`.

## API Integration
The frontend interacts with the backend using the following API endpoints:
- **Auth:**
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Log in a user.
- **Drafts:**
  - `POST /api/drafts`: Save a new draft.
  - `GET /api/drafts`: Retrieve all drafts.
  - `POST /api/drafts/generate`: Generate content.

**Note:** API requests include JWT tokens for authentication, which are managed in the `AuthContext`.
