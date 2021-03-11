pragma solidity >=0.4.22<0.7.1;
//A smart contract for car deals is written.
contract Contract_Car_Deal{
    // structure deals
    
    struct person{
        uint256 NationalCode;
        string fName;
        string lName;
        address payable person;
        bool exist;
    }
    
    struct Car{
        string System;
        uint256 ChassisNumber;
        uint256 EngineNumber;
        uint16 Model;
        string color;
        bool ex;
    }
    
    
    enum status {
        NotStarted, Paid, Started, Disengage, Do, Ended, Suspended
    }

    struct Deal{
        uint256 idcode;
        uint256 NationalCodeBuyer;
        uint256 NationalCodeSeller;
        uint256 NationalCodeRegistrar;
        uint256 ChassisNumber;
        uint256  Amount;
        uint256  Deposit;
        uint256  Disengage;
        uint256  StartDate;
        uint16  DayDeposit;
        uint16  DayDisengage;
        status DealStatus;
    }
    
    mapping (uint256 => person) Buyer;
    mapping (uint256 => person) Seller;
    mapping (uint256 => person) Registrar;
    mapping (uint256 => Car) Cars;
    mapping (uint256=> Deal) Deals;
   
    
    event user(uint256 NationalCode, string fName, string lName, address person);
    
    event CarSt(string System, uint256 ChassisNumber, uint256 EngineNumber,uint16 Model,string color);
    
    event DealSt(uint256 NationalCodeBuyer, uint256 NationalCodeSeller, uint256 ChassisNumber, uint256 Amount);
    
    constructor()public{

    }
   // Add Buyers to blockchain
    function SetBuyer (uint256 _NationalCodeBuyer, string memory _fName, string memory _lName, address payable _person)  public {
        if(Buyer [_NationalCodeBuyer].exist==false){
        Buyer [_NationalCodeBuyer] = person (_NationalCodeBuyer,_fName,_lName,_person,true);
         emit user(Buyer [_NationalCodeBuyer].NationalCode,Buyer [_NationalCodeBuyer].fName,Buyer [_NationalCodeBuyer].lName,Buyer [_NationalCodeBuyer].person);
        }
        
    }
    // Add Sellers to blockchain
     function SetSeller (uint256  _NationalCodeSeller, string memory _fName, string memory _lName, address payable _person)  public {
        if(Seller [_NationalCodeSeller].exist==false){
        Seller [_NationalCodeSeller] = person (_NationalCodeSeller,_fName,_lName,_person,true);
        emit user(Seller [_NationalCodeSeller].NationalCode,Seller [_NationalCodeSeller].fName,Seller [_NationalCodeSeller].lName,Seller [_NationalCodeSeller].person);
        } 
    }
    // Add Registrars to blockchain
    function SetRegistrar (uint256 _NationalCodeRegistrar, string memory _fName, string memory _lName, address payable _person)  public {
        if(Registrar [_NationalCodeRegistrar].exist==false){
        Registrar [_NationalCodeRegistrar] = person (_NationalCodeRegistrar,_fName,_lName,_person,true);
          emit user(Registrar [_NationalCodeRegistrar].NationalCode,Registrar [_NationalCodeRegistrar].fName,Registrar [_NationalCodeRegistrar].lName,Registrar [_NationalCodeRegistrar].person);
        } 
    }
    // Add Cars to blockchain
    function SetCar(string memory _System, uint256  _ChassisNumber, uint256  _EngineNumber, uint16 _Model ,string memory _color ) public {
        if(Cars[_ChassisNumber].ex==false){
        Cars [_ChassisNumber] = Car (_System,_ChassisNumber,_EngineNumber,_Model,_color,true);
        emit CarSt(Cars [_ChassisNumber].System,Cars [_ChassisNumber].ChassisNumber,Cars [_ChassisNumber].EngineNumber,Cars [_ChassisNumber].Model,Cars [_ChassisNumber].color);
        }
    }
    // Add a CarDeal to the blockchain
    function CarDeal (uint256 _idcode, uint256 _NationalCodeBuyer,uint256 _NationalCodeSeller,uint256 _NationalCodeRegistrar, uint256 _ChassisNumber, uint256 _Amount, uint256 _Deposit, uint256 _Disengage, uint16 _DayDeposit, uint16 _DayDisengage) public {
     require(Buyer [_NationalCodeBuyer].exist==true,"1");
     require(Seller [_NationalCodeSeller].exist==true,"2");
     require(Registrar [_NationalCodeRegistrar].exist==true,"3");
     require(Cars [_ChassisNumber].ex==true,"4");
     Deals [_idcode] = Deal (_idcode, _NationalCodeBuyer,_NationalCodeSeller,_NationalCodeRegistrar, _ChassisNumber, _Amount*(10**6), _Deposit*(10**6), _Disengage*(10**6), block.timestamp, _DayDeposit, _DayDisengage, status.NotStarted );
     emit DealSt(Deals[_idcode].NationalCodeBuyer, Deals[_idcode].NationalCodeSeller,Deals[_idcode].ChassisNumber,Deals[_idcode].Amount); 
  }
    
     function Pay(uint256 _id) public payable {
        uint256 National = Deals [_id].NationalCodeBuyer;
        require(msg.sender == Buyer[National].person ,"preamble");
        require(Deals [_id].DealStatus == status.NotStarted,"preamble" );
        require(Deals [_id].Amount==msg.value ,"preamble");   
        Deals[_id].DealStatus = status.Paid;
    }
    
    function Disengage(uint256 _id) public payable {
        uint256 National = Deals [_id].NationalCodeSeller;
        require(msg.sender == Seller[National].person,"preamble");
        require(Deals[_id].DealStatus == status.Paid,"preamble");
        require(Deals [_id].Disengage==msg.value,"preamble");
        Deals[_id].DealStatus = status.Started;
    }
    
    function Disengage_Buyer (uint256 _id) public payable {
         uint256 National = Deals [_id].NationalCodeBuyer;
        require(msg.sender == Buyer[National].person,"preamble");
        require(Deals [_id].DealStatus == status.Started,"preamble");
        if(block.timestamp <= (Deals [_id].DayDisengage*84600)+Deals [_id].StartDate){
             uint256 NationalS = Deals [_id].NationalCodeSeller;
             uint256 NationalB = Deals [_id].NationalCodeBuyer;
             Seller[NationalS].person.transfer(Deals[_id].Disengage*2);
             Buyer[NationalB].person.transfer(Deals [_id].Amount-Deals[_id].Disengage);
             Deals[_id].DealStatus = status.Disengage;  
        }
    }
    
    function Disengage_Seller (uint256 _id) public payable {
         uint256 National = Deals [_id].NationalCodeSeller;
        require(msg.sender == Seller[National].person,"preamble");
        require(Deals [_id].DealStatus == status.Started ,"preamble");
        if(block.timestamp <= (Deals [_id].DayDisengage*84600)+Deals [_id].StartDate){
             uint256 NationalB = Deals [_id].NationalCodeBuyer;
             Buyer[NationalB].person.transfer(Deals [_id].Amount+Deals[_id].Disengage);
             Deals[_id].DealStatus = status.Disengage;  
        }
    } 
    // The parties to the transaction still agree to the transaction after an agreed period for termination.
    function Consensual (uint256 _id) public payable {
        require(Deals [_id].DealStatus == status.Started ,"preamble");
        if(block.timestamp > (Deals [_id].DayDisengage*84600)+Deals [_id].StartDate){
             uint256 NationalS = Deals [_id].NationalCodeSeller;
             Seller[NationalS].person.transfer(Deals [_id].Amount+Deals[_id].Disengage-Deals [_id].Deposit);  
              Deals[_id].DealStatus = status.Do;
        }
    }
    
    function Registration (uint256 _id, bool verify) public payable {
        uint256 National = Deals [_id].NationalCodeRegistrar;
        require(msg.sender == Registrar[National].person ,"preamble");
        require(Deals [_id].DealStatus == status.Do ,"preamble");
        if(block.timestamp > (Deals [_id].DayDeposit*84600)+Deals [_id].StartDate){
             if(verify == true){
                 uint256 NationalS = Deals [_id].NationalCodeSeller;
                 Seller[NationalS].person.transfer(Deals [_id].Deposit);  
                 Deals[_id].DealStatus = status.Ended;  
             }else{
                Deals[_id].DealStatus = status.Suspended;  
             }
        }
    }
    
    function Problem_Solving (uint256 _id, bool verify) public payable {
        uint256 National = Deals [_id].NationalCodeRegistrar;
        require(msg.sender == Registrar[National].person ,"preamble");
        require(Deals [_id].DealStatus == status.Suspended ,"preamble");
             if(verify == true){
                 uint256 NationalS = Deals [_id].NationalCodeSeller;
                 Seller[NationalS].person.transfer(Deals [_id].Deposit);  
                 Deals[_id].DealStatus = status.Ended;    
             }
    }
    
    function Deals_Status (uint256 _id) view public returns(status st,uint256 NationalB,uint256 NationalS,uint256 Chassis,uint256 Amo,uint256 StarD){

        return (Deals [_id].DealStatus,Deals [_id].NationalCodeBuyer,Deals [_id].NationalCodeSeller,Deals [_id].ChassisNumber,Deals [_id].Amount,Deals [_id].StartDate);
    }
    
     function se (uint256 _id) view public returns(string memory){
     return Seller[_id].fName;
    }
    
    function bu (uint256 _id) view public returns(string memory){
     return Buyer[_id].fName;
    }
    
    function re (uint256 _id) view public returns(string memory){
     return Registrar[_id].fName;
    }
    
    function ca (uint256 _id) view public returns(string memory){
     return Cars[_id].System;
    }

}
