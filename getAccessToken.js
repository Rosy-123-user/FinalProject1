// getAccessToken.js

const { GoogleAuth } = require('google-auth-library');
const path = require('path');

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFile: path.join(__dirname, './src/config/serviceAccountKey.json'), // Replace with the path to your service account key file
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  console.log('Access Token:', accessToken.token);
  return accessToken.token;
}

getAccessToken().catch(console.error);
