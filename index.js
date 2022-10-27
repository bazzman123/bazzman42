


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
    console.log(nmr);
}
