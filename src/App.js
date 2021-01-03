import React from "react";
import { AuthProvider } from "../src/contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/login-components/PrivateRoute";
import Login from "./components/login-components/Login";
import ForgotPassword from "./components/login-components/ForgotPassword";
import Dashboard from "./components/dashboard-components/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
