function init() {
    let strUrl = location.search;
    let getPara, ParaVal;
    let aryPara = [];
    let textArea = document.getElementById("editable");
    let timeInv;
    let start_button = document.getElementById("start");
    let stop_button = document.getElementById("stop");

    if (strUrl.indexOf("?") !== -1) {
        let getSearch = strUrl.split("?");
        getPara = getSearch[1].split("&");
        for (let i = 0; i < getPara.length; i++) {
            ParaVal = getPara[i].split("=");
            aryPara.push(ParaVal[0]);
            aryPara[ParaVal[0]] = decodeURI(ParaVal[1]);
        }

        // Help
        if ("help" in aryPara) {
            swal({
                title: "Help!",
                text: "<h3>Here are some useful feature:</h3><br>" +
                "<table>" +
                "<thead><tr><th>Key</th><th>Value</th><th>Function</th></tr></thead>" +
                "<tbody>" +
                "<tr><td>help</td><td>(null)</td><td>Open this page.</td></tr>" +
                "<tr><td>text</td><td>(text)</td><td>Open an editable pad with (text)</td></tr>" +
                "<tr><td>timer</td><td>(null)</td><td>Open a timer.</td></tr>" +
                "<tr><td>timing</td><td>(null)</td><td>Open a timer.</td></tr>" +
                "<tr><td>countdown</td><td>(?d?h?m?s)</td><td>Open a countdown timer.</td></tr>" +
                "<tr><td>image</td><td>(url)</td><td>Open an image pad with the specify image.</td></tr>" +
                "</tbody>" +
                "</table>",
                html: true,
                type: "info",
                confirmButtonText: "Try it!"
            });
        } else {
            // Add feature here
            if (encodeURI("西瓜榴槤雞") in aryPara || encodeURI("西瓜榴槤擊") in aryPara || encodeURI("星光連流擊") in aryPara) {
                let url = "http://i.imgur.com/tqVvt49.gif";
                textArea.innerHTML = "你查詢的是「星爆氣流斬」嗎？<br><img src=\"" + url + "\" style='width: 100%; height: auto;'/>"
                textArea.style = "font-size: 0.5em";
            }

            // C8763
            if ("C8763" in aryPara || encodeURI("星爆氣流斬") in aryPara) {
                let url = "http://i.imgur.com/tqVvt49.gif";
                document.getElementById("editable").innerHTML = "<img src=\"" + url + "\" style='width: 100%; height: auto;'/>"
            }

            // Image Pad
            if ("image" in aryPara) {
                let imgUrl = decodeURI(aryPara["image"]);
                imgUrl = imgUrl.replace(/%3A/g, ':').replace(/%2F/g, '/');
                if (imgUrl !== "undefined") {
                    textArea.innerHTML = "<img src=\"" + imgUrl + "\" style='width: 100%; height: auto;'/>"
                } else {
                    textArea.innerText = "404<br>Image Not Found!";
                }
                document.title = "Image Pad"
            }

            // Text Pad
            if ("text" in aryPara) {
                textArea.innerText = aryPara["text"];
                document.title = "Text Pad";
            }

            // Must be the last one
            if (aryPara["title"]) {
                document.title = aryPara["title"];
            }

            // Default Text
            if (aryPara.length === 0) {
                textArea.innerText = "It Works!";
            }
        }
    } else {
        let cssId = 'SAOFont';
        if (!document.getElementById(cssId))
        {
            let head  = document.getElementsByTagName('head')[0];
            let link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = '../assets/css/SAOFont.css';
            link.media = 'all';
            head.appendChild(link);
        }
        textArea.innerHTML = "Welcome to<br>Sword Art Online";
        textArea.style = "font-family: 'SAOUI';"
    }
}
function editable() {
    let div = document.getElementById("editable");
    div.contentEditable = 'true';
}