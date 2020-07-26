var buttonColours =["red","blue","green","yellow"],
    gamePattern=[],
    userClickPattern=[],
    level=0,
    started=false;
    


$(document).keypress(function(){
        if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function nextSequence() {
    //Once nextSequence() is triggered, reset the userClickedPattern to an 
    //empty array reday for the next level
    userClickPattern =[];
    level++;
    $("#level-title").text("Level is " +level);

    var couleurs = buttonColours.length;
    var randomNumber = Math.floor((Math.random()) * (couleurs));
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    // create a new variable to store the id of the button that got clicked. 
    var userChosenColour = $(this).attr('id') ;
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //call checkAnswer() after a user has clicked and chosen their answer,
    //passing in the index of the las answer in the user's sequence
    checkAnswer(userClickPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");  
    setTimeout(function() {
       $("#"+currentColour).removeClass("pressed");
    }, 150);
}

function checkAnswer(currentLevel) {
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        $("#level-title").append("h2").text("Success");
        setTimeout(function () {
            $("h2").hide();
        }, 1000);
        console.log("Success");

        if(userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game-Over, Press any Key to restart");
        setTimeout(function() {
            // btnPressed.removeClass("pressed");
            $("body").removeClass("game-over");
         }, 150);

         startOver(); 
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

