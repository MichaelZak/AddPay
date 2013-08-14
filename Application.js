jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application"); 

sap.ui.app.Application.extend("Application", {

    init : function() {
        // set global models
    },
    
    main : function() {
        var page = sap.ui.view({id:"LoginPage", viewName:"addl_pay.LoginPage", type:sap.ui.core.mvc.ViewType.JS});

    	var app = new sap.m.App("addl_pay.App",{
    		initialPage:"LoginPage",
    		pages : [page]
    	});
    	
        var root = this.getRoot();
        app.placeAt(root);
    }
});