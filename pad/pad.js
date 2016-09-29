function init () {
  var strUrl = location.search;
  var getPara, ParaVal;
  var aryPara = [];
  var timeInv;
  var start_button = document.getElementById("start");
  var stop_button = document.getElementById("stop");

  if (strUrl.indexOf("?") != -1) {
    var getSearch = strUrl.split("?");
    getPara = getSearch[ 1 ].split("&");
    for (var i = 0; i < getPara.length; i++) {
      ParaVal = getPara[ i ].split("=");
      aryPara.push(ParaVal[ 0 ]);
      aryPara[ ParaVal[ 0 ] ] = decodeURI(ParaVal[ 1 ]);
    }

    // Help
    if ("help" in aryPara) {
      alert("Will be available soon...");
    } else {
      // Add feature here

      // Image Pad
      if ("image" in aryPara) {
        var imgUrl = aryPara["image"];
        // console.log(aryPara["image"]);
        if (imgUrl != "undefined") {
          document.getElementById("editable").innerHTML = "<img src=\"" + imgUrl + "\" style='width: 100%; height: auto;'/>"
        } else {
          document.getElementById("editable").innerText = "404<br>Image Not Found!";
        }
        document.title = "Image Pad"
      }

      // Text Pad
      if ("text" in aryPara) {
        document.getElementById("editable").innerText = aryPara[ "text" ];
        document.title = "Text Pad";
      }

      // Time Pad
      if ("countdown" in aryPara) {
        document.title = "Timer: Countdown";
        if (aryPara[ "countdown" ] === "undefined") {
          setTime(0, 0, 0, 30);
        } else {
          var days = aryPara[ "countdown" ].split("d").length > 1 ? aryPara[ "countdown" ].split("d") : [ 0, aryPara[ "countdown" ].split("d")[ 0 ] ];
          var hours = days[ 1 ].split("h").length > 1 ? days[ 1 ].split("h") : [ 0, days[ 1 ].split("h")[ 0 ] ];
          var minutes = hours[ 1 ].split("m").length > 1 ? hours[ 1 ].split("m") : [ 0, hours[ 1 ].split("m")[ 0 ] ];
          var seconds = minutes[ 1 ].split("s")[ 0 ] ? minutes[ 1 ].split("s")[ 0 ] : 0 || 0;

          days = parseInt(days[0]);
          hours = parseInt(hours[0]);
          minutes = parseInt(minutes[0]);
          seconds = parseInt(seconds);

          // Check time over 60s/60m/24h
          while (seconds >= 60) {
            minutes += 1;
            seconds -= 60;
          }
          while (minutes >= 60) {
            hours += 1;
            minutes -= 60;
          }
          while (hours >= 24) {
            days += 1;
            hours -= 24;
          }

          setTime(days, hours, minutes, seconds);
        }
        document.getElementById("splitDiv").style.display = "block";
        start_button.style.display = "inline-block";
        stop_button.addEventListener('click', function () {
          start_button.style.display = "inline-block";
          stop_button.style.display = "none";
          if (timeInv) {
            clearInterval(timeInv);
          }
        });
        start_button.addEventListener('click', function () {
          start_button.style.display = "none";
          stop_button.style.display = "inline-block";
          timeInv = setInterval(countdown, 1000);
        });
      } else if ("timing" in aryPara) {
        document.title = "Timer: Timing";
        setTime(0, 0, 0, 0);
        document.getElementById("splitDiv").style.display = "block";
        start_button.style.display = "inline-block";
        stop_button.addEventListener('click', function () {
          start_button.style.display = "inline-block";
          stop_button.style.display = "none";
          if (timeInv) {
            clearInterval(timeInv);
          }
        });
        start_button.addEventListener('click', function () {
          start_button.style.display = "none";
          stop_button.style.display = "inline-block";
          timeInv = setInterval(timing, 1000);
        });
      } else if ("clock" in aryPara) {
        document.title = "Clock";
        showClock();
      }

      // Must be the last one
      if (aryPara[ "title" ]) {
        document.title = aryPara[ "title" ];
      }
    }

    // FIXME: If not use setTimeout, the "It works" will show before clock.
    setTimeout(function () {
      if (document.getElementById("editable").innerText == "Loading...") {
        document.getElementById("editable").innerText = "It works!";
      }
    }, 1000);
  }
}
function editable () {
  var div = document.getElementById("editable");
  div.contentEditable = 'true';
}

