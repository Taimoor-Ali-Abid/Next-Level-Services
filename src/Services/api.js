const url = 'https://login-signup.p.rapidapi.com/auth/signup';
const options = {
  method: 'POST',
  headers: {
    'x-rapidapi-key': '54f012acb1msh08f42d95724ac48p1b1aeejsn3a84f6f35c59',
    'x-rapidapi-host': 'login-signup.p.rapidapi.com',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    f_name: 'Test',
    l_name: 'User',
    password: 'Qwerty_12345',
    email: 'test@email.com',
  }).toString(),
};

try {
  const response = await fetch(url, options);
  const contentType = response.headers.get('content-type');

  // Check if the response is JSON
  if (contentType && contentType.includes('application/json')) {
    const result = await response.json();
    console.log('Signup Response:', result); // Log the result to see the output
  } else {
    const result = await response.text(); // If not JSON, get the response as text
    console.log('Non-JSON Response:', result);
  }
} catch (error) {
  console.error('Signup error:', error); // Log any errors
}
