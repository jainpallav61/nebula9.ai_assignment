import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import CreateDraft from "./components/blog/createDraft";
import ViewDrafts from "./components/blog/viewDraft";
import GenerateContent from "./components/blog/generateContent";
import Header from "./components/layout/header";
import { AuthProvider, AuthContext } from "./context/authContext";
import { Container } from "@mui/material";

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
