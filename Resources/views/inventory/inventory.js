Ti.include('../shared/default.js');
//Ti.include('autoenter.js');

//Bidyut Nath
//added code for preventing landscape mode.
win.orientationModes = [Titanium.UI.PORTRAIT];

Ti.API.info('User_id: ' + Ti.App.Properties.getString('user_id'));
Ti.API.info('Inventory_id: ' + Ti.App.Properties.getString('inventory_id'));
Ti.API.info('Location_id: ' + win.location_id);
try {
	Ti.App.addEventListener('switchTab', function(e) {
		if (e.tab == 'inventory') {
			win.close();
			hideIndicator();
		}
	});
} catch(e) {
}

var location_id = win.location_id;


var oCnt = 0;
var cCnt = 0;

var dataComplete = [];
var data = [];
var invComplete = [];
var inv = [];

bgFrame(0, 0, 0, 0);
var cancel = Titanium.UI.createButton({
	title : 'Cancel',
	borderRadius : 10,
	color : '#FFFFFF',
	backgroundGradient : {
		type : 'linear',
		colors : ['#698aaa', '#1C4E7E', '#173f6b'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 0,
			y : 40
		},
		backFillStart : false
	},
	borderWidth : 1,
	borderColor : '#112f55'	
});

var navBG2 = Ti.UI.createImageView({
	image : '../../images/nav-icons/cs_navbar.png',
	height : heightt * 0.086,
	width : widthh * 1,
	left : widthh * 0,
	bottom : heightt * 0.0
});

win.add(navBG2);

var flowLbl = Ti.UI.createLabel({
	text : 'Multi-Count',
	textAlign : 'left',
	bottom : heightt * 0.03,
	left : widthh * 0.02,
	font : {
		fontSize : heightt * 0.024,
		fontWeight : 'bold'
	},
	color : '#fff'
});

// autoflow switch
var tf = Titanium.UI.create2DMatrix().scale(0.75);
var flowSwitch = Titanium.UI.createSwitch({
	style : Titanium.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
	bottom : heightt * 0,
	left : widthh * 0.23,
	value : true,
	transform : tf
});

