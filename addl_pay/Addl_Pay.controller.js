sap.ui.controller("addl_pay.Addl_Pay", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
	   // remember the App Control
       this.app = sap.ui.getCore().byId("addl_pay.App");
       
       // subscribe to event bus
       var bus = sap.ui.getCore().getEventBus();
       bus.subscribe("nav", "to", this.navToHandler, this);
       bus.subscribe("nav", "back", this.navBackHandler, this);
   },
   
   navToHandler : function(channelId, eventId, data) {
	   this.app = sap.ui.getCore().byId("addl_pay.App");
	   if (data && data.id) {
           // lazy load view
           if (this.app.getPage(data.id) === null) {
               jQuery.sap.log.info("now loading page '" + data.id + "'");
               var page = sap.ui.view({id:data.id, viewName:"addl_pay."+data.id, type:sap.ui.core.mvc.ViewType.JS});
               this.app.addPage(page);
           }
           // Navigate to given page (include bindingContext)
           this.app.to(data.id, data.data.context);
       } else {
           jQuery.sap.log.error("nav-to event cannot be processed. Invalid data: " + data);
       }
   },

   navBackHandler : function(channelId, eventId, data) {
	   this.app = sap.ui.getCore().byId("addl_pay.App");
	   this.app.back();
   }
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