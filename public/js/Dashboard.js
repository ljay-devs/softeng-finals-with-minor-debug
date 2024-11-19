function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.add('d-none'));
    // Show the selected section
    document.getElementById(sectionId).classList.remove('d-none');
}

async function logout() {
    try {
        const response = await fetch('http://localhost:6969/api/logout', {
            method: 'POST',
            mode: 'cors', // Ensure CORS mode is enabled
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        if (result.success) {
            // Clear localStorage and redirect to login page
            localStorage.removeItem('userid');
            localStorage.removeItem('usertype'); // Clear usertype
            window.location.href = '/public/login.html';
        } else {
            alert('Log out failed. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error('Error:', error);
    }
}

async function loadAdminName() {
    // Get the logged-in user ID from localStorage
    const userid = localStorage.getItem('userid');
    if (!userid) {
        alert('User not logged in. Redirecting to login page.');
        window.location.href = '/public/login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:6969/api/GET/admin/${userid}`, {
            mode: 'cors',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        if (response.ok) {
            // Update the Admin Name on the dashboard
            document.getElementById('AdminName').textContent = result.fullname;
        } else {
            console.error('Failed to fetch admin name:', result.message);
        }
    } catch (error) {
        console.error('Error fetching admin name:', error);
    }
}

// Adjust the dashboard based on the user type
function adjustDashboardForUserType() {
    const userType = localStorage.getItem('usertype');
    if (userType === 'HSH') {
        document.querySelector('[onclick="showSection(\'inventory\')"]').style.display = 'none';
    }
}

// Load admin name and adjust dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadAdminName();
    adjustDashboardForUserType();
});
