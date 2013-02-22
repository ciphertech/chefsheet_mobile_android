Ti.include('../shared/default.js');

var list_index = win.list_index;
var inventory = win.inventory;
var dupi=-10;
var dupi2=-10;
var runonce=true;
var runonce2=true;
 var runat=-10;
 var scroll_once=true;

var location_id = win.location_id;
var autoFlow = win.autoFlow;
var completed = false;
var t = inventory.length;
var l=0;
var r=0;
var firstTime=true;
var product_name=[];
var unit=[];

var run_when_scroll = -777;


var product_name = win.product_name;
var inv_id = win.inv_id;
var product_id = win.product_id;
var product_unit = win.product_unit;
var product_unit_id = win.product_unit_id;
var category_id = win.category_id;

var product_qty = win.product_qty;
var product_par = win.product_par;
var product_order = win.product_order;
var product_img = win.product_img;
var autoFlow = win.autoFlow;
var clickedT = 1;
var inventory_unit_qty=win.pInventory_unit_qty;
var inventory_unit_id=win.pInventory_unit_id;
var inventory_unit=win.pInventory_unit;
var recipe_unit_id=win.pRecipe_unit_id;
var recipe_unit_qty=win.pRecipe_unit_qty;
var recipe_unit=win.pRecipe_unit;

var order1 = [];
var par1 = [];
var quantity1 = [];
var inventory_qty1 = [];
var recipe_qty1 = [];

var inventory_unit_id = [];
var recipe_unit_id = [];



units = _.groupBy(JSON.parse(Ti.App.Properties.getString('units')), function(e) { return e.id });
categories = _.groupBy(JSON.parse(Ti.App.Properties.getString('categories')), function(e) { return e.id });

	
	for(var i=0;i<inventory.length;i++){
	 product_name[i] = inventory[i].product?inventory[i].product.name:inventory[i].name;
	


    unit[i] = 'units';
  	if(inventory[i].unit_id == null || inventory[i].unit_id == undefined || inventory[i].unit_id == 0 ) {
  		unit[i] = 'No Unit'; 		 		
  	}
  	else {
  		unit[i] = units[inventory[i].unit_id][0].name;  		
  	}
  	
  	
  	if(inventory[i].inventory_unit_id == null || inventory[i].inventory_unit_id == undefined || inventory[i].inventory_unit_id == 0){
  		inventory_unit_id[i] = 'No Unit';
  	}else{
  		inventory_unit_id[i] = units[inventory[i].inventory_unit_id][0].name;
  	}
  	
  	if(inventory[i].recipe_unit_id == null || inventory[i].recipe_unit_id == undefined || inventory[i].recipe_unit_id == 0 ){
  		recipe_unit_id[i] = 'No Unit';
  	}else{
  		recipe_unit_id[i] = units[inventory[i].recipe_unit_id][0].name;
  	}
  	
  	 
	
     order1[i]= inventory[i].order?inventory[i].order:inventory[i].order=null;

     par1[i]= inventory[i].par?inventory[i].par:inventory[i].par=null;
     
     quantity1[i]= inventory[i].quantity?inventory[i].quantity:inventory[i].quantity=null;
     
     inventory_qty1[i]= inventory[i].inventory_unit_qty?inventory[i].inventory_unit_qty:inventory[i].inventory_unit_qty=null;
     
     recipe_qty1[i]= inventory[i].recipe_unit_qty?inventory[i].recipe_unit_qty:inventory[i].recipe_unit_qty=null;
     	
	}
















var catBG = Titanium.UI.createImageView({
    	image:cropImage(prodImg(inventory[list_index], 'medium'), heightt*0.708, widthh*1.063, heightt*0.692, widthh*0.75),
		right:0,
		top:0,
		opacity:1,
		preventDefaultImage:true
	});
	win.add(catBG);

var bg = Titanium.UI.createView({	
	top:heightt * 0.015,
	left:widthh * 0.002,
	right:widthh * 0.002,
	height:heightt * 0.298,
	backgroundColor: '#000',
	opacity: 0.6,
	borderRadius:9
});
win.add(bg);


var itemLabel = Ti.UI.createLabel({
      text:product_name,
font : {
				fontSize : heightt * 0.035,
				fontWeight : 'bold'
			},
      top:heightt * 0.035,
      left:widthh * 0.05,
      color:'#fff',
      //opacity: 1,
      height:'auto'
    });
win.add(itemLabel);

var qtyField = Ti.UI.createTextField({
 hintText: product_qty !=null?product_qty:'Count',
 height : heightt * 0.09,
			width : widthh * 0.25 ,
  top: heightt *0.122,
  left:widthh *0.16,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
  softKeyboardOnFocus:Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
});
win.add(qtyField);

