import $ from 'jquery';
let docListTemp = [];
let docListTemp2 = [];

export function DoctorList() {
  this.doctors = [];
}

DoctorList.prototype.addDoctor = function(doc){
  // debugger;
  this.doctors = doc;
  console.log(doc);
}

DoctorList.prototype.searchDoc = function(query){

  // debugger;
  let that = this;
  // let docListTemp = [];

  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?location=45.523064,-122.676483,50&skip=0&limit=10&user_key=${process.env.exports.apiKey}&query=${query}`).then(function(response){

    // let that = this;
    let docArray = response.data;
    // let foundDocTemp;
    console.log(docArray);
    

    docArray.forEach((doctor) => {
      // if(doctor.within_search_area === true){
        let foundDoctor = new Doctor();
        if(doctor.profile.first_name !== undefined){
          foundDoctor.firstName = doctor.profile.first_name;
        }
        if(doctor.profile.last_name !== undefined){
          foundDoctor.lastName = doctor.profile.last_name;
        }
        // foundDoctor.address = doctor.visit_address;
        // (doctor.phones).forEach(function(phoneNumber){
        //   if(phoneNumber.type === "landline"){
        //     foundDoctor.phone = phoneNumber.number;
        //   }
        // });
        if(doctor.website !== undefined){
          foundDoctor.website = doctor.website;
        }
        if(doctor.accepts_new_patients !== undefined){
          foundDoctor.acceptsPatients = doctor.accepts_new_patients;
        }
        

        console.log(foundDoctor);
         
        docListTemp.push(foundDoctor); 

        docListTemp2 = docListTemp.slice();
        
        console.log(docListTemp);

      // }
    });    

    console.log(docListTemp);
    that.doctors.push(docListTemp);
    console.log(that.doctors);
  
}).fail(function(error){
  console.log("Error completing request: " + error);
});


}

export function Doctor(){
  this.firstName = "";
  this.lastName = "";
  this.address = "";
  this.phone = "";
  this.website = "";
  this.acceptsPatients = "";
}


