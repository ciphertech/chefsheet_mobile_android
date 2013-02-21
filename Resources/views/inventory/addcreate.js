Ti.include('../shared/default.js');
var product_name = win.product_name;
var prod_id = 0;
var prod_name = '';
var unit_id = 0;
var category_id = 0;
var location_id = win.location_id;
var inventory = win.inventory;
bgFrame(0, 0, 0, 0);

var item_names = [];

var items = JSON.parse(Ti.App.Properties.getString("currInventory"));

for ( i = 0; i < items[location_id].length; i++) {
	item_names[i] = items[location_id][i].name + '';
}

win.addEventListener('open', function() {
	try {
		setTimeout(function() {
			loadingIndicator.hide();
		}, 250);
	} catch(e) {
	}

});

var navLabel = Ti.UI.createLabel({
	text : 'Add or Create a New Item',
	font : {
		fontSize : heightt * 0.04,
		fontWeight : 'normal'
	},
	color : '#000',
	height : heightt * 0.06,
	width : widthh * 0.9,
	left : widthh * 0.05,
	top : heightt * 0.01,
});

win.add(navLabel)

units = _.sortBy(JSON.parse(Ti.App.Properties.getString('units')), function(e) {
	return e.id
});

catPickerList = _.sortBy(JSON.parse(Ti.App.Properties.getString('categories')), function(e) {
	return e.id
});

categories = _.groupBy(JSON.parse(Ti.App.Properties.getString('categories')), function(e) {
	return e.id
});

Ti.API.info("units.length:" + units.length);
Ti.API.info("catPickerList.length:" + catPickerList.length);

var tvBg = Ti.UI.createImageView({
	bottom : heightt * 0.35,
	left : widthh * 0.04,
	right : widthh * 0.04,
	top : heightt * 0.18,
	borderWidth : 1,
	borderRadius : 8,
	borderColor : '#cde',
	backgroundColor : 'transparent',
	backgroundImage : '../../images/tableBG.png',
	opacity : 0.5
});
win.add(tvBg);

var tableview = Titanium.UI.createTableView({
	bottom : heightt * 0.35,
	left : widthh * 0.04,
	right : widthh * 0.04,
	top : heightt * 0.18,
	borderWidth : 1,
	borderRadius : 8,
	borderColor : '#999',
	rowHeight : 32,
	separatorColor : '#aaa',
	backgroundColor : 'transparent',
});

//create table view event listener
try {
	tableview.addEventListener('click', function(e) {
		// update nameField, categoryPicker and unitPicker
		nameField.value = e.row.productitem;
		prod_name = e.row.productitem;
		prod_id = e.row.product_id;
		for ( i = 0; i < units.length; i++) {
			if (units[i].id == e.row.unit_id) {
				picker1.setSelectedRow(1, i, true);
			}
		}
		var setCat = false;
		for ( i = 0; i < catPickerList.length; i++) {
			if (catPickerList[i].restaurant_id == null || Number(catPickerList[i].restaurant_id) == Number(r_id)) {
				if (catPickerList[i].id == e.row.category_id) {
					picker1.setSelectedRow(0, i + 1, true);
					setCat = true;
				}
			}
		}
		if (!setCat) {
			picker.setSelectedRow(0, 0, true);
		}
		nameField.blur();
	});

} catch(e) {
}
win.add(tableview);

