$(document).ready(function () {

    $("h1").mouseleave(function () {
        alert("Elhagyta a fejléc területét.");
    });

    $("#p1_link").click(function () {
        $("#p1").hide();
    });

    $("#p2_link").dblclick(function () {
        $("#p2").hide();
    });

    $("#submitBtn").mouseenter(function () {
        alert("A Jelentkezés gombra kattintva elküldi az űrlapot.");
    });

    $(".adat").mousemove(function () {
        $(this).css("border-color", "red");
    });

    $(".adat").mouseleave(function () {
        $(this).css("border-color", "gray");
    });

    $(".adat").click(function () {
        $(this).css("background-color", "#ffffcc");
    });

});
