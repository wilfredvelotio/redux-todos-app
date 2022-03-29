import React, { useCallback } from "react";
import { Field, useFormik } from "formik";
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
import { YupValidations } from "src/Components/Reusable/Components/RegexFormik";
import FormsModalWrapper, { BoxContainer } from "src/Components/Reusable/Components/FormsWrapper";
import { paddingStyle } from "../Reusable/Components/Styles";

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
            name="Todo"
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
                <label style={paddingStyle}>
                  <FormLabel>Completed</FormLabel>
                  <input
                    type="checkbox"
                    id="completed"
                    name="completed"
                    style={paddingStyle}
                    onChange={formik.handleChange}
                    value="Completed"
                  />
                  {`${formik.values.completed}`}
                </label>
              </>
            )}
          ></BoxContainer>
        </form>
      )}
    />
  );
});

export default MyForms;
