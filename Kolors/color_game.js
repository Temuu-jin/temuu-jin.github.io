/*
1. 
*/
//====================================================
//Helper Functions
//====================================================
const pickColor = () => {
    //get random number between 0 and 5 inclusive
    const random = Math.floor(Math.random() * numSquares);
    //return colors[ran]
    return colors[random];
 };

const generateRandomColor = () => {
    //pick r, g, b values between 0-255 inclusive
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

const generateRandomColors = (num) => {
    //make array
    let output = [];
    //add num random colors to array
    for (let i = 0; i < num; i++) {
        output.push(generateRandomColor());
    }
    //return array
    return output;
};

const changeColors = (color) => {
    squares.forEach((square) => {
        square.style.backgroundColor = color;

    })
 };

 const reset = () => {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    resetButton.textContent = "New Colors";
    
    if (numSquares == 3) {
        for (let i = 0; i < squares.length; i++) {
                    if (colors[i]) {
                        squares[i].style.backgroundColor = colors[i];
                    } else {
                        squares[i].style.display = "none";
                    }
                }
        message.textContent = "";
        
    } else {
        for (let i = 0; i < squares.length; i++) {
                    squares[i].style.backgroundColor = colors[i];
                    squares[i].style.display = "block";
                }

                message.textContent = "";
    }
 
    title.style.backgroundColor = "steelblue";
    colorDisplay.textContent = pickedColor;
 };

//====================================================
//Init Variables
//====================================================
//state
let numSquares = 6;

//select elements
const squares = document.querySelectorAll(".squares");
const colorDisplay = document.getElementById("colorDisplay");
const message = document.getElementById("message");
const title = document.querySelector("h1");
const resetButton = document.getElementById("resetButton");
const modeButtons = document.querySelectorAll(".mode");

colors = generateRandomColors(numSquares);
let pickedColor = pickColor();

//====================================================
//Main
//====================================================

//update colorDisplay
colorDisplay.textContent = pickedColor;

//reset colors button
resetButton.addEventListener("click", reset);

//Mode Buttons
modeButtons.forEach((button) => {
    button.addEventListener("click", function() {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        if (this.textContent === "Easy") {
            numSquares = 3;
        } else {
            numSquares = 6;
        }
        reset();
        colorDisplay.textContent = pickedColor;
    })
});

//setup squares
 for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    //add click listeners
    squares[i].addEventListener("click", function(){
        //get color of clicked squares
        const clickedColor = this.style.backgroundColor;
        //compare to picked color
        if (clickedColor == pickedColor) {
            resetButton.textContent = "Play Again?";
            message.textContent = "Correct!";
            changeColors(pickedColor);
            title.style.backgroundColor = pickedColor;
        } else {
            this.style.backgroundColor = "black";
            message.textContent = "You Suck!";
        }
    })
 };