import React from 'react';

import { Layout } from "../../views/Layout";
import { Content } from "./components/Content/Content";



export const LandingPage = () => {
    return (
        <Layout isLoggedIn={false} isFooter={true}>
            <Content />
        </Layout>
    );
};