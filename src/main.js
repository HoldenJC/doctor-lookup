import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DoctorList } from './backend-code';

let doctorList = new DoctorList();
// let firstNameArray = [];
// let lastNameArray = [];
// let addressArray = [];
// let phoneArray = [];
// let websiteArray = [];
// let newPatients = [];
let searchQuery = "";

// function searchDoc(query){

//   $.get(`https://api.betterdoctor.com/2016-03-01/doctors?location=45.523064,-122.676483,50&skip=0&limit=10&user_key=${process.env.exports.apiKey}&query=${query}`).then(function(response){
//     let docArray = response.data;

//     docArray.forEach(function(doctor){
//       if(doctor.within_search_area === true){
//         firstNameArray.push(doctor.profile.first_name);
//         lastNameArray.push(doctor.profile.last_name);
//         addressArray.push(doctor.visit_address);
//         (doctor.phones).forEach(function(phoneNumber){
//           if(phoneNumber.type === "landline"){
//             phoneArray.push(phoneNumber.number);
//           }
//         });
//         websiteArray.push(doctor.)      
//       }
//     });
//     // console.log(firstNameArray);
//     // console.log(lastNameArray);
    
//   }).fail(function(error){
//     console.log("Error completing request: " + error);

//   });

// }


function addListeners(){
 
  $("#querySubmit").click(function(){
    // firstNameArray = [];
    // lastNameArray = [];
    // middleNameArray = [];
    searchQuery = $("#querySearch").val();
    console.log(searchQuery);
    doctorList.searchDoc(searchQuery);
    // searchDoc(searchQuery);
  });

}

$(document).ready(function() {
  addListeners();
});
