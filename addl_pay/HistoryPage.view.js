sap.ui.jsview("addl_pay.HistoryPage", {

      getControllerName : function() {
         return "addl_pay.HistoryPage";
      },

      createContent : function(oController) {
    	  var oHistoryPage = new sap.m.Page("addl_pay.HistoryPage", {
    		  title : "History",
    		  backgroundDesign : sap.m.PageBackgroundDesign.List ,
    		  footer : new sap.m.Bar({
        		contentMiddle: [ 
        		       new sap.m.Button("addl_pay.RequestHistoryButton", {
        		    	   icon : "images/refresh_TabButtonItem.png"
        			   })
   
        		  ]
        	   })    	      
	  	  });
    	  var oSelectStatus = new sap.m.Select("addl_pay.HistoryStatusSelect",{
    		  items : [
    		           new sap.ui.core.Item({text : "In Process - Year to Date", key : "1"}),
    		           new sap.ui.core.Item({text : "Approved - Year to Date", key : "2"}),
    		           new sap.ui.core.Item({text : "Declined - Year to Date", key : "3"}),
    		  ]
    	  });
    	  
    	  var oListOptions = new sap.m.List("addl_pay.HistoryOptionsList",{
    		  inset: true,
    		  items : [
    		           new sap.m.InputListItem({
    		        	   label : "Select Report Type",
    		        	   content : oSelectStatus
    		           }),
    		  ]
    	  });
    	  var oListPrevReq = new sap.m.List("addl_pay.PrevReqList",{inset : true});
    	  
    	  var oFlexBox = new sap.m.FlexBox("addl_pay.HistoryFlexBox",{
    		  width : "100%",
    		  direction : sap.m.FlexDirection.Column,
    		  items : [oListOptions,
    		           oListPrevReq,
    		           ]
    	  });
    	  
    	  oHistoryPage.addContent(oFlexBox);
    	  return oHistoryPage;
      }

});