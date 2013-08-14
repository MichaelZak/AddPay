sap.ui.jsview("addl_pay.PendingReqs", {

      getControllerName : function() {
         return "addl_pay.PendingReqs";
      },

      createContent : function(oController) {
          var oPage = new sap.m.Page({
        	  title: "Pending Request",
        	  backgroundDesign : sap.m.PageBackgroundDesign.List ,
    		  footer : new sap.m.Bar({
        		contentMiddle: [ 
        		       new sap.m.Button("addl_pay.GetPenReqs", {
        		    	   icon : "images/refresh_TabButtonItem.png"
        			   })
   
        		  ]
        	   }) 
          });
          
          var oList = new sap.m.List("addl_pay.PenReqsList", {inset : true});
          
          var oFlexBox = new sap.m.FlexBox("addl_pay.PendingRequestsAdminFlexBox",{
    		  width : "100%",
    		  direction : sap.m.FlexDirection.Column,
    		  items : [oList]
    	  });
         
         oPage.addContent(oFlexBox);
    	 return oPage;
      }

});