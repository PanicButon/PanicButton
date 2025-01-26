const panicButton = document.getElementById("panicButton");
const panicButtonImage = document.getElementById("panicButtonImage");
const instructions = document.getElementById("instructions");
const ballContainer = document.getElementById("ballContainer");

// Event listener for the button click
panicButton.addEventListener("mousedown", () => {
    panicButtonImage.src = "button_down.png"; // Change to pressed button image
});

panicButton.addEventListener("mouseup", () => {
    panicButtonImage.src = "button_up.png";
    panicButton.style.opacity = 0; // Fade out the button
    setTimeout(() => {
        panicButton.style.display = "none"; // Hide the button after fade-out
        showInstructions(); // Show instructions after button fades out
    }, 1000); // Match the fade-out duration
});

function showInstructions() {
    instructions.style.display = "block"; // Make the instructions visible
    setTimeout(() => {
        instructions.style.opacity = 1; // Fade in the instructions
    }, 10); // Small delay to allow CSS transition to take effect

    document.body.addEventListener("click", startAnimation); // Add click listener
}

function startAnimation() {
    // Fade out instructions
    instructions.style.opacity = 0;
    setTimeout(() => {
        instructions.style.display = "none"; // Hide instructions after fade-out
        ballContainer.style.display = "flex"; // Show the ball container
        startBallAnimation(); // Start the ball animation
    }, 1000); // Match the fade-out duration

    document.body.removeEventListener("click", startAnimation); // Remove listener
}

// Ball animation function
function startBallAnimation() {
    const ball = document.getElementById("ball");

    let position = 0; // Starting position of the ball
    let direction = 1; // 1 for right, -1 for left
    const speed = 10; // Speed of the ball in pixels per frame

    function moveBall() {
        const trackWidth = document.querySelector(".track").offsetWidth;
        const ballWidth = ball.offsetWidth;

        // Update position based on direction and speed
        position += direction * speed;

        // Reverse direction if the ball reaches the edges of the track
        if (position <= 0 || position >= trackWidth - ballWidth) {
            direction *= -1;
            position = Math.max(0, Math.min(position, trackWidth - ballWidth)); // Clamp position
        }

        // Round position to avoid subpixel rendering
        const roundedPosition = Math.round(position);

        // Update the ball's position
        ball.style.transform = `translateX(${roundedPosition}px)`;

        // Call moveBall on the next frame
        requestAnimationFrame(moveBall);
    }

    // Start the animation
    moveBall();
}
