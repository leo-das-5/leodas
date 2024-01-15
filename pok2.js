// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB1_COSAw8Agxo1aU2hj283zDI5_ViOd4U",
    authDomain: "king-5af43.firebaseapp.com",
    projectId: "king-5af43",
    storageBucket: "king-5af43.appspot.com",
    messagingSenderId: "43735033815",
    appId: "1:43735033815:web:cd0b15221982a477cb4d92"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Registration function
  function register() {
    // Get input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const full_name = document.getElementById('full_name').value;
    const favourite_song = document.getElementById('favourite_song').value;
    const milk_before_cereal = document.getElementById('milk_before_cereal').value;
  
    // Validate input fields
    if (!validate_email(email) || !validate_password(password) || !validate_field(full_name) || !validate_field(favourite_song) || !validate_field(milk_before_cereal)) {
      alert('Invalid input. Please check your fields.');
      return;
    }
  
    // Continue with authentication
    auth.createUserWithEmailAndPassword(email, password)
      .then(function () {
        // Get the current user
        var user = auth.currentUser;
  
        // Add user data to Firebase Database
        var database_ref = database.ref();
        var user_data = {
          email: email,
          full_name: full_name,
          favourite_song: favourite_song,
          milk_before_cereal: milk_before_cereal,
          last_login: Date.now()
        };
  
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data);
  
        // Redirect to another page (run2.html)
        window.location.href = "pok.html";
      })
      .catch(function (error) {
        // Handle errors
        var error_code = error.code;
        var error_message = error.message;
        alert(error_message);
      });
  }
  
  // Login function
  function login() {
    // Get input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
      alert('Invalid input. Please check your fields.');
      return;
    }
  
    // Continue with authentication
    auth.signInWithEmailAndPassword(email, password)
      .then(function () {
        // Get the current user
        var user = auth.currentUser;
  
        // Add user data to Firebase Database
        var database_ref = database.ref();
        var user_data = {
          last_login: Date.now()
        };
  
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).update(user_data);
  
        // Redirect to another page (run2.html)
        window.location.href = "pok.html";
      })
      .catch(function (error) {
        // Handle errors
        var error_code = error.code;
        var error_message = error.message;
        alert(error_message);
      });
  }
  
  // Validate email format
  function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
  }
  
  // Validate password length
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    return password.length >= 6;
  }
  
  // Validate non-empty fields
  function validate_field(field) {
    return field && field.length > 0;
  }
  