import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DoctorList, printList } from './backend-code';

let doctorList = new DoctorList();
let searchQuery = "";

function addListeners() {

  $("#querySubmit").click(function () {
    $("#searchResult").empty();
    searchQuery = $("#querySearch").val();
    $("#querySearch").val("");
    $("#userQuery").html(`You searched for: ${searchQuery}`);
    $("#searchStatus").html("Searching...");
    $("#querySubmit").hide();
    
    doctorList.searchDoc(searchQuery);

    setTimeout(function () {
      printList();
      $("#searchStatus").empty();
      $("#querySubmit").show();
      $("#userQuery").html(`Results for: ${searchQuery}`);
    }, 3000);

  });
}

$(document).ready(function () {
  addListeners();
});