var create = Titanium.UI.createButton({
	title : "Create Item",
	width : widthh * 0.27,
	height : heightt * 0.07,
	bottom : heightt * 0.010,
	right : widthh * 0.03,
	color : '#FFFFFF',
	borderRadius : widthh * 0.04,
	font : {
		fontSize : heightt * 0.025,
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

// set toolbar
var toolbar = Titanium.UI.createView({
	barColor : '#1C4E7E',	
	bottom : 0
	
});
toolbar.add(flowSwitch);
toolbar.add(flowLbl);
toolbar.add(create);
win.add(toolbar);

var navBG = Ti.UI.createImageView({
	image : '../../images/nav-icons/cs_navbar.png',
	height : heightt * 0.08,
	width : widthh * 1,
	left : widthh * 0,
	top : heightt * 0.0
});
var navLabel = Ti.UI.createLabel({
	text : 'Count Inventory',
	font : {
		fontSize : heightt * 0.04,
		fontWeight : 'normal'
	},
	color : '#fff',
	height : heightt * 0.06,
	width : widthh * 0.9,
	left : widthh * 0.35,
	top : heightt * 0.01,
});

win.add(navBG);
win.add(navLabel)

//bidyut nath
// added to take user back to rooms
var backToRoom = Ti.UI.createButton({
	title : 'Rooms',
	width : widthh * 0.27,
	height : heightt * 0.07,
	top : heightt * 0.005,
	left : widthh * 0.03,
	color : '#FFFFFF',
	borderRadius : widthh * 0.04,
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

win.add(backToRoom);

var outstandingLabel = Ti.UI.createLabel({
	text : 'Un-Counted Items',
	top : heightt * 0.1,
	left : widthh * 0.04,
	height : 'auto',
	color : '#fff',
	font : {
		fontSize : heightt * 0.025,
		fontWeight : 'normal'
	}
});

win.add(outstandingLabel);

var cntBox1 = Ti.UI.createImageView({
	top : heightt * 0.094,
	right : widthh * 0.01,
	width : widthh * 0.18,
	height : heightt * 0.06,
	backgroundImage : '../../images/count-box.png'
});
win.add(cntBox1);

var cntBox2 = Ti.UI.createImageView({
	bottom : heightt * 0.43,
	right : widthh * 0.01,
	width : widthh * 0.18,
	height : heightt * 0.06,
	backgroundImage : '../../images/count-box.png'
});
win.add(cntBox2);

var tvOutBg = Ti.UI.createImageView({
	top : heightt * 0.14,
	left : widthh * 0.04,
	right : widthh * 0.04,
	height : heightt * 0.30,
	//height:130,
	bottom : heightt * 0.0133,
	borderRadius : 8,
	borderColor : '#cde',
	backgroundColor : 'transparent',
	backgroundImage : '../../images/tableBG.png'
});
win.add(tvOutBg);

var tvOutstanding = Ti.UI.createTableView({
	top : heightt * 0.14,
	left : widthh * 0.04,
	right : widthh * 0.04,
	height : heightt * 0.30,
	//height:128,
	bottom : heightt * 0.0133,
	rowHeight : 32,
	borderWidth : 1,
	borderRadius : 8,
	separatorColor : '#aaa',
	backgroundColor : 'transparent',
	borderColor : '#999',
	editable : true,
	allowsSelectionDuringEditing : true,
	deleteButtonTitle : "Remove"
});

var tvBg = Ti.UI.createImageView({
	bottom : heightt * 0.128,
	left : widthh * 0.04,
	right : widthh * 0.04,
	height : heightt * 0.32,
	borderRadius : 8,
	borderColor : '#cde',
	backgroundColor : 'transparent',
	backgroundImage : '../../images/tableBG.png'
});
win.add(tvBg);

var tvCompleted = Ti.UI.createTableView({
	bottom : heightt * 0.128,
	left : widthh * 0.04,
	right : widthh * 0.04,
	height : heightt * 0.32,
	borderWidth : 1,
	borderRadius : 8,
	rowHeight : 32,
	separatorColor : '#aaa',
	backgroundColor : 'transparent',
	borderColor : '#999'
});

//get unit names

units = _.groupBy(JSON.parse(Ti.App.Properties.getString('units')), function(e) {
	return e.id
});
categories = _.groupBy(JSON.parse(Ti.App.Properties.getString('categories')), function(e) {
	return e.id
});

function setData() {
	try {

		invComplete = [];
		//win.add(spacer); //it was unnecessary in android.
		inv = [];
		dataComplete = [];
		data = [];
		Ti.API.info('reloading...');
		tvOutstanding.data = data;
		tvCompleted.data = dataComplete;

		oCnt = 0;
		cCnt = 0;
		//get all items including counted and un-counted

		var test = Ti.App.Properties.getString("currInventory");

	
		var items = JSON.parse(Ti.App.Properties.getString("currInventory"));
		
		for ( i = 0; i < items[location_id].length; i++) {
			var row = Titanium.UI.createTableViewRow({
				productitem : '',
				productunit : '',
				productid : 0,
				unitname : '',
				unit_id : 0,
				location_id : 1,
				inv_id : 0,
				height : heightt * 0.058
			});
			//get one by one product
			var product = items[location_id][i];

			var unit = 'units';
			unit_id = product.unit_id;
			if (unit_id == null || unit_id == undefined || unit_id == 0) {
				unit = 'No Unit';
			} else {
				//get all unit names
				unit = units[unit_id][0].name;
			}

			var p_name = product.product ? product.product.name : product.name
			var productitem = Titanium.UI.createLabel({
				text : p_name,
				font : {
					fontSize : heightt * 0.02,
					fontWeight : 'normal'
				},
				width : 0.7 * widthh,
				textAlign : 'left',
				top : (p_name.length >= 26) ? 0.01 * heightt : 0.015 * heightt, //6,
				left : 0.1 * widthh, //10,
				color : '#000000',
				height : 'auto' //height:16
			});
			var thumb_id = product.product ? product.product.category_id : 0;
			Ti.API.info('product.category_i=' + product.category_id);

			var catThumb = Titanium.UI.createImageView({
				image : prodImg(product, 'medium'),
				left : 0.01 * widthh,
				top : 0.01 * heightt,
				width : 0.045 * heightt,
				height : 0.045 * heightt,
				borderRadius : 6,
				backgroundColor : '#BBBBC0',
				preventDefaultImage : true,
			});

			if (product.quantity != null || (product.inventory_unit_qty != 0 && product.inventory_unit_qty != null) || (product.recipe_unit_qty != 0 && product.recipe_unit_qty != null)) {
				var temp = 0;
				temp = product.quantity;
				//only product that is counted

				if (temp == null) {
					temp = 0;

				}
				var productunit = Ti.UI.createLabel({
					text : temp + ' ' + unit,
					textAlign : 'right',
					font : {
						fontSize : heightt * 0.02,
						fontWeight : 'normal'
					},
					//left : 0.85,
					right : 0.01 * widthh,
					height : 0.16 * heightt,
					color : 'black'
				});

				invComplete.push(product);
				row.add(catThumb);
				row.add(productitem);
				row.add(productunit);
				row.productitem = productitem;
				//assign Labels to row properties
				row.productunit = productunit;
				row.productid = product.product_id;
				row.catid = thumb_id;
				row.unitname = unit;
				row.unitid = unit_id;
				row.location_id = location_id;
				row.inv_id = product.id;
				row.product_qty = product.quantity;
				row.product_order = product.order;
				row.product_par = product.par;
				row.product_img = prodImg(product, 'medium');
				try {
					var unit2 = 'units';
					unit_id = product.inventory_unit_id;
					if (unit_id == null || unit_id == undefined || unit_id == 0) {
						unit2 = 'No Unit';
					} else {
						//get all unit names
						unit2 = units[unit_id][0].name;
					}
				} catch(e) {
				}
				try {
					var unit3 = 'units';
					unit_id = product.recipe_unit_id;
					if (unit_id == null || unit_id == undefined || unit_id == 0) {
						unit3 = 'No Unit';
					} else {
						//get all unit names
						unit3 = units[unit_id][0].name;
					}
				} catch(e) {
				}

				row.product_inventory_id = product.inventory_unit_id;

				row.product_inventory_qty = product.inventory_unit_qty;
				row.product_inventory_unit = unit2;
				row.product_recipe_id = product.recipe_unit_id;
				row.product_recipe_qty = product.recipe_unit_qty;
				row.product_recipe_unit = unit3;
				row.product_price = product.price;
				row.product_inventory_price = product.inventory_unit_price;
				row.product_recipe_price = product.recipe_unit_price;

				dataComplete.push(row);
				cCnt++;
			} else {
				inv.push(product);
				row.add(catThumb);
				row.add(productitem);
				row.productitem = productitem;				
				row.productid = product.product_id;
				row.catid = thumb_id;
				row.unitname = unit;
				row.unitid = unit_id;
				row.location_id = location_id;
				row.inv_id = product.id;
				row.product_order = product.order;
				row.product_par = product.par;
				row.product_qty = null;
				row.product_img = prodImg(product, 'medium');
				try {
					row.product_inventory_id = null;
					row.product_inventory_qty = null;
					row.product_inventory_unit = null;
					row.product_recipe_id = null;
					row.product_recipe_qty = null;
					row.product_recipe_unit = null;
					row.product_price = product.price;
					row.product_inventory_price = product.inventory_unit_price;
					row.product_recipe_price = product.recipe_unit_price;
				} catch(e) {
				}
				data.push(row);
				oCnt++;
			}
		}
		if (data.length == 0) {
			for ( i = 0; i < 4; i++) {
				
			}
		}
		if (dataComplete.length == 0) {
			for ( i = 0; i < 4; i++) {
				
			}
		}
		tvOutstanding.setData(data);
		tvCompleted.setData(dataComplete);
		//invCounts();
		oCountLabel.text = oCnt;
		// number of Un-Counted products
		cCountLabel.text = cCnt;
		//number of counted products

	} catch(e) {
	}
}

try {
	tvOutstanding.addEventListener('click', function(e) {
		loadingIndicator.show();

		setTimeout(function() {
			loadingIndicator.hide();
		}, 500);

		popWin(e, 'edit');
	});
} catch(e) {
}
//bidyut nath
//added to take user back to rooms page.
try {
	backToRoom.addEventListener('click', function(e) {
		e.source.width = widthh * 0.31;
		e.source.height = heightt * 0.07;

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
			e.source.width = widthh * 0.27;
			e.source.height = heightt * 0.07;
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

		win.close();
	});
} catch(e) {
}
try {
	// add delete event listener
	tvOutstanding.addEventListener('delete', function(e) {
		var s = e.section;
		Ti.API.info('rows ' + s.rows + ' rowCount ' + s.rowCount + ' headerTitle ' + s.headerTitle + ' title ' + e.rowData.productitem.text);
		Titanium.API.info("deleted - row=" + e.row + ", index=" + e.index + ", section=" + e.section + ' inv_id ' + e.rowData.inv_id);

		var destroy_id = e.rowData.inv_id;
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Yes', 'No!'],
			message : "Are you really sure you want to permanently remove \n" + e.rowData.productitem.text + "\n from your inventory?",
			title : 'Removing Product'
		});
		dialog.show();
		dialog.addEventListener('click', function(e) {

			alert("Implementation in process");
			/* 31st
			 if(e.index == 0){
			 // send destroy attribute
			 var xhr = Titanium.Network.createHTTPClient();
			 xhr.onerror = function(e) {
			 Ti.API.info("post error:" + e.error);

			 };
			 // newer method - post directly to inventory
			 xhr.open("PUT", url('/api/v1/inventories/'+Ti.App.Properties.getString('inventory_id')+'.json'));
			 xhr.send({
			 "utf8":"✓",
			 "inventory[items_attributes][][id]":destroy_id,
			 "inventory[items_attributes][][_destroy]":1,
			 "commit":"Update Inventory"
			 });
			 Ti.App.fireEvent('refresh', { tab: 'inventories' });
			 } else {
			 setData();
			 }
			 */
		});
	});
} catch(e) {
}
win.add(tvOutstanding);
//setData();

var completeLabel = Ti.UI.createLabel({
	//text:'Completed Items',
	text : 'Purchase Unit Counted Items',
	font : {
		fontSize : heightt * 0.025,
		fontWeight : 'normal'
	},
	bottom : heightt * 0.46,
	left : widthh * 0.05,
	height : 'auto',
	color : '#fff'
});
win.add(completeLabel);


var oCountLabel = Ti.UI.createLabel({
	font : {
		fontSize : heightt * 0.025,
		fontWeight : 'bold'
	},
	text : oCnt,
	top : heightt * 0.105,
	right : widthh * 0.072,
	color : '#C52',
	height : 'auto',
	width : 'auto'
});
win.add(oCountLabel);

var cCountLabel = Ti.UI.createLabel({
	font : {
		fontSize : heightt * 0.025,
		fontWeight : 'bold'
	},
	text : cCnt,
	bottom : heightt * 0.445,
	right : widthh * 0.073,
	color : '#C52',
	height : 'auto',
	width : 'auto'
});
win.add(cCountLabel);


try {
	tvCompleted.addEventListener('click', function(e) {
		loadingIndicator.show();
		setTimeout(function() {
			loadingIndicator.hide();
		}, 500);
		popWin(e, 'edit');
	});
} catch(e) {
}

function popWin(e, popType) {

	if ((e.rowData && e.row.productitem.text) || popType == 'create') {

		var pHeader = '';
		var pUrl = '../inventory/add.js';
		var pHeight = '49%';
		var autoFlow = false;
		var pUnit = '';
		var pId = '';
		var pQty = null;
		var pPar = null;
		var pOrder = null;
		var pImg = '';
		var pUid = '';
		var pCatId = '';
		var bgColor = '#eee';
		var bColor = '#666';
		var bWidth = 1;
		var inventory = [];
		var invId = '';
		var rInventory_unit_qty = '';
		var rInventory_unit_id = '';
		var rInventory_unit = "";
		var rRecipe_unit_id = '';
		var rRecipe_unit_qty = '';
		var rRecipe_unit = '';

		var rProduct_price = 0.0;
		var rInventory_unit_price = 0.0;
		var rRecipe_unit_price = 0.0;
		var t = Titanium.UI.create2DMatrix();
		t = t.scale(0);

		if (flowSwitch.value == true) {			
			autoFlow = true;
		}

		if (popType == 'edit') {
			pHeader = e.row.productitem.text;
			pUrl = '../inventory/enter.js';
			pHeight = '49%';
			pId = e.row.productid;
			pUnit = e.row.unitname;
			pQty = e.row.product_qty;
			pUid = e.row.unit_id;
			pCatId = e.row.catid;
			pOrder = e.row.product_order;
			pPar = e.row.product_par;
			invId = e.row.inv_id;
			pImg = e.row.product_img;
			rInventory_unit_qty = e.row.product_inventory_qty;
			rInventory_unit_id = e.row.product_inventory_id;
			rInventory_unit = e.row.product_inventory_unit;
			rRecipe_unit_id = e.row.product_recipe_id;
			rRecipe_unit_qty = e.row.product_recipe_qty;
			rRecipe_unit = e.row.product_recipe_unit;
			rProduct_price = e.row.product_price;
			rInventory_unit_price = e.row.product_inventory_price;
			rRecipe_unit_price = e.row.product_recipe_price;
		}

		if (autoFlow == true && popType == 'edit') {

			if (e.row.productunit) {
				inventory = invComplete;
			} else {
				inventory = inv;
			}

			pUrl = '../inventory/autoenter.js';
			bgColor = 'transparent';
			bColor = bgColor;
			bWidth = 0;
		}

		if (popType == 'create') {
			location_id = location_id;			
			pUrl = '../inventory/addcreate.js';
			pHeight = '95%';
		}

		var win2 = Titanium.UI.createWindow({

			url : pUrl,
			backgroundColor : '#eee',
			top : heightt * 0.001,
			left : widthh * 0.01,
			right : widthh * 0.01,
			height : pHeight,
			borderRadius : 10,
			opacity : 0.95,			
			product_name : pHeader,
			product_id : pId,
			product_unit : pUnit,
			product_unit_id : pUid,
			product_par : pPar,
			product_order : pOrder,
			product_qty : pQty,
			category_id : pCatId,
			list_index : e.index,			
			inventory : inventory,
			location_id : location_id,
			product_img : pImg,
			inv_id : invId,
			pInventory_unit_qty : rInventory_unit_qty,
			pInventory_unit_id : rInventory_unit_id,
			pInventory_unit : rInventory_unit,
			pRecipe_unit_id : rRecipe_unit_id,
			pRecipe_unit_qty : rRecipe_unit_qty,
			pRecipe_unit : rRecipe_unit,
			pInventory_unit_price : rInventory_unit_price,
			pRecipe_unit_price : rRecipe_unit_price,
			pProduct_price : rProduct_price,
			autoFlow : autoFlow,
			navBarHidden : true //added on 12_feb to disable titlebar of 'add new item' window.
		});

		// create first transform to go beyond normal size

		var a = Titanium.UI.createAnimation();
		//a.transform = t1;
		a.duration = 200;

		win2.add(bg);
		win2.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;		
		win2.open(a);

	} //if ends
}

var bg = Titanium.UI.createView({
	width : '100%',
	height : '100%',
	backgroundColor : '#000'
	//	opacity: 0.5
});

function getGrpInv() {

	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(e) {
		//alert("gotcha");
		var items = JSON.parse(this.responseText);
		var invGrp = _.groupBy(items.items, function(e) {
			return e.location_id
		});
		var invData = _.toArray(invGrp);
		Ti.App.Properties.setString("currInventory", JSON.stringify(invGrp));

		setData();
	};
	xhr.onerror = function(e) {

		Ti.API.info("post error:" + e.error);
	};
	xhr.open('GET', global_url + "/api/v1/inventories/" + Ti.App.Properties.getString('inventory_id') + ".json" + token_variable);
	xhr.send();
};

try {
	Ti.App.addEventListener('popClose', function(e) {
		win.remove(bg);
		getGrpInv();
	});
} catch(e) {
}

win.add(tvCompleted);


try {
	win.addEventListener("focus", function(event, type) {
		setData();
	});
} catch(e) {
}

try {
	create.addEventListener('click', function(e) {
		loadingIndicator.show();
		setTimeout(function() {
			loadingIndicator.hide();
		}, 500);

		e.source.width = widthh * 0.285;
		e.source.height = heightt * 0.067;
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
			e.source.width = widthh * 0.27;
			e.source.height = heightt * 0.07;
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

		popWin(e, 'create');
	});
} catch(e) {
}

