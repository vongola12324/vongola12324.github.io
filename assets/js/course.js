function parseClassInfo() {
    const param = parseParam();
    let filename;
    if (param && isAvailable(param)) {
        filename = param + "_course.json";
    } else {
        const today=new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        if (month+1>=2 && month+1 <= 7) {
            filename = (year-1911-1) + "_2_course.json";
        } else {
            if (month < 2) {
                filename = (year-1911-1) + "_1_course.json";
            } else {
                filename = (year-1911) + "_1_course.json";
            }
        }
    }
    $.getJSON('/course/json/'+filename, function (lessonData) {
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
                    let popupContent = "";
                    if (val.hasOwnProperty("code")) {
                        if(popupContent) {
                            popupContent += "<br>";
                        }
                        popupContent += "選課代碼：" + val["code"];
                    }
                    if (val.hasOwnProperty("point")) {
                        if(popupContent) {
                            popupContent += "<br>";
                        }
                        popupContent += "學分數：" + val["point"];
                    }
                    if (popupContent) {
                        target.attr("data-html", popupContent);
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
    return status in statusTable ? statusTable[status] : "Error";
}

function parseParam() {
    let strUrl = location.search;
    let getPara, ParaVal;
    let aryPara = [];
    if (strUrl.indexOf("?") != -1) {
        let getSearch = strUrl.split("?");
        getPara = getSearch[1].split("&");
        for (let i = 0; i < getPara.length; i++) {
            ParaVal = getPara[i].split("=");
            aryPara.push(ParaVal[0]);
            aryPara[ParaVal[0]] = decodeURI(ParaVal[1]);
        }
    }
    if ("v" in aryPara) {
        return aryPara["v"];
    } else {
        return false;
    }
}

function isAvailable(v) {
    const course = ["105_1", "105_2"];
    return course.indexOf(v) != -1;
}