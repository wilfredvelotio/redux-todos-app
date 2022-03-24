import React from "react";
import { useFormik, FastField } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const validateSchema = yup.object({
  name: yup.string().required("First Name required"),
  userName: yup
    .string()
    .required("User Name required")
    .min(6, "Must be at least 6 characters")
    .max(20, "Must be less than 18 characters")
    .matches(/^[aA-zZ\s]+$/, "No Special Characters"),
  email: yup.string().email("Enter Valid Email").required("Email required"),
  phone: yup
    .string()
    .required("This field is Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .required("Phone required"),
  website: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Please enter website"),
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
interface ModalProps {
  modalName?: string;
  name: string;
  userName: string;
  email: string;
  phone: string;
  website: string;
  userIdProp: number;
  add?: number;
}
export const MyForms: React.FC<ModalProps> = ({
  modalName,
  name,
  userName,
  email,
  phone,
  website,
  userIdProp,
  add,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: name,
      userName: userName,
      email: email,
      phone: phone,
      website: website,
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      console.log(values);
      handleClose();
    },
  });
  return (
    <div>
      <Button onClick={handleOpen}>
        <svg
          viewBox="-30 -2 180 75"
          width="35"
          height="30"
          style={{
            fill: "#fefefe",
            boxShadow: "inset 0 0 0 2px #fefefe",
          }}
        >
          <rect width="120" height="10"></rect>
          <rect y="30" width="120" height="10"></rect>
          <rect y="60" width="120" height="10"></rect>
        </svg>
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <FormWrapper>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h5" align="center">
                {add ? "Create User" : "Edit User"}
              </Typography>
              <TextField
                id="name"
                name="name"
                label="First Name"
                className="inform"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                id="userName"
                name="userName"
                label="User Name"
                className="inform"
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
              />
              <TextField
                id="email"
                name="email"
                label="Email Address"
                className="inform"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                id="phone"
                name="phone"
                label="Phone Number"
                className="inform"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
              <TextField
                id="website"
                name="website"
                label="Website"
                className="inform"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
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
};

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
