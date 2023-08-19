import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Container} from "@mui/material";

function UserForm() {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            phoneNumber: '',
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const userData = {
                name: values.name,
                phoneNumber: values.phoneNumber,
                email: values.email,
            };

            localStorage.setItem('userData', JSON.stringify(userData));

            navigate('/posts');
        },
    });

    return <Container maxWidth={"sm"}
                      sx={{
                          marginTop: "40px"
                      }}
    >

        <Typography
            sx={{textAlign: "center"}}
            color={"secondary"}
            variant="h5"
        >
            User Form
        </Typography>

        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                margin={"normal"}
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />


            <TextField
                fullWidth
                margin={"normal"}
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />


            <TextField
                fullWidth
                margin={"normal"}
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                    marginTop: "20px"
                }}
            >
                Submit
            </Button>
        </form>
    </Container>
}

export default UserForm;
