const axios = require('axios');

// Function to simulate test client behavior
async function runTestClient() {
  try {
    // Request to /auth endpoint without any body
    const response1 = await axios.post('http://localhost:8080/auth');
    console.log('Response from /auth:', response1.data);

    // Request to /auth endpoint with "expired" query parameter
    const response2 = await axios.post('http://localhost:8080/auth?expired=true');
    console.log('Response from /auth with "expired=true":', response2.data);

    // Request to /jwks endpoint
    const response3 = await axios.get('http://localhost:8080/jwks');
    console.log('Response from /jwks:', response3.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the test client
runTestClient();
