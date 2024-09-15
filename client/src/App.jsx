import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import CreateDraft from "./components/Blog/CreateDraft";
import ViewDrafts from "./components/blog/viewDraft";
import GenerateContent from "./components/Blog/GenerateContent";
import Header from "./components/Layout/Header";
import { AuthProvider, AuthContext } from "./context/authContext";
import { Container } from "@mui/material";  // Adding container for consistent layout

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/create-draft"
              element={
                <PrivateRoute>
                  <CreateDraft />
                </PrivateRoute>
              }
            />
            <Route
              path="/view-drafts"
              element={
                <PrivateRoute>
                  <ViewDrafts />
                </PrivateRoute>
              }
            />
            <Route
              path="/generate-content"
              element={
                <PrivateRoute>
                  <GenerateContent />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
