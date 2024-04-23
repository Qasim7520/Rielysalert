const businessProfileServices = require("../Services/index");
const globalServices = require("../Services/index");
const sendEmail = require("../Services/nodemailer/sendEmail");
const modals = require("../Models/index")
const bcrypt = require("bcryptjs")
const axios= require("axios")
const calculateDistance = (userCoords, profileCoords) => {
    const [userLatitude, userLongitude] = userCoords;
    const [profileLatitude, profileLongitude] = profileCoords;

    const earthRadius = 6371;
    const dLat = (profileLatitude - userLatitude) * Math.PI / 180;
    const dLon = (profileLongitude - userLongitude) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(userLatitude * Math.PI / 180) * Math.cos(profileLatitude * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
};



module.exports = {
    createBusinessProfile: async (req, res) => {
        try {
            let records = req.body;
            let address = req.body.address;
            const geocodingResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);

        if (geocodingResponse.data.status === 'OK') {
            const location = geocodingResponse.data.results[0].geometry.location;
            
            records.location = {
                type: 'Point',
                coordinates: [location.lat, location.lng]
            };
        } else {
            return globalServices.global.returnResponse(res, 400, true, 'Error fetching coordinates from Google Maps API', {});
        }
            let emailExists = await globalServices.businessProfile.findBusinessProfileByObjects({
                email: records.email,
            });
            if (!emailExists) {
                let result = await globalServices.businessProfile.createbusinessProfile(records);
                if (result && result._id) {
                    const jwtoken = await businessProfileServices.businessProfile.signJWT({ _id: result._id });

                    const updatejwt = await businessProfileServices.businessProfile.updateJWTToken(result._id, { jwtoken: jwtoken });

                    const emailtoken = await businessProfileServices.businessProfile.generateEmailVerifyToken(result._id);

                    const link = `${process.env.FRONTEND_URL}/verifyEmail?token=${emailtoken.token}`;

                    let emailsend = await sendEmail(result.email, link, result.name);
                    console.log("Email send:", emailsend)
                    if (!emailsend) {
                        return globalServices.global.returnResponse(res, 201, true, 'Registration successful. Error sending email', updatejwt);
                    }
                    else {
                        return globalServices.global.returnResponse(res, 201, false, 'Registration successful.An Email sent to your account please verify', updatejwt);
                    }
                } else {
                    return globalServices.global.returnResponse(res, 500, true, "There was error while creating business profile.", result);
                }
            }
            else {
                return globalServices.global.returnResponse(res, 403, true, "Business profile already exists.", {});
            }
        } catch (error) {
            return globalServices.global.returnResponse(res, 500, true, "Something went wrong.", {});

        }
    },


    // getAllBusinessProfile: async (req, res) => {
    //     try {
    //         const userId = req.query.userId;
    //         const service = req.query.service;
    //         const subService = req.query.subService;
    //         const latitude = req.query.latitude;
    //         const longitude = req.query.longitude;
    //         const page = parseInt(req.query.page) || 1; 
    //         const limit = parseInt(req.query.limit) || 10; 
    //         const userData = await globalServices.user.findUserAccountById(userId);
    //         const userCoordinates = userData.location.coordinates;
    //         const location={type:"point",coordinates:[latitude,longitude]}
    //         let updatedUser= await globalServices.user.updateUserAccountById(userData?._id,{location:location})

    //         let profilesFreeData = await globalServices.businessProfile.findBusinessAccountsByFreeStatus(
    //             userData?.location?.coordinates[0],
    //             userData?.location?.coordinates[1]
    //         );
    //         let profilesPaidData = await globalServices.businessProfile.findBusinessAccountsByPaidStatus();
    
    //         if (service && subService) {
    //             profilesFreeData = profilesFreeData.filter(profile => {
    //                 return profile.service === service && profile.subService === subService;
    //             });
    
    //             profilesPaidData = profilesPaidData.filter(profile => {
    //                 return profile.service === service && profile.subService === subService;
    //             });
    //         } else if (service && !subService) {
    //             profilesFreeData = profilesFreeData.filter(profile => {
    //                 return profile.service === service;
    //             });
    
    //             profilesPaidData = profilesPaidData.filter(profile => {
    //                 return profile.service === service;
    //             });
    //         }
    //             profilesPaidData.sort((a, b) => calculateDistance(userCoordinates, a.location.coordinates) - calculateDistance(userCoordinates, b.location.coordinates));

    //             profilesFreeData.sort((a, b) => calculateDistance(userCoordinates, a.location.coordinates) - calculateDistance(userCoordinates, b.location.coordinates));

    
    //         let combinedProfiles = [...profilesPaidData, ...profilesFreeData];
    //         // combinedProfiles.sort((a, b) => calculateDistance(userCoordinates, a.location.coordinates) - calculateDistance(userCoordinates, b.location.coordinates));
    
    //         const startIndex = (page - 1) * limit;
    //         const endIndex = page * limit;
    
    //         const paginatedProfiles = combinedProfiles.slice(startIndex, endIndex);
    
    //         const uniqueProfiles = paginatedProfiles.reduce((acc, current) => {
    //             const duplicateIndex = acc.findIndex(profile => profile._id.toString() === current._id.toString());
    //             if (duplicateIndex === -1) {
    //                 acc.push(current);
    //             }
    //             return acc;
    //         }, []);
    
    //         // Return response
    //         return globalServices.global.returnResponse(res, 200, false, "Business profiles found.", uniqueProfiles);
    //     } catch (error) {
    //         console.log("ERROR:", error);
    //         return globalServices.global.returnResponse(res, 500, true, "Something went wrong.", {});
    //     }
    // },

    getAllBusinessProfile: async (req, res) => {
    try {
        const userId = req.query.userId;
        const service = req.query.service;
        const subService = req.query.subService;
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const userData = await globalServices.user.findUserAccountById(userId);
        const userCoordinates = userData.location.coordinates;
        const location = { type: "point", coordinates: [latitude, longitude] };
        let updatedUser = await globalServices.user.updateUserAccountById(userData?._id, { location });

        let profilesFreeData = await globalServices.businessProfile.findBusinessAccountsByFreeStatus(
            userData?.location?.coordinates[0],
            userData?.location?.coordinates[1]
        );
        let profilesPaidData = await globalServices.businessProfile.findBusinessAccountsByPaidStatus();

        if (service && subService) {
            profilesFreeData = profilesFreeData.filter(profile => {
                return profile.service === service && profile.subService === subService;
            });

            profilesPaidData = profilesPaidData.filter(profile => {
                return profile.service === service && profile.subService === subService;
            });
        } else if (service && !subService) {
            profilesFreeData = profilesFreeData.filter(profile => {
                return profile.service === service;
            });

            profilesPaidData = profilesPaidData.filter(profile => {
                return profile.service === service;
            });
        }

        profilesPaidData.forEach(profile => {
            profile.distance = calculateDistance(userCoordinates, profile.location.coordinates);
        });

        profilesFreeData.forEach(profile => {
            profile.distance = calculateDistance(userCoordinates, profile.location.coordinates);
        });

        profilesPaidData.sort((a, b) => a.distance - b.distance);
        profilesFreeData.sort((a, b) => a.distance - b.distance);

        let combinedProfiles = [...profilesPaidData, ...profilesFreeData];

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedProfiles = combinedProfiles.slice(startIndex, endIndex);

        const uniqueProfiles = paginatedProfiles.reduce((acc, current) => {
            const duplicateIndex = acc.findIndex(profile => profile._id.toString() === current._id.toString());
            if (duplicateIndex === -1) {
                acc.push(current);
            }
            return acc;
        }, []);

        // Return response
        return globalServices.global.returnResponse(res, 200, false, "Business profiles found.", uniqueProfiles);
    } catch (error) {
        console.log("ERROR:", error);
        return globalServices.global.returnResponse(res, 500, true, "Something went wrong.", {});
    }
},

     

    getBusinessProfiles: async (req, res) => {
        try {
            const userId = req.query.userId;
            const userData = await globalServices.user.findUserAccountById(userId);
            const profilesFreeData = await globalServices.businessProfile.findBusinessAccountsByFreeStatus(userData?.location?.coordinates[0], userData?.location?.coordinates[1])
            const profilesPaidData = await globalServices.businessProfile.findBusinessAccountsByPaidStatus()

            const limitedPaidProfiles = profilesPaidData.slice(0, 3);

            const combinedProfiles = {
                profilesPaid: limitedPaidProfiles,
                profilesFree: profilesFreeData
            };
            if (profilesFreeData && profilesPaidData) {
                return globalServices.global.returnResponse(res, 200, false, "Business profiles found.", combinedProfiles);
            }
            else {
                return globalServices.global.returnResponse(res, 404, true, "Failed to get business profiles.", {});
            }
        } catch (error) {
            console.log("ERROR:", error);
            return globalServices.global.returnResponse(res, 500, true, "Something went wrong.", {});

        }
    },
    verifyAccount: async (req, res) => {
        try {
            const token = req.body.token;
            const verifytoken = await modals.verifyEmail.findOne({
                token: token,
            });

            if (!verifytoken) {
                return globalServices.global.returnResponse(res, 404, true, "Link expired.", null);
            }
            else {
                const updatedUser = await businessProfileServices.businessProfile.updateUserVerifyStatus({ _id: verifytoken.userId });
                if (updatedUser) {
                    await businessProfileServices.businessProfile.deleteVerifyToken(verifytoken?._id);
                    return globalServices.global.returnResponse(res, 200, false, "Email verified.", updatedUser);
                } else {
                    return globalServices.global.returnResponse(res, 400, true, "Failed to update user.", null);
                }
            }

        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal Server Error" });

        }
    },

    Login: async (req, res) => {
        try {

            const records = req.body;

            const user = await businessProfileServices.businessProfile.findBusinessProfileByObjects({
                email: records.email,
            });


            if (!user) {
                return globalServices.global.returnResponse(res, 403, true, "User Not Found", null);
            }
            if (!user.isverified) {
                return globalServices.global.returnResponse(res, 401, true, "Account not verified. Please verify your account.", null);
            }

            if (user && user.isverified) {
                const isMatch = await bcrypt.compare(records.password, user.password);
                if (!isMatch) {
                    return globalServices.global.returnResponse(res, 403, true, "Invalid Email or Password", null);
                }
                const jwtoken = await businessProfileServices.businessProfile.signJWT({ _id: user._id });

                const updatejwt = await businessProfileServices.businessProfile.updateJWTToken(user._id, { jwtoken: jwtoken });

                console.log('User', updatejwt)

                return globalServices.global.returnResponse(res, 201, false, "Login Successful", updatejwt);

            }
        } catch (error) {
            console.error("Error during login:", error);
            return globalServices.global.returnResponse(res, 500, true, "Internal Server Error", null);
        }
    },

    getBusinessProfileUser: async (req, res) => {

        try {
            const userData = req.user;
            if (!userData) {
                return globalServices.global.returnResponse(res, 404, false, "User not found", null);
            }
            return globalServices.global.returnResponse(res, 200, false, "User details fetched successfully", userData);
        } catch (error) {
            console.error('Error fetching user:', error);
            return globalServices.global.returnResponse(res, 500, true, "Internal Server Error", null);
        }
    },

    updateBusinessProfile: async (req, res) => {
        const { userid, ...updatePayload } = req.body;

        const user = await businessProfileServices.businessProfile.findUserById(userid)

        if (!user) {
            return globalServices.global.returnResponse(res, 404, true, "User not found", null);
        }
        const updatedProfile = await globalServices.businessProfile.updateBusinessProfileById(userid, updatePayload)
        if (updatedProfile) {
            return globalServices.global.returnResponse(res, 200, false, "Profile updated successfully", updatedProfile);
        }
        else {
            return globalServices.global.returnResponse(res, 400, true, "Error updating Profile", null);
        }
    },

    profileRating: async (req, res) => {
        const { userId, rating } = req.body;
        const businessId = req.params.businessId;
    
        try {
            const business = await modals.businessProfile.findById(businessId);
    
            if (!business) {
                return res.status(404).json({ message: 'Business profile not found.' });
            }
    
            // const existingRatingIndex = business.ratings.findIndex(r => r.userId.toString() === userId);
    
            // if (existingRatingIndex !== -1) {
            //     return res.status(400).json({ message: 'You have already rated this business profile.' });
            // }
    
            business.ratings.push({ userId, rating });
            business.ratingsCount++;
    
            business.totalRating = business.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    
            business.averageRating = business.totalRating / business.ratingsCount;
    
            await business.save();
    
            res.status(200).json({ message: 'Rating submitted successfully.', data: business });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
    
}