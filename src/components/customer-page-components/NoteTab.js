import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useAuth } from "../../contexts/AuthContext";
import { addNote } from "../../actions/addNote";
import { getCustomerNotes } from "../../actions/getCustomerNotes";

const NoteTab = () => {
  const [notes, setNotes] = useState([]);
  const getNotesFromState = useSelector(
    (state) => state.getCustomerNotesReducer.notes
  );
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState({
    note: "",
    createdBy: "",
    createdOnDate: "",
    createdAtTime: "",
    customerId: "",
  });
  const success = useSelector((state) => state.addNoteReducer.success);
  const { currentUser } = useAuth();
  const [flag, setFlag] = useState(false);
  const [employees, setEmployees] = useState();
  const fetchUsers = useSelector((state) => state.getUsersReducer.users);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const customerId = pathArray[pathArray.length - 1];
    setNote({
      ...note,
      customerId: customerId,
    });
    dispatch(getCustomerNotes(customerId));
  }, []);

  useEffect(() => {
    if (getNotesFromState) {
      setNotes(getNotesFromState);
    }
  }, [getNotesFromState]);

  useEffect(() => {
    if (flag) {
      dispatch(addNote(note));
    }
  }, [flag]);

  useEffect(() => {
    if (success) {
      toggle();
    }
  }, [success]);

  useEffect(() => {
    const array = [];

    if (fetchUsers.users) {
      fetchUsers.users.forEach((user) => {
        if (user.userType === "employee" && user.active === true) {
          array.push(user);
        }
      });
    }
    setEmployees(array);
  }, [fetchUsers]);

  const toggle = () => {
    if (isOpen) {
      setNote({
        note: "",
        createdOnDate: "",
        createdAtTime: "",
        createdBy: "",
      });
    }
    setIsOpen(!isOpen);
  };

  const employeeFinder = (createdBy) => {
    var name;

    employees.forEach((employee) => {
      if (employee.userId === createdBy) {
        name = `${employee.firstName} ${employee.lastName}`
      }
    });
    return name;
  };

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNote({
      ...note,
      createdOnDate: new Date().toLocaleDateString(),
      createdAtTime: new Date().toLocaleTimeString(),
      createdBy: currentUser.uid,
    });
    setFlag(true);
  };

  return (
    <div className="customer-page-note-tab">
      {notes
        ? notes.notes
          ? notes.notes.map((note) => (
              <Card className="note-card">
                <p>{note.note}</p>
                <div>
                  <p>
                    Created By: <span>{employeeFinder(note.createdBy)}</span>
                  </p>
                  <p>
                    Created: {note.createdOnDate} @ {note.createdAtTime}
                  </p>{" "}
                  {/* Fix time format */}
                </div>
              </Card>
            ))
          : null
        : null}
      <Button outline color="success" onClick={toggle}>
        Add Note
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Note</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="note">Note</Label>
              <Input type="textarea" name="note" onChange={handleChange} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default NoteTab;
