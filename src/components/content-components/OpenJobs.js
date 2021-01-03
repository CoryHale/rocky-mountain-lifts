import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Table } from "reactstrap";

import "../../styles/workorder.scss";

const OpenJobs = () => {
  const [jobs, setJobs] = useState([]);
  const getWorkOrders = useSelector(
    (state) => state.getWorkOrdersReducer.workOrders
  );
  const history = useHistory();

  useEffect(() => {
    const array = [];

    if (getWorkOrders.workOrders) {
      getWorkOrders.workOrders.forEach((workOrder) => {
        if (workOrder.status !== "Closed") {
          array.push(workOrder);
        }
      });
    }

    setWorkOrders(array);
  }, [getWorkOrders]);

  const handleClick = (e, workOrder) => {
    const jobId = workOrder.workOrderId;
    history.push(`workorders/${jobId}`);
  };

  return (
    <div className="work-orders-page">
      <h1 className="open-work-orders-title">Open Jobs</h1>
      {workOrders
        ? workOrders.map((workOrder) => (
            <Card
              className="work-order-card"
              onClick={(e) => handleClick(e, workOrder)}
            >
              <CardBody>
                <Table borderless>
                  <thead>
                    <tr>
                      <th>W.O. #</th>
                      {workOrder.jobNumber ? <th>Job #</th> : null}
                      <th>Customer Name</th>
                      <th>Service Type</th>
                      <th>Service Date</th>
                      <th>Service Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{workOrder.workOrderId}</th>
                      {workOrder.jobNumber ? (
                        <th>{workOrder.jobNumber}</th>
                      ) : null}
                      <td>{workOrder.customerName}</td>
                      <td>
                        {workOrder.serviceType.length > 1
                          ? "Multi"
                          : workOrder.serviceType}
                      </td>
                      <td>{dateConverter(workOrder.serviceDate)}</td>
                      <td>{timeConverter(workOrder.serviceStartTime)}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          ))
        : null}
    </div>
  );
};

export default OpenWorkOrders;