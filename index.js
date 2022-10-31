


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
let collectedData = {};
let carsTemp = [];

// Functions:
function countSameItems(array1, array2){
  let arr1 = array1,
    arr2 = array2,
    compare = (a1, a2) => arr1.reduce((a, c) => a + arr2.includes(c), 0);
  return compare(arr1, arr2);
};


document.querySelector('#inputNumber.search.input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      respondWith(document.getElementById("inputNumber").value);
      //event.preventDefault();
      document.getElementById("inputNumber").value = "";
      let parent = document.getElementById("carsList");
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      };
      carsTemp = [];
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
    list_[list_.length-1] = list_[list_.length-1].replace(/^[0-9\s]*/g, '');
    collectedData["gatuadress/postord"] = [list_];
    var content = {"address":String(list_[0]), "city":String(list_[1])};
    let namnTag = doc.getElementsByClassName("link-primary")[0].href;
    let mixList = namnTag.split(/\/|-/g);
    console.log(namnTag);
    carsAPI(content);
  }).catch(err => console.log(err))
};


/*
function carsAPI(content, extra) {
  fetch("https://www.merinfo.se/api/v1/addresses/vehicles", {method: "POST", redirect: 'follow', headers: {'Content-type': 'application/json', 'Accept': 'application/json, text/plain, stjärna-slash-stjärna'}, body: JSON.stringify(content)}).then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    // This is the JSON from our response
    console.log(data);
    let owners = [];//obj["data"]["vehicles"];
    for (let i = 0; i < data["data"]["vehicles"].length; i++) {
      owners.push(data["data"]["vehicles"][i]["owner"]);
    };
    owners = [...new Set(owners)];
    for (let i = 0; i < owners.length; i++) {
      owners[i] = owners[i].split(/[ ]|-/g);
    };
    function whoOwns(nameTag, array1, array2) {
      if (countSameItems(nameTag, array2) > countSameItems(nameTag, array1)) {
          return array2;
          };
      if (countSameItems(nameTag, array1) > countSameItems(nameTag, array2)) {
          return array1;
          };
      alert("Error: Båda folkbokförda på adressen har förvånandsvärt liknande namn...");
      return array1;
    };
    let theLastOwner = whoOwns(extra, owners[0], owners[1]);
    //console.log(theLastOwner);
    collectedData["namn"] = theLastOwner.join(" ");
    console.log(collectedData); //looooooooooooooooooooooooooooooooooooog
    let carsTempMain = [];
    let carsTemp2 = [];
    let bad = theLastOwner.join(" ").normalize();
    for (let i = 0; i < data["data"]["vehicles"].length; i++) {
      if (bad.localeCompare(data["data"]["vehicles"][i]["owner"].normalize()) == 0) {
        carsTempMain.push([data["data"]["vehicles"][i]["model"], data["data"]["vehicles"][i]["year"], data["data"]["vehicles"][i]["url"]]);
        response = fetch(data["data"]["vehicles"][i]["url"]).then(response => response.text()).then((html1) => {
          var parser1 = new DOMParser();
          var doc1 = parser.parseFromString(html1, 'text/html');
          console.log("ReSPOOOONS", doc1);
          }).catch(err => console.log(err))
        };
      //console.log("jaaaa", i);
      if (bad.localeCompare(data["data"]["vehicles"][i]["owner"].normalize()) == -1) {
        carsTemp2.push([data["data"]["vehicles"][i]["model"], data["data"]["vehicles"][i]["year"], data["data"]["vehicles"][i]["url"]]);
        };
    };
    console.log(carsTempMain);
    console.log(carsTemp2);
    //collectedData["Huvudperson-bilar"] = [];
    
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
};
*/
function carsAPI(content, extra) {
  fetch("https://www.merinfo.se/api/v1/addresses/vehicles", {method: "POST", redirect: 'follow', headers: {'Content-type': 'application/json', 'Accept': 'application/json, text/plain, */*'}, body: JSON.stringify(content)}).then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    // This is the JSON from our response
    console.log(data);
    /////////////////////////////////////////////////////////// let bilar = data["data"]["vehicles"];
    //let bilar = data["data"]["vehicles"]
    console.log("json type --->", typeof(data["data"]["vehicles"]));
    creditFromURL(data["data"]["vehicles"]);
    //for (let i = 0; i < bilar.length; i++) {};
    //displayCars(data["data"]["vehicles"]);
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
};


//let newList = []; //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
function creditFromURL(list) {
  let c = "";
  console.log("LIIIST", list);
  let list1 = list;
  //let newList = []; XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  for (let i = 0; i < list1.length; i++) {
    response = fetch("https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/" + list1[i]["url"]).then(response => response.text()).then((html1) => {
      var parser = new DOMParser();
      var doc1 = parser.parseFromString(html1, 'text/html');
      let creditBool = doc1.getElementById("data-credit").textContent;
      console.log("MOOOODEL", list1[i]["model"]);
      carsTemp.push({"kredit": creditBool});
    }).catch(err => console.log(err))
  };
  console.log(carsTemp);
};


function displayCars(bilar1) {
  
};


/*
    var listItem = document.createElement("LI"); //Creates item list
    var carInfoN = bilar[i]["regno"] + " " + bilar[i]["owner"] + " " + bilar[i]["year"] + " " + bilar[i]["model"]
    var listText = document.createTextNode(carInfoN);
    listItem.appendChild(listText);
    document.getElementById("carsList").appendChild(listItem);
*/




/*
function isCredit(url) {
  let finalLink = "https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/" + link;
  response = fetch(finalLink).then(response => response.text()).then((html) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    console.log(doc)
  }).catch(err => console.log(err))
};
*/

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