var invBtn = Titanium.UI.createButton({
	title : 'Save',

	visible : false,
	left : widthh * 0.04,
	width : widthh * 0.27,
	height : heightt * 0.07,
	bottom : heightt * 0.010,
	color : '#FFF',

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

var cancelBtn = Titanium.UI.createButton({
	title : 'Cancel',
	color : '#FFF',
	bottom : heightt * 0.010,
	right : widthh * 0.04,
	width : widthh * 0.27,
	height : heightt * 0.07,
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

var spacer = Titanium.UI.createButton({
});
var nameField = Titanium.UI.createSearchBar({
	barColor : '#000',
	showCancel : false,
	hintText : 'Type and Select an Item Name',
	height : heightt * 0.080,
	top : heightt * 0.085,
	//borderRadius: widthh *0.07,
	borderWidth : 1,
	width : widthh * 0.95
});

win.add(nameField);
try {
	nameField.addEventListener('change', function(e) {

		if ((category_id > 0) && (unit_id > 0) && (nameField.value.length > 0)) {
			invBtn.visible = true;
		} else {
			invBtn.visible = false;
		}
	});
} catch(e) {
}

try {
	nameField.addEventListener('return', function(e) {
		if (nameField.value != '') {
			Titanium.App.fireEvent('show_indicator');
			tableview.setData([]);
			setData();
			nameField.blur();
		}
	});
} catch(e) {
}

function addItem() {
	var c = Titanium.Network.createHTTPClient();
	c.autoEncodeUrl = false;
	c.onload = function(e) {
		Ti.App.fireEvent('popClose');
		win.close();
		getGrpInv('currInv_refresh');
	};
	c.onerror = function(e) {
		Ti.API.info("post error:" + e.error);		
	};
	// newer method - post directly to inventory
	c.open("PUT", global_url + '/manager/inventories/' + Ti.App.Properties.getString('inventory_id') + '.json', true);
	if (prod_id != 0) {

		c.send({
			"utf8" : "✓",
			"inventory[items_attributes][][restaurant_id]" : Ti.App.Properties.getString('r_id'),
			"inventory[items_attributes][][product_id]" : prod_id,
			"inventory[items_attributes][][location_id]" : location_id,
			"inventory[items_attributes][][unit_id]" : unit_id,
			"inventory[items_attributes][][category_id]" : category_id,
			"inventory[items_attributes][][_destroy]" : 0,
			"inventory[items_attributes][][status]" : 2
			//"commit":"Update Inventory"
		});
	} else {
		c.send({
			"utf8" : "✓",
			"inventory[items_attributes][][restaurant_id]" : Ti.App.Properties.getString('r_id'),
			"inventory[items_attributes][][name]" : nameField.value,
			"inventory[items_attributes][][location_id]" : location_id,
			"inventory[items_attributes][][unit_id]" : unit_id,
			"inventory[items_attributes][][category_id]" : category_id,
			"inventory[items_attributes][][_destroy]" : 0,
			"inventory[items_attributes][][status]" : 2
			//"commit":"Update Inventory"
		});
	}

};

function setData() {
	loadingIndicator.show();
	setTimeout(function() {
		loadingIndicator.hide();
	}, 500);

	try {
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(e) {

			var items = JSON.parse(this.responseText);
			var data = [];
			var catHeader = 0;
			tableview.data = data;
			for ( i = 0; i < items.length; i++) {
				var row = Titanium.UI.createTableViewRow({
					hasChild : true
				});

				var catThumb = Titanium.UI.createImageView({
					image : cropImage(prodImg(items[i], 'medium'), 84, 56, 56, 56),
					left : 0.01 * widthh,
					top : 0.01 * heightt,
					width : 0.045 * heightt,
					height : 0.045 * heightt,
					borderRadius : 2,
					backgroundColor : '#BBBBC0',
					preventDefaultImage : true
				});

				var productitem = Titanium.UI.createLabel({
					text : items[i].name,
					font : {
						fontSize : heightt * 0.02,
						fontWeight : 'bold'
					},
					width : 'auto',
					textAlign : 'left',
					top : heightt * 0.01,
					left : widthh * 0.09,
					height : heightt * 0.040,
					color : 'black'
				});
				if (items[i].category_id != catHeader) {
					catHeader = items[i].category_id;
					row.header = categories[catHeader][0].name;
					//index.push({title:''+i,index:i});
				}
				row.add(catThumb);
				row.add(productitem);
				row.productitem = productitem.text;
				row.product_id = items[i].id;
				row.unit_id = items[i].unit_id;
				row.category_id = items[i].category_id;
				data.push(row);
			}
			tableview.data = data;
			tableview.index = index;
		};
		xhr.onerror = function(e) {			
			Ti.API.info("get error:" + e.error);
		};
		xhr.open('GET', global_url + "/api/v1/products.json?searchbar=" + nameField.value, true);
		xhr.send();
	} catch(e) {
	}
};

//Method Added by Amit koranne to Disply the picker.
units = _.sortBy(JSON.parse(Ti.App.Properties.getString('units')), function(e) {
	return e.id
});
var temp1 = [];
var column1 = Ti.UI.createPickerColumn({
	width : widthh * 0.40, //'30%',
	height : heightt * 0.23
});
function rowText1(Ritem, Rtype, Rcolumn, Rid) {
	var a = Ti.UI.createPickerRow({
		title : Ritem,
		id : Rid
	});
	var label = Ti.UI.createLabel({
		text : Ritem,
		font : {
			fontSize : heightt * 0.04,
			fontWeight : 'bold'
		}

		// text:items[i].name,
		// font:{fontWeight:'bold',fontSize:(items[i].name.length>=18)?16:20},

	});
	a.add(label);

	column1.addRow(a);

};

var temp2 = [];
var column2 = Ti.UI.createPickerColumn({
	width : widthh * 0.60, //'40%',
	height : heightt * 0.23
});
function rowText2(Ritem, Rtype, Rcolumn, Rid) {
	var b = Ti.UI.createPickerRow({
		title : Ritem,
		id : Rid
	});

	var label = Ti.UI.createLabel({
		text : Ritem,
		font : {
			fontSize : heightt * 0.04,
			fontWeight : 'bold'
		}
	});

	b.add(label);

	column2.addRow(b);

}

rowText1('Purchase Unit', 'header', 'units', 0);
for ( i = 1; i < units.length; i++) {

	rowText1(units[i].name, '', 'units', units[i].id);
}

var r_id = Ti.App.Properties.getString('r_id');
rowText2('Select a Category', 'header', 'cats', 0);
for ( i = 0; i < catPickerList.length; i++) {
	if (catPickerList[i].restaurant_id == null || Number(catPickerList[i].restaurant_id) == Number(r_id)) {

		rowText2(catPickerList[i].name, '', 'cats', catPickerList[i].id);
	}
}
var w = Ti.UI.currentWindow;

var status = Ti.UI.createLabel({
	top : heightt * 0.04,
	left : widthh * 0.04,
	right : widthh * 0.04,
	height : heightt * 0.040,
	textAlign : 'center'
});
w.add(status);

function showStatus(s) {
	//status.text = s;
}

var picker1 = Ti.UI.createPicker({
	useSpinner : true,
	visibleItems : 5,
	type : Ti.UI.PICKER_TYPE_PLAIN,
	width : widthh * 1.5,
	left : 1,
	backgroundColor : '#BAE7F2',
	bottom : heightt * 0.104,
	columns : [column2, column1]
});

try {
	picker1.addEventListener('change', function(e) {
		showStatus(e.selectedValue[0] + " " + e.selectedValue[1] + " " + e.selectedValue[2]);
	});
	w.add(picker1);
} catch(e) {
}
try {
	picker1.addEventListener('change', function(e) {
		if (e.columnIndex == 0)
			category_id = e.row.id;
		if (e.columnIndex == 1)
			unit_id = e.row.id;

		if ((category_id > 0) && (unit_id > 0) && (nameField.value != '')) {//logic updated by yogesh nameField.value.length > 0 to !(nameField.value == null)
			invBtn.visible = true;
			//yogesh  logic is for save button enabling and disabling
		} else {
			invBtn.visible = false;
		}
		Ti.API.info("category = " + category_id + ": unit = " + unit_id);
	});
} catch(e) {
}

var navBG = Ti.UI.createImageView({
	image : '../../images/nav-icons/cs_navbar.png',
	height : heightt * 0.086,
	width : widthh * 1,
	left : widthh * 0,
	bottom : heightt * 0.0
});

win.add(navBG);
win.add(invBtn);
win.add(cancelBtn);

try {
	cancelBtn.addEventListener('click', function(e) {
		e.source.height = heightt * 0.08;
		e.source.width = widthh * 0.4;
		Ti.App.fireEvent('popClose');
		win.close();
	});
} catch(e) {
}

try {
	invBtn.addEventListener('click', function(e) {
		var item_present = true;
		for (var j = 0; j < item_names.length; j++) {
			if (item_names[j] == nameField.value) {
				item_present = false;
				break;
			}
		}

		loadingIndicator.show();
		setTimeout(function() {
			loadingIndicator.hide();
		}, 500);

		e.source.height = heightt * 0.08;
		e.source.width = widthh * 0.4;
		if (nameField.value != prod_name && (item_present)) {
			//if(nameField.value != prod_name ) {
			prod_id = 0;
			var dialog = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Yes!', 'No'],
				message : "This item doesn't exist in the ChefSheet product Database, are you sure you want to create it?",
				title : 'Create New Product'
			});
			dialog.show();
			dialog.addEventListener('click', function(e) {
				if (e.index == 0) {
					addItem();
				}
			});

		} else {
			if (item_present == false) {
				alert("Item already exists");
			}
			addItem();
		}
		setTimeout(function() {
			e.source.height = heightt * 0.06;
			e.source.width = widthh * 0.3;
		}, 1000);
	});
} catch(e) {
}
