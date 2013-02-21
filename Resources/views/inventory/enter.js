Ti.include('../shared/default.js');
var product_name = win.product_name;
var inv_id = win.inv_id;
var product_id = win.product_id;
var product_unit = win.product_unit;
var product_unit_id = win.product_unit_id;
var category_id = win.category_id;
var location_id = win.location_id;
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
var if_changed_save=false;



var product_price = win.pProduct_price;  			
var inventory_unit_price = win.pInventory_unit_price;
var recipe_unit_price  =  win.pRecipe_unit_price;	

Ti.API.info("inv_id:"+inv_id);


var catBG = Titanium.UI.createImageView({    	
    	image:cropImage(product_img,heightt*0.708, widthh*1.063, heightt*0.715, widthh*0.75),
		right:widthh*0,
		top:heightt * 0,
		height : heightt * 0.50,
		opacity:1,		
		preventDefaultImage:true
	});
	win.add(catBG);


var bg = Titanium.UI.createView({
	top:heightt * 0.021,
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
  top:heightt * 0.227,
  left:widthh *0.16,
   maxLength:10,
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
  height:heightt * 0.055,
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
	height:heightt *0.08,
	width:widthh * 1,
	left:widthh * 0,
	bottom:heightt *0.544
});


win.add(navBG2);

	
var unitTypeLabel = Ti.UI.createLabel({
	text:"Select Unit Type -",
	textAlign:'left',
	//bottom : heightt * 0.49,
	bottom : heightt * 0.563,
	left:widthh *0.03,
	font : {
				fontSize : heightt * 0.03,
				fontWeight : 'bold'
			},
	color:'#fff'
});
win.add(unitTypeLabel);
	

var unitType = Titanium.UI.createButton({	 
	title:"Purchase",                
	width : widthh * 0.35,
	height : heightt *0.065,
	bottom : heightt * 0.554,
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
 
 win.add(unitType);
 
try{
	unitType.addEventListener('click', function(e) {

		if (if_changed_save) {
			return;
		}
		e.source.height = heightt * 0.055;
		e.source.width = widthh * 0.4;

		if (clickedT == 1) {
			if (inventory_unit_qty != null) {
				qtyField.hintText = inventory_unit_qty + "";
				unitLabel.text = inventory_unit + "";
				unitType.title = "Inventory";
				clickedT = 2;
			} else if (recipe_unit_qty != null) {
				qtyField.hintText = recipe_unit_qty + "";
				unitLabel.text = recipe_unit + "";
				unitType.title = "Recipe";
				clickedT = 3;
			} else {

				qtyField.hintText = product_qty + "";
				unitLabel.text = product_unit + "";
				unitType.title = "Purchase";
			}

		} else if (clickedT == 2) {
			if (recipe_unit_qty != null) {
				qtyField.hintText = recipe_unit_qty + "";
				unitLabel.text = recipe_unit + "";
				unitType.title = "Recipe";
				clickedT = 3;
			} else {
				qtyField.hintText = product_qty + "";
				unitLabel.text = product_unit + "";
				unitType.title = "Purchase";
			}

		} else {
			clickedT = 1;
			try {
				qtyField.hintText = product_qty + "";
				unitLabel.text = product_unit + "";
				unitType.title = "Purchase";

			} catch(e) {

			}

		}

		if (qtyField.value == 'null' || qtyField.hintText == 'null') {
			qtyField.hintText = '0';
			qtyField.value = '';
		}

		setTimeout(function() {
			e.source.height = heightt * 0.065;
			e.source.width = widthh * 0.35;
		}, 1000);

	});
}catch(e){}
 
 var once_q = false;
 var once_p = false;
 
try{
qtyField.addEventListener('change', function(e) {
		if_changed_save=true;
		
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
			}
			var z= parseInt(calc);
			orderField.value = (z >=0) ? z+"":0+"";
			if(orderField.value=='NaN'){
				orderField.value=0;
			}		
		}
		if(qtyField.value==0||qtyField.value==''){			
			if_changed_save=false;
		}
	});
}catch(e){}
try{
	parField.addEventListener('change', function(e) {
	if_changed_save=true;
	if(qtyField.value==''){
	qtyField.value = qtyField.hintText+'';
		}
		if(e.value && (qtyField.value || qtyField.hintText !="Count")) {			
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
	var e= parseInt(calc);
			orderField.value = (e <=0) ? 0+"":e+"";
			if(orderField.value=='NaN'){
				orderField.value=0;
			}			
		}
	});
	}catch(e){}


