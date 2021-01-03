import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Input,
  Form,
  FormGroup,
  Label,
  Navbar,
  NavbarBrand,
} from "reactstrap";

import Footer from "../dashboard-components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { getCurrentUser } from "../../actions";

import logo from "../../assets/logo.png";
import "../../styles/login.scss";

const ForgotPassword = () => {
  const [creds, setCreds] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { forgotPassword } = useAuth();

  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await forgotPassword(creds.email);
      setMessage("Please check you email for further instructions");
    } catch {
      setError("Failed to send email");
    }
  };

  return (
    <div className="login-page">
      <div className="header">
        <Navbar>
          <NavbarBrand href="/">
            <div className="logo-box">
              <img src={logo} alt="rocky mountain lifts" />
            </div>
          </NavbarBrand>
        </Navbar>
      </div>
      <div className="login-box">
        <Card>
          <CardBody>
            <h3>Forgot Password</h3>
            {message && <Alert color="success">{message}</Alert>}
            {error && <Alert color="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" onChange={handleChange} />
              </FormGroup>
              <Button color="success" type="submit">
                Submit
              </Button>
            </Form>
            <div>
              <Link to="/login" className="link">
                Log In
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;