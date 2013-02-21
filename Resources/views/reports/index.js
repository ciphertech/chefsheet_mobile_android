Ti.include('../shared/default.js');

var restaurant_name = '';

var data = [];
report_id = -1;

bgFrame(0,0,0,0);
	var idLabel = Ti.UI.createLabel({
		font : {
			fontSize : heightt * 0.03,
			fontWeight : 'normal',
			fontFamily: 'times new roman'
			},
	color:'#000',
	height:heightt * 0.06,
	width:widthh * 0.9,
	left:widthh * 0.05,
  top:heightt *0.13,
  height:'auto'
		});

win.add(idLabel);


var refresh = Titanium.UI.createButton({
	title : "Refresh",
	width : widthh * 0.26,
	height : heightt * 0.07,
	top : heightt * 0.005,
	right : widthh * 0.02,
	color : '#FFFFFF',
	borderRadius : 10,
	font : {
		fontSize : heightt * 0.03,
		fontWeight : 'bold'
	},
	backgroundGradient : {
		type : 'linear',
		colors : ['#000', '#173f6b'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 0,
			y : 36
		},
		backFillStart : false
	},
	borderWidth : 1,
	borderColor : '#112f55'
}); 


var navBG = Ti.UI.createImageView({
	image:'../../images/nav-icons/cs_navbar.png',
	height:heightt *0.08,
	width:widthh * 1,
	left:widthh * 0,
	top:heightt *0.0
});
var navLabel = Ti.UI.createLabel({
	text:'Inventory Reports',
	font : {
				fontSize : heightt * 0.03,
				fontWeight : 'normal'
			},
	color:'#fff',
	height:heightt * 0.06,
	width:widthh * 0.9,	
	left:widthh * 0.28,
	top:heightt * 0.01,
});

win.add(navBG);
win.add(navLabel)

function setData() {
	try{
	var user_id = Ti.App.Properties.getString('user_id');
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		var items = JSON.parse(this.responseText);
	    data = [];
	    var invTitle;
		tableview.data = data;
	    for(i=0;i<items.length;i++) {
	    	if(items[i].name == ""||items[i].name == null) { 
				invTitle = String(moment(items[i].created_at).format("MMM DD YYYY, hA"));
			}else{
				invTitle = String(items[i].name);
			}
			row = Ti.UI.createTableViewRow({				
				height:heightt*0.07
			});
			
			var invDate = Ti.UI.createLabel({
				text: moment(items[i].created_at).format("MM.DD.YY"),
				textAlign:'right',
				font : {
							fontWeight : 'normal',
							fontSize : heightt * 0.03

						},
				width : widthh * 0.2,
					width :widthh *0.2,
					textAlign : 'left',
					top : heightt * 0.04,
					left : widthh * 0.02,
					color : '#112f55'				
	        });
				
			var invLabel = Titanium.UI.createLabel({
				text:invTitle,
				font : {
							fontWeight : 'bold',
							fontSize : (invTitle.length >= 26) ? heightt * 0.03 : heightt * 0.03
						},
				width : '75%',				
				textAlign:'left',
				left : widthh * 0.02,					
				top : heightt * 0.01,
				color : '#112f55'
			});			
			

			row = Ti.UI.createTableViewRow({				
				height : heightt * 0.09
			});
			row.add(invLabel);
			row.add(invDate);
			row.inv_id = items[i].id;
			row.inv_title=String(invTitle);
			row.inv_date=items[i].created_at;
			row.inventory_id=items[i].id;
			data.push(row);
	    }
		tableview.data = data;
		
  	};
	xhr.onerror = function(e) {
		Ti.API.info("get error:" + e.error);
	};  	
  	xhr.open('GET', global_url+"/api/v1/inventories.json"+token_variable,true);
  	xhr.send();	
  	
  	}catch(e){}
};
setData();