var invBtn = Titanium.UI.createButton({
	title : 'Save',
	width : widthh * 0.24,
	height : heightt *0.065,
	bottom : heightt * 0.474,
	left : widthh * 0.03,
	color : '#FFFFFF',
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


var nxtBtn =  Titanium.UI.createButton({
	title:'Skip'	
});

var cancelBtn =  Titanium.UI.createButton({
	title:'Cancel',
		width : widthh * 0.24,
			height : heightt *0.065,	
			bottom: heightt * 0.474,
		right : widthh *0.03,
			color : '#FFFFFF',
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

var flowLbl = Ti.UI.createLabel({
	text: 'Auto Flow',
	textAlign:'center',
	font:{fontWeight:'bold',fontSize:12},
	color:'#fff'
});

win.add(invBtn);
win.add(cancelBtn);

//Bidyut Nath
cancelBtn.addEventListener('click', function(e) {
	e.source.height=heightt * 0.06;
	e.source.width=widthh * 0.3;			
	//Ti.App.fireEvent('popClose');
	Ti.UI.Android.hideSoftKeyboard();
	win.close();	
});

win.addEventListener('swipe', enterItem);

//Bidyut Nath
invBtn.addEventListener('click', function(e) {	
	Ti.UI.Android.hideSoftKeyboard();
	loadingIndicator.show();
	setTimeout(function() {
		loadingIndicator.hide();
	}, 500); 	
	e.source.height=heightt * 0.06;
	e.source.width=widthh * 0.3;
	enterItem();
	
	Ti.UI.Android.hideSoftKeyboard();
	setTimeout(function() {
    e.source.height=heightt * 0.065;
	e.source.width=widthh * 0.24;	
}, 6000);	
});


function enterItem() {
	if (if_changed_save) {
		var inventory_Count = 0.0;
		var recipe_Count = 0.0;

		inventory_Count = (product_price * qtyField.value) / inventory_unit_price;
		recipe_Count = (product_price * qtyField.value) / recipe_unit_price;		
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(e) {
			Ti.App.fireEvent('popClose');
			win.close();
		};
		xhr.onerror = function(e) {
			Ti.API.info("post error:" + e.error);

		};

		xhr.open("PUT", global_url + '/manager/inventories/' + Ti.App.Properties.getString('inventory_id') + '.json' + token_variable);

		try {
			if (unitType.title == 'Purchase') {
				if (product_id > 0) {

					var relation_between_purchase_inventory_recipe = false;
					var relation_between_purchase_inventory = false;
					var relation_between_purchase_recipe = false;

					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (product_price > 0 && inventory_unit_price > 0) {
							relation_between_purchase_inventory = true;

						} else if (product_price > 0 && recipe_unit_price > 0) {

							relation_between_purchase_recipe = true;
						}

						if (relation_between_purchase_inventory_recipe) {

						} else if (relation_between_purchase_inventory) {
							inventory_Count = (product_price * qtyField.value) / inventory_unit_price;

						} else if (relation_between_purchase_recipe) {
							recipe_Count = (product_price * qtyField.value) / recipe_unit_price;

						}

					} catch(exx) {
					}

					var params = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":product_unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
					xhr.send(params);

				} else {

					var relation_between_purchase_inventory_recipe = false;
					var relation_between_purchase_inventory = false;
					var relation_between_purchase_recipe = false;

					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (product_price > 0 && inventory_unit_price > 0) {
							relation_between_purchase_inventory = true;

						} else if (product_price > 0 && recipe_unit_price > 0) {

							relation_between_purchase_recipe = true;
						}

						if (relation_between_purchase_inventory_recipe) {

						} else if (relation_between_purchase_inventory) {
							inventory_Count = (product_price * qtyField.value) / inventory_unit_price;

						} else if (relation_between_purchase_recipe) {
							recipe_Count = (product_price * qtyField.value) / recipe_unit_price;

						}

					} catch(exx) {
					}

					var params = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":product_unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
					xhr.send(params);

				}
			} else if (unitType.title == 'Inventory') {

				if (product_id > 0) {
					var relation_between_purchase_inventory_recipe = false;
					var relation_between_purchase_inventory = false;
					var relation_between_recipe_inventory = false;
					var purchase_Count = 0.0;
					var recipe_Count = 0.0;

					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (inventory_unit_price > 0 && product_price > 0) {
							relation_between_purchase_inventory = true;

						} else if (inventory_unit_price > 0 && recipe_unit_price > 0) {

							relation_between_recipe_inventory = true;
						}

						if (relation_between_purchase_inventory_recipe) {

							purchase_Count = (inventory_unit_price * qtyField.value) / product_price;
							recipe_Count = (inventory_unit_price * qtyField.value) / recipe_unit_price;

						} else if (relation_between_purchase_inventory) {
							purchase_Count = (inventory_unit_price * qtyField.value) / product_price;

						}
					} catch(exx) {
					}

					var parms2 = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id,
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
						"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					}
					xhr.send(parms2);
				} else {

					var relation_between_purchase_inventory_recipe = false;
					var relation_between_purchase_inventory = false;
					var relation_between_recipe_inventory = false;
					var purchase_Count = 0.0;
					var recipe_Count = 0.0;

					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (inventory_unit_price > 0 && product_price > 0) {
							relation_between_purchase_inventory = true;

						} else if (inventory_unit_price > 0 && recipe_unit_price > 0) {

							relation_between_recipe_inventory = true;
						}

						if (relation_between_purchase_inventory_recipe) {

							purchase_Count = (inventory_unit_price * qtyField.value) / product_price;
							recipe_Count = (inventory_unit_price * qtyField.value) / recipe_unit_price;

						} else if (relation_between_purchase_inventory) {
							purchase_Count = (inventory_unit_price * qtyField.value) / product_price;

						}
					} catch(exx) {
					}

					var parms2 = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id,
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
						"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					}
					xhr.send(parms2);

				}

			} else if (unitType.title == 'Recipe') {
				if (product_id > 0) {
					var relation_between_purchase_inventory_recipe = false;
					var relation_between_recipe_inventory = false;
					var relation_between_purchase_recipe = false;
					var purchase_Count = 0.0;
					var inventory_Count = 0.0;
					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (recipe_unit_price > 0 && product_price > 0) {
							relation_between_purchase_recipe = true;

						} else if (inventory_unit_price > 0 && recipe_unit_price > 0) {

							relation_between_recipe_inventory = true;
						}

						if (relation_between_purchase_inventory_recipe) {
							purchase_Count = (recipe_unit_price * qtyField.value) / product_price;
							inventory_Count = (recipe_unit_price * qtyField.value) / inventory_unit_price;

						} else if (relation_between_purchase_recipe) {
							purchase_Count = (recipe_unit_price * qtyField.value) / product_price;

						}
					} catch(exx) {
					}
					var params3 = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id,
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
					xhr.send(params3);
				} else {
					var relation_between_purchase_inventory_recipe = false;
					var relation_between_recipe_inventory = false;
					var relation_between_purchase_recipe = false;
					var purchase_Count = 0.0;
					var inventory_Count = 0.0;
					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (recipe_unit_price > 0 && product_price > 0) {
							relation_between_purchase_recipe = true;

						} else if (inventory_unit_price > 0 && recipe_unit_price > 0) {

							relation_between_recipe_inventory = true;
						}

						if (relation_between_purchase_inventory_recipe) {
							purchase_Count = (recipe_unit_price * qtyField.value) / product_price;
							inventory_Count = (recipe_unit_price * qtyField.value) / inventory_unit_price;

						} else if (relation_between_purchase_recipe) {
							purchase_Count = (recipe_unit_price * qtyField.value) / product_price;

						}
					} catch(exx) {
					}
					var params3 = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id,
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
					xhr.send(params3);
				}

			}
		} catch(e) {
		}
	} else {
		Ti.App.fireEvent('popClose');
		win.close();
	}

};



