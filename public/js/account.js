document.addEventListener("DOMContentLoaded", function () {

    function handleUpload(event) {
        event.preventDefault();

        const fileInput = document.querySelector("#upload-picture");
        const file = fileInput.files[0];

        console.log(file);
        
        if (!file) {
            console.error('No file selected');
            return;
        }

        let formData = new FormData();
        formData.append('upload-picture', file);

        console.log(formData, 'formData');

        console.log('about to fetch');

        fetch('/api/user/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('fetch response: ', data);
            if (data.error) {
                console.error(data.error);
            } else {
                /*
                return fetch('/api/user/update/profile-picture', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ location: data.fileUrl })
                });
                */
            }
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    }

    const updatePictureButton = document.querySelector("#update-picture");
    updatePictureButton.addEventListener("click", handleUpload);

});
