function init() {
    let strUrl = location.search;
    let getPara, ParaVal;
    let aryPara = [];
    let textArea = document.getElementById("editable");
    let timeInv;
    let start_button = document.getElementById("start");
    let stop_button = document.getElementById("stop");

    if (strUrl.indexOf("?") != -1) {
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

            // C8763
            if ("C8763" in aryPara) {
                let url = "http://i.imgur.com/tqVvt49.gif";
                document.getElementById("editable").innerHTML = "<img src=\"" + url + "\" style='width: 100%; height: auto;'/>"
            }

            // Image Pad
            if ("image" in aryPara) {
                let imgUrl = decodeURI(aryPara["image"]);
                imgUrl = imgUrl.replace(/%3A/g, ':').replace(/%2F/g, '/');
                if (imgUrl != "undefined") {
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
            if (arrPara.size() == 0) {
                textArea.innerText = "It Works!";
            }
        }
    }
}
function editable() {
    let div = document.getElementById("editable");
    div.contentEditable = 'true';
}