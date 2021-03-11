import React, { Component } from "react";
import Swal from "sweetalert2";

import Utils from "../../utils";
import "./Car.scss";

/// Add your contract address here//////////////////////////////
const contractAddress = "TYJwxyoEduSEmBsm4E6BQtyipdxTyreMSE";
///////////////////////////////////////////////////////////////

export default class ECommerce extends Component {
  constructor(props) {
    super(props);

    this.Set = this.Set.bind(this);
	this.SetCar = this.SetCar.bind(this);
	this.CarDeal = this.CarDeal.bind(this);
	 this.startuser = this.startuser.bind(this);
	 this.startCar = this.startCar.bind(this);
	 this.startDeal = this.startDeal.bind(this);
	 this.CarDeal=this.CarDeal.bind(this);
	 this.search=this.search.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
	this.startuser();
	this.startCar();
	this.startDeal();
  }
  Set(){ 
  var fName =document.getElementById("fNameB").value;
  var lName =document.getElementById("lNameB").value;
  var Address =document.getElementById("AddressB").value;
  var NationalCode =document.getElementById("NationalCodeB").value;
  var user =document.getElementById("user").value;
  if (user=="Buyer"){
	  Utils.contract.SetBuyer(NationalCode,fName,lName,Address).send({  
       },function (err, result) {
          if (err) {Swal.fire({title:`${err}`,type: "error"})}
		  }); 

   }else if(user=="Seller"){
	  Utils.contract.SetSeller(NationalCode,fName,lName,Address).send({  
       },function (err, result) {
          if (err) {Swal.fire({title:`${err}`,type: "error"})}});  	
  }
  else if(user=="Register"){
	  Utils.contract.SetRegistrar(NationalCode,fName,lName,Address).send({  
       },function (err, result) {
          if (err) {Swal.fire({title:`${err}`,type: "error"})}
		  });
  }		   
  }

  SetCar(){  
  var System =document.getElementById("SystemC").value;
  var ChassisNumberC1 =document.getElementById("ChassisNumberC").value;
  var EngineNumber1 =document.getElementById("EngineNumberC").value;
  var Model =document.getElementById("ModelC").value;
  var color =document.getElementById("color").value;
   Utils.contract.SetCar(System,ChassisNumberC1,EngineNumber1,Model,color).send({  
   },function (err, result) {
  if (err) {Swal.fire({title: `${err}.`,type: "error"})}
   });  
  }
    
   CarDeal(){
	var Id =document.getElementById("IDD").value;
    var ChassisNumber =document.getElementById("ChassisNumberD").value;	
	var NationalCodeBD =document.getElementById("NationalCodeBD").value;
    var NationalCodeSD =document.getElementById("NationalCodeSD").value;
    var NationalCodeRD =document.getElementById("NationalCodeRD").value;
    var AmountD =document.getElementById("AmountD").value;
    var DepositD =document.getElementById("DepositD").value;
	var DisengageD =document.getElementById("DisengageD").value;
    var DayDepositD =document.getElementById("DayDepositD").value;
    var DayDisengageD =document.getElementById("DayDisengageD").value;
		  Utils.contract.CarDeal(Id,NationalCodeBD,NationalCodeSD,NationalCodeRD,ChassisNumber,AmountD,DepositD,DisengageD,DayDepositD,DayDisengageD).send({  
       },function (err, result) {
          if (err) {Swal.fire({title:`${err}`,type: "error"})}});
   }

