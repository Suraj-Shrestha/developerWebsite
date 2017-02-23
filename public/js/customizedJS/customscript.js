function login(){
    window.location.href = "/loginNav";
}
function signup(){
    window.location.href = "/signup-nav";
}

$(function(){
$('#frontEndInfo').click(function(e){
    e.preventDefault();
    $('html,body').animate({
        scrollTop: $(".tab-content").offset().top},
        'slow');
    $('#myTabs a[href="#tab1"]').tab('show');
    $('detailTable a[href="#tab1"]').addClass('featured');
})
})

$(function(){
$('#backEndInfo').click(function(e){
    $('html,body').animate({
        scrollTop: $(".tab-content").offset().top},
        'slow');
    e.preventDefault();
    $('#myTabs a[href="#tab2"]').tab('show');
})
})

$(function(){
$('#otherInfo').click(function(e){
    $('html,body').animate({
        scrollTop: $(".tab-content").offset().top},
        'slow');
    e.preventDefault();
    $('#myTabs a[href="#tab3"]').tab('show');
})
})

$(function(){
    var mousein = function(){
        $(this).css("opacity","0").addClass("over")
        .animate({height: "500px",width: "390px", opacity:"1"})
    }
    var mouseout = 
        function() {
            $(this).removeClass("over")
            .animate({height: "486", width: "390"})
        }
        $(".skills").children().hover(mousein, mouseout);
    $(".skills").children().click(mouseout);
    
});
$('.contactPage').click(function(){
    var location = $(this).attr('href');
    window.location.href = location;
    return false;
});

//contact modal form data storage to mongodb client side script
$('#submit').on('click', addInfo);
function addInfo(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addInfo input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newInfo = {
            'firstName': $('#addInfo fieldset input#inputfirstName').val(),
            'LastName': $('#addInfo fieldset input#inputlastName').val(),
            'email': $('#addInfo fieldset input#inputEmail').val(),
            'phoneNumber': $('#addInfo fieldset input#inputPhoneNumber').val()
        }
        
         // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newInfo,
            url: '/info/addInfo',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addInfo fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else{
    // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
