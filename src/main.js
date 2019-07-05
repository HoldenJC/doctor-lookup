import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Example } from './backend-code';

let example = new Example();
let searchName = "";
let docNames = [];

// https://api.betterdoctor.com/2016-03-01/practices?name=janet&location=47.608013,-122.335167,10&skip=0&limit=10&user_key=f0628ccddc20bcbdf813d9fbfdcca1ce

function getDoc(docName){
  $.ajax({
    url: `https://api.betterdoctor.com/2016-03-01/practices?name=${docName}&location=47.608013,-122.335167,10&skip=0&limit=10&user_key=${process.env.exports.apiKey}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function (response) {
      
      (response.data).forEach(function(element){
        docNames.push(element.name);
        console.log(element);
        console.log(docNames);
      })
      // alert(JSON.stringify(response, null, 4));
      // let str = JSON.stringify(response, null, 4);
      // $('#searchResult').append(`<img src="${response.data[0].doctors[0].profile.image_url}">`);
      // $('#searchResult').append(`${response.data[0].doctors[0].profile.first_name}`);
      $('#searchResult').append(`<br>${response.data[0].name}`);
      // $('#searchResult').append(`${response.data[0].doctors}`);
      // $('#searchResult').append(str);
      // $('#searchResult').delay(1000).fadeOut(500);
    },
    error: function () {
      $('#errors').text("There was an error processing your request. Please try again.");
    }
  });
}


function addListeners(){
  $("#docNameSubmit").click(function(){
    searchName = $("#docNameSearch").val();
    console.log(searchName);
    getDoc(searchName);
  });

  $("#symptomSubmit").click(function(){

  });

}

$(document).ready(function() {

  addListeners();

  $("#searchResult").append(example.name);
  example.exampleMethod();
  $("#searchResult").append(example.name);
  // getDoc(searchName);
});
