var win = Ti.UI.currentWindow;
var temp_url = "http://chefsheet.herokuapp.com";
//"http://chefsheet.herokuapp.com"; //"http://192.168.1.70:3000"; //// "http://192.168.1.70:3001";  //B & Y 23_jan
var os_And = (Ti.Platform.osname == 'android');
//B & Y 23_jan
var global_url = temp_url;
var token_variable = "?auth_token=" + Ti.App.Properties.getString("token");
//B & Y 23_jan
var widthh = Titanium.Platform.displayCaps.platformWidth;
var heightt = Titanium.Platform.displayCaps.platformHeight;

//Bidyut Nath
//added code for preventing landscape mode.
Titanium.UI.orientation = Titanium.UI.PORTRAIT;

//added by y on 30th
var myactivityIndicator = Ti.UI.createAlertDialog({
	buttonNames : [],
	title : "Cheefsheet",
	message : "Loading..."
});

//added by y on 30th
var loadingIndicator = Ti.UI.createAlertDialog({
	buttonNames : [],
	message : "Loading..."
});

//*******************************
var menuBtn = Titanium.UI.createButton({
	title : 'Menu',
	width : widthh * 0.2,
});
var menuImg = Titanium.UI.createImageView({
	image : '../../images/menu.png',
	width : widthh * 0.28,
	height : heightt * 0.28
});
//menuBtn.add(menuImg);

var menuOpen = Titanium.UI.createAnimation({
	left : widthh * 0.258,
	duration : 250
});

var menuClosed = Titanium.UI.createAnimation({
	left : widthh * 0,
	duration : 250
});

var alertnoInternet = Ti.UI.createAlertDialog({
	buttonNames : ["OK"],
	title : "Cheefsheet",
	message : "Please check Internet Connection",
	cancel : 0
});

if (!Titanium.Network.online) {
	alertnoInternet.show();
}

//***************************
require('lib/require_patch').monkeypatch(this);
var moment = require('lib/moment.min');
var _ = require('lib/underscore-min')._

function url(path, q) {
	//var urlPrefixes = ["http://chefsheet.herokuapp.com", "http://0.0.0.0:3000"];
	var urlPrefixes = [global_url];
	if (q) {
		return urlPrefixes[Ti.App.Properties.getString('developer')] + path + "&auth_token=" + Ti.App.Properties.getString("token");
	} else {
		return urlPrefixes[Ti.App.Properties.getString('developer')] + path + "?auth_token=" + Ti.App.Properties.getString("token");
	}
	/* OLD
	 if (q) {
	 return urlPrefixes[Ti.App.Properties.getString('developer')] + path + "&token=" + Ti.App.Properties.getString("token");
	 } else {
	 return urlPrefixes[Ti.App.Properties.getString('developer')] + path + "?token=" + Ti.App.Properties.getString("token");
	 }
	 */
}

