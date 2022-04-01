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
import { modalClose, updatePosts } from "src/redux/actions/action-creator";
import { YupValidations } from "src/Components/Reusable/Components/RegexFormik";
import FormsModalWrapper, { BoxContainer } from "src/Components/Reusable/Components/FormsWrapper";
import { paddingStyle } from "../Reusable/Components/Styles";
import { resetPost } from "src/redux/actions/reset";

const validateSchema = yup.object({
  title: yup.string().required("Title required"),
  body: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .max(40, "Must be less than 40 characters")
    .matches(new RegExp(YupValidations.VALIDATE_ALPHABETS_SPACES), "No Special Characters")
    .required("Body required"),
});

export interface InitialValuesFormikPost {
  id: number;
  title: string;
  body: string;
}
export const MyForms: React.FC = React.memo(() => {
  const modal = useSelector((state: ReduxState) => state.modal);
  const dispatch = useDispatch();
  const initialValues: InitialValuesFormikPost = modal.posts ? { ...modal.posts } : { ...resetPost };

  const handleClose = () => {
    dispatch(modalClose());
  };
  const handleSubmit = (values: InitialValuesFormikPost) => {
    dispatch(updatePosts(values));
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
            name="Post"
            renderProps={() => (
              <>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  sx={paddingStyle}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                  id="body"
                  name="body"
                  label="Body"
                  multiline
                  value={formik.values.body}
                  sx={paddingStyle}
                  onChange={formik.handleChange}
                  error={formik.touched.body && Boolean(formik.errors.body)}
                  helperText={
                    (formik.touched.body && formik.errors.body) || "Current Length: " + formik.values.body.length
                  }
                />
              </>
            )}
          ></BoxContainer>
        </form>
      )}
    />
  );
});

export default MyForms;