var parField = Ti.UI.createTextField({
 hintText: product_par !=null?product_par:'Par',
  height:heightt * 0.09,
			width : widthh * 0.25 ,
  width: widthh * 0.25,
  //top:heightt * 0.200,
  top:heightt * 0.227,
  left:widthh *0.16,
   maxLength:10,//added by yo
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(parField);

var parLabel = Ti.UI.createLabel({
   text:'Par',
  height:heightt * 0.35,
  top:heightt * 0.077,
  left:widthh * 0.03,
  font : {
				fontSize : heightt * 0.03,
				fontWeight : 'bold'
			},
  color:'#fff'
});
win.add(parLabel);

var orderField = Ti.UI.createTextField({
  hintText: product_order !=null?product_order:'Order',
  height:heightt * 0.09,
			width : widthh * 0.25 ,
  width: widthh * 0.25,
  top:heightt * 0.227,
  right:widthh *0.07,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(orderField);

var orderLabel = Ti.UI.createLabel({
  text:'Order',
  height:heightt * 0.35,
  top:heightt * 0.082,
  right:widthh * 0.35,
  font : {
				fontSize : heightt * 0.03,
				fontWeight : 'bold'
			},
  color:'#fff'
});
win.add(orderLabel);


var qtyLabel = Ti.UI.createLabel({
 text:'Qty',
  height:heightt * 0.039,
  top:heightt *0.137,
  left:widthh * 0.03,
  font : {
				fontSize : heightt * 0.03,
				fontWeight : 'bold'
			},
  color:'#fff'
});
win.add(qtyLabel);

var unitLabel = Ti.UI.createLabel({
	text:product_unit,
	height:heightt *0.055,
	top:heightt * 0.137,
	left:widthh *0.5,
	font : {
				fontSize : heightt * 0.03,
				fontWeight : 'bold'
			},
	color:'#fff'
});
win.add(unitLabel);


var navBG = Ti.UI.createImageView({
	image:'../../images/nav-icons/cs_navbar.png',
	height:heightt *0.08,
	width:widthh * 1,
	left:widthh * 0,
	bottom:heightt *0.465
});


win.add(navBG);


var navBG2 = Ti.UI.createImageView({
	image:'../../images/nav-icons/cs_navbar.png',
	height:heightt *0.085,
	width:widthh * 1,
	left:widthh * 0,
	bottom:heightt *0.544
});


win.add(navBG2);


var cancelBtn =  Titanium.UI.createButton({
	title:'Done',
	width:widthh *0.2,
	height : heightt *0.065,
	bottom:heightt *0.474,
	right : widthh *0.028,
			color : '#FFFFFF',
			//Bidyut Nath
			//style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : heightt * 0.02,
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

win.add(cancelBtn);


//Bidyut Nath
cancelBtn.addEventListener('click', function(e) {
	Ti.UI.Android.hideSoftKeyboard();
	loadingIndicator.show();
	//hide method call
	setTimeout(function() {
		loadingIndicator.hide();
	}, 500);
	
	e.source.height=heightt * 0.06;
	e.source.width=widthh * 0.25;
	
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
		e.source.width = widthh * 0.2;
		e.source.height = heightt *0.065;				
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

	}, 3000);
	
	enterItem();	
	
	setTimeout(function() {		
		Ti.App.fireEvent('popClose');		
		win.close();
		},3000);

});

var close2=0;
/*
var left = Titanium.UI.createButton({
	image:'../../images/25-circle-west.png',
	left:widthh *0.12,
	width : widthh * 0.15,
	height : heightt * 0.08,
	backgroundColor:'transparent',
	bottom:heightt *0.38
});
*/
var left = Titanium.UI.createImageView({
	image:'../../images/25-circle-west.png',
	left:widthh *0.13,
	width : widthh * 0.12,
	height : heightt * 0.07,
	backgroundColor:'transparent',
	bottom:heightt *0.469
});

win.add(left);

left.addEventListener('click', function(e)
{
	e.source.visible = false;
	setTimeout(function() {
		e.source.visible = true;
	}, 2000);

	if(list_index == 0){
		return;
	}
	
	enterItem2();
	clickedT=1;
	unitType.title='Purchase';
		run_when_scroll=-777;
	rightNum.text=(t-list_index);
	if(rightNum.text=='0'){
		rightNum.text='Last';
	}
	leftNum.text=list_index-1;
	if(leftNum.text=='0'){
		leftNum.text='First';
	}	
	//catBG.image=cropImage(prodImg(inventory[list_index-1], 'medium'), 340, 340, 320, 240);
	catBG.image=cropImage(prodImg(inventory[list_index-1], 'medium'), heightt*0.708, widthh*1.063, heightt*0.692, widthh*0.75);
		itemLabel.text = inventory[list_index-1].name+'';
		qtyField.value = '';
		parField.value = '';
	    orderField.value = '';
	
	qtyField.hintText = quantity1[list_index-1]?quantity1[list_index-1]+'': 0+'';
	parField.hintText = par1[list_index-1]?par1[list_index-1]+'':0+'';
	orderField.hintText = order1[list_index-1]?order1[list_index-1]+'':0+'';
	
	list_index = list_index-1;
});
	
//this appears at counting items section
var flowLbl = Ti.UI.createLabel({
	text: 'Prev. - Next',
	textAlign:'center',
	font:{fontWeight:'bold',fontSize : heightt * 0.024},
	color:'#fff',
	left:widthh *0.28,
		bottom:heightt *0.489
});

win.add(flowLbl);
/*
var right = Titanium.UI.createButton({
	image:'../../images/21-circle-east.png',
	left:widthh *0.50,
	width : widthh * 0.15,
	height : heightt * 0.08,
	backgroundColor:'transparent',		
	bottom:heightt *0.38
});
*/
var right = Titanium.UI.createImageView({
	image:'../../images/21-circle-east.png',
	left:widthh *0.50,
	width : widthh * 0.12,
	height : heightt * 0.07,
	backgroundColor:'transparent',		
	bottom:heightt *0.469
});


win.add(right);



right.addEventListener('click', function(e)
{
	e.source.visible = false;
	setTimeout(function() {
		e.source.visible = true;
	}, 2000);

	if(list_index == inventory.length-1){
		return;
	}
	
	
	enterItem2();
	clickedT=1;
	unitType.title='Purchase';
	run_when_scroll=-777;
	rightNum.text=((t-1)-(list_index+1));
	if(rightNum.text=='0'){
		rightNum.text='Last';
	}
	leftNum.text=list_index+1;
	if(leftNum.text=='0'){
		leftNum.text='First';
	}	
	//catBG.image=cropImage(prodImg(inventory[list_index+1], 'medium'), 340, 340, 320, 240);
	catBG.image=cropImage(prodImg(inventory[list_index+1], 'medium'), heightt*0.708, widthh*1.063, heightt*0.692, widthh*0.75);
	
	qtyField.value = '';
		parField.value = '';
	    orderField.value = '';
	itemLabel.text = inventory[list_index+1].name+'';
	qtyField.hintText = quantity1[list_index+1]?quantity1[list_index+1]+'': 0+'';
	parField.hintText = par1[list_index+1]?par1[list_index+1]+'':0+'';
	orderField.hintText = order1[list_index+1]?order1[list_index+1]+'':0+'';
	
	list_index = list_index+1;
	



	
	

	
});
	
	
var tex2='';
if(t>1){
	tex2=list_index;
}
if(list_index==0){
	tex2='First';
}



var leftNum = Titanium.UI.createLabel({
text:tex2,
 width:widthh*0.09,
 left:widthh*0.012,
 //bottom:heightt *0.41,
 bottom:heightt *0.489,
 textAlign:'right',
 font:{fontWeight:'bold',fontSize : heightt * 0.024},
		color:'#fff'
});
var tex='';
if(t>1){
	tex=t-(list_index+1);
}
if(t>1 && list_index==(t-1)){
	tex='Last';
}
var rightNum = Titanium.UI.createLabel({
	
	 text:tex,
	 width:widthh*0.09,
	 left:widthh*0.65,
 font:{fontWeight:'bold',fontSize : heightt * 0.024},
 	bottom:heightt *0.489,
		color:'#fff'
});

win.add(leftNum);
win.add(rightNum);

var unitTypeLabel = Ti.UI.createLabel({
	text:"Select Unit Type -",
	textAlign:'left',
	bottom : heightt * 0.565,
	left:widthh *0.03,
	font:{fontWeight:'bold',fontSize:heightt * 0.03},
	color:'#fff'
	});
	
var unitType = Titanium.UI.createButton({   
  	  title:"Purchase",                
    	width : widthh * 0.35,
			height : heightt *0.065,
			bottom : heightt * 0.556,
	right : widthh *0.028,
			color : '#FFFFFF',
			//Bidyut Nath
			//style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : heightt * 0.02,
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
	
                          
        //style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED                                     
    });

win.add(unitTypeLabel);
win.add(unitType);

 
unitType.addEventListener('click', function(e) {
	if(run_when_scroll==list_index){		
		return;
	}
enterItem2();
	
	e.source.height=heightt * 0.055;
	e.source.width=widthh * 0.4;

if (clickedT == 1) {
	
if (inventory[list_index].inventory_unit_id != null) {
					qtyField.hintText = inventory_qty1[list_index]+"";					
					unitLabel.text = inventory_unit_id[list_index]+"";
					unitType.title = "Inventory";
			clickedT = 2;
		}else if( inventory[list_index].recipe_unit_id != null) {
					qtyField.hintText = recipe_qty1[list_index]+"";
					unitLabel.text = recipe_unit_id[list_index]+"";
					unitType.title = "Recipe";
					clickedT = 3;
				}
				else{
			
			qtyField.hintText = quantity1[list_index]+"";
				unitLabel.text = unit[list_index]+"";
				unitType.title = "Purchase";
		}
			
		} else if (clickedT == 2) {
			if (inventory[list_index].recipe_unit_id != null) {
					qtyField.hintText = recipe_qty1[list_index]+"";
					unitLabel.text = recipe_unit_id[list_index]+"";
					unitType.title = "Recipe";
			clickedT = 3;
			}else{
				clickedT = 1;
			qtyField.hintText = quantity1[list_index]+"";
				unitLabel.text = unit[list_index]+"";
				unitType.title = "Purchase";
		}
			
		} else {
			
			clickedT = 1;
			try {
				qtyField.hintText = quantity1[list_index]+"";
				unitLabel.text = unit[list_index]+"";
				unitType.title = "Purchase";
			
			} catch(e) {

			}
			//alert("value of clickedT="+clickedT);

		}
		
		if(qtyField.value=='null'||qtyField.hintText=='null'){
			qtyField.hintText='0';
			qtyField.value='';
		}
		

		setTimeout(function() {
			e.source.height = heightt * 0.065;
			e.source.width = widthh * 0.35;			
			}, 1000); 

		
	});
 
 var once_q = false;
 var once_p = false;
 
 
qtyField.addEventListener('change', function(e) {
	run_when_scroll=list_index;
		if(e.value && (parField.value || parField.hintText !="Par")) {
			var calc;
			if (!parField.value && parField.hintText !="Par") {
				var a="";
				a=parseInt(parField.hintText+"")+"";
				var b="";
				b=parseInt(e.value+"")+"";
			calc = parseInt(a) - parseInt(b);
			
			} else {
				var c="";
				c=parseInt(parField.hintText+"")+"";
				var d="";
				d=parseInt(e.value+"")+"";
			calc = parseInt(c) - parseInt(d);
			
				//parField.hintText - e.value;
				
					
			}
			var z= parseInt(calc);
			orderField.value = (z >=0) ? z+"":0+"";
			if(orderField.value=='NaN'){
				orderField.value=0;
			}
		}
		if(qtyField.value==0||qtyField.value==''){			
			run_when_scroll=-777;
		}
	});
	
	parField.addEventListener('change', function(e) {
		run_when_scroll=list_index;
		if(qtyField.value==''){
	qtyField.value = qtyField.hintText+'';
		}
				if(e.value && (qtyField.value || qtyField.hintText !="Count")) {
			//var calc = e.value - parField.value;
			var calc;
			if (!qtyField.value && qtyField.hintText !="Count") {
				var a="";
				a=parseInt(e.value+"") +"";
				var b="";
				b=parseInt(qtyField.hintText+"")+"";
		calc = parseInt(a) - parseInt(b);
			} else {
				var c="";
				c=parseInt(e.value+"")+"";
				var d="";
				d=parseInt(qtyField.value+"")+"";
			calc = parseInt(c) - parseInt(d);
			}
	var z= parseInt(calc);
			orderField.value = (z <=0) ? 0+"":z+"";
			if(orderField.value=='NaN'){
				orderField.value=0;
			}
		}
		
	});
	


var nxtBtn =  Titanium.UI.createButton({
	title:'Skip',
	//style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});


var flowLbl = Ti.UI.createLabel({
	text: 'Auto Flow',
	textAlign:'center',
	font:{fontWeight:'bold',fontSize:12},
	color:'#fff'
});

//Bidyut
/* 
var spacer =  Titanium.UI.createButton({
	//systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
if (autoFlow == false) {
	var toolbarr =  Titanium.UI.createView({
	barColor: '#1C4E7E',
	bottom:0,
	items:[invBtn,spacer,cancelBtn]
	});
} else {
	var toolbarr =  Titanium.UI.createView({
	barColor: '#1C4E7E',
	bottom:0,
	items:[invBtn,spacer,flowLbl,spacer,cancelBtn]
	});
}
*/




//Bidyut
//toolbarr.add(invBtn);
//toolbarr.add(cancelBtn);
//win.add(toolbarr);


// cancel events


win.addEventListener('swipe', enterItem);

//invBtn.addEventListener('click', enterItem);

//Bidyut Nath

/*
win.addEventListener("open", function(event, type) {
    qtyField.focus();
        
});
*/

/*
	win.addEventListener('focus', function() {
		setTimeout(function() {
			qtyField.focus();			
		}, 500);
		// Adjust the milliseconds from 500 upwards/downwards until the delay looks right
	}); 
*/
	
function enterItem() {
		if(run_when_scroll==list_index){ 
			
	
		
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(e) {
	

		Ti.App.fireEvent('popClose');
		win.close();
		//win.setData();
	};
	xhr.onerror = function(e) {
		Ti.API.info("post error:" + e.error);
	};
	xhr.open("PUT", global_url+'/manager/inventories/'+Ti.App.Properties.getString('inventory_id')+'.json');
	

	
	try{
			if (unitType.title == 'Purchase') {
				if (product_id != null) {					
					
						var relation_between_purchase_inventory_recipe=false;
						var  relation_between_purchase_inventory=false;
						var  relation_between_purchase_recipe=false;
						var  inventory_Count=0;
                        var recipe_Count=0;
			try{		
				
if(inventory[list_index].price>0 && inventory[list_index].inventory_unit_price>0  && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory[list_index].price>0  && inventory[list_index].inventory_unit_price>0)
{
relation_between_purchase_inventory=true;

}else if (inventory[list_index].price>0 && inventory[list_index].recipe_unit_price>0 ){
	
	relation_between_recipe_inventory=true;
}


if(relation_between_purchase_inventory_recipe)
{

 inventory_Count=(inventory[list_index].price * qtyField.value)/inventory[list_index].inventory_unit_price ;
 recipe_Count=(inventory[list_index].price  * qtyField.value)/inventory[list_index].recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  inventory_Count=(inventory[list_index].price * qtyField.value)/inventory[list_index].inventory_unit_price ;

}else if(relation_between_recipe_inventory)
{
   recipe_Count=(inventory[list_index].price  * qtyField.value)/inventory[list_index].recipe_unit_price;

}
}catch(ex){}				
//end of logic
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":inventory[list_index].unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
							"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,						
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][product_id]" :inventory[list_index].product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});
					
					
				} else {
					
					var relation_between_purchase_inventory_recipe=false;
						var  relation_between_purchase_inventory=false;
						var  relation_between_purchase_recipe=false;
						var  inventory_Count=0;
                        var recipe_Count=0;
			try{		
				
if(inventory[list_index].price>0 && inventory[list_index].inventory_unit_price>0  && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory[list_index].price>0  && inventory[list_index].inventory_unit_price>0)
{
relation_between_purchase_inventory=true;

}else if (inventory[list_index].price>0 && inventory[list_index].recipe_unit_price>0 ){
	
	relation_between_recipe_inventory=true;
}


if(relation_between_purchase_inventory_recipe)
{

 inventory_Count=(inventory[list_index].price * qtyField.value)/inventory[list_index].inventory_unit_price ;
 recipe_Count=(inventory[list_index].price  * qtyField.value)/inventory[list_index].recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  inventory_Count=(inventory[list_index].price * qtyField.value)/inventory[list_index].inventory_unit_price ;

}else if(relation_between_recipe_inventory)
{
   recipe_Count=(inventory[list_index].price  * qtyField.value)/inventory[list_index].recipe_unit_price;

}
}catch(ex){}				
//end of logic
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":inventory[list_index].unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
							"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,						
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][name]" :inventory[list_index].name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});
					
				}
			} else if (unitType.title == 'Inventory') {

				if (product_id != null) {
						//logic to map relation
						var relation_between_purchase_inventory_recipe = false;
						var relation_between_purchase_inventory = false;
						var relation_between_recipe_inventory = false;
						var purchase_Count = 0.0;
						var recipe_Count = 0.0;
						try {
							if (inventory[list_index].price > 0 && inventory[list_index].inventory_unit_price > 0 && inventory[list_index].recipe_unit_price > 0) {
								relation_between_purchase_inventory_recipe = true;

							} else if (inventory[list_index].price > 0 && inventory[list_index].inventory_unit_price > 0) {
								relation_between_purchase_inventory = true;

							} else if (inventory[list_index].inventory_unit_price > 0 && inventory[list_index].recipe_unit_price > 0) {

								relation_between_recipe_inventory = true;
							}

							if (relation_between_purchase_inventory_recipe) {

								purchase_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].price;
								recipe_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].recipe_unit_price;

							} else if (relation_between_purchase_inventory) {
								purchase_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].price;

							}
						} catch(ex) {
						}


					
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id[list_index],
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
							"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][product_id]" : inventory[list_index].product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});

				} else {
					
				
						//logic to map relation
						var relation_between_purchase_inventory_recipe = false;
						var relation_between_purchase_inventory = false;
						var relation_between_recipe_inventory = false;
						var purchase_Count = 0.0;
						var recipe_Count = 0.0;
						try {
							if (inventory[list_index].price > 0 && inventory[list_index].inventory_unit_price > 0 && inventory[list_index].recipe_unit_price > 0) {
								relation_between_purchase_inventory_recipe = true;

							} else if (inventory[list_index].price > 0 && inventory[list_index].inventory_unit_price > 0) {
								relation_between_purchase_inventory = true;

							} else if (inventory[list_index].inventory_unit_price > 0 && inventory[list_index].recipe_unit_price > 0) {

								relation_between_recipe_inventory = true;
							}

							if (relation_between_purchase_inventory_recipe) {

								purchase_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].price;
								recipe_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].recipe_unit_price;

							} else if (relation_between_purchase_inventory) {
								purchase_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].price;

							}
						} catch(ex) {
						}


					
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id[list_index],
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
							"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][name]" : inventory[list_index].name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});

				}
				

			} else if (unitType.title == 'Recipe') {
				if (product_id != null) {
					var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_Recipe=false;
						var relation_between_recipe_inventory=false;
									var purchase_Count=0;
var inventory_Count=0;
		try{			
if(inventory[list_index].price>0  && inventory[list_index].inventory_unit_price>0  && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory[list_index].price>0 && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_Recipe=true;

}else if (inventory[list_index].price>0 && inventory[list_index].inventory_unit_price>0 ){
	
	relation_between_recipe_inventory=true;
}


if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].price ;
 inventory_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].inventory_unit_price;
 

}else if(relation_between_purchase_Recipe)
{
 purchase_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].price ;

}
}catch(ex){}
				
