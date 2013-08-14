sap.ui.jsview("addl_pay.RequestPayment", {

      getControllerName : function() {
         return "addl_pay.RequestPayment";
      },

      createContent : function(oController) {
   	  
    	  var oRequestPage = new sap.m.Page("addl_pay.RequestPage", {
    		  //showHeader : false,
    		  title : "Request Additional Payments",
    		  backgroundDesign : sap.m.PageBackgroundDesign.List ,
    		  footer : new sap.m.Bar({
    			  contentMiddle: [ 
    			     new sap.m.Button("addl_pay.SubmitButton", {
    			    	 icon : "images/request_TabButtonItem.png"
    			     }),
    			     new sap.m.Button("addl_pay.ClearButton", {
    			    	 icon : "images/Delete_white_32.png"
    		    	  })
    			     
    			  ]
    		  })
     	  });
    	  // Option list
    	  var oListOptions = new sap.m.List("addl_pay",{
    		  inset: true,
    		  items: [
    		          new sap.m.InputListItem("addl_pay.PayTypeInput", {
    		        	  label : "Select Payment Type",
    		        	  content : new sap.m.Select("addl_pay.PaymentTypeSelect")
    		          }),
    		          new sap.m.InputListItem("addl_pay.PayRateInput",{
    		        	  label : "Select Rate",
    		        	  content : new sap.m.Select("addl_pay.RateSelect")
    		          }),
    		          new sap.m.InputListItem("addl_pay.CalendarSelect", {
    		        	  label : "Select Days",
    		        	  content : new sap.m.DateTimeInput("addl_pay.DateInput", {
    		        		  type : sap.m.DateTimeInputType.Date
    		        	  })
    		          })
    		          ]
    	  });
 	  
    	  var oListSelectedDays =  new sap.m.List("addl_pay.SelectedDays",{
		      inset: true,
		      headerText: 'Selected Days',
		      mode : sap.m.ListMode.Delete,
		      "delete" : function(e){
		    	  var item = e.getParameter("listItem");
		    	  oListSelectedDays.removeItem(item);
		      }
		    });
 
    	  var oFlexBox = new sap.m.FlexBox("addl_pay.RequestFlexBox",{
    		  width : "100%",
    		  direction : sap.m.FlexDirection.Column,
    		  items : [oListOptions,
    		           oListSelectedDays,
    		           ]
    	  });

    	  oRequestPage.addContent(oFlexBox);
    	  
    	  return oRequestPage;
      }

});