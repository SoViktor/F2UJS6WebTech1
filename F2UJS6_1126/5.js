$(function () {

    function resetBox() {
        $("#box").stop(true, true).css({
            left: "300px",
            top: "0px",
            width: "300px",
            height: "60px",
            fontSize: "12pt",
            opacity: 1
        });
    }

    $("#startAnim").click(function () {
        resetBox();

        let seb = 800;

        $("#box")
            .animate({
                left: "600px",
                width: "500px",
                fontSize: "30pt"
            }, seb)

            .animate({
                top: "150px",
                width: "250px",
                height: "66px"
            }, seb)

            .animate({
                left: "0px",
                opacity: 0.4
            }, seb)

            .animate({
                left: "300px",
                top: "0px",
                width: "300px",
                height: "60px",
                fontSize: "12pt",
                opacity: 1
            }, seb, function () {
                alert("VÉGE");
            });
    });


    $("#hideParas").click(function () {
        $("#p1, #p2, #p3").slideUp(400, function () {
        });
        alert("Bekezdések elrejtése");
    });


    let folded = false;

    $("#toggleFold").click(function () {
        let box = $("#box");
        box.stop(true, true);

        if (!folded) {
            box.animate({
                height: "0px",
                lineHeight: "0px",
                paddingTop: "0px",
                paddingBottom: "0px"
            }, 400, function () {
                folded = true;
                box.animate({ left: "600px" }, 600);
            });
        } else {
            box.animate({
                height: "60px",
                lineHeight: "60px",
                paddingTop: "0px",
                paddingBottom: "0px"
            }, 400, function () {
                folded = false;
                box.animate({ left: "600px" }, 600);
            });
        }
    });

});