//end of logic
					
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id[list_index],
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value :0,
							"inventory[items_attributes][][quantity]" : purchase_Count, 
                        	"inventory[items_attributes][][inventory_unit_qty]" :inventory_Count,                 	
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][product_id]" : inventory[list_index].product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});
				} else {
					
					var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_Recipe=false;
						var relation_between_recipe_inventory=false;
									var purchase_Count=0;
var inventory_Count=0;
		try{			
if(inventory[list_index].price>0  && inventory[list_index].inventory_unit_price>0  && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory[list_index].price>0 && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_Recipe=true;

}else if (inventory[list_index].price>0 && inventory[list_index].inventory_unit_price>0 ){
	
	relation_between_recipe_inventory=true;
}


if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].price ;
 inventory_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].inventory_unit_price;
 

}else if(relation_between_purchase_Recipe)
{
 purchase_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].price ;

}
}catch(ex){}
				
//end of logic
					
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id[list_index],
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value :0,
							"inventory[items_attributes][][quantity]" : purchase_Count, 
                        	"inventory[items_attributes][][inventory_unit_qty]" :inventory_Count,                 	
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][name]" : inventory[list_index].name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});
				}
				
			}
		} catch(e) {		}
	}//end of if
		
};


function enterItem2() {
if(run_when_scroll==list_index){


		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(e) {

		};
		xhr.onerror = function(e) {
			Ti.API.info("post error:" + e.error);

		};
		xhr.open("PUT", global_url+'/manager/inventories/' + Ti.App.Properties.getString('inventory_id') + '.json');
			
	try{
			if (unitType.title == 'Purchase') {
				if (product_id != null) {					
					
						var relation_between_purchase_inventory_recipe=false;
						var  relation_between_purchase_inventory=false;
						var  relation_between_purchase_recipe=false;
						var  inventory_Count=0;
                        var recipe_Count=0;
			try{		
				
if(inventory[list_index].price>0 && inventory[list_index].inventory_unit_price>0  && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory[list_index].price>0  && inventory[list_index].inventory_unit_price>0)
{
relation_between_purchase_inventory=true;

}else if (inventory[list_index].price>0 && inventory[list_index].recipe_unit_price>0 ){
	
	relation_between_recipe_inventory=true;
}


if(relation_between_purchase_inventory_recipe)
{

 inventory_Count=(inventory[list_index].price * qtyField.value)/inventory[list_index].inventory_unit_price ;
 recipe_Count=(inventory[list_index].price  * qtyField.value)/inventory[list_index].recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  inventory_Count=(inventory[list_index].price * qtyField.value)/inventory[list_index].inventory_unit_price ;

}else if(relation_between_recipe_inventory)
{
   recipe_Count=(inventory[list_index].price  * qtyField.value)/inventory[list_index].recipe_unit_price;

}
}catch(ex){}		

inventory[list_index].quantity=qtyField.value;		
inventory[list_index].inventory_unit_qty=inventory_Count;
inventory[list_index].recipe_unit_qty=recipe_Count;
inventory_qty1[list_index]=inventory_Count;
recipe_qty1[list_index]=recipe_Count;
quantity1[list_index]=qtyField.value;
par1[list_index]=parField.value;
order1[list_index]=orderField.value;

//end of logic
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":inventory[list_index].unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
							"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,						
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][product_id]" :inventory[list_index].product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});
					
					
				} else {
					
					var relation_between_purchase_inventory_recipe=false;
						var  relation_between_purchase_inventory=false;
						var  relation_between_purchase_recipe=false;
						var  inventory_Count=0;
                        var recipe_Count=0;
			try{		
				
if(inventory[list_index].price>0 && inventory[list_index].inventory_unit_price>0  && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory[list_index].price>0  && inventory[list_index].inventory_unit_price>0)
{
relation_between_purchase_inventory=true;

}else if (inventory[list_index].price>0 && inventory[list_index].recipe_unit_price>0 ){
	
	relation_between_recipe_inventory=true;
}


if(relation_between_purchase_inventory_recipe)
{

 inventory_Count=(inventory[list_index].price * qtyField.value)/inventory[list_index].inventory_unit_price ;
 recipe_Count=(inventory[list_index].price  * qtyField.value)/inventory[list_index].recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  inventory_Count=(inventory[list_index].price * qtyField.value)/inventory[list_index].inventory_unit_price ;

}else if(relation_between_recipe_inventory)
{
   recipe_Count=(inventory[list_index].price  * qtyField.value)/inventory[list_index].recipe_unit_price;

}
}catch(ex){}		


inventory[list_index].quantity=qtyField.value;		
inventory[list_index].inventory_unit_qty=inventory_Count;
inventory[list_index].recipe_unit_qty=recipe_Count;
inventory_qty1[list_index]=inventory_Count;
recipe_qty1[list_index]=recipe_Count;
quantity1[list_index]=qtyField.value;
par1[list_index]=parField.value;
order1[list_index]=orderField.value;	
//end of logic
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":inventory[list_index].unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
							"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,						
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][name]" :inventory[list_index].name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});
					
				}
			} else if (unitType.title == 'Inventory') {

				if (product_id != null) {
						//logic to map relation
						var relation_between_purchase_inventory_recipe = false;
						var relation_between_purchase_inventory = false;
						var relation_between_recipe_inventory = false;
						var purchase_Count = 0.0;
						var recipe_Count = 0.0;
						try {
							if (inventory[list_index].price > 0 && inventory[list_index].inventory_unit_price > 0 && inventory[list_index].recipe_unit_price > 0) {
								relation_between_purchase_inventory_recipe = true;

							} else if (inventory[list_index].price > 0 && inventory[list_index].inventory_unit_price > 0) {
								relation_between_purchase_inventory = true;

							} else if (inventory[list_index].inventory_unit_price > 0 && inventory[list_index].recipe_unit_price > 0) {

								relation_between_recipe_inventory = true;
							}

							if (relation_between_purchase_inventory_recipe) {

								purchase_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].price;
								recipe_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].recipe_unit_price;

							} else if (relation_between_purchase_inventory) {
								purchase_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].price;

							}
						} catch(ex) {
						}
