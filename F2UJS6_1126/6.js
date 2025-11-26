$(function () {

    $("#calcBtn").click(function () {

        let a = $("#a").val().trim();
        let b = $("#b").val().trim();
        let op = $("input[name='op']:checked").val();

        if (a === "" || b === "") {
            alert("Mindkét számot meg kell adni!");
            return;
        }

        if (!/^-?\d+$/.test(a) || !/^-?\d+$/.test(b)) {
            alert("Csak egész számokat adjon meg!");
            return;
        }

        a = parseInt(a);
        b = parseInt(b);

        if (!op) {
            alert("Válasszon műveletet!");
            return;
        }

        let result;

        if (op === "mul") {
            result = a * b;
        }

        else if (op === "div") {
            if (b === 0) {
                alert("0-val nem lehet osztani!");
                return;
            }
            result = a / b;
        }

        else if (op === "add") {
            result = a + b;
        }

        else if (op === "sub") {
            result = a - b;
        }

        $("#result").text(result);
    });

});
