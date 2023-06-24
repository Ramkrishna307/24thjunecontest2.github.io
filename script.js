document.addEventListener("DOMContentLoaded", function() {
    const signupPage = document.getElementById("signup");
    const profilePage = document.getElementById("profile");
    const signupForm = document.getElementById("signup-form");
    const signupError = document.getElementById("signup-error");
    const signupSuccess = document.getElementById("signup-success");
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const logoutBtn = document.getElementById("logout-btn");
    const signupNavBtn = document.getElementById("signup-nav-btn");
    const profileNavBtn = document.getElementById("profile-nav-btn");
  
    // Check if the user is already logged in
    if (localStorage.getItem("accessToken")) {
      showPage(profilePage);
      showProfileDetails();
    } else {
      showPage(signupPage);
    }
  
    // Signup button click event
    document.getElementById("signup-btn").addEventListener("click", function(event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
  
      // Validate inputs
      if (name && email && password && confirmPassword) {
        if (password !== confirmPassword) {
          showError("Passwords do not match.");
        } else {
          // Generate access token
          const accessToken = generateAccessToken();
  
          // Save user state in local storage
          const userState = {
            name: name,
            email: email,
            password: password,
            accessToken: accessToken
          };
          localStorage.setItem("userState", JSON.stringify(userState));
  
          // Show success message and redirect to profile page
          showSuccessMessage("Signup successful!");
          showPage(profilePage);
          showProfileDetails();
        }
      } else {
        // Show error message
        showError("Please fill in all fields.");
      }
    });
  
    // Signup navigation button click event
    signupNavBtn.addEventListener("click", function() {
      showPage(signupPage);
    });
  
    // Profile navigation button click event
    profileNavBtn.addEventListener("click", function() {
      showPage(profilePage);
    });
  
    // Logout button click event
    logoutBtn.addEventListener("click", function() {
      // Clear user state and redirect to signup page
      localStorage.removeItem("userState");
      showPage(signupPage);
    });
  
    // Show profile details
    function showProfileDetails() {
      const userState = JSON.parse(localStorage.getItem("userState"));
      profileName.textContent = userState.name;
      profileEmail.textContent = userState.email;
    }
  
    // Show a page and hide others
    function showPage(page) {
      signupPage.style.display = "none";
      profilePage.style.display = "none";
      page.style.display = "block";
    }
  
    // Show error message
    function showError(message) {
      signupError.textContent = message;
      signupError.style.display = "block";
      signupSuccess.style.display = "none";
    }
  
    // Show success message
    function showSuccessMessage(message) {
      signupSuccess.textContent = message;
      signupSuccess.style.display = "block";
      signupError.style.display = "none";
    }
  
    // Generate a random 16-byte access token
    function generateAccessToken() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let token = "";
      for (let i = 0; i < 16; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return token;
    }
  });
  