function showClock () {
  setInterval(function () {
    var currentdate = new Date();
    document.getElementById("editable").innerHTML =
      currentdate.getFullYear() + " / "
      + ("0" + currentdate.getMonth()).slice(-2) + " / "
      + ("0" + currentdate.getDate()).slice(-2) + "<br>"
      + ("0" + currentdate.getHours()).slice(-2) + " : "
      + ("0" + currentdate.getMinutes()).slice(-2) + " : "
      + ("0" + currentdate.getSeconds()).slice(-2);
  }, 1000);
}

function showCountdown (days, hours, mins, secs) {
  var target = document.getElementById("editable");
  target.innerText = "";
  if (days == 0 && hours == 0 && mins == 0 && secs == 0) {
    target.innerText = "Time's up!";
    document.title = "Timer: Time's up!";
    document.getElementById("splitDiv").style.display = "none";
    document.getElementById("stop").click();
    document.getElementById("start").style.display = "none";
  } else {
    setTime(days, hours, mins, secs);
  }
}

function countdown () {
  var target = document.getElementById("editable");
  var d = target.innerText.split("day(s), ").length > 1 ? target.innerText.split("day(s), ") : [ 0, target.innerText.split("day(s), ")[ 0 ] ];
  var time = d[ 1 ].split(" : ");
  d = d[ 0 ];
  var s = time[ 2 ];
  var m = time[ 1 ];
  var h = time[ 0 ];
  d = parseInt(d || 0);
  h = parseInt(h || 0);
  m = parseInt(m || 0);
  s = parseInt(s || 0);

  // Check time over 60s/60m/24h
  while (s >= 60) {
    m += 1;
    s -= 60;
  }
  while (m >= 60) {
    h += 1;
    m -= 60;
  }
  while (h >= 24) {
    d += 1;
    h -= 24;
  }

  if (s > 0 || m > 0 || h > 0 || d > 0) {
    s -= 1;
  }
  if (s < 0) {
    if (m > 0) {
      m -= 1;
      s += 60;
    } else {
      if (h > 0) {
        h -= 1;
        m += 59;
        s += 60;
      } else {
        if (d > 0) {
          d -= 1;
          h += 23;
          m += 59;
          s += 60;
        } else {
          d = 0;
          h = 0;
          m = 0;
          s = 0;
        }
      }
    }
  }
  showCountdown(d, h, m, s);
}

function timing () {
  var target = document.getElementById("editable");
  var data = target.innerText.split(" : ");
  var s = parseInt(data[ 2 ]);
  var m = parseInt(data[ 1 ]);
  var h = parseInt(data[ 0 ]);

  // Check time over 60s/60m/24h
  while (s >= 60) {
    m += 1;
    s -= 60;
  }
  while (m >= 60) {
    h += 1;
    m -= 60;
  }
  while (h >= 24) {
    d += 1;
    h -= 24;
  }

  s += 1;
  if (s >= 60) {
    s -= 60;
    m += 1;
    if (m >= 60) {
      m -= 60;
      h += 1;
      if (h >= 24) {
        h -= 24;
      }
    }
  }
  console.log(s + "," + m + "," + h);
  setTime(0, h, m, s);
}

function setTime (days, hours, mins, secs) {
  var target = document.getElementById("editable");
  target.innerText = "";
  if (days > 0) {
    target.innerText = days + "day(s), "
  }
  if (hours >= 0) {
    target.innerText += ("0" + hours).slice(-2) + " : ";
  }
  if (mins >= 0) {
    target.innerText += ("0" + mins).slice(-2) + " : ";
  }
  if (secs >= 0) {
    target.innerText += ("0" + secs).slice(-2);
  }
}