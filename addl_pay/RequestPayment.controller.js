sap.ui.controller("addl_pay.RequestPayment", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
	   // Filter doesnt work, hack aURL
	   // Get CostCenterSetID
	   var sURLCostCentSetParam = ["$filter=CostCenterID eq '" + sCostCenter.toString()+"'"];
	   
	   var fnCostCenterReadSucc = function(oData, oResponse, aErrorResponses){
		   var aResult = oData.results;
		   sCostCenterSetID = aResult[0].CostCenterSetID; 
	   };
	   var fnCostCenterReadFail = function(oError){
		   sap.m.MessageBox.alert("Error reading. Reason was\n" + oError.response.body);
	   };
	   oServiceModel.read("/CostCenters",null,sURLCostCentSetParam,false, fnCostCenterReadSucc, fnCostCenterReadFail);
	   
	   // Get ShiftTypes assigned to costCenter
	   var aShiftTypes = new Array();
	   
	   var sUrlCostCentSetIDParam = ["$filter=CostCenterSetID eq "+sCostCenterSetID];
	   
	   var fnCostCenterSetSucc = function(oData, oResponse, aErrorResponses){
		   var aResults = oData.results;
		   for(var i=0; i<aResults.length; i++){
			   aShiftTypes[i] = aResults[i].ShiftTypeID ;
		   }
	   };

	   oServiceModel.read("/ShiftCostCenterMappings", null,sUrlCostCentSetIDParam, false, fnCostCenterSetSucc,fnCostCenterReadFail);
	   
	   // Get ShiftType Text
	   var sTemp ="";
	   for(var i = 0;i<aShiftTypes.length;i++){
		   if(i==0)
			   sTemp += "ShiftTypeID eq " + aShiftTypes[i];
		   else
			   sTemp += " or ShiftTypeID eq " + aShiftTypes[i];
	   }
	   var sUrlShiftTypes = ["$filter="+sTemp];
	   
	   var aShiftValues = new Array();
	   var fnShiftTypeReadSucc = function(oData, oResponse, aErrorResponses){
		   var aResults = oData.results;
		   for(var i =0;i<aResults.length;i++){
			   var oShiftType = {
					value : aResults[i].ShiftTypeText,
					key	: aResults[i].ShiftTypeID			   	
			   };
			   aShiftValues.push(oShiftType);
		   }
		   
	   };
	   
	   oServiceModel.read("/ShiftTypes", null,sUrlShiftTypes, false, fnShiftTypeReadSucc,fnCostCenterReadFail);
	   
	   // Bind values to select input
	   var oPaymentTypeSelect = sap.ui.getCore().byId("addl_pay.PaymentTypeSelect");
	   for(var i = 0; i<aShiftValues.length;i++){
		   oPaymentTypeSelect.addItem(
				   new sap.ui.core.Item("SelectShiftTypeItem"+i,{
					   text : aShiftValues[i].value,
					   key	: aShiftValues[i].key
				   })
		   );
	   }
	   // Set default item
	   oPaymentTypeSelect.setSelectedItemId("SelectShiftTypeItem0");
	  
	   var oPaymentOptionSelect = sap.ui.getCore().byId("addl_pay.RateSelect");
	   var iShiftType;
	   var fnGetPaymentOptions = function(){
		   
		   var sID = oPaymentTypeSelect.getSelectedItemId();
		   
		   var aItems = oPaymentTypeSelect.getItems();
		   for(var i =0;i<aItems.length;i++){
			   if(sID === aItems[i].getId())
				   iShiftType = aItems[i].getKey();
		   }
		   
		   var oFilterPaymentOption = new sap.ui.model.Filter("ShiftTypeID", sap.ui.model.FilterOperator.EQ, iShiftType);
		   var oFilterPaymentOptionIsActive = new sap.ui.model.Filter("IsActive", sap.ui.model.FilterOperator.EQ, "true");
		  
		   
		   oPaymentOptionSelect.setModel(oServiceModel);
		   oPaymentOptionSelect.bindAggregation("items",{
			   path: "/PaymentOptions",
			   template: new sap.ui.core.Item({
					   text : "{PaymentOptionDesc}",
					   key : "{PaymentOptionID}"
			   }),
			   filters : [oFilterPaymentOption,oFilterPaymentOptionIsActive],
			   
		   });
	   };
	   
	   fnGetPaymentOptions();
	   
	   oPaymentTypeSelect.attachChange(function(){
		   fnGetPaymentOptions();		 
	   });

	   
	   
	   // Set up events for day selection
	   var oDaysSelect = sap.ui.getCore().byId("addl_pay.DateInput");
	   var oListSelectedDays = sap.ui.getCore().byId("addl_pay.SelectedDays");
	   oDaysSelect.attachChange(function(){
		   oListSelectedDays.addItem(
				   new sap.m.DisplayListItem({
					   label : oDaysSelect.getDateValue(),
					   //value : get dayFraction
				   })
				   
		   );
	   });
	   
	   jQuery.sap.require("sap.m.MessageBox");
	   var fnCreateSuccess = function(){
		   sap.m.MessageBox.alert("Request is declined");
	   };
	   var fnCreateError = function(){ 
		   sap.m.MessageBox.alert("Update failed");
	   };
	  // Post request
	  var oButtonRequest =  sap.ui.getCore().byId("addl_pay.SubmitButton");
	  oButtonRequest.attachPress(function (){
		  
		   var sID = oPaymentOptionSelect.getSelectedItemId();
		   var iPaymentOption;
		   var aItems = oPaymentOptionSelect.getItems();
		   for(var i =0;i<aItems.length;i++){
			   
			   if(sID === aItems[i].getId())
				   iPaymentOption = aItems[i].getKey();
		   }
		  
		  var oEntry = {};
		  oEntry.CostCenterID = sCostCenter;
		  oEntry.ShiftTypeID = iShiftType;
		  oEntry.PaymentOptionID = iPaymentOption;
		  oEntry.RequestedBy = sInputIO;
		  oEntry.FirstName = "test",
		  oEntry.LastName = "user",
		  oEntry.IsProcessed = false;
		  oEntry.IsApproved = false;
		  oServiceModel.create("/ShiftPaymentRequests",oEntry,null,fnCreateSuccess,fnCreateError);
		  
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