/* Menu */
$(document).ready(function () {
    $(document).delegate('.open', 'click', function (event) {
        $(this).addClass('oppenned');
        event.stopPropagation();
    })
    $(document).delegate('body', 'click', function (event) {
        $('.open').removeClass('oppenned');
    })
    $(document).delegate('.cls', 'click', function (event) {
        $('.open').removeClass('oppenned');
        event.stopPropagation();
    });
});

$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

/* Random title words instead of lucioball = RL */
/*
var textToDisplay = ["LÚCIOBALL IS ROCKET LEAGUE. CHANGE MY MIND.", "Science will reveal the truth", 
                     "Tu stultus es", "What a save!", "Boo boo doo de doo", "Lorem ipsum dolor sit amet", 
                     "undefined", "Stupidity is not a right.", "What a victory-challenged.",
                    "We will do as promised, give us a while.", "Chat disabled for 3 seconds", 
                     "This sentence is false.", "Soyuz nerushimy respublik svobodnykh", "Make America Great Britain again!"];
var randInt = Math.floor(Math.random() * textToDisplay.length);

var item = textToDisplay[randInt].toUpperCase();

var bigBoldText = document.getElementById("uselessText");

bigBoldText.textContent = item;

/* Collapse */

var coll = document.getElementsByClassName("category");
var Q = document.getElementsByClassName("Q");

var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

for (i = 0; i < Q.length; i++) {
    Q[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

// DO NOT DELETE THIS. THIS IS FOR THE FAQS' ANSWERS.
// DO NOT DELETE THIS. THIS IS FOR THE FAQS' ANSWERS.
// DO NOT DELETE THIS. THIS IS FOR THE FAQS' ANSWERS.
// DO NOT DELETE THIS. THIS IS FOR THE FAQS' ANSWERS.
// DO NOT DELETE THIS. THIS IS FOR THE FAQS' ANSWERS.

var acc = document.getElementsByClassName("accordion");
var j;

for (j = 0; j < acc.length; j++) {
    acc[j].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

/* Search */

var input = document.getElementById("input-text");
var hsearch = document.getElementById("h-search");
var jd;
var loader = document.getElementsByClassName("loader");
$(document).ready(function () {
    
    var url = window.location.search;
    var search = url.replace("?search=", "");
    var search2 = search.replace("&search=GO", "");
    var decode = decodeURIComponent(search2);
    hsearch.textContent = "Search: " + decode;
    $.getJSON("jsonsort.json", function (jdk, index) {
     jd = jdk.object;
     $(loader).fadeIn();
        if(decode==""){
        alert("กรุณาป้อนคำเพื่อค้นหา");
        }else{
        findword(decode);
        }
    $(loader).fadeOut();
    });
    
    
});

input.addEventListener('keypress', function (e) {
    if (e.which === 13) {
        $(loader).fadeIn();
        hsearch.textContent = "Search: " + input.value.replace("&search=GO", "");
        if(input.value.replace("&search=GO", "")==""){
        alert("กรุณาป้อนคำเพื่อค้นหา");
        }else{
        findword(input.value.replace("&search=GO", ""));
        }
        $(loader).fadeOut();
        e.preventDefault();
    }
});

var btn = document.getElementById("searchButton");

$(btn).on('click', function (e) {

});

var sbtn = document.getElementById("searchButt");

sbtn.onclick = function (e) {
    $(loader).fadeIn();
    hsearch.textContent = "Search: " + input.value;
    if(input.value==""){
        alert("กรุณาป้อนคำเพื่อค้นหา");
    }else{
        findword(input.value);
    }
    $(loader).fadeOut();
    
    e.preventDefault();
}

function findword(word) {
    var posting = document.querySelector('#searchResults');
    var numming = 0;
    
    while (posting.firstChild) {
        posting.removeChild(posting.firstChild);
    }
        
    for (var i = 0; i < jd.length; i++) {
                
        if (jd[i].message.indexOf(word) == -1) {
            continue;
        }
        
        numming++;
        
        var div = document.createElement('div');
        var divComment = document.createElement('div');
        var mes = document.createElement('p');
        var date = document.createElement('p');
        var kw = document.createElement('p');    
        var link = document.createElement('p');
        var like = document.createElement('p');
        var paging = document.createElement('p');
        var hr = document.createElement('hr');
        
        var table = document.createElement('table');
        var tbody = document.createElement('tbody');
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        
        var spaceBetweenTables = document.createElement('div');
        
        var elementTitle = document.createElement('h1');
        
        posting.appendChild(tbody);
        spaceBetweenTables.style = "height: 32px;";
        
        
        // Serious shit begins here
        mes.textContent = "" + jd[i].message;
        date.textContent = "Date : " + jd[i].date;
        
        if (jd[i].link != null) {
            link.textContent = "Link : " + jd[i].link;
        }
        
        // If there are comments.
        if (jd[i].coments != null) {

            for (var j = 0; j < jd[i].coments.data.length; j++) {
                
                var comment = document.createElement('p');

                comment.textContent = (j + 1) + jd[i].coments.data[j].like_count + ". " + jd[i].coments.data[j].message;

                divComment.appendChild(comment);

                if (jd[i].coments.data[j].comments != null) {

                    for (var k = 0; k < jd[i].coments.data[j].comments.data.length; k++) {

                        var reply = document.createElement('p');
                        
                        reply.style.marginLeft = "16px";
                        reply.textContent = (j + 1) + "." + (k + 1) + ": " + jd[i].coments.data[j].comments.data[k].message;

                        divComment.appendChild(reply);
                    }
                }

            }

        }

        kw.textContent = jd[i].keyword;
        like.textContent = jd[i].like;
        
        var elementTitles = ["Message ", "Likes ", "Keywords ", "Comments "];
        var infos = [mes, like, kw, divComment];
        
        for (var x = 0; x < infos.length; x++) {
            
            var row = table.insertRow(x);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = elementTitles[x];
            cell2.appendChild(infos[x]);
            
            cell1.style = "font-weight: 500; font-size: 24px; padding-right: 8px;";
            cell1.style.textAlign = "right";
            
            cell1.style.backgroundColor = "rgb(128, 64, 32)";
            cell2.style.backgroundColor = "rgb(192, 128, 64)";
             
        }

        posting.appendChild(spaceBetweenTables);
        posting.appendChild(table);
        
        table.style = "width: 100%;";
        
        /*div.appendChild(mes);
        div.appendChild(date);
        div.appendChild(link);
        div.appendChild(like);
        div.appendChild(kw);
        div.appendChild(divComment);
        div.appendChild(paging);
        div.appendChild(hr);
        posting.appendChild(div);*/
        
        posting.appendChild(table);

    }

    if (numming == 0){
        
         posting.innerHTML = "";
         var p = document.createElement('p');
            p.textContent="ไม่พบคำที่กำลังค้นหา กรุณาป้อนคำใหม่";
            p.style.fontSize="32px";
            p.style.color="white";
             posting.appendChild(p);
    }

}
