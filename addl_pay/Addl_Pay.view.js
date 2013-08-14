sap.ui.jsview("addl_pay.Addl_Pay", {

      getControllerName : function() {
         return "addl_pay.Addl_Pay";
      },

      createContent : function(oController) {
          
    	  var oRequestPage = sap.ui.jsview("addl_pay.RequestPayment");
    	  var oHistoryPage = sap.ui.jsview("addl_pay.HistoryPage");
		  var oPendingRequestsAdmin = sap.ui.jsview("addl_pay.PendingReqs");
 	  
		  var oCarousel = new sap.m.Carousel("addl_pay.Carousel", {
    		  pages: [oPendingRequestsAdmin,oRequestPage,oHistoryPage]
    		  
    	  });
    	  
    	  var oMainPage = new sap.m.Page({
    		  showHeader : false,
    		  backgroundDesign : sap.m.PageBackgroundDesign.List ,
    		  content: [oCarousel]
          });
    	  
    	  return oMainPage;
      }

});