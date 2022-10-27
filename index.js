


/*

function getHTML(link) {
  fetch("https://www.merinfo.se/search?who=0702990271&where=", {referrer: "https://www.merinfo.se/"})
    .then(function(response) {
    console.log(response)
  });
};



//getHTML("https://www.merinfo.se/search?who=0702990271");
function getNumber() {
  var input = document.getElementById('inputNumber').value;
  var part2 = input.replace("https://www.merinfo.se/search?who=", "");
  var part1 = "https://www.merinfo.se/search?who=";
  var final = part1 + part2;
  //getHTML(final);
  displayDetails(input);
};



function displayDetails(info) {
    console.log(info);
};

*/
/*

message.addEventListener('input', function () {
            result.textContent = this.value;
        });

*/

document.querySelector('#inputNumber.search.input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        respondWith(document.getElementById("inputNumber").value);
        //event.preventDefault();
        document.getElementById("inputNumber").value = "";
    }
});

function respondWith(nmr) {
    getSearchLink(nmr);
};

function getSearchLink(nmr) {
  let part1 = "https://www.merinfo.se/search?who=";
  let part2 = String(nmr);
  let searchLink = part1 + part2;
  getSearchHTML(searchLink);
};

function getSearchHTML(link) {
  let finalLink = "https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/" + link;
  response = fetch(finalLink).then((html) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    console.log(doc);
  }).catch(err => console.log(err))
};

//getHTML EXAMPLE
/* 
function getHTML(link) {
  let PROXY = "https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/";
  let finalLink = PROXY + link;
  response = fetch(finalLink).then(response => response.text()).then((html) => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      let href = doc.getElementsByClassName("link-primary")[0].href;
      info["searchedLink"] = href;
      getCODE(href);
  }).catch(err => console.log(err))
};
*/
