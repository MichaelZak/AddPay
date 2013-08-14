sap.ui.jsview("addl_pay.RequestInfo", {

      getControllerName : function() {
         return "addl_pay.RequestInfo";
      },
      
      createContent : function(oController) {
    	  this.addEventDelegate({
        	    onBeforeShow: function(evt) {
        	    	
        	    	oList.setModel(evt.data.oModel);
        	    	oList.setBindingContext(evt.data);
        	    	
        	    	oListSelectedDays.setModel(evt.data.oModel);
        	    	oListSelectedDays.setBindingContext(evt.data);
        	    	
        	    	var aItems = oList.getItems();
        	    	for(var i =0;i<aItems.length;i++){
        	    		var sLabel =aItems[i].getLabel();
        	    		if(sLabel==="Shift Type")
        	    			aItems[i].setValue(sShiftTypeText);
        	    		if(sLabel==="Payment Option")
        	    			aItems[i].setValue(sPaymentOptionDesc);	
        	    	}
        	    	
        	    	 // Get selected days list
        	          oListSelectedDays.bindAggregation("items",{
        				   path: "/ShiftDays",
        				   template: new sap.m.DisplayListItem({
        					   //type : sap.m.ListType.Detail,
        					   label : {
        						   path : "Day",
        						   type : new sap.ui.model.type.Date	   
        					   },
        					   value : {path : "DayFraction"},
        			 		}),
        				   filters : [new sap.ui.model.Filter("ShiftPaymentRequestID ", sap.ui.model.FilterOperator.EQ,sShiftReqID) ]
        			   });
          	    },
    	  });
 	  
    	  var oPage = new sap.m.Page({
              title: "Request Details",
              backgroundDesign : sap.m.PageBackgroundDesign.List ,
              customHeader : new sap.m.Bar({
            	  contentLeft: [ 
        		       new sap.m.Button("addl_pay.RequestInfoNavLeft", {
        		    	   icon : "images/navigation_left_arrow_TabButtonItem.png",
        		    	   press :function(e){
        		            	  var bus = sap.ui.getCore().getEventBus();
        		            	  bus.publish("nav", "back", { 
        		            		  id : "RequestInfo",
        		            	  });
        		              }, 
        			   })
        		  ]
        	   }) 
    	  		
          });
  	  
    	  var oList = new sap.m.List({ 
    		  inset: true, 
    		  headerText : "Information about payment request",
    		  items: [
        	          new sap.m.DisplayListItem({label : "Shift Payment Request Id", value : "{ShiftPaymentRequestID}" }),
        	          new sap.m.DisplayListItem({label : "Created on date", 
        	        	  value: {
        	        		  path: "CreatedOn",
        	        		  type : new sap.ui.model.type.DateTime
        	        	  }        		  
        	          }),
        	          new sap.m.DisplayListItem({label : "CostCenter", value: "{CostCenterID}"}),
        	          new sap.m.DisplayListItem({label : "Shift Type", value: "{ShiftTypeID}"}),
        	          new sap.m.DisplayListItem({label : "Payment Option", value: "{PaymentOptionID}"}),
        	          new sap.m.DisplayListItem({label : "Actioned by", value: "{ActionedBy}"}),
        	          new sap.m.DisplayListItem({label : "Actioned on date", 
        	        	  value: {
        	        		  path : "ActionedOn",
        	        		  type : new sap.ui.model.type.DateTime
        	        	  }
        	          })
        	  ]
          });
    	 
          oPage.addContent(oList);
          var oListSelectedDays = new sap.m.List({inset : true,headerText : "Requested Day + Day Fraction",});
          oPage.addContent(oListSelectedDays);
          return oPage;
      }

});