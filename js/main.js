// Snø //////////////////////////////
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    window.requestAnimationFrame = requestAnimationFrame;
})();


var flakes = [],
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    flakeCount = 400,
    mX = -100,
    mY = -100

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < flakeCount; i++) {
        var flake = flakes[i],
            x = mX,
            y = mY,
            minDist = 150,
            x2 = flake.x,
            y2 = flake.y;

        var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y;

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (x - x2) / dist,
                ycomp = (y - y2) / dist,
                deltaV = force / 2;

            flake.velX -= deltaV * xcomp;
            flake.velY -= deltaV * ycomp;

        } else {
            flake.velX *= .98;
            if (flake.velY <= flake.speed) {
                flake.velY = flake.speed
            }
            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
        }

        ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
        flake.y += flake.velY;
        flake.x += flake.velX;

        if (flake.y >= canvas.height || flake.y <= 0) {
            reset(flake);
        }


        if (flake.x >= canvas.width || flake.x <= 0) {
            reset(flake);
        }

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(snow);
};

function reset(flake) {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = (Math.random() * 3) + 2;
    flake.speed = (Math.random() * 1) + 0.5;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = (Math.random() * 0.5) + 0.3;
}

function init() {
    for (var i = 0; i < flakeCount; i++) {
        var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = (Math.random() * 3) + 2,
            speed = (Math.random() * 1) + 0.5,
            opacity = (Math.random() * 0.5) + 0.3;

        flakes.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: (Math.random()) / 30,
            step: 0,
            opacity: opacity
        });
    }

    snow();
};

canvas.addEventListener("mousemove", function(e) {
    mX = e.clientX,
        mY = e.clientY
});

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

init();

// Automatic Slideshow - change image every 4 seconds
/*
 var myIndex = 0;
 carousel();

 function carousel() {
     var i;
     var x = document.getElementsByClassName("mySlides");
     for (i = 0; i < x.length; i++) {
         x[i].style.display = "none";
     }
     myIndex++;
     if (myIndex > x.length) {
         myIndex = 1
     }
     x[myIndex - 1].style.display = "block";
     setTimeout(carousel, 4000);
 }
*/
// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var imageUrls = [
    "pictures/some.gif",
    "https://media.giphy.com/media/FDHDP7DREKSlYtHm43/giphy.gif",
    "https://media.giphy.com/media/l41lSh8C2E39fzuta/giphy.gif",
    "https://media.giphy.com/media/Ub8XEam5vXbMY/giphy.gif",
    "https://media.giphy.com/media/3o7TKLHb0PWRNnoVq0/giphy.gif"
];

function changeImage() {
    var num = Math.floor(Math.random() * (imageUrls.length));
    document.getElementById("somegif").src = imageUrls[num];
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var cancel = document.getElementById("cancel");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
cancel.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // image carousel
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// image carousel
var slideIndex = 1;
showFacts(slideIndex);

function plusFacts(n) {
    showFacts(slideIndex += n);
}

function currentFact(n) {
    showFacts(slideIndex = n);
}

function showFacts(n) {
    var i;
    var slides = document.getElementsByClassName("myFacts");
    var dots = document.getElementsByClassName("tall");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

var chuckVitser = [
    "There is no Esc key on Chuck Norris' keyboard, because no one escapes Chuck Norris",
    "It takes Chuck Norris 20 minutes to watch 60 minutes ",
    "Chuck Norris will never have a heart attack. His heart isn't nearly foolish enough to attack him",
    "Chuck Norris doesn't bowl strikes, he just knocks down one pin and the other nine faint.",
    "Chuck Norris once ordered a steak in a restaurant, the steak did what it was told.",
    "Chuck Norris built the hospital he was born in",
    "Chuck Norris do not have a mortal father. He went back in time  and fathered himself.",
    "Chuck Norris can leave a message before the beep.",
    "Chuck Norris can stop a red light!",
    "Chuck Norris recently died. But he got better.",
    "Rome was not built in a day because Chuck Norris was not there to do the job right.",
    "In the Bible, Jesus turned water into wine. But then Chuck Norris turned that wine into beer.",
    "They wanted to put Chuck Norris on Mount Rushmore, but the granite wasn’t though enough for his beard. "
]

document.getElementById("chuckklikk").onclick = function() {
    document.getElementById("chucktekst").innerHTML = chuckVitser[Math.floor(Math.random() * chuckVitser.length)];
}

var mitchVitser = [
    '"We protect when other people don’t want to protect, and we go above and beyond."',
    '"If you want me, you can have me. But rapido because the boat is on fire."',
    '<b>Mitch Buchannon:</b> "We got a dead body on our beach."</br> <b>Matt Brody</b>: "That’s not our job."',
    '"All the bad shit happening on our beach started once she took over and my balls say we need to go over there and check it out."',
    '"I’m Mitch Buchannon, you motherfucker."',
    '"I’ll die when the tide stops and the moon drowns. Until then... I’m oceanic, motherfucker."'
]

document.getElementById("hasselklikk").onclick = function() {
    document.getElementById("hasseltekst").innerHTML = mitchVitser[Math.floor(Math.random() * mitchVitser.length)];
}