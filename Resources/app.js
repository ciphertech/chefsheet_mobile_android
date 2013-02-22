Ti.App.Properties.setString('inventFirstTime', 'true');
Ti.App.Properties.setString('countFirstTime', 'true');
Ti.App.Properties.setString('valueRemm','77');
var is_android = (Ti.Platform.osname == 'android');
var run1st = true;
var buttonSystem = true;
var widthh = Titanium.Platform.displayCaps.platformWidth;
var heightt = Titanium.Platform.displayCaps.platformHeight;


Ti.include('views/shared/default.js');

Ti.App.Properties.setString('inventory_id', null);

// Force user_id now
if (Ti.App.Properties.getString('user_id') == '') {
	Ti.App.Properties.setString('user_id', 1);
}
if (Ti.App.Properties.getString('autologin') == '') {
	Ti.App.Properties.setString('autologin', false);
}
//Ti.App.Properties.setString('autologin', false);
var mainWin = Ti.UI.createWindow(
//bidyut for ui
{
	backgroundColor : 'black',
	backgroundGradient : {
		type : 'linear',
		colors : ['black', '#02242d'], //,'#065c74','#1185a6','#81d1e6'
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 0,
			y : 480
		},
		backFillStart : true
	}

});

var back_fn = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'images/cs-signtitle.png');
var back = Titanium.UI.createImageView({
	image : back_fn,
	top : heightt * 0.55,
	width : widthh * 0.99
});
mainWin.add(back);

var initView = Ti.UI.createView({
	backgroundGradient : {
		type : 'linear',
		colors : ['#000', '#02242d', '#065c74', '#1185a6', '#81d1e6'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 0,
			y : 480
		},
		backFillStart : true
	},
	top : 0,
	left : 0,
	width : widthh * 1,
	height : heightt * 1
});

var scrollView = Titanium.UI.createScrollView({
	contentWidth : 257,
	contentHeight : 'auto',
	top : 0,
	left : 0,
	height : 'auto',
	width : 257
});

var navBG = Ti.UI.createImageView({
	image : 'images/nav-icons/cs_navbar.png',
	height : heightt * 0.06,
	width : widthh * 1,
	left : 0,
	top : heightt * 0.0
});
var navLabel = Ti.UI.createLabel({
	text : 'User Name',
	font : {
		fontSize : heightt * 0.03,
		fontWeight : 'normal'
	},
	color : '#fff',
	height : heightt * 0.06,
	width : widthh * 0.9,
	left : widthh * 0.1,
	top : 0
});

var navIcon = Ti.UI.createImageView({
	image : '',
	borderWidth : 1,
	borderRadius : 5,
	borderColor : '#173f6b',
	height : heightt * 0.032,
	width : widthh * 0.06,
	left : widthh * 0.03,
	top : heightt * 0.015,
});

var tabGroup = Titanium.UI.createTabGroup({
	allowUserCustomization : false,
	top : 0,
	left : 0,
	width : widthh * 1,
	height : heightt * 1,
	backgroundGradient : {
		type : 'linear',
		colors : ['#000', '#02242d', '#065c74', '#1185a6', '#81d1e6'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 0,
			y : 480
		},
		backFillStart : true
	}

});

var restaurantWin = Ti.UI.createWindow({
	tabBarHidden : true,
	url : 'views/restaurants/index.js',

});

var restaurantTab = Titanium.UI.createTab({
	icon : 'images/48-fork-and-knife.png',
	title : 'Restaurants',
	window : restaurantWin
});

var inventoriesWin = Ti.UI.createWindow({

	tabBarHidden : true,
	url : 'views/inventory/inventories.js'
});
var inventoriesTab = Titanium.UI.createTab({
	icon : 'images/83-calendar.png',
	title : 'Inventories',
	window : inventoriesWin
});

var inventoryWin = Ti.UI.createWindow({
	//backgroundColor:'#BBBBC0',
	tabBarHidden : true,
	url : 'views/inventory/locations.js'
});
var inventoryTab = Titanium.UI.createTab({
	icon : 'images/179-notepad.png',
	title : 'Count Inventory',
	window : inventoryWin
});

var reportsWin = Ti.UI.createWindow({
	tabBarHidden : true,
	url : 'views/reports/index.js'
});
var reportsTab = Ti.UI.createTab({
	title : 'Inventory Reports',
	icon : 'images/17-bar-chart.png',
	window : reportsWin
});

