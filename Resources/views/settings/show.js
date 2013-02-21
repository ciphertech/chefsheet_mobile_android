Ti.include('../shared/default.js');

// bgFrame(12,10,12,12);
bgFrame(0,0,0,0);


var navBG = Ti.UI.createImageView({
	image:'../../images/nav-icons/cs_navbar.png',
	height:heightt *0.08,
	width:widthh * 1,
	left:0,
	top:heightt *0.0
});
var navLabel = Ti.UI.createLabel({
	text:'Settings',
	font : {
				fontSize : heightt * 0.03,
				fontWeight : 'normal'
			},
	color:'#fff',
	height:heightt * 0.06,
	width:widthh * 0.9,
	left:widthh * 0.48,
	top:heightt * 0.01,
});


win.add(navBG);
win.add(navLabel);


var autoLogLabel = Ti.UI.createLabel({

			text : 'Remember Login',
			top :heightt * 0.16,
			left : widthh * 0.25,
			height : 'auto',
			font : {
				fontSize : heightt * 0.03,
				fontWeight : 'bold'
			},
			  	color : '#fff'
			
});



win.add(autoLogLabel);




var autoLogSwitch = Ti.UI.createSwitch({
	value:Boolean((Ti.App.Properties.getString('autologin'),10)),
	top : heightt * 0.15,
	right : widthh * 0.10
});


	


win.add(autoLogSwitch);

if(Ti.App.Properties.getString('valueRemm')=='1'){
		autoLogSwitch.value=true;
		
	}else if(Ti.App.Properties.getString('valueRemm')=='0'){
		autoLogSwitch.value=false;
	}




var cancelBtn = Ti.UI.createButton({
	title:'Cancel',
	height : heightt * 0.07,
	width : widthh * 0.70 ,
	bottom:heightt * 0.30,
	color:'#FFFFFF',	
	borderRadius:widthh * 0.04,
	font : {
				fontSize : heightt * 0.03,
				fontWeight : 'bold'
			},
	backgroundGradient:{type:'linear',
	colors:['#698aaa','#1C4E7E','#173f6b'],
	startPoint:{x:0,y:0},
	endPoint:{x:0,y:36},
	backFillStart:false},
	borderWidth:1,
	borderColor:'#112f55'
});
win.add(cancelBtn);

var postBtn = Ti.UI.createButton({
	title:'Update Settings',
	height : heightt * 0.07,
			width : widthh * 0.70 ,
			bottom:heightt * 0.19,
	color:'#FFFFFF',	
	borderRadius: widthh * 0.04,
	font : {
				fontSize : heightt * 0.03,
				fontWeight : 'bold'
			},
	backgroundGradient:{type:'linear',
	colors:['#698aaa','#1C4E7E','#173f6b'],
	startPoint:{x:0,y:0},
	endPoint:{x:0,y:36},
	backFillStart:false},
	borderWidth:1,
	borderColor:'#112f55'
});
win.add(postBtn);
		win.add(menuButton);

try{
postBtn.addEventListener('click', function(e) {  
	e.source.height = heightt * 0.075;
	e.source.width = widthh * 0.8 ;
	if(autoLogSwitch.value){
		Ti.App.Properties.setString('valueRemm','1');
		Ti.App.Properties.setString('autologin',true);
	}else{
		Ti.App.Properties.setString('valueRemm','0');
		Ti.App.Properties.setString('autologin',false);
	}
	
  Ti.App.Properties.setString('autologin', autoLogSwitch.value);
  
  
	
    if (win.children) {
       
        for (var i = win.children.length; i > 0; i--){          
            win.remove(win.children[i-1]);
        }
    }		
	
	
  win.close();
});
}
catch(e){}

try{
cancelBtn.addEventListener('click', function(e) {  
	e.source.height = heightt * 0.075;
			e.source.width = widthh * 0.80 ;

 
    if (win.children) {
       
        for (var i = win.children.length; i > 0; i--){          
            win.remove(win.children[i-1]);
        }
    }		
	
	win.close();	
});
}
catch(e){}
