sap.ui.jsview("addl_pay.LoginPage", {

      getControllerName : function() {
         return "addl_pay.LoginPage";
      },

      createContent : function(oController) {
    	  var oLabelLoginIO= new sap.m.Label("addl_pay.LoginLabelIO",{
    		  text : "IO number"
    	  });
    	  var oInputIO = new sap.m.Input("addl_pay.InputIO",{
    		  maxLength: 20,
      	  });
    	  var oLabelLoginPW= new sap.m.Label("addl_pay.LoginLabelPW",{
    		  text : "Password"
    	  });
    	  var oInputPW = new sap.m.Input("addl_pay.InputPW",{
    		  maxLength: 20,
      	  });
    	  var oLabelLoginCostCenter= new sap.m.Label("addl_pay.LoginLabelCostCenter",{
    		  text : "CostCenter"
    	  });
    	  var oInputCostCenter = new sap.m.Input("addl_pay.InputCostCenter",{
    		  maxLength: 20,
      	  });
    	    	  
    	  var oButtonLogin = new sap.m.Button("addl_pay.LoginButton", {text : "Login",});

    	  var oVbox = new sap.m.VBox("addl_pay.LoginFlexBox",{
    		  alignItems : sap.m.FlexAlignItems.Center,
    		  justifyContent : sap.m.FlexJustifyContent.Center ,
    		  fitContainer : true,
    		  items : [oLabelLoginIO,
    		           oInputIO,
    		           oLabelLoginPW,
    		           oInputPW,
    		           oLabelLoginCostCenter,
    		           oInputCostCenter,
    		           oButtonLogin
     		  ]
    	  });
    	  
    	  var oLogin = new sap.m.Page("addl_pay.LoginPage", {
    		  title : "Additional Payments Login",
    		  enableScrolling : false
    	  });
    	  oLogin.addContent(oVbox);
    	  return oLogin;
      }
});