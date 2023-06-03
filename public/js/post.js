// Listen for the form submission
document.querySelector('form').addEventListener('submit', function(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Gather the form data
    let formData = new FormData(event.target);

    console.log(formData, 'formData');

    // Convert FormData to an object
    let post = Object.fromEntries(formData.entries());

    console.log(post, 'post');

    // Send the form data to the server
    fetch('/api/user/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        console.log('The post was saved successfully:', data);
        // Redirect the user to the dashboard
        return window.location.replace('/dashboard');
    })
    .catch(error => {
        console.error('There was an error:', error);
    });
});