inventory[list_index].quantity=purchase_Count;		
inventory[list_index].inventory_unit_qty=qtyField.value;
inventory[list_index].recipe_unit_qty=recipe_Count;
inventory_qty1[list_index]=qtyField.value;
recipe_qty1[list_index]=recipe_Count;
quantity1[list_index]=purchase_Count;
par1[list_index]=parField.value;
order1[list_index]=orderField.value;

					
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id[list_index],
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
							"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][product_id]" : inventory[list_index].product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});

				} else {
					
				
						//logic to map relation
						var relation_between_purchase_inventory_recipe = false;
						var relation_between_purchase_inventory = false;
						var relation_between_recipe_inventory = false;
						var purchase_Count = 0.0;
						var recipe_Count = 0.0;
						try {
							if (inventory[list_index].price > 0 && inventory[list_index].inventory_unit_price > 0 && inventory[list_index].recipe_unit_price > 0) {
								relation_between_purchase_inventory_recipe = true;

							} else if (inventory[list_index].price > 0 && inventory[list_index].inventory_unit_price > 0) {
								relation_between_purchase_inventory = true;

							} else if (inventory[list_index].inventory_unit_price > 0 && inventory[list_index].recipe_unit_price > 0) {

								relation_between_recipe_inventory = true;
							}

							if (relation_between_purchase_inventory_recipe) {

								purchase_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].price;
								recipe_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].recipe_unit_price;

							} else if (relation_between_purchase_inventory) {
								purchase_Count = (inventory[list_index].inventory_unit_price * qtyField.value) / inventory[list_index].price;

							}
						} catch(ex) {
						}