var tvBg = Ti.UI.createImageView({
	bottom:heightt * 0.03,
	left:widthh *0.04,
	right:widthh *0.04,
	height:heightt *0.729,
	borderColor:'#cde',
	borderRadius:8,
	backgroundColor:'transparent',
	backgroundImage:'../../images/tableBG.png'
});
win.add(tvBg);


var tableview = Titanium.UI.createTableView({
	bottom:heightt * 0.03,
	left:widthh *0.04,
	right:widthh *0.04,
	height:heightt *0.729,
	borderWidth:1,
	borderRadius:8,
	backgroundColor:'transparent',
	borderColor:'#999',
	separatorColor:'#aaa'
});

// create table view event listener
try{
tableview.addEventListener('click', function(e) {
	dialog.title = 'Select a Type Report for "'+e.row.inv_title+'" Inventory';
	report_id = e.row.inv_id;
	dialog.show();
});
}
catch(e){}

win.add(tableview);

try{
refresh.addEventListener('click', function(e)
{
	e.source.width = widthh * 0.25;
	e.source.height = heightt *0.05;
	e.source.backgroundGradient = {
				type : 'linear',
				colors : ['#000', '#ffffff'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			};
			
		setTimeout(function() {				
		e.source.backgroundGradient = {
			type : 'linear',
			colors : ['#000', '#173f6b'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 0,
				y : 36
			},
			backFillStart : false
		};

	}, 1000); 
			
	tableview.setData([]);
	setTimeout(function()
	{		
		setData();
		e.source.width = widthh * 0.26;
	    e.source.height = heightt *0.07;
			
	},1000);
});
}
catch(e){}

win.add(menuButton);
win.add(refresh);	

try{
win.addEventListener("focus", function(event, type) {
	if (Ti.App.Properties.getString('restaurant_name') != restaurant_name) {
		
		setData();
		restaurant_name = Ti.App.Properties.getString('restaurant_name');
	}
    idLabel.text = restaurant_name +' Inventories';
});
}
catch(e){}
// force refresh
try{
Ti.App.addEventListener('refresh', function (e) {
	if(e.tab == 'inventories' || 'reports') {
		Ti.API.info("force refresh inventories");
		setData();
	}
});
}
catch(e){}
		
		
		win.add(menuButton);

// Done dialog menu
var report_type = ['order', 'sums', 'cat_sums'];
var report_titles = ['Order', 'Category Details', 'Category Sums', 'Cancel']
var optionsDialogOpts = {
	options:report_titles,
	cancel:3,
};

var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
// add event listener

try{
dialog.addEventListener('click',function(e)
{
	
	if(e.index < 3) {  	       
				
			var report = global_url+"/manager/inventories/"+report_id+"/"+report_type[e.index]+".pdf";	
			
//Method Added by Amit Koranne 09-02-2013
//To dispay pdf in Android using pdf application viewer 
 var tmpFile = undefined;
 var newPath = undefined;
    tmpFile = Ti.Filesystem.createTempFile();
    newPath = tmpFile.nativePath + '.pdf';    
    tmpFile = Ti.Filesystem.getFile(newPath);

			var c = Titanium.Network.createHTTPClient();
            c.onload = function() {    	
            	tmpFile.write(this.responseData);
            	try {
                Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
       			action: Ti.Android.ACTION_VIEW,
                type: 'application/pdf',
                data: tmpFile.getNativePath()
               }));
               }
               catch (err) {
			    var alertDialog = Titanium.UI.createAlertDialog({
        		title: 'No PDF Viewer',
        		message: 'Do you want to search the marketplace for a PDF viewer?',
        		buttonNames: ['Yes','No'],
        		cancel: 1
  				  });
    			alertDialog.show();
    			try{
    			alertDialog.addEventListener('click', function(evt) {
        		if (evt.index == 0) {
            		Ti.Platform.openURL('http://www.google.com/search?q=pdf'); 
      			  } 
   				 });
   				 }
   				 catch(e){}
   				 
				}               
            }
            c.open('GET',report,true);
            c.send();  
	 }
	
});
}
catch(e){}
