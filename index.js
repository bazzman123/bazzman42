document.getElementById('searchForm').addEventListener('submitNumber', function(e) {
    search(document.getElementById('inputNumber'));
    e.preventDefault();
}, false);

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
