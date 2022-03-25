var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://dbUser:dbPassword@senecaweb.njfs1.mongodb.net/web322_week8?retryWrites=true&w=majority");


// define the company schema
var companySchema = new Schema({
    "companyName": {
      type: String,
      unique: true
    },
    "address": String,
    "phone": String,
    "employeeCount": {
      "type": Number,
      "default": 0
    },
    "country": String
  });
  var Company = mongoose.model("web322_companies", companySchema);

  // create a new company
var kwikEMart = new Company({
    companyName: "The Kwik-E-Mart",
    address: "Springfield",
    phone: "212-842-4923",
    employeeCount: 3,
    country: "U.S.A"
  });
  
  var walmart = new Company({
    companyName: "Walmart",
    address: "Phoenix",
    phone: "382-832-1482",
    employeeCount: 70,
    country: "U.S.A"
  });

  var google = new Company({
    companyName: "Google",
    address: "San Antonio",
    phone: "353-942-4902",
    employeeCount: 137,
    country: "U.S.A"
  });
  
  
  Company.deleteMany({companyName: "The Kwik-E-Mart"})
    .exec()
    .then(() => {
        console.log("removed company");
    })
    .catch((err) => {
        console.log(err);
  });

  Company.deleteMany({companyName: "Walmart"})
    .exec()
    .then(() => {
        console.log("removed company");
    })
    .catch((err) => {
        console.log(err);
  });

  Company.deleteMany({companyName: "Google"})
    .exec()
    .then(() => {
        console.log("removed company");
    })
    .catch((err) => {
        console.log(err);
  });
  
  // save the company
  kwikEMart.save((err) => {
    if(err) {
      console.log(`There was an error saving the Kwik-E-Mart company: ${err}`);
    } else {
      console.log("The Kwik-E-Mart company was saved to the web322_companies collection");
    }
    Company.find({ companyName: "The Kwik-E-Mart" })
    .exec()
    .then((company) => {
      if(!company) {
        console.log("No company could be found");
      } else {
        console.log(company);
      }
      // exit the program after saving
      process.exit();
    })
    .catch((err) => {
      console.log(`There was an error: ${err}`);
    });
  });
  
  walmart.save((err) => {
    if(err) {
      console.log(`There was an error saving Walmart company: ${err}`);
    } else {
      console.log("Walmart company was saved to the web322_companies collection");
    }
    Company.find({ companyName: "Walmart" })
    .exec()
    .then((company) => {
      if(!company) {
        console.log("No company could be found");
      } else {
        console.log(company);
      }
      // exit the program after saving
      process.exit();
    })
    .catch((err) => {
      console.log(`There was an error: ${err}`);
    });
  });

  google.save((err) => {
    if(err) {
      console.log(`There was an error saving Google company: ${err}`);
    } else {
      console.log("Google company was saved to the web322_companies collection");
    }
    Company.find({ companyName: "Google" })
    .exec()
    .then((company) => {
      if(!company) {
        console.log("No company could be found");
      } else {
        console.log(company);
      }
      // exit the program after saving
      process.exit();
    })
    .catch((err) => {
      console.log(`There was an error: ${err}`);
    });
  });