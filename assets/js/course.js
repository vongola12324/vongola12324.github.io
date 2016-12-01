function parseClassInfo() {
    $.getJSON('/course/course.json', function (lessonData) {
        $.each(lessonData, function (key, val) {
            if (key == "Other") {
                $.each(val, function (k, v) {
                    $("ul#Other").append("<li>" + v + "</li>")
                });
            } else {
                let target = $("#" + key);
                if (target.html() != "") {
                    target.html("<i class=\"warning sign icon\"></i>衝突<i class=\"warning sign icon\"></i>");
                    target.addClass("Error");
                } else {
                    target.html(val["name"] + "<br>" + val["classroom"] + "<br>" + val["teacher"]);
                    target.addClass(getClass(val["status"]));
                    if (val.hasOwnProperty("code")) {
                        target.attr("data-content", "選課代碼：" + val["code"]);
                        target.attr("data-variation", "inverted");
                        target.addClass("popup inver");
                        target.popup();
                    }
                }
            }
        });
    });
}

function getClass(status) {
    const statusTable = JSON.parse('{"-1": "unsure", "0": "current", "1": "ta", "2": "club", "3": "master"}');
    return status in Object.keys(statusTable) ? statusTable[status] : "Error";
}