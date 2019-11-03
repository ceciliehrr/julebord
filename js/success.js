var confirm = document.getElementById("confirm");
var modal = document.getElementById("sucModal");
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    document.location.href = "index.html";
}
confirm.onclick = function() {
        document.location.href = "index.html";
    }
    // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        document.location.href = "index.html";
    }
}