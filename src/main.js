import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Example } from './backend-code';

let example = new Example();
let firstNameArray = [];
let lastNameArray = [];
let middleNameArray = [];
let searchQuery = "";


// https://api.betterdoctor.com/2016-03-01/doctors?&location=or-portland&skip=0&limit=10&user_key=f0628ccddc20bcbdf813d9fbfdcca1ce&query=acne


function searchDoc(query){

  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&skip=0&limit=10&user_key=${process.env.exports.apiKey}&query=${query}`).then(function(response){
    let docArray = response.data;

    docArray.forEach(function(doctor){
      firstNameArray.push(doctor.profile.first_name);

      if(doctor.profile.middle_name === undefined){
        middleNameArray.push("(no middle name)"); 
      } else {
        middleNameArray.push(doctor.profile.middle_name);
      }

      lastNameArray.push(doctor.profile.last_name);      
    });
    console.log(firstNameArray);
    console.log(middleNameArray);
    console.log(lastNameArray);
    
  });

}


function addListeners(){
 
  $("#querySubmit").click(function(){
    firstNameArray = [];
    lastNameArray = [];
    middleNameArray = [];
    searchQuery = $("#querySearch").val();
    console.log(searchQuery);
    searchDoc(searchQuery);
  });

}

$(document).ready(function() {
  addListeners();

  $("#searchResult").append(example.name);
  example.exampleMethod();
  $("#searchResult").append(example.name);

});
