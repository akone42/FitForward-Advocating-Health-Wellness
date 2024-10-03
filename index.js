// Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// Complete the toggleDarkMode function
const toggleDarkMode = () => {
    // Write your code to manipulate the DOM here
    document.body.classList.toggle("dark-mode");
}

// Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function
themeButton.addEventListener("click", toggleDarkMode);

// Add your query for the sign now button here
const signNowButton = document.getElementById("sign-now-button");

// Variable to keep track of the starting number of signatures
let count = 3;

// Function to add a signature to the petition
const addSignature = () => {
    // Get the inputs submitted in the form
    const nameInput = document.getElementById("name").value;
    const hometownInput = document.getElementById("hometown").value;

    // Create a new paragraph element for the new signature
    const newSignature = document.createElement("p");
    // Format the new signature
    newSignature.textContent = `🖊️ ${nameInput} from ${hometownInput} supports this.`;

    // Use another DOM method to find where the signatures section is on the page
    const signaturesSection = document.querySelector(".signatures");
    // Add the new signature there
    signaturesSection.appendChild(newSignature);

    const oldCounter = document.getElementById("counter");
    oldCounter.remove();

    // Increase the count variable
    count = count + 1;

    // Create a new counter element
    const newCounter = document.createElement("p");
    // Set the id to "counter"
    newCounter.setAttribute("id", "counter");
    // Set the text content following the specified format
    newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
    // Append the new counter to the signatures section
    signaturesSection.appendChild(newCounter);

    // Call toggleModal function after adding signature
    toggleModal(nameInput);
}

// Define the validateForm function
const validateForm = () => {
    let containsErrors = false;
    let petitionInputs = document.getElementById("sign-petition").elements;

    for (let i = 0; i < petitionInputs.length; i++) {
        if (petitionInputs[i].value.length < 2) {
            petitionInputs[i].classList.add('error');
            containsErrors = true;
        } else {
            petitionInputs[i].classList.remove('error');
        }
    }
    if (!containsErrors) {
        // Add signature
        addSignature();
        // Clear form
        for (let i = 0; i < petitionInputs.length; i++) {
            petitionInputs[i].value = "";
        }
        // Reset containsErrors to false
        containsErrors = false;
    }
}

// Add event listener for validateForm() when the 'Sign Now' button is clicked
signNowButton.addEventListener('click', validateForm);

// Find the specific input for the email address
const email = document.getElementById('email');

// Add an event listener for the form submit event
document.getElementById('sign-petition').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Check if the value in the email input includes the text '.com'
    if (!email.value.includes('.com')) {
        // If the email address does NOT contain '.com', set containsErrors to true
        containsErrors = true;
        // Give the email input the error class
        email.classList.add('error');
    } else {
        // If the email address satisfies the '.com' requirement, remove the error class
        email.classList.remove('error');
    }
});

// Define animation object
let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
};

// Function to reveal elements
function reveal() {
    let revealableContainers = document.querySelectorAll('.revealable');
    let windowHeight = window.innerHeight;

    for (let i = 0; i < revealableContainers.length; i++) {
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            revealableContainers[i].classList.add('active');
        } else {
            revealableContainers[i].classList.remove('active');
        }
    }
}

// Event listener for scroll event
window.addEventListener('scroll', reveal);

// Function to reduce motion
function reduceMotion() {
    // Update animation object with new values
    animation.transitionTimingFunction = 'none'; // For example, set transition to none
    // Apply updated animation properties to revealable containers
    let revealableContainers = document.querySelectorAll('.revealable');
    for (let i = 0; i < revealableContainers.length; i++) {
        revealableContainers[i].style.transition = `opacity ${animation.transitionDuration} ${animation.transitionTimingFunction} ${animation.transitionDelay}`;
    }
}

// Event listener for Reduce Motion button click
document.getElementById('reduce-motion-button').addEventListener('click', reduceMotion);

// Function to toggle the modal
const toggleModal = (person) => {
    // Select modal elements
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("modal-text-container");

    // Set modal display to flex
    modal.style.display = "flex";

    // Display a thank you message to the user
    modalContent.textContent = `Thank you so much ${person}! Your support means a lot.`;

    // Animate the image within the modal
    const modalImage = document.querySelector("#thanks-modal img");
    let scaleFactor = 1;

    const scaleImage = () => {
        // Toggle scaleFactor between 1 and 0.8
        scaleFactor = scaleFactor === 1 ? 0.8 : 1;
        // Apply scaleFactor to the image
        modalImage.style.transform = `scale(${scaleFactor})`;
    };

    // Call scaleImage function every half a second
    const intervalId = setInterval(scaleImage, 500);

    // Hide the modal after 3 seconds and clear the animation interval
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);
    }, 6000);
}
// Select the close button
const closeModalButton = document.getElementById("close-modal-button");

// Function to close the modal
const closeModal = () => {
  // Select the modal
  const modal = document.getElementById("thanks-modal");
  // Hide the modal
  modal.style.display = "none";
};

// Add click event listener to the close button
closeModalButton.addEventListener("click", closeModal);