inventory[list_index].quantity=purchase_Count;		
inventory[list_index].inventory_unit_qty=qtyField.value;
inventory[list_index].recipe_unit_qty=recipe_Count;
inventory_qty1[list_index]=qtyField.value;
recipe_qty1[list_index]=recipe_Count;
quantity1[list_index]=purchase_Count;
par1[list_index]=parField.value;
order1[list_index]=orderField.value;

					
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id[list_index],
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
							"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][name]" : inventory[list_index].name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});

				}
				

			} else if (unitType.title == 'Recipe') {
				if (product_id != null) {
					var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_Recipe=false;
						var relation_between_recipe_inventory=false;
									var purchase_Count=0;
var inventory_Count=0;
		try{			
if(inventory[list_index].price>0  && inventory[list_index].inventory_unit_price>0  && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory[list_index].price>0 && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_Recipe=true;

}else if (inventory[list_index].price>0 && inventory[list_index].inventory_unit_price>0 ){
	
	relation_between_recipe_inventory=true;
}


if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].price ;
 inventory_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].inventory_unit_price;
 

}else if(relation_between_purchase_Recipe)
{
 purchase_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].price ;

}
}catch(ex){}

inventory[list_index].quantity=purchase_Count;		
inventory[list_index].inventory_unit_qty=inventory_Count;
inventory[list_index].recipe_unit_qty=qtyField.value;
inventory_qty1[list_index]=inventory_Count;
recipe_qty1[list_index]=qtyField.value;
quantity1[list_index]=purchase_Count;		
par1[list_index]=parField.value;
order1[list_index]=orderField.value;
//end of logic
					
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id[list_index],
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value :0,
							"inventory[items_attributes][][quantity]" : purchase_Count, 
                        	"inventory[items_attributes][][inventory_unit_qty]" :inventory_Count,                 	
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][product_id]" : inventory[list_index].product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});
				} else {
					
					var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_Recipe=false;
						var relation_between_recipe_inventory=false;
									var purchase_Count=0;
var inventory_Count=0;
		try{			
if(inventory[list_index].price>0  && inventory[list_index].inventory_unit_price>0  && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory[list_index].price>0 && inventory[list_index].recipe_unit_price>0)
{
relation_between_purchase_Recipe=true;

}else if (inventory[list_index].price>0 && inventory[list_index].inventory_unit_price>0 ){
	
	relation_between_recipe_inventory=true;
}


if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].price ;
 inventory_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].inventory_unit_price;
 

}else if(relation_between_purchase_Recipe)
{
 purchase_Count=(inventory[list_index].recipe_unit_price * qtyField.value)/inventory[list_index].price ;

}
}catch(ex){}
			
			inventory[list_index].quantity=purchase_Count;		
inventory[list_index].inventory_unit_qty=inventory_Count;
inventory[list_index].recipe_unit_qty=qtyField.value;
inventory_qty1[list_index]=inventory_Count;
recipe_qty1[list_index]=qtyField.value;
quantity1[list_index]=purchase_Count;		
par1[list_index]=parField.value;
order1[list_index]=orderField.value;	
//end of logic
					
					xhr.send({
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id[list_index],
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value :0,
							"inventory[items_attributes][][quantity]" : purchase_Count, 
                        	"inventory[items_attributes][][inventory_unit_qty]" :inventory_Count,                 	
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inventory[list_index].id,
						"inventory[items_attributes][][name]" : inventory[list_index].name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					});
				}
				
			}
		} catch(e) {		}
		
		}//end of saving when data changes for item
	};
