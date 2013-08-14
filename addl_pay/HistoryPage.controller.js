sap.ui.controller("addl_pay.HistoryPage", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
	   var oButtonSubmit = sap.ui.getCore().byId("addl_pay.RequestHistoryButton");
	   oButtonSubmit.attachPress(function (){
		   var oSelectStatus = sap.ui.getCore().byId("addl_pay.HistoryStatusSelect");
		   var sKey = oSelectStatus.getSelectedKey();
		   
		   var oFilterHRStatusIsProcess,oFilterHRStatusIsApproved;
		   
		   if(sKey==2){ // Approved year to date
			   oFilterHRStatusIsProcess = new sap.ui.model.Filter("IsProcessed ", sap.ui.model.FilterOperator.EQ,true);
			   oFilterHRStatusIsApproved = new sap.ui.model.Filter("IsApproved ", sap.ui.model.FilterOperator.EQ,true);
		   }
		   else if(sKey==3){ // Declined year to date
			   oFilterHRStatusIsProcess = new sap.ui.model.Filter("IsProcessed ", sap.ui.model.FilterOperator.EQ,true);
			   oFilterHRStatusIsApproved = new sap.ui.model.Filter("IsApproved ", sap.ui.model.FilterOperator.EQ,false);
		   }
		   else{ // In process year to date
			  oFilterHRStatusIsProcess = new sap.ui.model.Filter("IsProcessed ", sap.ui.model.FilterOperator.EQ,false);
			  oFilterHRStatusIsApproved = new sap.ui.model.Filter("IsApproved ", sap.ui.model.FilterOperator.EQ,false);
		   }
		   
		   var oListPrevReq = sap.ui.getCore().byId("addl_pay.PrevReqList");
		   oListPrevReq.setModel(oServiceModel);
		   oListPrevReq.bindAggregation("items",{
			   path: "/ShiftPaymentRequests",
			   template: new sap.m.StandardListItem({
				   type : sap.m.ListType.Navigation,
				   title : "{ShiftPaymentRequestID}",
				   description : {
					   path : "CreatedOn", 
					   type : new sap.ui.model.type.DateTime
				   },
				   tap: listItemTriggered
				   
			   }),
			   filters : [oFilterRequestedBy,oFilterHRStatusIsProcess,oFilterHRStatusIsApproved],
			   parameters : {expand : "ShiftType, PaymentOption, ShiftDays"}	   	
		   });
		   
	   });
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
			   id : "RequestInfo",
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