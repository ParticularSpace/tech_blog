const signupHandler = async (event) => {
    event.preventDefault(); // Prevent form submission
  
    const email = document.querySelector('#email').value.trim(); // Get the entered username
    const password = document.querySelector('#password').value.trim(); // Get the entered password
  
    if (email && password) {
      // Send a POST request to the register endpoint
      const response = await fetch('/api/users/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      // If the registration is successful, redirect to the login page.
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to register');
      }
    }
  };