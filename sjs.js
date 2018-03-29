<script>

        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
  
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
// DEFAULT ACCOUNT
	web3.eth.defaultAccount = web3.eth.accounts[0];
//ABI DEFINITION
	var mfgsupContract=web3.eth.contract([{"constant":false,"inputs":[{"name":"_mid","type":"uint256"},{"name":"_mname","type":"string"},{"name":"_productname","type":"string"},{"name":"_rawmaterial","type":"string"},{"name":"_quantity","type":"uint256"},{"name":"_exprice","type":"uint256"},{"name":"_msid","type":"uint256"}],"name":"setMfg","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"approvalreject","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_suppid","type":"uint256"},{"name":"_srawmaterial","type":"string"},{"name":"_charge","type":"uint256"}],"name":"setSup","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"retstatus","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_mid","type":"uint256"}],"name":"getMfg","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"int256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"mfgAccts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]);
//SETTING CONTRACT ADDRESS

var mfgsupAddress = mfgsupContract.at('0x2ffc75f8f737a308a9ba678187a97c6395d2f445');
console.log(mfgsuppAddress);

//PASSING VALUES TO setMfg FUNCTION 

$("#request").click(function(){
            mfgsupAddress.setMfg($("#mid").val(), $("#mname").val(),$("#productname").val(), $("#rawmaterial").val(),$("#quantity").val(), $("#exprice").val(),$("#msid").val());
        });
// Result of submiting notification fn

$("#notify").click(function() {
		
	mfgsupAddress.getMfg(function(error, result){
            if(!error)
                {
                    $("#").html('mname : '+result[0]+'productname : '+result[1]+'rawmaterial : '+result[2]+'quantity : '+result[3]+ 'exprice : '+result[4]+'msid : '+result[5]);
                    console.log(result);
                }
            else
                console.error(error);
        });

var feedback;
//approval from supp side

$("#approve").click(function() {
		
	mfgsupAddress.approvalreject(function(error, result){
            if(!error)
                {
                    feedback=result[0];
                }
            else
                console.error(error);
        });


//reading notification by mfg

function notifymfg() {
    	if(feedback== '2')
	{
		alert("STATUS APPROVED");
	}
	else if(feedback== '3')
	{
		alert("STATUS REJECTED");
	}
	else
	{
		alert("NO NOTIFICATIONS");
	}

}
    </script>
