Ti.include('../shared/default.js');
Ti.App.Properties.setString('countFirstTime', 'false');
bgFrame(0, 0, 0, 0);

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
var inventory_name = '';
var data = [];

var navBG = Ti.UI.createImageView({
	image : '../../images/nav-icons/cs_navbar.png',
	height : heightt * 0.08,
	width : widthh * 1,
	left : widthh * 0,
	top : heightt * 0.0
});
var navLabel = Ti.UI.createLabel({
	text : 'Rooms',
	font : {
		fontSize : heightt * 0.03,
		fontWeight : 'normal'
	},
	color : '#fff',
	height : heightt * 0.06,
	width : widthh * 0.9,
	left : widthh * 0.4,
	top : heightt * 0.01,
});

win.add(navBG);
win.add(navLabel);

var idLabel = Ti.UI.createLabel({
	text : Ti.App.Properties.getString('restaurant_name'),
	font : {
		fontSize : heightt * 0.03,
		fontWeight : 'normal'

	},
	color : '#000',
	height : heightt * 0.06,
	width : widthh * 0.9,
	left : widthh * 0.05,
	top : heightt * 0.12,
	height : 'auto',
	color : '#000'
});

win.add(idLabel);

var idLabel2 = Ti.UI.createLabel({
	text : Ti.App.Properties.getString('inventory_name'),
		font : {
		fontSize : heightt * 0.03,
		fontWeight : 'normal'

	},
	height : heightt * 0.02,
	width : widthh * 0.9,
	left : widthh * 0.05,
	top : heightt * 0.16,
	height : 'auto',
	color : '#606060'
});

win.add(idLabel2);

function setData() {
	try {
		if (Ti.App.Properties.getString('inventory_id') > 0) {
			var user_id = Ti.App.Properties.getString('user_id');
			var xhr = Ti.Network.createHTTPClient();
			xhr.onload = function(e) {
				var items = JSON.parse(this.responseText);
				var invGrp = _.groupBy(items.items, function(e) {
					return e.location_id
				});

				var invData = _.toArray(invGrp);

				Ti.App.Properties.setString("currInventory", JSON.stringify(invGrp));
				Ti.API.info("location data groups - invData length: " + invData.length);
				data = [];
				tableview.data = data;

				for ( i = 0; i < invData.length; i++) {

					var locDone = !_.any(_.pluck(_.toArray(invData[i]), 'quantity'), _.identity(_.isNull));

					var locTitle = 'null';
					if (invData[i][0].location) {
						locTitle = (invData[i][0].location.name != '') ? invData[i][0].location.name : 'not set';
					}
					data[i] = Ti.UI.createTableViewRow({
						title : locTitle,
						height : heightt * 0.09,
						right : widthh * 0.02,
						location_id : invData[i][0].location_id
					});

					var inv_sum = Ti.UI.createLabel({
						text : invData[i].length,
						textAlign : 'right',
						font : {
							fontWeight : 'normal',
							fontSize : heightt * 0.03

						},
						color : '#000000',
						right : 10
					});

					//Bidyut Nath
					// Added to display room name
					if (locTitle == 'null') {

						locTitle = 'Room Un Defined';
					}
					var room_name = Ti.UI.createLabel({
						text : locTitle,
						textAlign : 'right',
						font : {
							fontWeight : 'normal',
							fontSize : heightt * 0.03
						},
						color : '#173f6b',
						left : 10
					});

					data[i].add(inv_sum);

					data[i].add(room_name);

					data[i].location_id = invData[i][0].location_id
				}
				tableview.data = data;

			};
			xhr.onerror = function(e) {
				Ti.API.info("post error:" + e.error);
			};
			xhr.open('GET', global_url + "/api/v1/inventories/" + Ti.App.Properties.getString('inventory_id') + ".json" + token_variable);
			xhr.send();

		} else {
			Ti.App.fireEvent('signedIn');
		}
	} catch(e) {
	}
};
setData();

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
try {
	tableview.addEventListener('click', function(e) {
		try {
			loadingIndicator.show();
			//hide method call
			setTimeout(function() {
				loadingIndicator.hide();
			}, 100);
		} catch(e) {
		}

		var index = e.index;
		var section = e.section;

		setTimeout(function() {
			// reset checks
			for (var i = 0; i < section.rows.length; i++) {
				section.rows[i].hasDetail = false;
				section.rows[i].color = '#000';
			}
			section.rows[index].hasDetail = true;
			section.rows[index].color = '#1C4E7E';

		}, 250);

		var w = Ti.UI.createWindow({
			url : '../inventory/inventory.js',
			barColor : '#1C4E7E',
			navBarHidden : false,
			navBarHidden : true,
			modal : false,
			location_id : e.row.location_id
		});
		var locale = Ti.UI.createLabel({
			text : e.row.title,
			font : {
				fontSize : heightt * 0.03,
				fontWeight : 'normal'
			},
			color : '#fff'
		});
		w.rightNavButton = locale;
		w.backButtonTitle = 'Locations';
		backtitle = true;

		w.open();
	});
} catch(e) {
}

// add table view to the window
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
			e.source.width = widthh * 0.27;
			e.source.height = heightt * 0.07;
			setData();

		}, 1000);
	});
} catch(e) {
}

// force refresh
try {
	Ti.App.addEventListener('refresh', function(e) {
		if (e.tab == 'inventory' || e.tab == 'locations') {
			setData();
		}
	});
} catch(e) {
}

win.add(menuButton);
win.add(refresh);

try {
	win.addEventListener("focus", function() {
		try {
			setData();

			if ((Ti.App.Properties.getString('restaurant_name') != restaurant_name) || (Ti.App.Properties.getString('inventory_name') != inventory_name)) {

				restaurant_name = Ti.App.Properties.getString('restaurant_name');
				inventory_name = Ti.App.Properties.getString('inventory_name');
			}
			idLabel.text = Ti.App.Properties.getString('restaurant_name');
			idLabel2.text = Ti.App.Properties.getString('inventory_name');
		} catch(e) {
		}
	});
} catch(e) {
}

