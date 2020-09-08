console.log("Welcome to the machine");

let decider = Math.floor(Math.random()*10);
let high = 100;
let low =0;
let high_controller = document.getElementById("max_input");
let guess = decider<5? Math.floor(low+high)/2: Math.floor((low+high)/2)+1;
let response_from ="null";
let range_show = document.getElementById("range_show");
let guesses_show = document.getElementById("guesses_show");

let guesser = document.getElementById("guesser");
let startBtn = document.getElementById("start");
let guess_control = document.getElementById("guess");
let higher = document.getElementById("higher");
let lower = document.getElementById("lower");
let correct = document.getElementById("correct");
let guesses_left =document.getElementById("guess_left");
let result = document.getElementById("result");
let success_chance = document.getElementById("success_chance");


high_controller.value =100;
guesses_left.textContent =7;

range_show.textContent = "Range  1-" +high;
guesses_show.textContent = "Guesses required: " + (Math.floor(getBaseLog(2,high))+1);

success_chance.textContent= "Success Chance (Of random guessing): " + parseInt(guesses_left.textContent)/100;

high_controller.oninput = function(){
    high = parseInt(this.value);
    guess  =decider<5? Math.floor(low+high)/2: Math.floor((low+high)/2)+1;
    guesses_left.textContent =(Math.floor(getBaseLog(2,high))+1);
    range_show.textContent = "Range  1-" +high;
    guesses_show.textContent = "Guesses required: " + guesses_left.textContent;
    success_chance.textContent = "Success Chance (Of random guessing): "+ guesses_left.textContent/high;

}

console.log(guess);




let go_again = document.getElementById("again");

result.style.visibility= "hidden";
guesser.style.visibility="hidden";
go_again.style.visibility = "hidden";

startBtn.addEventListener("click",function(){
    guess_control.textContent = "Guess:" + guess;
    
    startBtn.remove();    
    guesser.style.visibility="visible";

});

higher.addEventListener("click",function(){
    response_from = "higher";
    if(response_from == "correct"){
        guessed();
    }
    else{
        guessAgain(response_from);
    }
});

lower.addEventListener("click",function(){
    response_from = "lower";
    guessAgain(response_from);
});

correct.addEventListener("click",function(){
    response_from="correct";
    guessAgain(response_from);
});

go_again.addEventListener("click",function(){
    resetGame();
});

function guessAgain(response_from){
    guesses_left_checker();
    let guess_no = guesses_left.textContent-1;
    guesses_left.textContent= guess_no;
    switch(response_from){
        case "higher":
            low = guess;
            break;
        case "lower":
             high = guess;
             break;
        case "correct":
            guessed();
            break;
        case "guessed":
            return true;
            break;
    }
    guess = Math.floor((high+low)/2);
    console.log(low);
    guess_control.textContent = "Guess "+guess;
}

function guessed(){
    guesser.style.visibility = "hidden";
    go_again.style.visibility = "visible"
    result.textContent="Your number is: "+guess;
    result.style.visibility="visible";
}

function guesses_left_checker(){
    if(guesses_left.textContent<=1){
        guessed();
        response_from= "guessed";
    }
}

function resetGame(){
    low=0;
    high=parseInt(high_controller.value);
    decider = Math.random()*10;
    guess = decider<5? Math.floor(low+high)/2: Math.floor((low+high)/2)+1;
    guess_control.textContent = "Guess:" + guess;
    guesser.style.visibility="visible";
    result.style.visibility= "hidden";
    go_again.style.visibility = "hidden";
    guesses_left.textContent= (Math.floor(getBaseLog(2,high))+1);
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}