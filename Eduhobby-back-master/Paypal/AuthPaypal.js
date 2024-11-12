export const getPaypalToken = async () => {
    const credentials = process.env.PAYPAL_CLIENT_ID +":"+process.env.PAYPAL_SECRET_KEY_ONE;

    return fetch(process.env.PAYPAL_SANDBOX_URL+"/v1/oauth2/token", {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+btoa(credentials)
        }
    }).catch((e) => console.log(e));
};
