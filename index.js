function getHTML(link) {
  let PROXY = "https://ghg7femhx6.execute-api.us-east-1.amazonaws.com/";
  let finalLink = PROXY + link;
  //finalLink = link;
  response = fetch(finalLink).then(response => response.text()).then((html) => {
      //var parser = new DOMParser();
      //var doc = parser.parseFromString(html, 'text/html');
      console.log(html.referrer);
  }).catch(err => console.log(err))
};



//getHTML("https://www.merinfo.se/search?who=0702990271");
function getNumber() {
  var input = document.getElementById('inputNumber').value;
  var part2 = input.replace("https://www.merinfo.se/search?who=", "");
  var part1 = "https://www.merinfo.se/search?who=";
  var final = part1 + part2;
  getHTML(final);
};



function displayDetails(info) {
    console.log(info);
    
};
