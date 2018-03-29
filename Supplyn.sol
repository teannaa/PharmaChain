pragma solidity ^0.4.18;
contract Manufacturer{
   
    struct mfgdetails {
        
        bytes mname;
        bytes productname;
        bytes rawmaterial;
        uint quantity;
        uint exprice;
    	uint msid;
    	int  stat; 
    }	
    mapping(uint => mfgdetails) nos;
   // address [] public mfgAccts;
    struct supplier {
	    uint suppid;
        bytes srawmaterial;
    	uint charge;
        
    }
    mapping(uint => supplier) snos;
    
    int constant STATUS_INITIATED = 0;
    int constant STATUS_SUBMITTED = 1;
    int constant STATUS_APPROVED  = 2;
    int constant STATUS_REJECTED  = 3;
    bytes   _name;
	bytes   _pname;
    bytes   _rname;
	uint     _quan;
	uint     _eprice;
    uint	  _chksid;
	int      _status;
    uint     id;
    uint     sid;
    address addr;
    
    
   //ADD MFG DETAILS//

    function setMfg(uint _mid,bytes _mname,bytes _productname,bytes _rawmaterial,uint _quantity,uint _exprice,uint _msid) public {
        mfgdetails storage ob = nos[_mid];
        id=_mid;
        ob.mname =_mname;
        ob.productname =_productname;
        ob.rawmaterial =_rawmaterial;
        ob.quantity =_quantity;
        ob.exprice =_exprice;
	    ob.msid =_msid;
	    ob.stat = STATUS_SUBMITTED;
        //mfgAccts.push(mfgAccts[_mid]) -1;
        addr=msg.sender;
    }
    
	
    //GET MFG DETAILS//
    
    function getMfg(uint _mid)  public returns (bytes,bytes,bytes,uint,uint,uint,int) {
        _name=nos[_mid].mname;
	    _pname=nos[_mid].productname;
        _rname=nos[_mid].rawmaterial;
        _quan=nos[_mid].quantity;
        _eprice=nos[_mid].exprice;
    	_chksid=nos[_mid].msid;
	    _status = nos[_mid].stat;
        return (nos[_mid].mname, nos[_mid].productname,nos[_mid].rawmaterial, nos[_mid].quantity,nos[_mid].exprice,nos[_mid].msid,nos[_mid].stat);
    }
    //ADD SUPPLIER DETAILS//////////////////
 
    function setSup(uint _suppid,bytes _srawmaterial,uint _charge) public {
        supplier storage  obj = snos[_suppid];
        sid = _suppid;
        obj.suppid=_suppid;
        obj.srawmaterial=_srawmaterial;
        obj.charge=_charge;
  
    }
    
    //TO RETURN NOTIFICATION FROM SUPPLIER TP MFG
    function  retstatus() public view returns(int) {
        return(nos[id].stat);
        
    }
    //TO AUTHENTICATE MFG
    modifier check{
	    if(msg.sender != addr && _chksid !=sid )
	    {
	    	mfgdetails storage ob = nos[id];
		    ob.stat = STATUS_REJECTED;
		    retstatus();
		
    	}
	    _;
	    
    }
    
  //APPROVAL/REJECTION OF MFG REQUEST
  
    function approvalreject() public check {

    	mfgdetails storage  ob = nos[id];
		ob.stat = STATUS_APPROVED;
		retstatus();
	
}
    
    
}
    
    