   startuser(){
	    Utils.contract.user().watch((err, { result }) => {
      if (err) return console.log("Failed to bind event listener", err);
      if (result) {
        Swal.fire({
          title: `User profile`,
          html:
            `<p>NationalCode: ${result.NationalCode}</p>` + `<p>First Name: ${result.fName}</p>`+ `<p>Last Name: ${result.lName}</p>`+ `<p>Address: ${result.person}</p>`,
          type: "success"
        });
      }
    });

   }
   startCar(){	 
	 Utils.contract.CarSt().watch((err, { result }) => {
      if (err) return console.log("Failed to bind event listener", err);
      if (result) {
        Swal.fire({
          title: `Car profile`,
          html:
            `<p>${result.System +"-"+ result.Model+"-"+result.color}</p>` + `<p>Chassis Number: ${result.ChassisNumber}</p>`+ `<p>Engine Number: ${result.EngineNumber}</p>`,
          type: "success"
        });
      }
    });
   }
   startDeal(){	   	
	 Utils.contract.DealSt().watch((err, { result }) => {
      if (err) return console.log("Failed to bind event listener", err);
      if (result) {
        Swal.fire({
          title: `Deal profile`,
          html:
            `<p>Chassis Number: ${result.ChassisNumber}</p>` + `<p>Buyer: ${result.NationalCodeBuyer}</p>`+ `<p>Seller: ${result.NationalCodeSeller}</p>` + `<p>Amount: ${result.Amount}</p>`,
          type: "success"
        });
      }
    }); 
   }
   Pay(){
  var IDDeal =document.getElementById("IDDeal").value;
  var mablaj =document.getElementById("mablaj").value;
   Utils.contract.Pay(IDDeal).send({
    callValue:mablaj* 1000000
   },function (err, result) {
  if (err) {Swal.fire({title: `${err}.`,type: "error"})}
   });  
   }
   Disengage(){
	var IDDealD =document.getElementById("IDDealD").value;
  var mablajD =document.getElementById("mablajD").value;
   Utils.contract.Disengage(IDDealD).send({
    callValue:mablajD* 1000000
   },function (err, result) {
  if (err) {Swal.fire({title: `${err}.`,type: "error"})}
   });   
   }
   DisengageBuyer(){
   var IDDealByer =document.getElementById("IDDealByer").value;
   Utils.contract.Disengage_Buyer(IDDealByer).send({},function (err, result) {
  if (err) {Swal.fire({title: `${err}.`,type: "error"})}
   });
   }
   DisengageSeller(){
	   var IDDealseler =document.getElementById("IDDealseler").value;
   Utils.contract.Disengage_Seller(IDDealseler).send({},function (err, result) {
  if (err) {Swal.fire({title: `${err}.`,type: "error"})}
   });   
   }
   Agreement(){
	   var IDDealAgre =document.getElementById("IDDealAgre").value;
   Utils.contract.Consensual(IDDealAgre).send({},function (err, result) {
  if (err) {Swal.fire({title: `${err}.`,type: "error"})}
   });   
   }
   Registration(){
	   	var IDDealRE =document.getElementById("IDDealRE").value;
		var Opinion =document.getElementById("bool").value;
   Utils.contract.Registration(IDDealRE,Opinion).send({},function (err, result) {
  if (err) {Swal.fire({title: `${err}.`,type: "error"})}
   });
   }
   ProblemSolving(){
		var IDDealPR =document.getElementById("IDDealPR").value;
		var OpinionPR =document.getElementById("boo").value;
   Utils.contract.Problem_Solving(IDDealPR,OpinionPR).send({},function (err, result) {
  if (err) {Swal.fire({title: `${err}.`,type: "error"})}
   });   
   }

      search(){	
	  
      var IDDealSearch =document.getElementById("IDDealSearch").value;	  
	  Utils.contract.Deals_Status(IDDealSearch).call((err,result) => {
		 
      if (err) return console.log("Failed to bind event listener", err);
      if (result) {
     var state = ["NotStarted", "Paid", "Started", "Disengage", "Do", "Ended", "Suspended"];		  
        document.getElementById("st").value =state[result.st];
		document.getElementById("NationalB").value =result.NationalB;
		document.getElementById("NationalS").value =result.NationalS;
		document.getElementById("Chassis").value =result.Chassis;
		document.getElementById("Amo").value =result.Amo/10**6 +"TRX";
		
      }
    }); 
   }
   
