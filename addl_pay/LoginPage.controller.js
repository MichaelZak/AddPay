sap.ui.controller("addl_pay.LoginPage", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
	   jQuery.sap.require("sap.m.MessageBox");
	   var oLoginButton = sap.ui.getCore().byId("addl_pay.LoginButton");
	   
	   oLoginButton.attachPress(function (){
		   // Get the IO
		   sInputIO = sap.ui.getCore().byId("addl_pay.InputIO").getValue();
		   oFilterRequestedBy = new sap.ui.model.Filter("RequestedBy", sap.ui.model.FilterOperator.EQ,	sInputIO);
		   
		   // Get costCenterSetID
		   sCostCenter = sap.ui.getCore().byId("addl_pay.InputCostCenter").getValue();
		   
		   
		   var app = sap.ui.getCore().byId("addl_pay.App");
		   var page1 = sap.ui.view({id:"Addl_Pay", viewName:"addl_pay.Addl_Pay", type:sap.ui.core.mvc.ViewType.JS});
	       app.addPage(page1);

		   app.to("Addl_Pay","flip");
		   
		   
	   });
	   
   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }

});