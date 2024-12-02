
// // Fetch social media data from the server
// fetch('/api/social-media')
//     .then(response => response.json())
//     .then(data => {
//         // Dynamically update the page content
//         document.getElementById('total-followers').textContent = `Total Followers: ${data.facebook.followers}`;
//         document.getElementById('facebook-followers').textContent = data.facebook.followers;
//         document.getElementById('facebook-delta').textContent = data.facebook.delta;
//         document.getElementById('facebook-page-views').textContent = data.facebook.pageViews;
//         document.getElementById('facebook-page-movement').textContent = data.facebook.pageMovement;

//         document.getElementById('twitter-followers').textContent = data.twitter.followers;
//         document.getElementById('twitter-delta').textContent = data.twitter.delta;
//         document.getElementById('twitter-page-views').textContent = data.twitter.pageViews;
//         document.getElementById('twitter-page-movement').textContent = data.twitter.pageMovement;

//         document.getElementById('instagram-followers').textContent = data.instagram.followers;
//         document.getElementById('instagram-delta').textContent = data.instagram.delta;
//         document.getElementById('instagram-page-views').textContent = data.instagram.pageViews;
//         document.getElementById('instagram-page-movement').textContent = data.instagram.pageMovement;

//         document.getElementById('youtube-subscribers').textContent = data.youtube.subscribers;
//         document.getElementById('youtube-delta').textContent = data.youtube.delta;
//         document.getElementById('youtube-page-views').textContent = data.youtube.pageViews;
//         document.getElementById('youtube-page-movement').textContent = data.youtube.pageMovement;
//     })
//     .catch(error => console.error('Error fetching data:', error));

// // Dark Mode Toggle
// const darkModeToggle = document.getElementById("toggle");
// const themeLink = document.getElementById("theme-link");

// darkModeToggle.addEventListener('change', () => {
//     if (darkModeToggle.checked) {
//         document.body.classList.remove('light-theme');
//         document.body.classList.add('dark-theme');
//         themeLink.setAttribute('href', 'resources/css/dark-mode.css');
//     } else {
//         document.body.classList.remove('dark-theme');
//         document.body.classList.add('light-theme');
//         themeLink.setAttribute('href', 'resources/css/style.css');
//     }
// });

const editBtn = document.getElementById('editBtn');
const editProfileSection = document.getElementById('edit-profile-section');

editBtn.addEventListener('click', function () {
    if (editProfileSection.style.display === 'none' || editProfileSection.style.display === '') {
        editProfileSection.style.display = 'block'; // Show the edit form
        editBtn.textContent = 'Cancel Edit'; // Change button text to "Cancel Edit"
    } else {
        editProfileSection.style.display = 'none'; // Hide the edit form
        editBtn.textContent = 'Edit'; // Change button text back to "Edit"
    }
});
