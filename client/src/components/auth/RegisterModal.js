import React, { useState } from 'react';
import { Alert, Modal, ModalBody, ModalHeader, ModalFooter, Button, InputGroup, InputGroupText, Input } from "reactstrap";
import { registerUser } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function RegisterModal() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.isAuth);
  const errors = useSelector((state) => state.err);

  console.log(errors, "hello");
  console.log(isAuth, "kkkkkkkkk");

  const handleRegister = () => {
    const formData = { name, email, password, lastName }; // Changed formdata to formData
    dispatch(registerUser(formData, navigate)); // Changed registeUser to registerUser

    // Note: The callback inside dispatch will execute after the registration is successful.
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Register
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <InputGroup>
            <Input placeholder="name" onChange={(event) => setName(event.target.value)} />
          </InputGroup>
          <InputGroup>
            <Input placeholder="lastName" onChange={(event) => setLastName(event.target.value)} />
          </InputGroup>
          <InputGroup>
            <Input placeholder="email" onChange={(event) => setEmail(event.target.value)} />
            <InputGroupText>@example.com</InputGroupText>
          </InputGroup>
          <InputGroup>
            <Input placeholder="password" onChange={(event) => setPassword(event.target.value)} />
          </InputGroup>
          <InputGroup>
            {errors && (
              <Alert color="danger">
                {errors.map((err, index) => (
                  <div key={index}>{err.msg}</div>
                ))}
              </Alert>
            )}
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleRegister}>
            Register
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default RegisterModal;
