import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./ProfileCard.module.scss";

import { EditIcon } from "../../icons/EditIcon";

import { Separator, Spinner } from "../../../../components";

import Cookies from "js-cookie";

import { getUserData, updateUserProfile } from "../../../../Api/businessprofile";

import { useSelector } from "react-redux";
import { useNotification } from "../../../../hooks/notificationProvider";
import { Field, Formik, Form as FormikForm } from "formik";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';


export const ProfileCard = () => {
  const token = Cookies.get('token')
  const userid = Cookies.get('UserId');

  const [userData, setUserData] = useState({

    pointOfContact: '',
    name: '',
    email: '',
    phone: '',
    category: '',
    sub_category: '',
    zip_code: '',
    address: '',
    web_address: ''
  })

  const fetchData = async () => {
    let response;
    try {

      if (token) {
        response = await getUserData(token);

        if (response?.status == 200) {
          console.log('UserData', response)
          const { pointOfContact, name, email, phone, category, sub_category, zip_code, address, web_address } = response?.data?.data
          setUserData({
            pointOfContact,
            name,
            email,
            phone,
            category,
            sub_category,
            zip_code,
            address,
            web_address
          });


        } else {

        }

      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const { triggerNotification } = useNotification();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit((prev) => !prev);


  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessnameError, setBusinessNameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [subcategoryError, setSubCategoryError] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [zipcodeError, setZipcodeError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [web_address, setWeb_address] = useState("");
  const [web_addressError, setWeb_addressError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const [selectService, setSelectService] = useState('');
  const [subService, setSubService] = useState('');

  useEffect(() => {
    if (userData) {
      setBusinessName(userData.pointOfContact)
      setName(userData.name);
      setEmail(userData.email);
      setPhone(userData.phone)
      setCategory(userData.category)
      setSubCategory(userData.sub_category)
      setZipcode(userData.zip_code)
      setAddress(userData.address)
      setWeb_address(userData.web_address)
      setSelectService(userData.category);
      setSubService(userData.sub_category);
    }
  }, [userData]);

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
    'Mental Health Resources': ['Mental Health Resources']
  };
  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    setSelectService(selectedService);
    setSubService('');
  };

  const handleSubServiceChange = (event) => {
    setSubService(event.target.value);
  };


  const onUpdateProfile = async () => {
    if (name === "") {
      setNameError("Name is required");
    } else if (businessName === "") {
      setBusinessNameError("Point of Contact is required");
    } else if (phone === "") {
      setPhoneError("Please enter a valid phone number");
    }
    else if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError("Invalid phone number");
    }
    else if (selectService === "") {
      setCategoryError("Please enter a Service");
    }
    else if (subService === "") {
      setSubCategoryError("Please enter a Sub Service");
    }



    // else if (category === "") {
    //   setCategoryError("Please enter a Service");
    // }
    // else if (subcategory === "") {
    //   setCategoryError("Please enter a Sub Service");
    // }
    else if (zipcode === "") {
      setZipcodeError("Please enter a Zip Code");
    }
    else if (!/^\d{5}$/.test(zipcode)) {
      setZipcodeError("Please enter a valid Zip Code");
    }
    else if (address === "") {
      setAddressError("Please enter Address");
    }
    else if (web_address === "") {
      setWeb_addressError("Please enter Website Address");
    }
    else if (!/^(http|https):\/\/[^ "]+$/.test(web_address)) {
      setWeb_addressError("Please enter a valid Website Address");
    }
    else {
      setNameError("");
      setBusinessNameError("");
      setPhoneError("")
      setCategoryError("")
      setAddressError("")
      setEmailError("");
      setZipcodeError("");
      setWeb_addressError("");
      setSubCategoryError("");
      setIsLoading(true);
      const response = await updateUserProfile(token, userid, businessName, name, phone, selectService, subService, zipcode, address, web_address)
      {
        console.log('userid', userid)
        if (response?.status == 200) {

          console.log(`${response?.data?.msg}`);
          triggerNotification({
            message: response?.data?.msg,
            type: "success",
          });

          setIsLoading(false);

          setTimeout(() => {
            setIsEdit(false);
          }, 2000);

        }
        else {
          console.log(`${response?.data?.msg}`);
          setIsLoading(false);
        }

      }
    }
  };



  useEffect(() => {
    fetchData();
  }, [token, isEdit]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>User Profile</div>

        <div className={styles.buttonsContainer}>
          {!isEdit && (
            <>
              <div className={styles.showfull}>
                <button onClick={() => toggleIsEdit()}>
                  Update details
                </button>
              </div>

              <div className={styles.showmobile}>
                <button onClick={() => toggleIsEdit()}>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 16V13.75H15.5V16H0.5ZM3.5 10.3101H4.42739L10.6524 4.09663L10.1808 3.61777L9.71349 3.15769L3.5 9.38272V10.3101ZM2.37502 11.4351V8.90389L10.7822 0.508199C10.8909 0.399549 11.0142 0.317342 11.1522 0.26158C11.2902 0.205805 11.4337 0.177917 11.5828 0.177917C11.732 0.177917 11.8764 0.205805 12.0163 0.26158C12.1561 0.317342 12.2841 0.403399 12.4005 0.519749L13.3019 1.43272C13.4183 1.54137 13.5024 1.6658 13.5543 1.806C13.6062 1.94621 13.6322 2.09109 13.6322 2.24064C13.6322 2.38086 13.6059 2.52033 13.5532 2.65907C13.5006 2.79781 13.4168 2.92459 13.3019 3.03941L4.90623 11.4351H2.37502ZM10.6524 4.09663L10.1808 3.61777L9.71349 3.15769L10.6524 4.09663Z" fill="#1C1B1F" />
                  </svg>

                </button>
              </div>
            </>
          )}
          <div className={styles.showonfull}>
            {isEdit && (
              <React.Fragment>
                <>

                  <button onClick={() => onUpdateProfile()}>
                    {isLoading ? <Spinner extraSmall={true} /> : "Save"}
                  </button>
                  <button
                    onClick={() => toggleIsEdit()}
                    className={styles.outlined}
                  >
                    Cancel
                  </button>

                </>

              </React.Fragment>

            )}
          </div>
        </div>
      </div>

      <Separator height="24px" />
      <div className={styles.contentContainer}>

        <div className={styles.dataContainer}>
          <label className={styles.heading} htmlFor="business_name">
            Point of Contact
          </label>
          {isEdit ? (
            <React.Fragment>
              <input
                autoFocus
                // tabIndex={1}
                id="business_name"
                type="text"
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  setBusinessNameError("");
                }}
              />

              <Separator height="3px" />
              {businessnameError && <span className={styles.error}>{businessnameError}</span>}
            </React.Fragment>
          ) : (
            <div className={styles.data}>{userData.pointOfContact}</div>
          )}

          <Separator height="5px" />

          <div className={styles.dataContainer}>
            <Separator height="20px" />
            <label className={styles.heading} htmlFor="full_name">
              Full name
            </label>
            {isEdit ? (
              <React.Fragment>
                <input
                  autoFocus
                  // tabIndex={1}
                  id="full_name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                />
                <Separator height="3px" />
                {nameError && <span className={styles.error}>{nameError}</span>}
              </React.Fragment>
            ) : (
              <div className={styles.data}>{userData.name}</div>
            )}


          </div>



          <div className={styles.dataContainer}>
            <Separator height="20px" />
            <label className={styles.heading} htmlFor="zip_code">
              Zip Code
            </label>
            {isEdit ? (
              <React.Fragment>
                <input
                  autoFocus
                  // tabIndex={1}
                  id="zip_code"
                  type="number"
                  value={zipcode}
                  onChange={(e) => {
                    setZipcode(e.target.value);
                    setZipcodeError("")
                  }}
                />
                <Separator height="3px" />
                {zipcodeError && <span className={styles.error}>{zipcodeError}</span>}
              </React.Fragment>
            ) : (
              <div className={styles.data}>{userData.zip_code}</div>
            )}



            <Separator height="20px" />
            <label className={styles.heading} htmlFor="category">
              Services
            </label>
            {isEdit ? (
              // <React.Fragment>
              //   <input
              //     autoFocus
              //     // tabIndex={1}
              //     id="category"
              //     type="text"
              //     value={category}
              //     onChange={(e) => {
              //       setCategory(e.target.value);
              //       setCategoryError("")
              //     }}
              //   />
              //   <Separator height="3px" />
              //   {categoryError && <span className={styles.error}>{categoryError}</span>}
              // </React.Fragment>

              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Service</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectService}
                  onChange={handleServiceChange}
                  sx={{
                    borderRadius: '10px',
                    padding: '2px',
                    width: '250px',
                  }}
                >
                  {/* <MenuItem value="">Select a service</MenuItem> */}
                  {Object.keys(subServicesMap).map((service) => (
                    <MenuItem key={service} value={service}>{service}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <div className={styles.data}>{userData.category}</div>
            )}


            <Separator height="20px" />
            <label className={styles.heading} htmlFor="web_address">
              Website Address
            </label>
            {isEdit ? (
              <React.Fragment>
                <input
                  autoFocus
                  // tabIndex={1}
                  id="web_address"
                  type="text"
                  value={web_address}
                  onChange={(e) => {
                    setWeb_address(e.target.value);
                    setWeb_addressError("")
                  }}
                />
                <Separator height="3px" />
                {web_addressError && <span className={styles.error}>{web_addressError}</span>}
              </React.Fragment>
            ) : (
              <div className={styles.data} style={{ width: "300px" }}>{userData.web_address}</div>
            )}


          </div>

        </div>








        <div className={styles.dataContainer}>

          <label className={styles.heading} htmlFor="email">
            Email
          </label>
          {isEdit ? (
            <React.Fragment>
              <input
                // tabIndex={3}
                id="email"
                type="email"
                value={userData.email}
                disabled={true}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              <Separator height="3px" />
              {emailError && <span className={styles.error}>{emailError}</span>}
            </React.Fragment>
          ) : (
            <div className={styles.data}>{userData.email}</div>
          )}


          <div className={styles.dataContainer}>
            <Separator height="20px" />
            <label className={styles.heading} htmlFor="phone">
              Phone Number
            </label>
            {isEdit ? (
              <React.Fragment>
                <input
                  autoFocus
                  // tabIndex={1}
                  id="phone"
                  type="number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                />
                <Separator height="3px" />
                {phoneError && <span className={styles.error}>{phoneError}</span>}
              </React.Fragment>
            ) : (
              <div className={styles.data}>{userData.phone}</div>
            )}


          </div>

          <div className={styles.dataContainer}>
            <Separator height="20px" />
            <label className={styles.heading} htmlFor="address">
              Address
            </label>
            {isEdit ? (
              <React.Fragment>
                <input
                  autoFocus
                  // tabIndex={1}
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressError("");
                  }}
                />
                <Separator height="3px" />
                {addressError && <span className={styles.error}>{addressError}</span>}
              </React.Fragment>
            ) : (
              <div className={styles.data}>{userData.address}</div>
            )}


            <Separator height="20px" />
            <label className={styles.heading} htmlFor="sub_category">
              Sub Services
            </label>
            {isEdit ? (
              // <React.Fragment>
              //   <input
              //     autoFocus
              //     // tabIndex={1}
              //     id="sub_category"
              //     type="text"
              //     value={subcategory}
              //     onChange={(e) => {
              //       setSubCategory(e.target.value);
              //       setSubCategoryError("")
              //     }}
              //   />
              //   <Separator height="3px" />
              //   {subcategoryError && <span className={styles.error}>{subcategoryError}</span>}
              // </React.Fragment>
              <React.Fragment>

                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Sub Service</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    value={subService}
                    onChange={handleSubServiceChange}
                    disabled={!selectService}
                    sx={{
                      borderRadius: '10px',
                      padding: '2px',
                      width: '250px',
                    }}
                  >
                    {/* <MenuItem value="">Select a sub service</MenuItem> */}
                    {subServicesMap[selectService] && subServicesMap[selectService].map((subServiceOption) => (
                      <MenuItem key={subServiceOption} value={subServiceOption}>{subServiceOption}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Separator height="3px" />
                {subcategoryError && <span className={styles.error}>{subcategoryError}</span>}
              </React.Fragment>
            ) : (
              <div className={styles.data}>{userData.sub_category}</div>
            )}

          </div>

          <div className={styles.showonmobile}>
            <div className={styles.buttonsContainer}>
              {isEdit && (
                <React.Fragment>
                  <>
                    <button>
                      {isLoading ? <Spinner extraSmall={true} /> : "Save"}
                    </button>
                    <button
                      onClick={() => toggleIsEdit()}
                      className={styles.outlined}
                    >
                      Cancel
                    </button>

                  </>

                </React.Fragment>

              )}
            </div>
          </div>

          <Separator height="31px" />

        </div>
      </div>
    </div>
  );
};
