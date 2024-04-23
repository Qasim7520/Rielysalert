import React, { useEffect, useState } from "react";
import styles from "./Join.module.scss";
import AuthStyles from "./AuthStyles.module.scss";
import { Link } from "react-router-dom";
import { Field, Formik, Form as FormikForm } from "formik";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { FormHelperText } from '@mui/material';
import { userSignUp } from "../../../Api/businessprofile";

import * as yup from "yup";


import { Layout } from "../../../views/Layout";
import { Separator, Spinner } from "../../../components";
import { LabeledInput } from "../../../components/LabeledInput/LabeledInput";
import { RoutePaths } from "../../routePaths";
import { CheckBox } from "../../../components/base/CheckBox/CheckBox";


import { useNavigate } from 'react-router-dom';

import { useNotification } from "../../../hooks/notificationProvider";

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const LoginPageValidationSchema = yup.object().shape({
  pointOfContact: yup
    .string()
    .required("Point Of Contact is required")
    .min(3, "Name must be 3 characters long")
    .max(70, "Maximum 70 characters are allowed"),
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be 3 characters long")
    .max(70, "Maximum 70 characters are allowed"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .max(16, "Maximum 16 characters are allowed")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Confirm Password is required"),
  zip_code: yup
    .string()
    .required("Zip Code is required")
    .matches(/^\d{5}$/, "Invalid zip code format"),
  address: yup
    .string()
    .required("Address is required"),
  service: yup
    .string()
    .required("Service is required"),
  sub_service: yup
    .string()
    .required("Sub Service is required"),
  // latitude: yup.number()
  //   .required('Latitude is required')
  //   .typeError('Latitude must be a number')
  //   .required('Latitude is required')
  //   .min(-90, 'Latitude must be at least -90')
  //   .max(90, 'Latitude must be at most 90'),
  // longitude: yup.number()
  //   .required('Longitude is required')
  //   .typeError('Longitude must be a number')
  //   .required('Longitude is required')
  //   .min(-180, 'Longitude must be at least -180')
  //   .max(180, 'Longitude must be at most 180')
  web_address: yup
    .string()
    .required("Website Address is required")
    .url("Website Address must be a valid URL")
    .matches(
      /^(http|https):\/\/[^ "]+$/,
      "Website Address must be a clickable URL"
    ),
});


export const JoinPage = () => {


  const [selectService, setSelectService] = useState('');
  const [subService, setSubService] = useState('');

  const subServicesMap = {
    'Legal Services': ['Traffic Law Attorneys', 'Criminal Defense Lawyers', 'Legal Aid Services', 'Civil Rights Attorneys', 'Legal Consultation Services', 'Accident and Injury Lawyers'],
    'Food and Beverage': ['Restaurants', 'Cafes', 'Catering services', 'Food trucks'],
    'Retail': ['Clothing and Apparel', 'Electronics', 'Furniture', 'Specialty Shops'],
    'Health and Wellness': ['Gyms and Fitness centers', 'Healthcare services', 'Spa and Wellness centers'],
    'Entertainment': ['Movie theaters', 'Event organizers', 'Amusement parks'],
    'Automotive': ['Car dealerships', 'Auto repair shops', 'Car rentals'],
    'Home and Garden': ['Home improvement', 'Landscaping', 'Interior design'],
    'Technology': ['Software development', 'IT services', 'Electronics repair'],
    'Education': ['Schools and universities', 'Tutoring services', 'Educational supplies'],
    'Real Estate': ['Realtors', 'Property management', 'Construction companies'],
    'Travel and Tourism': ['Travel agencies', 'Hotels and accommodations', 'Tour operators'],
    'Arts and Culture': ['Art galleries', 'Performing arts venues'],
    'Sports and Recreation': ['Sports clubs', 'Recreation centers', 'Sporting goods stores'],
    'Finance': ['Banks', 'Investment firms', 'Financial advisors'],
    'Professional Services': ['Marketing and Advertising', 'Public Relations', 'Human Resources', 'Accounting and Finance', 'Cleaning services', 'Consulting'],
    'Mental Health Resources': ['']
  };


  // const handleChange = (event) => {
  //   setService(event.target.value);
  // };


  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    setSelectService(selectedService);
    setSubService('');
  };

  const handleSubServiceChange = (event) => {
    setSubService(event.target.value);
  };

  const { triggerNotification } = useNotification();

  const initialValues = {
    pointOfContact: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    service: "",
    sub_service: "",
    zip_code: "",
    web_address: ""
  }

  const navigate = useNavigate();
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    const { pointOfContact, name, email, password, confirmPassword, phone, service, sub_service, zip_code, address, web_address } = values;
    console.log('values', values);

    try {
      console.log('Inside function try')
      // setIsLoading(true)
      const response = await userSignUp(pointOfContact, name, email, password, confirmPassword, phone, service, sub_service, zip_code, address, web_address)
      if (response?.status == 201) {

        console.log(`Success`);
        navigate("/email-success");
        setSubmitting(false);
      } else if (response?.response?.status == 500) {
        console.log(`${response?.response?.data?.msg}`);
      }
      else if (response?.response?.status == 422) {
        console.log(`${response?.response?.data?.msg}`);
      }
      else if (response?.response?.status == 404) {
        console.log(`${response?.response?.data?.msg}`);
      }
      else if (response?.response?.status == 401) {
        console.log(`${response?.response?.data?.msg}`);
      }
      else if (response?.response?.status == 403) {
        console.log(`${response?.response?.data?.msg}`);
      }
      else if (response?.response?.status == 400) {
        console.log(`${response?.response?.data?.msg}`);
      }
      // setIsLoading(false);
    } catch (error) {
      setSubmitting(false);
      console.log(error)
    }
    console.log(values);
    // setIsLoading(false);
    setSubmitting(false);


  };

  return (
    <Layout isLoggedIn={false} isFooter={false}>
      <div className={AuthStyles.pageContainer}>
        <div className={AuthStyles.formContainer}>
          <div className={AuthStyles.heading}>
            Join Riley's Alert
          </div>
          <Separator height="30px" />



          <Separator height="30px" />
          <Formik
            initialValues={initialValues}
            validationSchema={LoginPageValidationSchema}
            // onSubmit={(values, { setSubmitting, setErrors }) => {
            //   userSignUp({
            //     businessName: values.businessName,
            //     name: values.name,
            //     email: values.email,
            //     phone: values.phone,
            //     password: values.password,
            //     address: values.address,
            //     service: values.service,
            //     latitude: values.latitude,
            //     longitude: values.longitude
            //   })
            //     .then((res) => {

            //       navigate("/email-success");
            //       setSubmitting(false);
            //     })
            //     .catch((err) => {
            //       setSubmitting(false);

            //       triggerNotification({
            //         message: err.data.message,
            //         type: "error",
            //       });

            //     });

            // }}
            onSubmit={handleSubmitForm}
            validateOnBlur
            validateOnChange
          >
            {({ isSubmitting }) => (
              <FormikForm style={{ width: "100%" }}>
                <div className={AuthStyles.fields} style={{ display: "flex" }}>
                  <div className={AuthStyles.fieldItem}>
                    <Field name="pointOfContact">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Point Of Contact"
                          type="text"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                          style={{ maxWidth: '335px', overflow: 'hidden' }}
                          className={AuthStyles.customfield}
                        />
                      )}
                    </Field>
                  </div>
                  <div className={AuthStyles.fieldItem} style={{ marginLeft: "40px" }}>
                    <Field name="name">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Full Name"
                          type="text"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                          style={{ maxWidth: '335px', overflow: 'hidden' }}
                          className={AuthStyles.customfield}
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <Separator height="15px" />
                <div className={AuthStyles.fields} style={{ display: "flex" }}>
                  <div className={AuthStyles.fieldItem}>
                    <Field name="email">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Email"
                          type="email"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                          style={{ maxWidth: '335px', overflow: 'hidden' }}
                          className={AuthStyles.customfield}
                        />
                      )}
                    </Field>
                  </div>
                  <div className={AuthStyles.fieldItem} style={{ marginLeft: "40px" }}>
                    <Field name="phone">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Phone No."
                          type="number"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                          style={{ maxWidth: '335px', overflow: 'hidden' }}
                          className={AuthStyles.customfield}
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <Separator height="15px" />
                <div className={AuthStyles.fields} style={{ display: "flex" }}>
                  <div className={AuthStyles.fieldItem}>
                    <Field name="password">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Password"
                          type="password"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </div>
                  <div className={AuthStyles.fieldItem} style={{ marginLeft: "40px" }}>
                    <Field name="confirmPassword">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Confirm Password"
                          type="password"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </div>

                </div>


                <Separator height="18px" />

                <div className={AuthStyles.fields} style={{ display: "flex" }}>


                  <div className={AuthStyles.fieldItem}>
                    <Field name="zip_code">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Zip Code"
                          type="number"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                          style={{ maxWidth: '335px', overflow: 'hidden' }}
                          className={AuthStyles.customfield}
                        />
                      )}
                    </Field>
                  </div>

                  <div className={AuthStyles.fieldItem} style={{ marginLeft: "40px" }}>
                    <Field name="address">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Address"
                          type="text"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                          style={{ maxWidth: '335px', overflow: 'hidden' }}
                          className={AuthStyles.customfield}
                        />
                      )}
                    </Field>
                  </div>
                  {/* <div className={AuthStyles.fieldItem}>
                    <Field name="address">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Address"
                          type="text"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                          style={{ maxWidth: '335px', overflow: 'hidden' }}
                          className={AuthStyles.customfield}
                        />
                      )}
                    </Field>
                  </div> */}


                  {/* <div className={AuthStyles.fieldItem} style={{ marginLeft: "40px" }}>
                    <Field name="service">
                      {({ field, meta }) => (
                        <Box sx={{ minWidth: 120, borderRadius: '50px', marginTop: "5px" }}>
                          {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                          )}
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ zIndex: '-99' }}>Service</InputLabel>
                            <Select
                              {...field}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Service"
                              onChange={(e) => field.onChange(e)}
                              onBlur={(e) => field.onBlur(e)}
                              sx={{
                                borderRadius: '10px',
                                padding: '2px',
                              }}
                              error={!!meta.error && meta.touched}
                              message={meta.touched && meta.error}

                            >
                              <MenuItem value="">Select a service</MenuItem>
                              <MenuItem value="Physician">Physician</MenuItem>
                              <MenuItem value="Mechanic">Mechanic</MenuItem>
                              <MenuItem value="Dentist">Dentist</MenuItem>
                              <MenuItem value="Lawyer">Lawyer</MenuItem>
                              <MenuItem value="Police">Police</MenuItem>
                            </Select>

                          </FormControl>
                        </Box>
                      )} 
                    </Field>
                  </div> */}


                </div>

                <Separator height="18px" />

                <div className={AuthStyles.fields} style={{ display: "flex" }}>
                  <div className={AuthStyles.fieldItem} >
                    <Field name="service">
                      {({ field, meta }) => (
                        <Box sx={{ minWidth: 120, borderRadius: '50px', marginTop: "5px" }}>
                          {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                          )}
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ zIndex: '-99' }}>Service</InputLabel>
                            <Select
                              {...field}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Service"
                              onChange={(e) => {
                                field.onChange(e);
                                handleServiceChange(e);
                              }}
                              onBlur={(e) => field.onBlur(e)}
                              sx={{
                                borderRadius: '10px',
                                padding: '2px',
                              }}
                              error={!!meta.error && meta.touched}
                              message={meta.touched && meta.error}

                            >
                              <MenuItem value="">Select a service</MenuItem>
                              <MenuItem value="Legal Services">Legal Services</MenuItem>
                              <MenuItem value="Food and Beverage">Food and Beverage </MenuItem>
                              <MenuItem value="Retail">Retail</MenuItem>
                              <MenuItem value="Health and Wellness">Health and Wellness</MenuItem>
                              <MenuItem value="Entertainment">Entertainment</MenuItem>
                              <MenuItem value="Automotive">Automotive</MenuItem>
                              <MenuItem value="Home and Garden">Home and Garden</MenuItem>
                              <MenuItem value="Technology">Technology</MenuItem>
                              <MenuItem value="Education">Education</MenuItem>
                              <MenuItem value="Real Estate">Real Estate</MenuItem>
                              <MenuItem value="Travel and Tourism">Travel and Tourism</MenuItem>
                              <MenuItem value="Arts and Culture">Arts and Culture</MenuItem>
                              <MenuItem value="Sports and Recreation">Sports and Recreation</MenuItem>
                              <MenuItem value="Finance">Finance</MenuItem>
                              <MenuItem value="Professional Services">Professional Services</MenuItem>
                              <MenuItem value="Mental Health Resources ">Mental Health Resources
                              </MenuItem>
                            </Select>

                          </FormControl>
                        </Box>
                      )}
                    </Field>
                  </div>


                  <div className={AuthStyles.fieldItem} style={{ marginLeft: "40px" }}>
                    <Field name="sub_service">
                      {({ field, meta }) => (
                        <Box sx={{ minWidth: 120, borderRadius: '50px', marginTop: "5px" }}>
                          {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                          )}
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ zIndex: '-99' }}>Sub Service</InputLabel>

                            <Select
                              {...field}
                              labelId="sub-service-label"
                              onChange={(e) => {
                                field.onChange(e);
                                handleSubServiceChange(e);
                              }}
                              disabled={!selectService}
                              onBlur={(e) => field.onBlur(e)}
                              sx={{
                                borderRadius: '10px',
                                padding: '2px',
                              }}
                            >
                              <MenuItem value="">Select a sub service</MenuItem>
                              {subServicesMap[selectService] && subServicesMap[selectService].map((subServiceOption) => (
                                <MenuItem key={subServiceOption} value={subServiceOption}>{subServiceOption}</MenuItem>
                              ))}
                            </Select>

                          </FormControl>
                        </Box>
                      )}
                    </Field>
                  </div>


                </div>

                <Separator height="18px" />

                <div className={AuthStyles.fields} style={{ display: "flex" }}>
                  <div className={AuthStyles.fieldItem}>
                    <Field name="web_address">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Enter Website Address"
                          type="text"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                          style={{ maxWidth: '335px', overflow: 'hidden' }}
                          className={AuthStyles.customfield}
                        />
                      )}
                    </Field>
                  </div>

                </div>


























                <Separator height="18px" />

                <div className={AuthStyles.fields} style={{ display: "flex" }}>
                  {/* <div className={AuthStyles.fieldItem}>
                    <Field name="latitude">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Enter Latitude"
                          type="text"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                          style={{ maxWidth: '335px', overflow: 'hidden' }}
                          className={AuthStyles.customfield}
                        />
                      )}
                    </Field>
                  </div> */}


                  {/* <div className={AuthStyles.fieldItem} style={{ marginLeft: "40px" }}>
                    <Field name="longitude">
                      {({ field, meta }) => (
                        <LabeledInput
                          {...field}
                          placeholder="Enter Longitude"
                          type="text"
                          error={!!meta.error && meta.touched}
                          message={meta.touched && meta.error}
                          style={{ maxWidth: '335px', overflow: 'hidden' }}
                          className={AuthStyles.customfield}
                        />
                      )}
                    </Field>
                  </div> */}


                </div>

                <Separator height="30px" />

                <Separator height="10px" />

                <Separator height="10px" />

                <Separator height="15px" />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <button className={AuthStyles.authButton} type="submit">
                    {isSubmitting ? (
                      <Spinner extraSmall={true} />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </FormikForm>
            )}
          </Formik>

        </div>
      </div>
    </Layout>
  );
};
