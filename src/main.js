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
    $("#userQuery").html(`You searched for: ${searchQuery}`);
    console.log(searchQuery);
    doctorList.searchDoc(searchQuery);
    $("#searchStatus").html("Searching...");

    setTimeout(function () {
      printList();
      $("#searchStatus").empty();
    }, 2000);

  });
}

$(document).ready(function () {
  addListeners();
});
