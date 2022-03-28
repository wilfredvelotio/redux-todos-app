import React, { useCallback } from "react";
import { FastField, Formik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "src/redux/reducers";
import { modalClose, updateUsers } from "src/redux/actions/action-creator";
import { YupValidations } from "src/Components/Reusable/RegexFormik";
import { FormsModalWrapper, paddingStyle } from "src/Components/Reusable/FormsWrapper";

const validateSchema = yup.object({
  name: yup.string().required("First Name required"),
  username: yup
    .string()
    .required("User Name required")
    .min(6, "Must be at least 6 characters")
    .max(20, "Must be less than 18 characters")
    .matches(new RegExp(YupValidations.VALIDATE_ONLY_ALPHABETS), "No Special Characters"),
  email: yup.string().email("Enter Valid Email").required("Email required"),
  phone: yup
    .string()
    .required("This field is Required")
    .matches(new RegExp(YupValidations.VALIDATE_PHONE), "Phone number is not valid")
    .required("Phone required"),
  website: yup
    .string()
    .matches(new RegExp(YupValidations.VALIDATE_WEBSITE), "Enter correct url!")
    .required("Please enter website"),
});

export interface InitialValuesFormikUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export const UserForm: React.FC = React.memo(() => {
  const modal = useSelector((state: ReduxState) => state.modal);
  const initialValues: InitialValuesFormikUser = {
    id: modal.user.id,
    name: modal.user.name,
    username: modal.user.username,
    email: modal.user.email,
    phone: modal.user.phone,
    website: modal.user.website,
  };
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalClose());
  };
  const handleSubmit = (values: InitialValuesFormikUser) => {
    dispatch(updateUsers(values));
  };

  const handleSubmitFormik = useCallback(async (values) => {
    handleSubmit(values);
    handleClose();
  }, []);

  return (
    <FormsModalWrapper isOpen={modal.open} handleClose={handleClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handleSubmitFormik}
        enableReinitialize={true}
      >
        {({ handleSubmit, values, handleChange, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outlined">Edit User</Button>
              </Box>
              <TextField
                id="name"
                name="name"
                label="First Name"
                value={values.name}
                sx={paddingStyle}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                id="username"
                name="username"
                label="User Name"
                value={values.username}
                sx={paddingStyle}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <TextField
                id="email"
                name="email"
                label="Email Address"
                sx={paddingStyle}
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                id="phone"
                name="phone"
                label="Phone Number"
                sx={paddingStyle}
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <TextField
                id="website"
                name="website"
                label="Website"
                sx={paddingStyle}
                value={values.website}
                onChange={handleChange}
                error={touched.website && Boolean(errors.website)}
                helperText={touched.website && errors.website}
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </FormsModalWrapper>
  );
});

export default UserForm;
