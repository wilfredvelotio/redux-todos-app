import React, { useCallback } from "react";
import { useFormik } from "formik";
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
import { YupValidations } from "src/Components/Reusable/Components/RegexFormik";
import { BoxContainer, FormsModalWrapper } from "src/Components/Reusable/Components/FormsWrapper";
import { paddingStyle } from "src/Components/Reusable/Components/Styles";

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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateSchema,
    enableReinitialize: true,
    onSubmit: handleSubmitFormik,
  });

  return (
    <FormsModalWrapper
      isOpen={modal.open}
      handleClose={handleClose}
      renderProps={() => (
        <form onSubmit={formik.handleSubmit}>
          <BoxContainer
            name="User"
            renderProps={() => (
              <>
                <TextField
                  id="name"
                  name="name"
                  label="First Name"
                  value={formik.values.name}
                  sx={paddingStyle}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  id="username"
                  name="username"
                  label="User Name"
                  value={formik.values.username}
                  sx={paddingStyle}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email Address"
                  sx={paddingStyle}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  sx={paddingStyle}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
                  id="website"
                  name="website"
                  label="Website"
                  sx={paddingStyle}
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                />
              </>
            )}
          ></BoxContainer>
        </form>
      )}
    />
  );
});

export default UserForm;
