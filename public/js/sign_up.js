let userData = {
  email: '',
  password: '',  
  username: '',  
  date_of_birth: '',
  phone_number: '',
  profile_picture: 'https://via.placeholder.com/150', 
};

const signupHandler = async (event) => {
  event.preventDefault(); // Prevent form submission

  const firstname = document.querySelector('#firstname').value.trim();
  const lastname = document.querySelector('#lastname').value.trim();
  const email = document.querySelector('#email').value.trim();
  const dob = document.querySelector('#dob').value.trim();
  const phone = document.querySelector('#phone').value.trim();

  if (firstname && lastname && email && dob && phone) {
    userData.email = email;
    userData.username = firstname + " " + lastname;
    userData.date_of_birth = dob;
    userData.phone_number = phone;

    // Replace the form
    document.querySelector('#signup-form').outerHTML = `
      <div class="signup-container">
        <form class="signup-form" id="password-form">
          <h2 class="signup-title">Create Password</h2>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required>
          </div>
          <div class="form-group">
            <label for="password_confirm">Confirm Password</label>
            <input type="password" id="password_confirm" required>
          </div>
          <button type="submit" class="signup-button">Create Account</button>
        </form>
      </div>
    `;

    // Listen for the submit event on the new form
    document.querySelector('#password-form').addEventListener('submit', passwordHandler);
  }
};

const passwordHandler = async (event) => {
  event.preventDefault(); // Prevent form submission

  const password = document.querySelector('#password').value.trim(); // Get the entered password
  const password_confirm = document.querySelector('#password_confirm').value.trim(); // Get the confirmed password

  if (password && password_confirm) {
    if (password !== password_confirm) {
      alert('Passwords do not match');
      return;
    }

    userData.password = password; // Add the password to userData

    // Send a POST request to the register endpoint
    const response = await fetch('/api/user/signup', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // If the registration is successful, redirect to the login page.
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to register');
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupHandler);
