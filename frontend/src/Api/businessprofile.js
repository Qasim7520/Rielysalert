import Api from "../axios/axios";
export const userSignUp = async (pointOfContact, name, email, password, confirm_password, phone, service, sub_service, zip_code, address, web_address) => {
    console.log('response12', pointOfContact, name, email, password, confirm_password, phone, service, sub_service, zip_code, address, web_address)
    try {
        console.log('Inside  userSignUp')
        return await Api.post(
            "/business-profile/",
            {
                pointOfContact,
                name,
                email,
                password,
                confirm_password,
                phone,
                category: service,
                sub_category: sub_service,
                zip_code,
                address,
                // location: {
                //     type: 'Point',
                //     coordinates: [(''), ('')]
                // }
                web_address
            }

        ).then(response => {
            return response;
            console.log('response', response)
        })
            .catch(error => {
                return error;
            });
    } catch (error) {
        console.log(error);
    }
}

export const userVerify = async (token) => {

    try {
        return await Api.post(
            "/business-profile/verify",
            { token: token }
        ).then(response => {
            return response;
        })
            .catch(error => {
                return error;
            });
    } catch (error) {
        console.log(error);
    }
}

export const userLogin = async (email, password) => {
    try {
        return await Api.post(
            "/business-profile/login",
            {
                email,
                password,
            }
        ).then(response => {
            return response;
        })
            .catch(error => {
                return error;
            });
    } catch (error) {
        console.log(error);
    }
}

export const getUserData = async (token) => {

    try {
        return await Api.get(
            "/business-profile",
            {
                headers: {
                    'authorization': `Bearer  ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            return response;
        })
            .catch(error => {

                return error?.response;
            });
    } catch (error) {
        console.log(error);
    }
}

export const updateUserProfile = async (token, userid, businessName, name, phone, service, sub_category, zip_code, address, web_address) => {
    console.log("token in update api function ", token)
    try {
        return await Api.patch(
            "/business-profile/update",
            {
                userid,
                businessName,
                name,
                phone,
                category: service,
                sub_category: sub_category,
                zip_code,
                address,
                web_address

            },
            {
                headers: {
                    'authorization': `Bearer  ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            return response;
        })
            .catch(error => {

                return error?.response;
            });
    } catch (error) {
        console.log(error);
    }
}




