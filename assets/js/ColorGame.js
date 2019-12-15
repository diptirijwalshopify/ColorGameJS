//variable declaration
var numOfSquares = 6;
var colors = [];
var colorPicked;

//selectors
var h1 = document.querySelector("h1");
var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var restartBtn = document.querySelector("#restart");

//Refactored code: (go the bottom to check the redundant version which is commented out)
init();

function init(){
    setupModeButtons();
    setupSquares();  
    reset();
}

//setting up mode button listeners
function setupModeButtons(){
    var modeBtn = document.querySelectorAll(".mode");
    for(var i=0; i < modeBtn.length; i++){
        modeBtn[i].addEventListener("click", function(){
            modeBtn[0].classList.remove("selected");
            modeBtn[1].classList.remove("selected"); //removing it from both buttons and then adding it to 'this' button
            this.classList.add("selected");
            //create an array of 3/6 colors depending on the mode chosen
            //using the ternary operator instead of if-else
            this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
            // if(this.textContent === "Easy"){
            //     numOfSquares = 3;
            // } else {
            //     numOfSquares = 6;
            // }
            reset();
        });
    }
}

//setting up the square listeners
function setupSquares(){
    for(var i=0; i<squares.length; i++){
        //adding event listener to the squares
        squares[i].addEventListener("click",function(){
            //selecting the color of the square clicked
            var colorClicked = this.style.backgroundColor;
            //comparing the color clicked with the color picked
            if(colorClicked === colorPicked){
                onSuccess();
            } else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
                //this.classList.add("incorrectGuess"); check why this does not work
            }
        });
    }
}

//reset function that works at the beginning, on click of mode buttons and restart button
function reset(){
    colors = generateColorArray(numOfSquares);
    colorPicked = pickColor();
    colorDisplay.textContent = colorPicked;
    for(var i=0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
    restartBtn.textContent = "New Colors";
    messageDisplay.textContent = "";
}

//restart logic
restartBtn.addEventListener("click", function(){
    reset();
});

//function to change the color of all squares in case of correct click
function onSuccess(){
    for(var i=0; i< squares.length; i++){
        squares[i].style.backgroundColor = colorPicked;
    }
    messageDisplay.textContent = "Correct!";
    h1.style.backgroundColor = colorPicked;
    restartBtn.textContent = "Play Again?";
}

//Function to generate 6 random colors to build the colors array
function generateColorArray(maxLength){
    var arr = [];
    for(var i=0; i < maxLength; i++){
        arr[i] = "rgb(" + generateRandom() + ", " + generateRandom() + ", " + generateRandom() + ")";
    }
    return arr;
}

//A function that will randomly pick a color(to be guessed) from the array of colors
function pickColor(){
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

//function to generate a random number between 0 and 255 for rgb values
function generateRandom(){
    var randomNum = Math.floor(Math.random() * 256);
    return randomNum;
}


//refactoring: instead of having 2 buttons, we will have a common class for both. This will reduce redundancy in code and also
//we can add more buttons in the future
// var easyBtn = document.querySelector("#easyBtn");
// var hardBtn = document.querySelector("#hardBtn");

// easyBtn.addEventListener("click", function(){
//     this.classList.add("selected");
//     hardBtn.classList.remove("selected");
//     //create an array of 3 colors
//     numOfSquares = 3;
//     colors = generateColorArray(numOfSquares);
//     //pick a random color from the array to guess
//     colorPicked = pickColor();
//     colorDisplay.textContent = colorPicked;
//     //hide 3 squares
//     for(var i=0; i < squares.length; i++){
//         if(colors[i]){
//             squares[i].style.backgroundColor = colors[i];
//         } else {
//             squares[i].style.display = "none";
//         }
//     }
//     restartBtn.textContent = "New Colors";
//     h1.style.backgroundColor = "steelblue";
//     messageDisplay.textContent = "";
// });

// hardBtn.addEventListener("click", function(){
//     this.classList.add("selected");
//     easyBtn.classList.remove("selected");
//     //create an array of 6 colors
//     numOfSquares = 3;
//     colors = generateColorArray(numOfSquares);
//     //pick a random color from the array to guess
//     colorPicked = pickColor();
//     colorDisplay.textContent = colorPicked;
//     //show all 6 squares
//     for(var i=0; i < squares.length; i++){
//         squares[i].style.backgroundColor = colors[i];
//         squares[i].style.display = "block";
//     }
//     restartBtn.textContent = "New Colors";
//     h1.style.backgroundColor = "steelblue";
//     messageDisplay.textContent = "";
// });

