/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { Form, Button, Alert } from "react-bootstrap";

import {
  authActions,
  useAppDispatch,
  useTypedSelector,
} from "../../redux/store";
import { useToastContext } from "../../components/toast-provider";

const signupValidationSchema = yup.object().shape({
  username: yup.string().required("User name is required"),
  role: yup.string().required("Role is required"),
  email: yup
    .string()
    .email("Email format is not correct")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});

export const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const { signup } = useTypedSelector((state) => state.auth);

  const handleLogin = useCallback(() => {
    showToast("Signup successful", "User is registered succesfully", "success");
    navigate("/login");
  }, [navigate, showToast]);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        role: "",
      }}
      validationSchema={signupValidationSchema}
      onSubmit={(values) => {
        dispatch(authActions.signup(values))
          .then((res: any) => {
            if (res?.payload?.user) {
              handleLogin();
            } else {
              showToast(
                "Signup failed",
                "Failed to register the user",
                "danger"
              );
            }
          })
          .catch(() => {
            showToast("Signup failed", "Failed to register the user", "danger");
          });
      }}
    >
      {({ values, errors, handleChange, handleSubmit, touched }) => (
        <Form
          className="shadow p-4 bg-white rounded w-4/12"
          onSubmit={handleSubmit}
        >
          <div className="h4 mb-4 text-center">Sign up</div>
          {signup.error ? (
            <Alert className="mb-2" variant="danger" dismissible>
              Sign up failed
            </Alert>
          ) : (
            <div />
          )}
          <Form.Group className="mb-2 mt-4" controlId="username">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              isValid={touched.username && !errors.username}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2 mt-4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2 mt-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isValid={touched.password && !errors.password}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2 mt-4" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              isValid={touched.confirmPassword && !errors.confirmPassword}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={values.role}
              onChange={handleChange}
              isValid={touched.role && !errors.role}
              isInvalid={!!errors.role}
            >
              <option>Open this select menu</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.role}
            </Form.Control.Feedback>
          </Form.Group>
          <div>
            Already registered, <Alert.Link href="login">log in</Alert.Link>?
          </div>
          <Button className="w-100 mt-4" variant="primary" type="submit">
            {signup.loading ? "Loading ..." : "Sign up"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