var signinWin = Ti.UI.createWindow({	
	barColor : '#1C4E7E',
	title : 'Sign In',
	leftnav : true,
	leftNavButton : menuBtn,
	url : 'views/shared/signin.js',
	top : 0,
	left : 0,
	width : widthh,
	height : heightt,
	backgroundColor : '#000',
	backgroundGradient : {
		type : 'linear',
		colors : ['#000', '#02242d', '#065c74', '#1185a6', '#81d1e6'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 0,
			y : 480
		},
		backFillStart : true
	}
});
//var signinTab = Titanium.UI.createTab({icon:'images/56-cloud.png',title:'Sign In',window:signinWin});

var settingsWin = Ti.UI.createWindow({

	barColor : '#1C4E7E',
	title : 'Settings',
	leftnav : true,
	tabBarHidden : true,
	url : 'views/settings/show.js'

});
//var mainWin = Ti.UI.createWindow();
var logoutTab = Ti.UI.createTab({
	title : 'Log Out',
	icon : 'images/17-bar-chart.png',
});
//temporary by bidyut

//Bidyut Nath
// logout function
try {
	logoutTab.addEventListener('click', function(e) {
		//logout function
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(e) {

			Ti.App.Properties.setString('user_pass', '');
			Ti.App.Properties.setString('token', '');
			Ti.App.Properties.setString('user_name', '');
			Ti.App.Properties.setString('user_email', '');
			signout = true;
			//bidyut nath
			//commited as not for android
			//signinWin.open({ transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP });

			signinWin.open();

		};
		xhr.onerror = function(e) {

			Ti.API.info("get error:" + e.error);
		};

		xhr.open("POST", global_url + '/auth/users/sign_out.json');
		xhr.send({
			"_method" : "delete"
		});
	});
} catch(e) {
}

var settingsTab = Ti.UI.createTab({
title : 'Settings',
	icon : 'images/17-bar-chart.png',
	window : settingsWin
});

// make nav list
var single = true;
var adj = 1
function makeNav(single) {
	adj = single ? 1 : 0;
	for ( i = adj; i < winData.length; i++) {
		var btnView = Ti.UI.createView({
			backgroundGradient : {
				type : 'linear',
				colors : ['#222', '#000'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 44
				},
				backFillStart : true
			},
			width : 258,
			height : 44,
			left : 0,
			top : (i + 1 - adj) * 44,
			link : winData[i].tab
		});
		var btnImage = Ti.UI.createImageView({
			image : winData[i].icon,
			opacity : 0.7,
			left : 6,
			link : winData[i].tab
		});
		btnView.add(btnImage);
		var menuLbl = Ti.UI.createLabel({
			text : winData[i].title,
			font : {
				fontSize : 14,
				fontWeight : "bold"
			},
			opacity : .6,
			color : '#fff',
			width : 'auto',
			left : 40,
			height : 'auto',
			link : winData[i].tab
		});
		btnView.add(menuLbl);

		scrollView.add(btnView);

	}
};
//makeNav();
var lastLink = -1;
var signout = false;
try {
	scrollView.addEventListener('click', function(e) {
		if (scrollView.children && e.source.link < scrollView.children.length + adj) {
			if (e.source.link > 3) {//4
				switch (e.source.link) {
					case 4:
						break;
					case 5:
						logout();
						break;
				}
			} else {
				tabGroup.tabs[e.source.link].active = true;
				Ti.API.info("tab: " + tabGroup.activeTab.window.title);
				//tabGroup.activeTab.window.setData();
				tabGroup.animate(menuClosed);
				showMenu = false;
			}
		}
	});
} catch(e) {
}

function logout() {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(e) {
		Ti.App.Properties.setString('user_pass', '');
		Ti.App.Properties.setString('token', '');
		Ti.App.Properties.setString('user_name', '');
		Ti.App.Properties.setString('user_email', '');
		token_variable = "";
		signout = true;

		//Bidyut Nath
		//committed because not for android
		//signinWin.open({ transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP });
		signinWin.open();

	};
	xhr.onerror = function(e) {
		Ti.API.info("get error:" + e.error);
	};

	xhr.open("POST", global_url + '/auth/users/sign_out.json');

	xhr.send({
		"_method" : "delete"
	});
}