function bgFrame(l, t, r, b) {

	var frame = Ti.UI.createView({
		top : t,
		left : l,
		right : r,
		bottom : b,
		borderRadius : 10,
		borderWidth : 2,
		borderColor : '#000',
		//bidyut
		/*
		 colors:['#000','#02242d','#065c74','#1185a6','#81d1e6'],
		 startPoint:{x:0,y:0},
		 endPoint:{x:0,y:480},
		 backFillStart:true
		 */
		backgroundColor : 'black',
		backgroundGradient : {
			type : 'linear',
			colors : ['#02242d', '#065c74', '#1185a6', 'black'],
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
		// backgroundColor : '#abc' //changed by bidyut from '#abc' to disable iOS look. old:-'#fceafe'
	});

	var gloss = Ti.UI.createImageView({
		image : '../../images/glosstop.png',
		width : widthh * 1.0,
		height : 0.40 * heightt,
		top : 0
	});

	frame.add(gloss);
	win.add(frame);
}

function cropImage(img, w, h, cw, ch) {
	var baseImage = Titanium.UI.createImageView({
		image : img,
		width : w,
		height : h,
		preventDefaultImage : true
	});

	// Here's the view we'll use to do the cropping.
	var cropView = Titanium.UI.createView({
		width : cw,
		height : ch
	});

	// Add the image to the crop-view and center.
	cropView.add(baseImage);
	baseImage.left = (-((w - cw) / 2)) + '';
	baseImage.top = (-((h - ch) / 2)) + '';

	// now convert and return the crop-view to an image Blob
	return cropView.toImage();
}

// get unit names
var units = {};
function getUnits() {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(e) {
		Ti.App.Properties.setString("units", this.responseText);

		//Ti.App.Properties.setString("units", _.groupBy(JSON.parse(this.responseText), function(e) { return e.id }));
	};
	xhr.onerror = function(e) {

		Ti.API.info("get error:" + e.error);
	};
	var token_variable2 = "?auth_token=" + Ti.App.Properties.getString("token");
	xhr.open('GET', global_url + "/api/v1/units.json" + token_variable2);
	xhr.send();
};
//getUnits();

// get categories
var catgories = {};
function getCategories() {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(e) {
		Ti.App.Properties.setString("categories", this.responseText);

		//categories = _.sortBy(JSON.parse(this.responseText), function(e) { return e.id }); //JSON.parse(this.responseText);
		//catgories.reverse();
	};

	xhr.onerror = function(e) {

		Ti.API.info("get error:" + e.error);
	};
	var token_variable1 = "?auth_token=" + Ti.App.Properties.getString("token");
	xhr.open('GET', global_url + "/api/v1/categories.json" + token_variable1);
	xhr.send();
};
//getCategories();

var img_name = '';
/*
 function prodImg(obj,size) {
 // size - 'tiny','thumb','medium','large'
 // http://s3.amazonaws.com/chefsheet-pro/products/1/medium/buns21_1_.jpg_w_550
 // http://s3.amazonaws.com/chefsheet-pro/categories/40/medium/baked_products.jpg
 //Ti.API.info("obj.category_id: " +categories[58].image_file_name);
 var prod_img;
 img_name = '';
 try{
 if(obj.image_file_name) {
 prod_img = 'http://s3.amazonaws.com/chefsheet-pro/products/'+obj.id+'/'+size+'/'+obj.image_file_name;
 img_name = obj.image_file_name;
 if(img_name == null||prod_img == null){
 prod_img =	'../../images/default_image2.png';
 img_name ='default_image';
 }
 } else if (obj.category_id != null && obj.category_id != undefined && obj.category_id != '' && categories[obj.category_id] ) {
 Ti.API.info("obj.category_id: "+obj.category_id);
 prod_img = 'http://s3.amazonaws.com/chefsheet-pro/categories/'+obj.category_id+'/'+size+'/'+categories[obj.category_id][0].image_file_name;
 img_name = categories[obj.category_id][0].image_file_name;

 if(img_name == null||prod_img == null){
 prod_img =	'../../images/default_image2.png';
 img_name ='default_image';
 }

 } else {
 //Bidyut Nath
 //prod_img =	'../../images/default_image2.png';
 return null;
 }
 }catch(e){
 prod_img =	'../../images/default_image2.png';
 img_name ='default_image';
 }

 return prod_img;
 }
 */

function prodImg(obj, size) {
	var prod_img;
	img_name = '';
	if (obj.image_file_name) {		
		prod_img = 'http://s3.amazonaws.com/chefsheet-pro/products/' + obj.id + '/' + size + '/' + obj.image_file_name;
		img_name = obj.image_file_name;
		if (img_name == null || prod_img == null) {

			prod_img = '../../images/default_image2.png';
			img_name = 'default_image';

		}

	} else if (obj.category_id != null && obj.category_id != undefined && obj.category_id != '' && categories[obj.category_id]) {
		
		Ti.API.info("obj.category_id: " + obj.category_id);
		prod_img = 'http://s3.amazonaws.com/chefsheet-pro/categories/' + obj.category_id + '/' + size + '/' + categories[obj.category_id][0].image_file_name;
		img_name = categories[obj.category_id][0].image_file_name;
		if (img_name == null || prod_img == null) {

			prod_img = '../../images/default_image2.png';
			img_name = 'default_image';

		}
	} else {
		prod_img = '../../images/default_image2.png';
		img_name = 'default_image';
	}
	return prod_img;
}

function removeAllChildren(viewObject) {
	//copy array of child object references because view's "children" property is live collection of child object references
	var children = viewObject.children.slice(0);

	for (var i = 0; i < children.length; ++i) {
		viewObject.remove(children[i]);
	}
}

//menu button
var menuButton = Titanium.UI.createButton({

	//	image : '../../images/menu_HVGA.png',

	title : 'Menu',
	width : widthh * 0.25,
	height : heightt * 0.07,
	top : heightt * 0.005,
	left : widthh * 0.02,
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

try {
	menuButton.addEventListener('click', function(e) {
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
			e.source.width = widthh * 0.265;
			e.source.height = heightt * 0.047;
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

		win = Titanium.UI.currentWindow;

		if (win.children) {

			for (var i = win.children.length; i > 0; i--) {
				win.remove(win.children[i - 1]);
			}
		}

		win.close();

	});
} catch(e) {
}

