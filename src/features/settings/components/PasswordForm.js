import React from "react";
import { compose } from "redux";
import * as Yup from "yup";
import { Form, withFormik } from "formik";
import { connect } from "react-redux";
import styled from "styled-components";

import Button from "../../commonComponents/Button";
import Input from "../../commonComponents/Input";
import FormItem from "../../commonComponents/FormItem";
import Alert from "../../commonComponents/Alert";

import { updatePassword } from "../actions/settingsActionCreators";

const FormWrapper = styled.div`
  padding: 0.5rem 1rem;
`;

const FormikForm = props => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    status
  } = props;

  return (
    <>
      <FormWrapper>
        <Form>
          <FormItem
            label="current password"
            help={touched.currentPassword && errors.currentPassword}
            validateStatus="error"
          >
            <Input
              type="password"
              name="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem
            label="new password"
            help={touched.newPassword && errors.newPassword}
            validateStatus="error"
          >
            <Input
              type="password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem
            label="confirm password"
            help={touched.confirmPassword && errors.confirmPassword}
            validateStatus="error"
          >
            <Input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={Boolean(
              isSubmitting ||
                !values.currentPassword.length ||
                !values.newPassword.length ||
                !values.confirmPassword.length ||
                errors.currentPassword ||
                errors.newPassword ||
                errors.confirmPassword
            )}
            loading={isSubmitting}
            mb={1}
          >
            Save
          </Button>
          {errors.general && (
            <Alert type="error" message={errors.general} closable />
          )}
          {status && <Alert type="success" message={status.message} closable />}
        </Form>
      </FormWrapper>
    </>
  );
};

const PasswordForm = withFormik({
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    currentPassword: Yup.string()
      .required("Current password is required")
      .min(6, "Password must be at least 6 characters"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
  }),
  mapPropsToValues: props => ({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  }),
  handleSubmit(payload, bag) {
    bag.props.updatePassword(payload, {
      resetForm: bag.resetForm,
      setSubmitting: bag.setSubmitting,
      setFieldError: bag.setFieldError,
      setStatus: bag.setStatus
    });
  }
})(FormikForm);

const withConnect = connect(
  null,
  { updatePassword }
);

export default compose(withConnect)(PasswordForm);