tabGroup.addEventListener('focus', function(e) {
	try {
		if (scrollView.children && e.index < scrollView.children.length) {
			if (lastLink >= 0) {
				scrollView.children[lastLink].backgroundGradient = {
					type : 'linear',
					colors : ['#222', '#000'],
					startPoint : {
						x : 0,
						y : 0
					},
					endPoint : {
						x : 0,
						y : 44
					},
					backFillStart : true
				};
			}
			scrollView.children[e.index - adj].backgroundGradient = {
				type : 'linear',
				colors : ['#777', '#222'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 44
				},
				backFillStart : true
			};
			lastLink = e.index - adj;
		}

		hideIndicator();
		Ti.API.info("Restaurant ID: " + Ti.App.Properties.getString('r_id'));
	} catch(exception) {
		try {
			hideIndicator();
		} catch(e) {
		}

	}
});

try {
	mainWin.addEventListener('open', function() {
		signinWin.open();
	});
} catch(e) {
}

//tabGroup.setActiveTab(1);
//tabGroup.open({
function setMenu() {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(e) {
		var items = JSON.parse(this.responseText);
		if (items.length < 2) {
			single = true;
			Ti.App.Properties.setString('r_id', items[0].r_id);
			Ti.App.Properties.setString('restaurant_name', items[0].name);
			Ti.App.fireEvent('refresh', {
				tab : 'inventories'
			});
		} else {
			single = false;
			Ti.App.fireEvent('refresh', {
				tab : 'restaurants'
			});
		}
		tabGroup.tabs[ single ? 1 : 0].active = true;
		makeNav(single);
	};
	xhr.onerror = function(e) {

		Ti.API.info("get error:" + e.error);
	};
	xhr.open('GET', url("/api/v1/restaurants.json"));
	xhr.send();
};

setTimeout(function() {	
	try {
		myactivityIndicator.hide();
	} catch(e) {
	}
	mainWin.open();
}, 1000);

var tgBg = Ti.UI.createImageView({
	top : 0,
	left : 0,
	width : widthh * 1,
	height : 159,
	backgroundImage : 'images/bg.png'
});

var tgTitle = Ti.UI.createImageView({
	bottom : 21,
	left : 0,
	width : 320,
	height : 21,
	Image : 'images/cs-title.png'
});
tabGroup.add(tgTitle);
settingsWin.add(tgTitle);

var tg1Title = Ti.UI.createImageView({
	bottom : -10,
	width : widthh * 0.8,
	Image : 'images/cs-signtitle.png'
});
signinWin.add(tg1Title);
mainWin.add(initView);

var showMenu = false;
menuBtn.addEventListener('click', function(e) {
	if (showMenu == false) {
		tabGroup.animate(menuOpen);
		showMenu = true;
	} else {
		tabGroup.animate(menuClosed);
		showMenu = false;
	}
});

try {
	Ti.App.addEventListener('signedIn', function(e) {
		try {
			win.close();
		} catch(exe) {
		}

		getUnits();
		getCategories();
		if (run1st) {
			if (is_android)//from 23rd B & Y
			{

				mainWin.remove(initView);
				mainWin.remove(tg1Title);
				mainWin.add(scrollView);
				mainWin.add(navBG);
				mainWin.add(navLabel);
				mainWin.add(navIcon);

				mainWin.add(restaurantButton);
				mainWin.add(inventoriesButton);
				mainWin.add(countInventoriesButton);
				mainWin.add(reportsButton);
				mainWin.add(settingsButton);
				mainWin.add(logoutButton);
			}//if not android
			else {//to 23rd B & Y
				mainWin.remove(initView);
				mainWin.remove(tg1Title);
				mainWin.add(scrollView);
				mainWin.add(navBG);
				mainWin.add(navLabel);
				mainWin.add(navIcon);
				mainWin.add(tabGroup);
				tabGroup.open();
			}
			run1st = false;
		}
		if (scrollView.children) {
			removeAllChildren(scrollView);
		}
		//if(signout == true) {
		tabGroup.animate(menuClosed);
		showMenu = false;
		setMenu();
		//}
		showMenu = false;
		navLabel.text = 'Welcome ' + Ti.App.Properties.getString('user_name');
		navIcon.image = 'http://gravatar.com/avatar/' + Titanium.Utils.md5HexDigest(Ti.App.Properties.getString('user_email')) + '.png';
		navIcon.borderRadius = 5;
	});
} catch(e) {
}

