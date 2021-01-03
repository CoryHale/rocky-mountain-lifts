import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Table, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { getCustomers } from "../../actions/getCustomers";

import "../../styles/customer.scss";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const fetchCustomers = useSelector(
    (state) => state.getCustomersReducer.customers
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getCustomers());
  }, []);

  useEffect(() => {
    setCustomers(fetchCustomers.customers);
  }, [getCustomers]);

  const handleClick = (e, customer) => {
    const customerId = customer.userId;
    history.push(`customers/${customerId}`);
  };

  return (
    <div className="content-page">
      <h1>Customers</h1>
      <Table hover className="customer-table">
        <thead>
          <tr className="table-header">
            <td>Contact</td>
            <td>Address</td>
            <td>Industry</td>
          </tr>
        </thead>
        <tbody>
          {customers
            ? customers.map((customer) => (
                <tr onClick={(e) => handleClick(e, customer)}>
                  <td>{customer.businessName}</td>
                  <td>
                    {customer.shopAddress.address}, {customer.shopAddress.city},{" "}
                    {customer.shopAddress.state} {customer.shopAddress.zipcode}
                  </td>
                  <td>{customer.industry}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default Customers;
