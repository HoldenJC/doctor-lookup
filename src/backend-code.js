import $ from 'jquery';

export function DoctorList() {
  this.doctors = [];
}

DoctorList.prototype.searchDoc = function (query) {

  let that = this;
  let docListTemp = [];

  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?location=45.523064,-122.676483,50&skip=0&limit=10&user_key=${process.env.exports.apiKey}&query=${query}`).then(function (response) {

    let docArray = response.data;
    console.log(docArray);


    docArray.forEach((doctor) => {

      let foundDoctor = new Doctor();
      if (doctor.profile.first_name !== undefined) {
        foundDoctor.firstName = doctor.profile.first_name;
      }
      if (doctor.profile.last_name !== undefined) {
        foundDoctor.lastName = doctor.profile.last_name;
      }
      if (doctor.practices[0].visit_address !== undefined){
        foundDoctor.address = `${doctor.practices[0].visit_address.street}, ${doctor.practices[0].visit_address.city}. ${doctor.practices[0].visit_address.state} ${doctor.practices[0].visit_address.zip}`;
      }
      if (doctor.practices[0].phones !== undefined){
        (doctor.practices[0].phones).forEach(function(phoneNumber){
          if(phoneNumber.type === "landline"){
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


      console.log(foundDoctor);

      docListTemp.push(foundDoctor);

      // docListTemp2 = docListTemp.slice();

      console.log(docListTemp);

    });

    console.log(docListTemp);
    that.doctors.push(docListTemp);
    console.log(that.doctors);

  }).fail(function (error) {
    console.log("Error completing request: " + error);
  });


}

export function Doctor() {
  this.firstName = "";
  this.lastName = "";
  this.address = "";
  this.phone = "";
  this.website = "";
  this.acceptsPatients = "";
}