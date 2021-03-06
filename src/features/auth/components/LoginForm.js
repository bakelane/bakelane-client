import React from "react";
import { compose } from "redux";
import * as Yup from "yup";
import { Form, withFormik } from "formik";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import Button from "../../commonComponents/Button";
import Input from "../../commonComponents/Input";
import FormItem from "../../commonComponents/FormItem";
import Alert from "../../commonComponents/Alert";
import Text from "../../commonComponents/Text";
import Title from "../../commonComponents/Title";
import { login } from "../actions/authActionCreators";

const FormikForm = props => {
  const {
    isAuthorized,
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur
  } = props;

  if (isAuthorized) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Title level={4}>Log in</Title>
      <Text mb={1}>
        or <Link to="/signup">create an account</Link>
      </Text>
      <Form>
        <FormItem
          label="email"
          help={touched.email && errors.email}
          validateStatus="error"
        >
          <Input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormItem>
        <FormItem
          label="create a password"
          help={touched.password && errors.password}
          validateStatus="error"
        >
          <Input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormItem>
        <Button
          type="primary"
          htmlType="submit"
          disabled={Boolean(
            isSubmitting ||
              !values.email.length ||
              !values.password.length ||
              errors.email ||
              errors.password
          )}
          loading={isSubmitting}
          mb={1}
          block
        >
          Log in
        </Button>
        {errors.general && (
          <Alert
            type="error"
            message={errors.general}
            marginBottom={1}
            closable
          />
        )}
      </Form>
    </>
  );
};

const LoginForm = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
  }),
  mapPropsToValues: props => ({
    email: props.email || "",
    password: props.password || ""
  }),
  handleSubmit(payload, bag) {
    bag.props.login(payload, {
      setSubmitting: bag.setSubmitting,
      setFieldError: bag.setFieldError
    });
  }
})(FormikForm);

const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized
  };
};

const withConnect = connect(
  mapStateToProps,
  { login }
);

export default compose(withConnect)(LoginForm);