   render() {
    return (
	
	<div  className="div0">
	
    <a name="1"></a>
	
	<div className="div2">
	        <p><b>Step1:</b> Add Profile Buyer, Seller and Register</p><hr/>
				 <label >First Name:</label><br/>
                 <input  placeholder="Enter First Name" id="fNameB"/><br/>
				 <label >Last Name:</label><br/>
                 <input placeholder="Enter Last Name" id="lNameB"/><br/>
				 <label>National Code:</label><br/>
                 <input placeholder="Enter National Code" id="NationalCodeB"/><br/>
				 <label>Address:</label><br/>
				 <input placeholder="Enter Address" id="AddressB"/><br/>
				 <label>User:</label><br/>
				 <select id ="user" name="user">
                      <option value="Buyer">Buyer</option>
                      <option value="Seller">Seller</option>
                      <option value="Register">Register</option>
                 </select>
				 <button type="submit" onClick={this.Set}>Register</button>
				             
   </div>
   <div className="div1">
	        <p><b>Step2:</b> Add Profile Car</p><hr/>
				 <label >System:</label><br/>
                 <input placeholder="Enter System Car" id="SystemC"/><br/>
				 <label >Chassis Number:</label><br/>
                 <input placeholder="Enter Chassis Number Car" id="ChassisNumberC"/><br/>
				 <label>Engine Number:</label><br/>
                 <input placeholder="Enter Engine Number Car" id="EngineNumberC"/><br/>
				 <label>Model:</label><br/>
				 <input placeholder="Enter Model Car" id="ModelC"/><br/>
				 <label>Color:</label><br/>

				 <select id ="color" name="color">
                      <option value="white">White</option>
                      <option value="Black">Black</option>
                      <option value="Silver">Silver</option>
                 </select>
				 <button type="submit" onClick={this.SetCar}>Register</button>		             
   </div>
   <br/>
        
         <div className="div4">
				 <a name="2"></a><p><b>Step3:</b> Add Deal Details</p><hr/>
				 <label >ID Deal:</label>
                 <input placeholder="Enter Id Deal" id="IDD"/>
				 <label >Chassis Number:</label>
                 <input placeholder="Enter Chassis Number Deal" id="ChassisNumberD"/>
				 <label>National Code Buyer:</label>
                 <input placeholder="Enter National Code Buyer Deal" id="NationalCodeBD"/>
				 <label>National Code Seller:</label>
                 <input placeholder="Enter National Code Seller Deal" id="NationalCodeSD"/>
				 <label>National Code Registrars:</label>
                 <input placeholder="Enter National Code Register Deal" id="NationalCodeRD"/>
				 <label>Amount:</label>
                 <input placeholder="Enter Amount Deal TRX" id="AmountD"/>
				 <label>Deposit:</label>
                 <input placeholder="Enter Deposit Deal TRX" id="DepositD"/>
				 <label>Disengage:</label>
                 <input placeholder="Enter Disengage Deal TRX" id="DisengageD"/>
				 <label>Day Deposit:</label>
                 <input placeholder="Enter Day Deposit Deal" id="DayDepositD"/>
				 <label>Day Disengage:</label>
                 <input placeholder="Enter Day Disengage Deal" id="DayDisengageD"/>
                 <button onClick={this.CarDeal}>Register</button>					 
   </div>
  
    	<div className="div4">

				 <a name="3"></a><p><b>Step4:</b>Operation</p><hr/>
				 <p>Payment of the specified amount of the Deal by the buyer</p>
				 <label >ID Deal:</label>
                 <input placeholder="Enter ID Deal" id="IDDeal"/>
				 <label>Amount:</label>
                 <input placeholder="Enter Value TRX" id="mablaj"/>
				 <button onClick={this.Pay}>Pay Buyer</button>
				 <hr/>
				 
				 <p> Payment of the amount set for the Disengage of the Deal by the seller</p>
				 <label >ID Deal:</label>
                 <input placeholder="Enter ID Deal" id="IDDealD"/>
				 <label>Amount:</label>
                 <input placeholder="Enter Value TRX" id="mablajD"/>
                 <button onClick={this.Disengage}>Pay Seller</button>
				 <a name="4"></a><hr/>
				 
				 <p>Disengage of the Deal by the buyer</p>
				 <label >ID Deal:</label>
                 <input placeholder="Enter ID Deal" id="IDDealByer"/>
                 <button onClick={this.DisengageBuyer}>Disengage Buyer</button>
                 <hr/>				 
				 
				 <p>Disengage of the Deal by the seller</p>
				 <label >ID Deal:</label>
                 <input placeholder="Enter ID Deal" id="IDDealseler"/>
                 <button onClick={this.DisengageSeller}>Disengage Seller</button>
				 <a name="5"></a><hr/>
				 
				 <p> Agreement of the parties to the Deal after the expiration of the deadline for Disengage of the Deal</p>
				 <label >ID Deal:</label>
                 <input placeholder="Enter ID Deal" id="IDDealAgre"/>
				 <button onClick={this.Agreement}>Agreement</button>
                 <a name="6"></a><hr/>
				 
				 <p>Submit the document after the agreed time to set the document</p>
				 <label >ID Deal:</label>
                 <input placeholder="Enter ID Deal" id="IDDealRE"/>
				 <label>Comment:</label>
				 <select id ="bool" name="bool">
                      <option value="true">True</option>
                      <option value="false">False</option>
                 </select>				 
                 <button onClick={this.Registration}>Registration</button>
				 <hr/>
				 
				 <p>Problem setting document</p>
				 <label >ID Deal:</label>
                 <input placeholder="Enter ID Deal" id="IDDealPR"/>
				 <label>Comment:</label>
				 <select id ="boo" name="boo">
                      <option value="true">True</option>
                      <option value="false">False</option>
                 </select>					 
                 <button onClick={this.ProblemSolving}>Problem Solving</button>	
                 <hr/>
                  
				 <a name="0"></a> <p>Show Deal position</p>
				 <label >ID Deal:</label>
                 <input placeholder="Enter ID Deal" id="IDDealSh"/>
				 <button onClick={this.ProblemSolving}>Problem Solving</button>	
				 <hr/>
				 <p>Search Deal</p>
				 <label >ID Deal:</label>
                 <input placeholder="Enter ID Deal" id="IDDealSearch"/>
				 <button onClick={this.search}>Search</button><br/><br/>
				 <label >National Code Buyer:</label>
                 <input placeholder="National Code Buyer" id="NationalB" readonly />
				 <label >National Code Seller:</label>
                 <input placeholder="National Code Seller" id="NationalS" readonly />
				 <label >Chassis Number Car:</label>
				 <input placeholder="Chassis Number Car" id="Chassis" readonly />
				 <label >Amount:</label>
                 <input placeholder="Amount" id="Amo" readonly />
				 <label >Deal Status:</label>
                 <input placeholder="Deal Status" id="st" readonly />					 
                 				 
      </div>
	  
	   <div className="btfother">	  
          <div className="infor">
            &copy; Design:Farzad Azizi
          </div>
     </div>

   

   </div>
    );
  }
 
}
