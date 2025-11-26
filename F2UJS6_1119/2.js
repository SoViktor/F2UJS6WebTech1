$(document).ready(function () {

            $("#k1").click(function () {
                $("#lista1 li:lt(2)").hide();
                $("#link").hide();
            });

            $("#k2").click(function () {
                $("#lista1 li:lt(2)").hide();
                $("#link").hide();
                $("#k2").hide();
            });

            $("#k3").click(function () {
                $("h1").hide();
                $("#lista1 li:lt(2)").hide();
                $("#link").hide();
            });

            $("#k4").click(function () {
                $("#lista1 li:lt(2)").hide();
                $("#link").text("");
                $("#link").removeAttr("href");
            });

            $("#k5").click(function () {
                $("#lista1 li:lt(2)").hide();
                $("#link").hide();
                $("#tablazat tr:even").hide();
            });

        });