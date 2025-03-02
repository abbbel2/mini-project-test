/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { Formik } from "formik";
import { Form, Button, Alert } from "react-bootstrap";

import {
  authActions,
  useAppDispatch,
  useTypedSelector,
} from "../../redux/store";
import { useCallback } from "react";
import axiosInstance from "../../redux/axios";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "../../components/toast-provider";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email format is not correct")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const { login } = useTypedSelector((state) => state.auth);

  const handleLogin = useCallback(
    (data: any) => {
      localStorage.clear();
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("role", data.role);
      axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;
      showToast("Login successful", "User is logged in succesfully", "success");
      navigate("/");
    },
    [navigate, showToast]
  );

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidationSchema}
      onSubmit={(values) => {
        dispatch(authActions.login(values))
          .then((res: any) => {
            if (res?.payload?.token) {
              handleLogin(res?.payload);
            } else {
              showToast(
                "Login failed",
                "Email or password is invalid",
                "danger"
              );
            }
          })
          .catch(() => {
            showToast("Login failed", "Email or password is invalid", "danger");
          });
      }}
    >
      {({ values, errors, handleChange, handleSubmit, touched }) => (
        <Form
          className="shadow p-4 bg-white rounded w-4/12"
          onSubmit={handleSubmit}
        >
          <div className="h4 mb-4 text-center">Sign In</div>
          {login.error ? (
            <Alert className="mb-2" variant="danger" dismissible>
              Incorrect username or password.
            </Alert>
          ) : (
            <div />
          )}
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
          <Form.Group className="mb-2" controlId="password">
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
          <div>
            Do you want to <Alert.Link href="signup">sign up</Alert.Link>?
          </div>
          <Button className="w-100 mt-4" variant="primary" type="submit">
            {login.loading ? "Loading ..." : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
