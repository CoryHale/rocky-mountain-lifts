import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from "reactstrap";
import { NavLink as RRNavLink, useHistory } from "react-router-dom";

import Logo from "../../assets/logo.png";
import "../../styles/header.scss";

const Header = () => {
  const user = useSelector((state) => state.getCurrentUserReducer.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await user;
      } catch {
        setError("Could not get current user");
      }
    };

    fetchUser();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setIsOpenNotifications(!isOpenNotifications);
  };

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      localStorage.clear();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <div className="header">
      <Navbar expand="md">
        <NavbarBrand href="/">
          <img className="logo" src={Logo} alt="rocky mountain lifts" />
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          {user.userType === "employee" ? (
            <NavItem>
              <NavLink
                tag={RRNavLink}
                className="nav-link"
                activeClassName="active"
                to="/dashboard"
                exact
              >
                Tasks
              </NavLink>
            </NavItem>
          ) : null}
          {user.userType === "employee" ? (
            <NavItem>
              <NavLink
                tag={RRNavLink}
                className="nav-link"
                activeClassName="active"
                to="/dashboard/workorders"
              >
                Work Orders
              </NavLink>
            </NavItem>
          ) : null}
          {user.userType === "employee" ? (
            <NavItem>
              <NavLink
                tag={RRNavLink}
                className="nav-link"
                activeClassName="active"
                to="/dashboard/jobs"
              >
                Jobs
              </NavLink>
            </NavItem>
          ) : null}
          {user.userType === "employee" ? (
            <NavItem>
              <NavLink
                tag={RRNavLink}
                className="nav-link"
                activeClassName="active"
                to="/dashboard/customers"
              >
                Customers
              </NavLink>
            </NavItem>
          ) : null}
          {user.userType === "employee" ? (
            <NavItem>
              <NavLink
                tag={RRNavLink}
                className="nav-link"
                activeClassName="active"
                to="/dashboard/files"
              >
                Files
              </NavLink>
            </NavItem>
          ) : null}
          {user.userType === "employee" && user.tierLevel === 3 ? (
            <NavItem>
              <NavLink
                tag={RRNavLink}
                className="nav-link"
                activeClassName="active"
                to="/dashboard/employees"
              >
                Employees
              </NavLink>
            </NavItem>
          ) : null}
          {user.userType === "customer" ? (
            <NavItem>
              <NavLink
                tag={RRNavLink}
                className="nav-link"
                activeClassName="active"
                to="/dashboard/test"
              >
                Test
              </NavLink>
            </NavItem>
          ) : null}
          <NavItem>
            <div className="divider" />
          </NavItem>
          <NavItem>
            <Dropdown isOpen={isOpenNotifications} toggle={toggleNotifications}>
              <DropdownToggle tag="span" className="nav-link">
                <i className="fas fa-bell" />
              </DropdownToggle>
              <DropdownMenu direction="center">
                <DropdownItem>Notification</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
          <NavItem>
            <Dropdown isOpen={isOpen} toggle={toggle}>
              <DropdownToggle tag="span" className="nav-link">
                {user.userType === "employee" ? (
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                ) : (
                  <span>
                    {user.primaryContact ? user.primaryContact.firstName : null}{" "}
                    {user.primaryContact ? user.primaryContact.lastName : null}
                  </span>
                )}
              </DropdownToggle>
              <DropdownMenu direction="right">
                <DropdownItem>My Profile</DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