function enterItem2() {
	if (if_changed_save) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(e) {

		};
		xhr.onerror = function(e) {
			Ti.API.info("post error:" + e.error);
		};
		xhr.open("PUT", url('/manager/inventories/' + Ti.App.Properties.getString('inventory_id') + '.json'));

		try {
			if (unitType.title == 'Purchase') {
				if (product_id > 0) {

					var relation_between_purchase_inventory_recipe = false;
					var relation_between_purchase_inventory = false;
					var relation_between_purchase_recipe = false;

					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (product_price > 0 && inventory_unit_price > 0) {
							relation_between_purchase_inventory = true;

						} else if (product_price > 0 && recipe_unit_price > 0) {

							relation_between_purchase_recipe = true;
						}

						if (relation_between_purchase_inventory_recipe) {

						} else if (relation_between_purchase_inventory) {
							inventory_Count = (product_price * qtyField.value) / inventory_unit_price;

						} else if (relation_between_purchase_recipe) {
							recipe_Count = (product_price * qtyField.value) / recipe_unit_price;

						}

					} catch(exx) {
					}

					var params = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":product_unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
					xhr.send(params);

				} else {

					var relation_between_purchase_inventory_recipe = false;
					var relation_between_purchase_inventory = false;
					var relation_between_purchase_recipe = false;

					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (product_price > 0 && inventory_unit_price > 0) {
							relation_between_purchase_inventory = true;

						} else if (product_price > 0 && recipe_unit_price > 0) {

							relation_between_purchase_recipe = true;
						}

						if (relation_between_purchase_inventory_recipe) {

						} else if (relation_between_purchase_inventory) {
							inventory_Count = (product_price * qtyField.value) / inventory_unit_price;

						} else if (relation_between_purchase_recipe) {
							recipe_Count = (product_price * qtyField.value) / recipe_unit_price;

						}

					} catch(exx) {
					}

					var params = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":product_unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
					xhr.send(params);

				}
			} else if (unitType.title == 'Inventory') {

				if (product_id > 0) {
					var relation_between_purchase_inventory_recipe = false;
					var relation_between_purchase_inventory = false;
					var relation_between_recipe_inventory = false;
					var purchase_Count = 0.0;
					var recipe_Count = 0.0;

					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (inventory_unit_price > 0 && product_price > 0) {
							relation_between_purchase_inventory = true;

						} else if (inventory_unit_price > 0 && recipe_unit_price > 0) {

							relation_between_recipe_inventory = true;
						}

						if (relation_between_purchase_inventory_recipe) {

							purchase_Count = (inventory_unit_price * qtyField.value) / product_price;
							recipe_Count = (inventory_unit_price * qtyField.value) / recipe_unit_price;

						} else if (relation_between_purchase_inventory) {
							purchase_Count = (inventory_unit_price * qtyField.value) / product_price;

						}
					} catch(exx) {
					}

					var parms2 = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id,
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
						"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					}
					xhr.send(parms2);
				} else {

					var relation_between_purchase_inventory_recipe = false;
					var relation_between_purchase_inventory = false;
					var relation_between_recipe_inventory = false;
					var purchase_Count = 0.0;
					var recipe_Count = 0.0;

					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (inventory_unit_price > 0 && product_price > 0) {
							relation_between_purchase_inventory = true;

						} else if (inventory_unit_price > 0 && recipe_unit_price > 0) {

							relation_between_recipe_inventory = true;
						}

						if (relation_between_purchase_inventory_recipe) {

							purchase_Count = (inventory_unit_price * qtyField.value) / product_price;
							recipe_Count = (inventory_unit_price * qtyField.value) / recipe_unit_price;

						} else if (relation_between_purchase_inventory) {
							purchase_Count = (inventory_unit_price * qtyField.value) / product_price;

						}
					} catch(exx) {
					}

					var parms2 = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id,
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
						"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					}
					xhr.send(parms2);

				}

			} else if (unitType.title == 'Recipe') {
				if (product_id > 0) {
					var relation_between_purchase_inventory_recipe = false;
					var relation_between_recipe_inventory = false;
					var relation_between_purchase_recipe = false;
					var purchase_Count = 0.0;
					var inventory_Count = 0.0;
					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (recipe_unit_price > 0 && product_price > 0) {
							relation_between_purchase_recipe = true;

						} else if (inventory_unit_price > 0 && recipe_unit_price > 0) {

							relation_between_recipe_inventory = true;
						}

						if (relation_between_purchase_inventory_recipe) {
							purchase_Count = (recipe_unit_price * qtyField.value) / product_price;
							inventory_Count = (recipe_unit_price * qtyField.value) / inventory_unit_price;

						} else if (relation_between_purchase_recipe) {
							purchase_Count = (recipe_unit_price * qtyField.value) / product_price;

						}
					} catch(exx) {
					}
					var params3 = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id,
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
					xhr.send(params3);
				} else {
					var relation_between_purchase_inventory_recipe = false;
					var relation_between_recipe_inventory = false;
					var relation_between_purchase_recipe = false;
					var purchase_Count = 0.0;
					var inventory_Count = 0.0;
					try {
						if (product_price > 0 && inventory_unit_price > 0 && recipe_unit_price > 0) {
							relation_between_purchase_inventory_recipe = true;

						} else if (recipe_unit_price > 0 && product_price > 0) {
							relation_between_purchase_recipe = true;

						} else if (inventory_unit_price > 0 && recipe_unit_price > 0) {

							relation_between_recipe_inventory = true;
						}

						if (relation_between_purchase_inventory_recipe) {
							purchase_Count = (recipe_unit_price * qtyField.value) / product_price;
							inventory_Count = (recipe_unit_price * qtyField.value) / inventory_unit_price;

						} else if (relation_between_purchase_recipe) {
							purchase_Count = (recipe_unit_price * qtyField.value) / product_price;

						}
					} catch(exx) {
					}
					var params3 = {
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id,
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][quantity]" : purchase_Count,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
					xhr.send(params3);
				}

			}
		} catch(e) {
		}
	}
};
