sap.ui.controller("addl_pay.PendingReqInfo", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
	   jQuery.sap.require("sap.m.MessageBox");
	   var oButtonAccept = sap.ui.getCore().byId("addl_pay.AcceptReq");
	   var oButtonReject = sap.ui.getCore().byId("addl_pay.RejectReq");
  
	   var fnSubmitAccept = function(){
		   var oEntry = {};
		   oEntry.ActionedBy = sInputIO.toString();
		   oEntry.IsApproved = true;
		   oEntry.IsProcessed = true;

		   var oParams = {};
		   oParams.fnSuccess = function(){
			   sap.m.MessageBox.alert("Request is approved");};
		   oParams.fnError = function(){ 
			   sap.m.MessageBox.alert("Update failed" );};
		   oParams.bMerge = true;
		   oServiceModel.update("/ShiftPaymentRequests("+ sShiftReqID +")", oEntry, oParams);
	   };
	   var fnSubmitReject = function(){
		   var oEntry = {};
		   oEntry.ActionedBy = sInputIO.toString();
		   oEntry.IsApproved = false;
		   oEntry.IsProcessed = true;

		   var oParams = {};
		   oParams.fnSuccess = function(){
			   sap.m.MessageBox.alert("Request is declined");};
		   oParams.fnError = function(){ 
			   sap.m.MessageBox.alert("Update failed");};
		   oParams.bMerge = true;
		   oServiceModel.update("/ShiftPaymentRequests("+ sShiftReqID +")", oEntry, oParams);

	   };
	   
	   oButtonAccept.attachPress(fnSubmitAccept);
	   oButtonReject.attachPress(fnSubmitReject);
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