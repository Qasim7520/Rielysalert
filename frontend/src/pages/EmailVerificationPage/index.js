import React, { useState, useEffect } from "react";
import { Layout } from "../../views/Layout";

// import { Pricing } from "./components/Pricing/Pricing";
// import { FAQs } from "./components/FAQs/FAQs";

// import { useNotification } from "../../hooks/notificationProvider";

// import { getProducts } from "../../redux/actions";

export const VerificationPage = () => {
    // const { triggerNotification } = useNotification();

    // const [productsLoading, setProductsLoading] = useState(false);

    // const onGetProducts = () => {
    //     setProductsLoading(true);
    //     getProducts().then(() => {
    //         setProductsLoading(false);
    //     }).catch((err) => {
    //         setProductsLoading(false);
    //         triggerNotification({message: err.data.message, type: "error"});
    //     });
    // };

    useEffect(() => []);

    return (
        <Layout isLoggedIn={false} isFooter={true}>
            {/* <Pricing isloading={productsLoading} /> */}
            {/* <FAQs /> */}
        </Layout>
    );
};