//  CREATE CUSTOM LOADING INDICATOR

//For Button system
var restaurantButton = Titanium.UI.createButton({
	top : heightt * 0.1,
	left : widthh * 0.06,
	width : widthh * 0.75,
	height : heightt * 0.06,
	backgroundImage : 'images/restaurants.png',
	backgroundColor : 'transparent'
});

var inventoriesButton = Titanium.UI.createButton({
	top : heightt * 0.18,
	left : widthh * 0.06,
	width : widthh * 0.75,
	height : heightt * 0.06,
	backgroundImage : 'images/Inventories.png',
	backgroundColor : 'transparent'
});

var countInventoriesButton = Titanium.UI.createButton({
	top : heightt * 0.26,
	left : widthh * 0.06,
	width : widthh * 0.75,
	height : heightt * 0.06,
	backgroundImage : 'images/count_inventories.png',
	backgroundColor : 'transparent'
});

var reportsButton = Titanium.UI.createButton({
	top : heightt * 0.34,
	left : widthh * 0.06,
	width : widthh * 0.75,
	height : heightt * 0.06,
	backgroundImage : 'images/inventary_Reports.png',
	backgroundColor : 'transparent'
});

var settingsButton = Titanium.UI.createButton({
	top : heightt * 0.42,
	left : widthh * 0.06,
	width : widthh * 0.75,
	height : heightt * 0.06,
	backgroundImage : 'images/settings.png',
	backgroundColor : 'transparent'
});

var logoutButton = Titanium.UI.createButton({
	top : heightt * 0.50,
	left : widthh * 0.06,
	width : widthh * 0.75,
	height : heightt * 0.06,
	backgroundImage : 'images/sign_Out.png',
	backgroundColor : 'transparent'
});

try {
	restaurantButton.addEventListener('click', function(e) {
		loadingIndicator.show();
		e.source.width = widthh * 0.85;

		restaurantWin.open();

		//hide method call
		setTimeout(function() {
			loadingIndicator.hide();
			e.source.width = widthh * 0.75;

		}, 800);
		
		//hide method call
		setTimeout(function() {
			loadingIndicator.hide();
		}, 250);
		

	});
} catch(e) {
}

try {
	inventoriesButton.addEventListener('click', function(e) {
		//loadingIndicator.show();
		e.source.width = widthh * 0.85;
		if (Ti.App.Properties.getString('inventFirstTime') == 'true') {
			restaurantWin.open();
		} else {
			try {
				//loadingIndicator.show();
				inventoriesWin.open();

			} catch(e) {
				//loadingIndicator.show();
				restaurantWin.open();

			}
		}
		setTimeout(function() {
			//loadingIndicator.hide();
			e.source.width = widthh * 0.75;

		}, 800);
	});

} catch(e) {
}

try {
	countInventoriesButton.addEventListener('click', function(e) {
		//loadingIndicator.show();
		e.source.width = widthh * 0.85;
		if (Ti.App.Properties.getString('countFirstTime') == 'true') {
			restaurantWin.open();

		} else {
			try {

				inventoryWin.open();

			} catch(e) {

				restaurantWin.open();

			}
		}
		setTimeout(function() {
			//loadingIndicator.hide();
			e.source.width = widthh * 0.75;

		}, 800);
	});
} catch(e) {
}

try {
	settingsButton.addEventListener('click', function(e) {
		loadingIndicator.show();
		e.source.width = widthh * 0.85;

		settingsWin.open();

		setTimeout(function() {
			loadingIndicator.hide();
			e.source.width = widthh * 0.75;

		}, 500);

	});
} catch(e) {
}

try {
	reportsButton.addEventListener('click', function(e) {
		loadingIndicator.show();
		e.source.width = widthh * 0.85;
		try {

			reportsWin.open();

		} catch(e) {

			restaurantWin.open();

		}
		setTimeout(function() {
			loadingIndicator.hide();
			e.source.width = widthh * 0.75;

		}, 800);
	});
} catch(e) {
}

try {
	logoutButton.addEventListener('click', function(e) {
		e.source.width = widthh * 0.85;
		loadingIndicator.show();
		
		try {
			Ti.App.Properties.setString('logouted', '777');
			logout();
		} catch(e) {

		}
		setTimeout(function() {
			loadingIndicator.hide();
			e.source.width = widthh * 0.75;

		}, 800);
	});
} catch(e) {
}

