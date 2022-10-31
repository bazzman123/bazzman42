


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
      let carTitle1 = document.getElementById("carsTitle");
      while (carTitle1.firstChild) {
        carTitle1.removeChild(carTitle1.firstChild);
      };
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




function carsAPI(content, extra) {
  fetch("https://www.merinfo.se/api/v1/addresses/vehicles", {method: "POST", redirect: 'follow', headers: {'Content-type': 'application/json', 'Accept': 'application/json, text/plain, */*'}, body: JSON.stringify(content)}).then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    // This is the JSON from our response
    //console.log(data);
    creditFromURL(data["data"]["vehicles"]);
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
};


function creditFromURL(list) {
  let list1 = list;
  let countCredit = 0;
  let totalCars = list.length;
  var listItem1 = document.createElement("p")
  var textP = "På adressen är det totalt " + String(totalCars) + " bilar registrerade. Om någon av dom är kreditköpta listas de nedanför:";
  var listText1 = document.createTextNode(textP);
  listItem1.appendChild(listText1);
  document.getElementById("carsTitle").appendChild(listItem1);
  
  for (let i = 0; i < list1.length; i++) {
    response = fetch("https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/" + list1[i]["url"]).then(response => response.text()).then((html1) => {
      var parser = new DOMParser();
      var doc1 = parser.parseFromString(html1, 'text/html');
      let creditBool = doc1.getElementById("data-credit").textContent;
      if (creditBool === "Ja") {
        /*
        var listItem = document.createElement("LI"); //Creates item list
        var carInfoN = " ( " +list1[i]["year"] + " ) " + list1[i]["model"] + "---------" + "Ägare: " + list1[i]["owner"];
        var listText = document.createTextNode(carInfoN);
        listItem.appendChild(listText);
        document.getElementById("carsList").appendChild(listItem);
        */
        var listItem = document.createElement("LI"); 
        listItem.setAttribute("class", "listItemFlex");
        
        //var listItem = document.createElement('span')
        //listItem.innerHTML = dateString;
        var span1 = document.createElement('span');
        var span1Text = document.createTextNode(list1[i]["year"]);
        span1.setAttribute("class", "year1");
        var span2 = document.createElement('span');
        var span2Text = document.createTextNode(list1[i]["model"]);
        span2.setAttribute("class", "model1");
        var span3 = document.createElement('span');
        var span3Text = document.createTextNode(list1[i]["owner"]);
        span3.setAttribute("class", "owner1");
        span1.appendChild(span1Text).appendChild(listItem);
        span2.appendChild(span2Text).appendChild(listItem);
        span3.appendChild(span3Text);
        document.getElementById("carsList").appendChild(listItem);//.appendChild();
        
      }
      
    }).catch(err => console.log(err))
  };
};





