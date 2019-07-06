import $ from 'jquery';
let results;

export function DoctorList() {
  this.doctors = [];
}

DoctorList.prototype.searchDoc = function (query) {

  let docListTemp = [];

  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?location=45.523064,-122.676483,50&skip=0&limit=100&user_key=${process.env.exports.apiKey}&query=${query}`).then(function (response) {

    let docArray = response.data;

    docArray.forEach((doctor) => {

      let foundDoctor = new Doctor();
      if (doctor.practices[0].within_search_area === true) {

        if (doctor.profile.first_name !== undefined) {
          foundDoctor.firstName = doctor.profile.first_name;
        }
        if (doctor.profile.middle_name !== undefined) {
          foundDoctor.middleName = doctor.profile.middle_name;
        }
        if (doctor.profile.last_name !== undefined) {
          foundDoctor.lastName = doctor.profile.last_name;
        }
        if (doctor.practices[0].visit_address !== undefined) {
          foundDoctor.address = `${doctor.practices[0].visit_address.street}, ${doctor.practices[0].visit_address.city}. ${doctor.practices[0].visit_address.state} ${doctor.practices[0].visit_address.zip}`;
        }
        if (doctor.practices[0].phones !== undefined) {
          (doctor.practices[0].phones).forEach(function (phoneNumber) {
            if (phoneNumber.type === "landline") {
              foundDoctor.phone = phoneNumber.number;
            }
          });
        }
        if (doctor.practices[0].website !== undefined) {
          foundDoctor.website = doctor.practices[0].website;
        }
        if (doctor.practices[0].accepts_new_patients !== undefined) {
          foundDoctor.acceptsPatients = doctor.practices[0].accepts_new_patients;
        }

        docListTemp.push(foundDoctor);
      }
    });

    this.doctors = docListTemp.slice();
    console.log(this.doctors);
    results = this.doctors;

  }).fail(function (error) {
    $("#searchResult").append(`Error completing request: ${error}`);
  });
}

export function printList() {

  if (results.length < 1) {
    $("#searchResult").append(`I'm sorry, no doctors meet your search criteria. Please try another name or symptom.`);
  }

  results.forEach(function (doctor) {
    $("#searchResult").append(`<div class="card">Name: ${doctor.firstName} ${doctor.middleName} ${doctor.lastName}<br>Phone: ${doctor.phone}<br>Website: <a href="${doctor.website}">${doctor.website}</a>Office Address: ${doctor.address}<br>Doctor accepting new patients: ${doctor.acceptsPatients}</div>`);
  });

  results = "";
}

export function Doctor() {
  this.firstName = "";
  this.middleName = "";
  this.lastName = "";
  this.address = "";
  this.phone = "";
  this.website = "";
  this.acceptsPatients = "";
}