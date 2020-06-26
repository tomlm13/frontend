
    import React, { Component } from "react";
    import DateTime from 'react-datetime';
    import {
      Button,
      Modal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      Form,
      FormGroup,
      Input,
      Label
    } from "reactstrap";

    export default class CustomModal extends Component {
      constructor(props) {
        super(props);
        this.state = {
          activeItem: this.props.activeItem
        };
      }
      handleChange = e => {
        let { name, value } = e.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
      };
      render() {
        const { toggle, onSave } = this.props;
        return (
          <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}> Banned User Record </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="title">Banned username</Label>
                  <Input
                    type="text"
                    name="banned_username"
                    value={this.state.activeItem.banned_username}
                    onChange={this.handleChange}
                    placeholder="Enter banned user's username"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="ban_reason">Reason for ban</Label>
                  <Input
                    type="text"
                    name="ban_reason"
                    value={this.state.activeItem.ban_reason}
                    onChange={this.handleChange}
                    placeholder="Enter reason for ban"
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                Save
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
    }
