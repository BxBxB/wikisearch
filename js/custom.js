var url = "https://en.wikipedia.org/w/api.php?";
var query = "action=query&format=json";
var extract = "&prop=extracts&exintro&exsentences=3&exlimit=max";
var generator = "&generator=search&gsrsearch=";
var callback = "&callback=?";
var results = $("#data");

function addResult(title, description) {
    var link = "https://en.wikipedia.org/wiki/" + encodeURI(title);
    results.append(
        '<article class="result"><a href=' +
            link +
            ' target="_blank">' +
            '<b class="title">' +
            title +
            '</b></a><br><span class="uri">' +
            link +
            "</span><p>" +
            description +
            "</p></article>"
    );
}

function Search(term) {
    results.empty();
    document.getElementById("loader").style.visibility = "visible";
    $.getJSON(
        url + query + extract + generator + term + callback,
        function (json) {
            var result = json.query.pages;
            document.getElementById("loader").style.visibility = "hidden";
            Object.keys(result).forEach(function (key) {
                var title = result[key].title;
                var description = result[key].extract;
                addResult(title, description);
            });
        }
    );
}

function Align() {
    var header = $("header");
    header.removeClass("disp");
    $("#loader").removeClass("disp");
    $("#main").css("display", "none");
}

function makeSearch() {
    var temp = $("#itbx").val().trim();
    if (temp != "") {
        Align();
        $("#tbx").val(temp);
        Search(temp);
    }
}

$("#srchbox").click(function () {
    makeSearch();
});

$("#srch-icon").click(function () {
    makeSearch();
});

$("#itbx").keydown(function (char) {
    if (char.keyCode == 13) {
        makeSearch();
    }
});

$("input:button").click(function () {
    var temp = $("#tbx").val().trim();
    if (temp != "") {
        Search(temp);
    }
});

$("#tbx").keydown(function (char) {
    if (char.keyCode == 13) {
        var temp = $("#tbx").val().trim();
        if (temp != "") {
            Search(temp);
        }
    }
});

$("#random").click(function () {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
});

$("#arandom").click(function () {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
});

$("#itbx").focus();