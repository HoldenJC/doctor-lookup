import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Example } from './backend-code';

let example = new Example();

// https://api.betterdoctor.com/2016-03-01/practices?name=janet&location=47.608013,-122.335167,10&skip=0&limit=10&user_key=f0628ccddc20bcbdf813d9fbfdcca1ce

function getDoc(){
  $.ajax({
    url: `https://api.betterdoctor.com/2016-03-01/practices?location=47.608013,-122.335167,10&skip=0&limit=10&user_key=${process.env.exports.apiKey}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function (response) {
      $('#test') .html(`<img src="${response.data[0].doctors[0].profile.image_url}">`);
      // $('#test') .html(`${response.data[0].doctors[0].profile.first_name}`);
      // $('#test').delay(1000).fadeOut(500);
    },
    error: function () {
      $('#errors').text("There was an error processing your request. Please try again.");
    }
  });
}


$(document).ready(function() {
  $("#test").append(example.name);
  example.exampleMethod();
  $("#test").append(example.name);
  getDoc();
});
