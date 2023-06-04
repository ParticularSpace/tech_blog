// Logout function
async function logoutButtonHandler(event) {
    event.preventDefault();
    console.log('Logout button clicked'); // Add this line
    const response = await fetch('/api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

console.log(document.querySelector('.logout-btn')); // Add this line
document.querySelector('.logout-btn').addEventListener('click', logoutButtonHandler);