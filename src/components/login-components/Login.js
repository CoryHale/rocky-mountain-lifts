import React, { useEffect, useState } from "react";
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

const Login = () => {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const fetchCurrentUser = useSelector(
    (state) => state.getCurrentUserReducer.currentUser
  );
  const [flag, setFlag] = useState(false);
  const [flagTwo, setFlagTwo] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (flag) {
      dispatch(getCurrentUser(currentUser.uid));
    }
  }, [flag]);

  useEffect(() => {
    if (fetchCurrentUser) {
      setFlagTwo(true);
    }
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (flagTwo) {
      setLoading(false);
      history.push("/dashboard");
    }
  }, [flagTwo]);

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
      setLoading(true);
      await login(creds.email, creds.password);
      setFlag(true);
    } catch {
      setError("Failed to sign in");
      setLoading(false);
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
            <h2>Log In</h2>
            {error && <Alert color="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </FormGroup>
              <Button color="success" type="submit" disabled={loading}>
                Log In
              </Button>
            </Form>
            <div>
              <Link to="/forgot-password" className="link">
                Forgot Password?
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
