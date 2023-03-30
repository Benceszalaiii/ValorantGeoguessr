$("document").ready(function() {
    $("#map").click(function(e) {
        var offset = $(this).offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;

        $("#marker").css("top", `${y + offset.top - 2.5}px`);
        $("#marker").css("left", `${x + offset.left - 2.5}px`);
        
        $("#coords").text(`Coordinates selected!`)
        $("#coords").addClass("btn-success")
        $("#coords").removeClass("btn-danger")
    });

    $(".map").click(function() {
        $("#map").attr("src", `/sources/minimaps/${$(this).text()}.png`)
        $("#marker").css("top", `-2.5px`);
        $("#marker").css("left", `-2.5px`);
        $("#coords").text(`Select the coordinates!`)
        $("#coords").removeClass("btn-success")
        $("#coords").addClass("btn-danger")
    });
}); 
$('#file-upload').change(function() {
    var i = $(this).prev('label').clone();
    var file = $('#file-upload')[0].files[0].name;
    $(this).prev('label').text(file);
  });
$(".map").click(function(){
    $(".map").removeClass("disabled")
    $(this).addClass("disabled")
})
(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  })()
function submit(){
    $("#success").css("display","block")
}
function another(){
    $("#success").css("display","none")
}
function home(){
    location = "index.html";
}