import Api from "../axios/axios";

export const createCheckout = async (token, priceId) => {
    try {
        return await Api.post(
            "/subscription/create-checkout",
            {
                priceId
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

export const saveSubscriptionRecord = async (token, checkoutSessionId) => {
    console.log('checkout id',checkoutSessionId)
    try {
        return await Api.post(
            "/subscription/store",
            {
                checkoutSessionId
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




