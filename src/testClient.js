const axios = require('axios');

// Test client logic
const testAuthEndpoint = async () => {
  try {
    const response = await axios.post('http://localhost:8080/auth');
    console.log('JWT Token:', response.data.token);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Call the test client function
testAuthEndpoint();
