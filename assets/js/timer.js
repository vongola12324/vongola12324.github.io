function init () {
  let strUrl = location.search;
  let getPara, ParaVal;
  let aryPara = [];
  let timeInv;
  let textArea = document.getElementById("editable");
  let start_button = document.getElementById("start");
  let stop_button = document.getElementById("stop");

  if (strUrl.indexOf("?") != -1) {
    let getSearch = strUrl.split("?");
    getPara = getSearch[ 1 ].split("&");
    for (let i = 0; i < getPara.length; i++) {
      ParaVal = getPara[ i ].split("=");
      aryPara.push(ParaVal[ 0 ]);
      aryPara[ ParaVal[ 0 ] ] = decodeURI(ParaVal[ 1 ]);
    }


      // Add feature here


      // Time Pad
      if ("countdown" in aryPara) {
        document.title = "Timer: Countdown";
        document.body.style.backgroundColor = "#2E2E2E";
        textArea.style.color = "white";
        if (aryPara[ "countdown" ] === "undefined") {
          setTime(0, 0, 0, 30);
        } else {
          let days = aryPara[ "countdown" ].split("d").length > 1 ? aryPara[ "countdown" ].split("d") : [ 0, aryPara[ "countdown" ].split("d")[ 0 ] ];
          let hours = days[ 1 ].split("h").length > 1 ? days[ 1 ].split("h") : [ 0, days[ 1 ].split("h")[ 0 ] ];
          let minutes = hours[ 1 ].split("m").length > 1 ? hours[ 1 ].split("m") : [ 0, hours[ 1 ].split("m")[ 0 ] ];
          let seconds = minutes[ 1 ].split("s")[ 0 ] ? minutes[ 1 ].split("s")[ 0 ] : 0 || 0;

          days = parseInt(days[ 0 ]);
          hours = parseInt(hours[ 0 ]);
          minutes = parseInt(minutes[ 0 ]);
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
        document.getElementById("editable").style.display = "block";
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
        document.getElementById("editable").style.display = "block";
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
      } else if ("timer" in aryPara) {
        document.title = "Clock";
        showClock();
      }
    }
}
function editable () {
  let div = document.getElementById("editable");
  div.contentEditable = 'true';
}

function showClock () {
  setInterval(function () {
    let currentdate = new Date();
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
  let target = document.getElementById("editable"), i = 0;
  const timesUp = ["Time's up!", "時間到！", "時間切れ！"];
  target.innerText = "";
  if (days == 0 && hours == 0 && mins == 0 && secs == 0) {
      target.innerHTML =  timesUp[i] ;
      i++;
      setInterval(function () {
        target.innerHTML =  timesUp[i] ;
        i++;
        if (i>=timesUp.length) {
            i = 0;
        }
    }, 1500);
    document.title = "Timer: Time's up!";
    document.getElementById("splitDiv").style.display = "none";
    document.getElementById("stop").click();
    document.getElementById("start").style.display = "none";
  } else {
    setTime(days, hours, mins, secs);
  }
}

function countdown () {
  let target = document.getElementById("editable");
  let d = target.innerHTML.split("day(s), ").length > 1 ? target.innerHTML.split("day(s), ") : [ 0, target.innerText.split("day(s), ")[ 0 ] ];
  let time = d[ 1 ].split(" : ");
  d = d[ 0 ];
  let s = time[ 2 ];
  let m = time[ 1 ];
  let h = time[ 0 ];
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
  // Check if last minute
  if (d == 0 && h == 0 && m == 0) {
      if (s % 2 == 0) {
          document.getElementById("editable").style.color = "red";
      } else {
          document.getElementById("editable").style.color = "white";
      }
  }
}

function timing () {
  let target = document.getElementById("editable");
  let data = target.innerHTML.split(" : ");
  let s = parseInt(data[ 2 ]);
  let m = parseInt(data[ 1 ]);
  let h = parseInt(data[ 0 ]);

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
  setTime(0, h, m, s);
}

function setTime (days, hours, mins, secs) {
  let target = document.getElementById("editable");
  target.innerHTML = "<strong>";
  if (days > 0) {
    target.innerHTML += days + "day(s), "
  }
  if (hours >= 0) {
    target.innerHTML += ("0" + hours).slice(-2) + " : ";
  }
  if (mins >= 0) {
    target.innerHTML += ("0" + mins).slice(-2) + " : ";
  }
  if (secs >= 0) {
    target.innerHTML += ("0" + secs).slice(-2);
  }
  target.innerHTML += "</strong>";
}