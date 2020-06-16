import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./Context/auth";
import AuthRoute from "./utils/AuthRoute";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Container>
          <Navbar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
