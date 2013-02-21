Ti.include('../shared/default.js');
Ti.App.Properties.setString('inventFirstTime', 'false');

var refresh = Titanium.UI.createButton({
	title : "Refresh",
	width : widthh * 0.27,
	height : heightt * 0.07,
	top : heightt * 0.005,
	right : widthh * 0.03,
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

var restaurant_name = '';

var data = [];

bgFrame(0, 0, 0, 0);

var idLabel = Ti.UI.createLabel({
	text : Ti.App.Properties.getString('restaurant_name') + ' Inventories',
	font : {
		fontSize : heightt * 0.03,
		fontWeight : 'normal'

	},
	color : '#000',
	height : heightt * 0.06,
	width : widthh * 0.9,
	left : widthh * 0.05,
	top : heightt * 0.13,
	height : 'auto'

});

win.add(idLabel);

var bttnLbl = Ti.UI.createLabel({
	text : 'Duplicate',
	font : {
		fontSize : heightt * 0.03,
		fontWeight : 'normal'

	},
	height : heightt * 0.02,
	width : widthh * 0.9,
	left : widthh * 0.05,
	top : heightt * 0.16,
	height : 'auto',
	color : '#fff',
	shadowColor : '#89a',
	shadowOffset : {
		x : 2,
		y : 2
	}
});

win.add(bttnLbl);

function setData() {
	try {
		var user_id = Ti.App.Properties.getString('user_id');
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(e) {
			var items = JSON.parse(this.responseText);
			if (items.length == 0) {

				bttnLbl.visible = false;
				tableview.visible = false;
				tvBg.visible = false;
				noInvLbl.visible = true;
				openBtn.visible = true;
			} else {
				bttnLbl.visible = true;
				tableview.visible = true;				
				noInvLbl.visible = false;
				openBtn.visible = false;
				data = [];
				var invTitle;
				tableview.data = data;
				for ( i = 0; i < items.length; i++) {
					if (items[i].name == "" || items[i].name == null) {
						invTitle = String(moment(items[i].created_at).format("MMM DD YYYY, hA"));
					} else {
						invTitle = String(items[i].name);
					}
					row = Ti.UI.createTableViewRow({
						height : heightt * 0.09
					});

					var invDate = Ti.UI.createLabel({
						text : moment(items[i].created_at).format("MM.DD.YY"),
						textAlign : 'left',
						font : {
							fontWeight : 'normal',
							fontSize : heightt * 0.03

						},
						width : widthh * 0.2,
						textAlign : 'left',
						top : heightt * 0.04,
						left : widthh * 0.23,
						color : '#000'
					});
					var dupeBttn = Titanium.UI.createButton({
						left : widthh * 0.04,
						height : heightt * 0.06,
						width : widthh * 0.15,
						title : '+',
						font : {
							fontWeight : 'normal',
							fontSize : heightt * 0.03
						},
						backgroundGradient : {
							type : 'linear',
							colors : ['#86CEAC', '#3CA87F', '#298254'],
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
						paddingTop : heightt * 0.1, 
						borderWidth : 1,
						borderColor : '#112f55',
						borderRadius : widthh * 0.02,
						inv_title : invTitle,
						inv_id : items[i].id
					});

					var invLabel = Titanium.UI.createLabel({
						text : invTitle,
						font : {
							fontWeight : 'bold',
							fontSize : (invTitle.length >= 26) ? heightt * 0.03 : heightt * 0.03
						},
						width : '75%',
						textAlign : 'left',
						left : widthh * 0.23,
						color : '#112f55',
						top : heightt * 0.01
					});

					row.add(invLabel);
					row.add(dupeBttn);
					row.add(invDate);
					row.inv_title = String(invTitle);
					row.inv_date = items[i].created_at;
					row.inventory_id = items[i].id;
					data.push(row);
				}
				tableview.data = data;

			}
		};
		xhr.onerror = function(e) {
			Ti.API.info("get error:" + e.error);
		};		
		xhr.open('GET', global_url + "/api/v1/inventories.json" + token_variable);
		xhr.send();
	} catch(e) {
	}
};
setData();

var navBG = Ti.UI.createImageView({
	image : '../../images/nav-icons/cs_navbar.png',
	height : heightt * 0.08,
	width : widthh * 1,
	left : widthh * 0,
	top : heightt * 0.0
});
var navLabel = Ti.UI.createLabel({
	text : 'Inventories',
	font : {
		fontSize : heightt * 0.03,
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

var tvBg = Ti.UI.createImageView({
	bottom : heightt * 0.03,
	left : widthh * 0.04,
	right : widthh * 0.04,
	height : heightt * 0.729,
	borderColor : '#cde',
	borderRadius : widthh * 0.02,
	backgroundColor : 'transparent',
	backgroundImage : '../../images/tableBG.png'
});
win.add(tvBg);

var noInvLbl = Titanium.UI.createLabel({
	top : heightt * 0.4,
	text : 'No Inventories Present',
	font : {
		fontSize : heightt * 0.02,
		fontWeight : 'bold'
	},
	visible : false
});

var openBtn = Ti.UI.createButton({
	title : 'Create one at ChefSheet.com',
	top : heightt * 0.5,
	height : heightt * 0.07,
	width : widthh * 0.70,	
	borderRadius : widthh * 0.02,
	font : {
		fontSize : heightt * 0.03,
		fontWeight : 'bold'
	}, 
	backgroundGradient : {
		type : 'linear',
		colors : ['#698aaa', '#1C4E7E', '#173f6b'],
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
	borderColor : '#112f55',
	visible : false
});

win.add(noInvLbl);
win.add(openBtn);

try {
	openBtn.addEventListener('click', function() {
		Titanium.Platform.openURL('http://chefsheet.com/manager/inventories');
	});
} catch(e) {
}

var tableview = Titanium.UI.createTableView({
	bottom : heightt * 0.03,
	left : widthh * 0.04,
	right : widthh * 0.04,
	height : heightt * 0.729,
	borderWidth : 1,
	borderRadius : widthh * 0.02,
	backgroundColor : 'transparent',
	borderColor : '#999',
	separatorColor : '#aaa'
});

// create table view event listener
var dupe_id = -1;
var locationWin = Ti.UI.createWindow({	
	barColor : '#1C4E7E',
	title : 'Inventories',
	url : '../inventory/locations.js'
});

//bidyut nath
//modified as duplicate dialog was getting displayed even after clicking on label.
try {
	tableview.addEventListener('click', function(e) {
		try {
			loadingIndicator.show();

			//hide method call
			setTimeout(function() {
				loadingIndicator.hide();
			}, 500);

			if (e.source.toString() == '[object Button]') {
				dialog.title = 'Do you want to duplicate the "' + e.source.inv_title + '" Inventory?';
				dupe_id = e.source.inv_id;
				dialog.show();
			} else {
				var index = e.index;
				var section = e.section;
				var inv_date = moment(e.source.inv_date).format("MM.DD.YYYY");

				setTimeout(function() {
					// reset checks
					for (var i = 0; i < section.rows.length; i++) {
						section.rows[i].hasDetail = false;
						section.rows[i].color = '#000';
						section.rows[i].children[0].color = '#000';
					}
					// set current check
					section.rows[index].hasDetail = true;
					section.rows[index].color = '#1C4E7E';
					section.rows[index].children[0].color = '#1C4E7E';

					winn = Titanium.UI.currentWindow;
					locationWin.open();
					winn.close();
				}, 250);
				Ti.App.Properties.setString('inventory_id', e.row.inventory_id);
				Ti.App.Properties.setString('inventory_name', e.row.inv_title);
			}
		} catch(e) {
		}

	});
} catch(e) {
}

win.add(tableview);

try {
	refresh.addEventListener('click', function(e) {
		loadingIndicator.show();
		setTimeout(function() {
			loadingIndicator.hide();
		}, 500);

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
		setTimeout(function() {			
			setData();
			e.source.width = widthh * 0.27;
			e.source.height = heightt * 0.07;

		}, 1000);
	});
} catch(e) {
}

win.add(menuButton);
win.add(refresh);

try {
	win.addEventListener("focus", function() {
		try {
			if (Ti.App.Properties.getString('restaurant_name') != restaurant_name) {

				setData();
				restaurant_name = Ti.App.Properties.getString('restaurant_name');
			}
			idLabel.text = restaurant_name + ' Inventories';
		} catch(e) {
		}
	});
} catch(e) {
}

// force refresh
try {
	Ti.App.addEventListener('refresh', function(e) {
		if (e.tab == 'inventories') {
			setData();
			if (Ti.App.Properties.getString('restaurant_name') != restaurant_name) {

				restaurant_name = Ti.App.Properties.getString('restaurant_name');
			}
			idLabel.text = restaurant_name + ' Inventories';
		}
	});
} catch(e) {
}

// Done dialog menu
var optionsDialogOpts = {
	options : ['Duplicate', 'Cancel'],
	cancel : 1,
};

var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
// add event listener
try {
	dialog.addEventListener('click', function(e) {

		if (e.index == 0) {

			var xhr = Ti.Network.createHTTPClient();
			xhr.onload = function(e) {
				setData();
			};
			xhr.onerror = function(e) {

				Ti.API.info("set error:" + e.error);
			};
			xhr.open('GET', global_url + "/manager/inventories/" + dupe_id + "/duplicate.json");

			xhr.send();
		};

	});
} catch(e) {
}

