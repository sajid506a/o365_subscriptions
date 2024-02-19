const axios = require('axios');

// Your application's client ID and client secret
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const tenantId = 'YOUR_TENANT_ID';

// The token endpoint URL (replace with your authorization server's URL)
const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

// The request body for the token request
const tokenRequestBody = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default' // Replace with the scopes your application requires
});

// Function to get an access token
async function getToken() {
    try {
        const response = await axios.post(tokenUrl, tokenRequestBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error(error);
    }
}

// Function to list subscriptions
async function listSubscriptions() {
    const accessToken = await getToken();
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    try {
        const response = await axios.get('https://graph.microsoft.com/v1.0/subscriptions', config);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Call the function to list subscriptions
listSubscriptions();
