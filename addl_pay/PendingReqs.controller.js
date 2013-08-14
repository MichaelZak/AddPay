sap.ui.controller("addl_pay.PendingReqs", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
	var oGetReqs = sap.ui.getCore().byId("addl_pay.GetPenReqs");
	   oGetReqs.attachPress(function(){
		  var oFilterIsProcessed = new sap.ui.model.Filter("IsProcessed ", sap.ui.model.FilterOperator.EQ,false);
		  var oFilterIO = new sap.ui.model.Filter("CostCenterID", sap.ui.model.FilterOperator.EQ,"0148030200");// CHANGE IN FUTURE
   
		   // Implement a validation to make sure 
		   // the user is an authorizer
		   getPendingRequests(oFilterIsProcessed,oFilterIO);
		   
	   });	   
 
	   var getPendingRequests = function(oFilterIsProcessed,oFilterIO){
		   var oGetReqsList = sap.ui.getCore().byId("addl_pay.PenReqsList");
			
		   oGetReqsList.setModel(oServiceModel);
		   oGetReqsList.bindAggregation("items",{
			   path: "/ShiftPaymentRequests",
			   template: new sap.m.CustomListItem({
					   type : sap.m.ListType.Navigation,
					   content : [
					              new sap.m.Text({
					            	  text : "{FirstName}"
					              }),
					              new sap.m.Text({
					            	  text : "{LastName}"
					              }),
					              new sap.m.Text({
					            	  text : "{RequestedBy}"
					              })
					   ],
					   tap: listItemTriggered
				   }),
				   filters : [oFilterIsProcessed,oFilterIO],
				   parameters : {expand : "ShiftType, PaymentOption, ShiftDays"}	   	
			   });
	   };
	   var listItemTriggered = function(evt){
		// In case of data binding we can get the binding context (a sort of pointer to the data object to which the clicked ListItem is bound)
		   var bindingContext = evt.oSource.getBindingContext(); // evt.oSource is the ListItem
		   //global var, get property  etc    
		   // The EventBus is used to let the Root Controller know that a navigation should take place.
		   // The bindingContext is attached to the data object here to be used in the Root Controller's event handler.

		   sShiftReqID = bindingContext.getProperty("ShiftPaymentRequestID");
		   iVar = bindingContext.getProperty("ShiftTypeID");
		   sShiftTypeText = bindingContext.getProperty("/ShiftTypes(" + iVar + ")/ShiftTypeText");
		   iVar = bindingContext.getProperty("PaymentOptionID");
		   sPaymentOptionDesc = bindingContext.getProperty("/PaymentOptions(" + iVar + ")/PaymentOptionDesc");
	   
		   var bus = sap.ui.getCore().getEventBus();
		   bus.publish("nav", "to", { 
			   id : "PendingReqInfo",
		       data : {
		               context : bindingContext
		       }
		   });  
	   };
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