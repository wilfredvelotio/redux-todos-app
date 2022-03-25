import React from "react";
import { useFormik, FastField } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "src/redux/reducers";
import { modalClose } from "src/redux/actions/action-creator";
import { YupValidations } from "src/Components/Reusable/RegexFormik";

const validateSchema = yup.object({
  title: yup.string().required("First Name required"),
  body: yup
    .string()
    .required("User Name required")
    .min(6, "Must be at least 6 characters")
    .max(20, "Must be less than 18 characters")
    .matches(new RegExp(YupValidations.VALIDATE_ONLY_ALPHABETS), "No Special Characters"),
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  minHeight: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const MyForms: React.FC = React.memo(() => {
  const modal = useSelector((state: ReduxState) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalClose());
  };
  const handleSubmit = () => {};
  const formik = useFormik({
    initialValues: {
      title: modal.posts.title,
      body: modal.posts.body,
    },
    validationSchema: validateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit();
      handleClose();
    },
  });

  return (
    <div>
      <Modal
        keepMounted
        open={modal.open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <FormWrapper>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button variant="outlined">Edit Posts</Button>
              </Box>
              <TextField
                id="title"
                name="title"
                label="Title"
                className="inform"
                value={formik.values.title}
                onChange={formik.handleChange}
                onFocus={(event) => {
                  event.target.select();
                }}
              />
              <TextField
                id="body"
                name="body"
                label="Body"
                className="inform"
                multiline
                value={formik.values.body}
                onChange={formik.handleChange}
                onFocus={(event) => {
                  event.target.select();
                }}
              />

              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          </FormWrapper>
        </Box>
      </Modal>
    </div>
  );
});

export const FormWrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 100px auto;
    .inform {
      padding: 10px;
    }
  }
`;

export default MyForms;
