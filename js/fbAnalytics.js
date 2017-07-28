$(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD9Zl5VSocjVHck0dW3uJpDrnaJO747H54",
        authDomain: "hexoblog-ed7d4.firebaseapp.com",
        databaseURL: "https://hexoblog-ed7d4.firebaseio.com",
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var oriUrl = window.location.host;
    var curUrl = oriUrl + window.location.pathname;
    function readVisits(url, selector) {
    var db_key = decodeURI(url.replace(new RegExp('\\/|\\.', 'g'), "_"));
        database.ref(db_key).once("value").then(function (result) {
            var count = parseInt(result.val() || 0) + 1;
            database.ref(db_key).set(count);
            if (selector.length > 0) {
                selector.html(count);
            };
        });
    }
    readVisits(oriUrl, $("#visits .count"));
    if (curUrl && curUrl != "_") {
        readVisits("page/" + curUrl, $("#pageviews .count"));
    }
});