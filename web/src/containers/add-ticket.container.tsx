import { Formik } from "formik";
import * as yup from "yup";
import { useCallback, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ticketActions, useAppDispatch, useTypedSelector } from "../redux/store";
import { useToastContext } from "../components/toast-provider";

const addTicketValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export const AddTicketContainer = () => {
  const dispatch = useAppDispatch();
  const {addTicket} = useTypedSelector((state) => state.ticket);
  const { showToast } = useToastContext();

  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleOpen}>
        Add Ticket
      </Button>

      <Modal show={open} onHide={handleClose}>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={addTicketValidationSchema}
          onSubmit={(values) => {
            dispatch(ticketActions.addTicket(values))
              .then(() => {
                dispatch(ticketActions.getTickets());
                handleClose();
              })
              .catch(() => {
                showToast("Action failed", "Adding ticket failed", "danger")
              })
          }}
        >
          {({ values, errors, handleChange, handleSubmit, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Add Ticket</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="flex flex-col space-y-2">
                  <Form.Group className="mb-2" controlId="email">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isValid={touched.title && !errors.title}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-2 mt-4" controlId="email">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={3}
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isValid={touched.description && !errors.description}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  {addTicket.loading ? "Loading ..." : "Save Changes"}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
