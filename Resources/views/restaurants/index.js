Ti.include('../shared/default.js');

bgFrame(0, 0, 0, 0);

var navBG = Ti.UI.createImageView({
	image : '../../images/nav-icons/cs_navbar.png',
	height : heightt * 0.08,
	width : widthh * 1,
	left : 0,
	top : heightt * 0.0
});
var navLabel = Ti.UI.createLabel({
	text : 'Restaurants',
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

var navIcon = Ti.UI.createImageView({
	image : '',
	borderWidth : 1,
	borderRadius : widthh * 0.02,
	borderColor : '#173f6b',
	height : heightt * 0.032,
	width : widthh * 0.052,
	left : widthh * 0.03,
	top : heightt * 0.015,
});
win.add(navBG);
win.add(navLabel)

var idLabel = Ti.UI.createLabel({
	text : 'Pick a Restaurant Location',
	font : {
		fontSize : heightt * 0.04,
		fontWeight : 'normal'

	},
	color : '#fff',
	height : heightt * 0.06,
	width : widthh * 0.9,
	left : widthh * 0.05,
	top : heightt * 0.11,
	height : 'auto'
});

win.add(idLabel);

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

var data = [];
function setData() {
	try {
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(e) {
			data = [];
			tableview.data = data;
			var items = JSON.parse(this.responseText);
			for ( i = 0; i < items.length; i++) {

				row = Ti.UI.createTableViewRow({
					r_name : items[i].name,
					r_id : items[i].id,
					height : heightt * 0.1
				});

				var rThumb = Titanium.UI.createImageView({
					image : 'http://s3.amazonaws.com/chefsheet-pro/restaurants/' + items[i].id + '/medium/' + items[i].image_file_name,
					//image:cropImage('http://s3.amazonaws.com/chefsheet-pro/restaurants/'+items[i].id+'/medium/'+items[i].image_file_name,96,96,64,64),
					//backgroundImage:'http://s3.amazonaws.com/chefsheet-pro/restaurants/'+items[i].id+'/medium/'+items[i].image_file_name,
					left : widthh * 0.04,
					top : heightt * 0.010,
					width : widthh * 0.133, //changed by bidyut as issue reported by QA
					height : heightt * 0.085,
					borderRadius : 6,
					//backgroundColor:'#999',
					preventDefaultImage : true
				});

				//data[i] = Ti.UI.createTableViewRow({title:items[i].name,r_id:items[i].id});

				var name = Titanium.UI.createLabel({
					text : items[i].name,
					font : {
						fontWeight : 'normal',
						fontSize : heightt * 0.03

					},
					width : widthh * 0.7,
					textAlign : 'left',
					top : heightt * 0.02,
					left : widthh * 0.172,
					color : '#000'
				});

				row.add(rThumb);
				row.add(name);
				row.img_url = items[i].image_file_name;
				row.r_id = items[i].id;
				data.push(row);
			}
			tableview.data = data;

			renderTableImgs();
		};
		xhr.onerror = function(e) {
			Ti.API.info("post error:" + e.error);
		};
		xhr.open('GET', global_url + "/api/v1/restaurants.json" + token_variable);		
		xhr.send();
	} catch(e) {
	}
};
setData();

function renderTableImgs() {
	Ti.API.info("tableview length:" + data.length);
}

var tvBg = Ti.UI.createImageView({
	bottom : heightt * 0.06,
	left : widthh * 0.04,
	right : widthh * 0.04,
	height : heightt * 0.718,
	borderColor : '#cde',
	borderRadius : 8,
	backgroundColor : 'transparent',
	backgroundImage : '../../images/tableBG.png'
});
win.add(tvBg);

var tableview = Titanium.UI.createTableView({
	bottom : heightt * 0.06,
	left : widthh * 0.04,
	right : widthh * 0.04,
	height : heightt * 0.718,
	borderWidth : 1,
	borderRadius : 8,
	backgroundColor : 'transparent',
	borderColor : '#999',
	separatorColor : '#aaa'
});

try {
	tableview.addEventListener('click', function(e) {
		try {

			loadingIndicator.show();

			//hide method call
			setTimeout(function() {
				loadingIndicator.hide();
			}, 500);

			var index = e.index;
			var section = e.section;

			setTimeout(function() {
				// reset checks
				for (var i = 0; i < section.rows.length; i++) {
					//section.rows[i].hasCheck = false;
					section.rows[i].hasDetail = false;
					section.rows[i].color = '#000';
				}				
				section.rows[index].hasDetail = true;
				section.rows[index].color = '#1C4E7E';
			}, 250);

			Ti.App.Properties.setString('user_id', e.row.user_id);
			Ti.App.Properties.setString('r_id', e.row.r_id);
			Ti.App.Properties.setString('restaurant_name', e.row.r_name);
			setRestaurant(e.row.r_id);
		} catch(e) {
		}
	});
} catch(e) {
}

win.add(tableview);

var matrix = Ti.UI.create2DMatrix()
matrix = matrix.rotate(180);
matrix = matrix.scale(2, 2);
var a = Ti.UI.createAnimation({
	transform : matrix,
	duration : 500,
	autoreverse : true,
	repeat : 1
});
win.animate(a);

var inventoriesWin = Ti.UI.createWindow({
	//backgroundColor:'#BBBBC0',
	barColor : '#1C4E7E',
	title : 'Inventories',
	leftnav : true,
	tabBarHidden : true,
	url : '../inventory/inventories.js'
});

function setRestaurant(rid) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(e) {
		inventoriesWin.open();
		win.close();
	}
	xhr.open('GET', global_url + "/api/v1/restaurants/" + rid + "/switch.json" + token_variable);	
	xhr.send();
};

// force refresh
try {
	Ti.App.addEventListener('refresh', function(e) {
		try {
			if (e.tab == 'restaurants') {
				Ti.API.info("force refresh restaurants");
				setData();
			}
		} catch(e) {
		}
	});
} catch(e) {
}

try {
	refresh.addEventListener('click', function(e) {
		loadingIndicator.show();
		//hide method call
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

		//Titanium.App.fireEvent('show_indicator');
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

