// client side javascript to handle the case when a user tries to
// send an empty data field to the server

$(document).ready(function() {
    invalidInputHandler();
});

function invalidInputHandler() {
    $('#submitUser').on('click', function(e) {
        console.log("Something is happening, but what?!?!");
        $('input').each(function() {
            var input = $(this);
            if (input.val() == "") {
                e.preventDefault();
                $('#emptyInput').attr('id', 'invalidInput');
            }
        });
    });
}