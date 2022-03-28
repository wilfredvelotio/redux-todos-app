import React, { useCallback } from "react";
import { useFormik, FastField, Formik, Field } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { FormLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "src/redux/reducers";
import { modalClose, updatePosts, updateTodos } from "src/redux/actions/action-creator";
import { YupValidations } from "src/Components/Reusable/RegexFormik";
import FormsModalWrapper, { paddingStyle } from "src/Components/Reusable/FormsWrapper";

const validateSchema = yup.object({
  title: yup.string().required("Title required"),
  completed: yup.boolean(),
});

export interface InitialValuesFormikTodos {
  id: string;
  title: string;
  completed: boolean;
}
export const MyForms: React.FC = React.memo(() => {
  const modal = useSelector((state: ReduxState) => state.modal);
  const dispatch = useDispatch();
  const initialValues: InitialValuesFormikTodos = {
    id: modal.todos.id,
    title: modal.todos.title,
    completed: modal.todos.completed,
  };

  const handleClose = () => {
    dispatch(modalClose());
  };
  const handleSubmit = (values: InitialValuesFormikTodos) => {
    dispatch(updateTodos(values));
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
                id="title"
                name="title"
                label="Title"
                value={values.title}
                sx={paddingStyle}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              <label>
                <FormLabel>Completed</FormLabel>
                <Field type="checkbox" id="completed" name="completed" sx={paddingStyle} />
                {`${values.completed}`}
              </label>

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

export default MyForms;
