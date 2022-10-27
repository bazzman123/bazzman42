


/*

function getHTML(link) {
  fetch("https://www.merinfo.se/search?who=0702990271&where=", {referrer: "https://www.merinfo.se/"})
    .then(function(response) {
    console.log(response)
  });
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

data = {};


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
  response = fetch(finalLink).then(response => response.text()).then((html) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    console.log(doc);
    let t = doc.getElementsByClassName("col pb-3 pl-3 pt-0 pr-0")[0].getElementsByClassName("mb-0")[1].innerText;
    let list_ = t.split("\\n").filter(e =>  e);
    //let prepareTranslate = list_.replace(/\\x/g, '%');
    for (let i = 0; i < list_.length; i++) {
      list_[i] = list_[i].replace(/\\x/g, '%');
      list_[i] = decodeURI(list_[i]);
    };
    console.log(list_);
    list_[list_.length-1] = list_[list_.length-1].replace(/^[0-9\s]*/g, '');
    console.log(list_);
    data["gatuadress/postord"] = [list_];
    console.log(data);
    var content = {"address":String(list_[0]), "city":String(list_[1])};
    carsAPI(content);
  }).catch(err => console.log(err))
};

function carsAPI(content) {
  fetch("https://www.merinfo.se/api/v1/addresses/vehicles", {method: "POST", redirect: 'follow', headers: {'Content-type': 'application/json', 'Accept': 'application/json, text/plain, */*'}, body: JSON.stringify(content)}).then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    // This is the JSON from our response
    console.log(data);
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
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


/*


function getHTML(link) {
 let PROXY = "https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/";
 let finalLink = PROXY + link;
 response = fetch(finalLink).then(response => response.text()).then((html) => {
   var parser = new DOMParser();
   var doc = parser.parseFromString(html, 'text/html');
   console.log(doc);
   let mb = doc.getElementsByClassName("mb-0");
   let t = doc.getElementsByClassName("col pb-3 pl-3 pt-0 pr-0")[0].getElementsByClassName("mb-0")[1].innerHTML;
   console.log(t);
   let tt = t.replace(/\\x/g, '%').replace(/\\n/g, "");
   const city = tt.match(/[^ ]+$/g);
   const adress = tt.match(/^[^<]+/g);
   var content = {"address":String(decodeURI(adress)), "city":String(decodeURI(city))};
   console.log(content);
   getAPI(content)
 }).catch(err => console.log(err))
};

function getAPI(content) {
  fetch("https://www.merinfo.se/api/v1/addresses/vehicles", {method: "POST", redirect: 'follow', headers: {'Content-type': 'application/json', 'Accept': 'application/json, text/plain, STJÄRNA-SLASH-STJÄRNA'}, body: JSON.stringify(content)}).then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    // This is the JSON from our response
    console.log(data);
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
};



*/
