import React, { useCallback } from "react";
import { useFormik, FastField, Formik } from "formik";
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
import { YupValidations } from "src/Components/Reusable/RegexFormik";
import FormsModalWrapper, { BoxContainer, paddingStyle } from "src/Components/Reusable/FormsWrapper";

const validateSchema = yup.object({
  title: yup.string().required("Title required"),
  body: yup
    .string()
    .required("Body required")
    .min(6, "Must be at least 6 characters")
    .max(40, "Must be less than 40 characters")
    .matches(new RegExp(YupValidations.VALIDATE_ONLY_ALPHABETS), "No Special Characters"),
});

export interface InitialValuesFormikPost {
  id: number;
  title: string;
  body: string;
}
export const MyForms: React.FC = React.memo(() => {
  const modal = useSelector((state: ReduxState) => state.modal);
  const dispatch = useDispatch();
  const initialValues: InitialValuesFormikPost = {
    id: modal.posts.id,
    title: modal.posts.title,
    body: modal.posts.body,
  };

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
  return (
    <FormsModalWrapper
      isOpen={modal.open}
      handleClose={handleClose}
      renderProps={() => (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={handleSubmitFormik}
            enableReinitialize={true}
          >
            {({ handleSubmit, values, handleChange, touched, errors }) => (
              <form onSubmit={handleSubmit}>
                <BoxContainer
                  name="Post"
                  renderProps={() => (
                    <>
                      <TextField
                        id="title"
                        name="title"
                        label="Title"
                        value={values.title}
                        sx={paddingStyle}
                        onChange={handleChange}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                      />
                      <TextField
                        id="body"
                        name="body"
                        label="Body"
                        multiline
                        value={values.body}
                        sx={paddingStyle}
                        onChange={handleChange}
                        error={touched.body && Boolean(errors.body)}
                        helperText={touched.body && errors.body}
                      />
                    </>
                  )}
                ></BoxContainer>
              </form>
            )}
          </Formik>
        </>
      )}
    ></FormsModalWrapper>
  );
});

export default MyForms;
