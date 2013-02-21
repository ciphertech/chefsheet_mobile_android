Ti.include('../shared/default.js');

var entered = false;
var error_shown = false;
var checkwhether_signin_button_click = false;

var alertfillemailpass = Ti.UI.createAlertDialog({
	buttonNames : ["OK"],
	title : "Cheefsheet",
	message : "Please Fill Email and Password",
	cancel : 0
});

var alertwrongemailpass = Ti.UI.createAlertDialog({
	buttonNames : ["OK"],
	title : "Cheefsheet",
	message : "Email or Password is Incorrect ",
	cancel : 0
});

var alertnoInternet = Ti.UI.createAlertDialog({
	buttonNames : ["OK"],
	title : "Cheefsheet",
	message : "Please check Internet Connection",
	cancel : 0
});


var alertslowInternet = Ti.UI.createAlertDialog({
	buttonNames : ["OK"],
	title : "Cheefsheet",
	message : "Internet is Slow",
	cancel : 0
});

try {
	Ti.App.fireEvent('closeMenu');
} catch(e) {
}

//Bidyut Nath
//added code for preventing landscape mode.
win.orientationModes = [Titanium.UI.PORTRAIT];

var autoLogLabel = Ti.UI.createLabel({
	color : '#fff',
	text : 'Remember Login',
	top : heightt * 0.16,
	left : widthh * 0.25,
	height : 'auto',
	font : {
		fontSize : heightt * 0.03,
		fontWeight : 'bold'
	}

});
win.add(autoLogLabel);

var autoLogSwitch = Ti.UI.createSwitch({
	value : Boolean((Ti.App.Properties.getString('autologin'), 10)),
	top : heightt * 0.15,
	right : widthh * 0.10
});
win.add(autoLogSwitch);

try{
	if(Ti.App.Properties.getString('valueRemm')=='1'){		
		autoLogSwitch.value=true;
		Ti.App.Properties.setString('autologin',true);		
	}else if(Ti.App.Properties.getString('valueRemm')=='0'){			
		autoLogSwitch.value=false;
		Ti.App.Properties.setString('autologin',false);
	}
}catch(e){}
var emailField = Ti.UI.createTextField({
	hintText : 'Email',
	height : heightt * 0.09,
	width : widthh * 0.80,
	top : heightt * 0.30,
	left : widthh * 0.10,
	autocorrect : false,
	keyboardType : Titanium.UI.KEYBOARD_EMAIL,
	autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(emailField);

var passwordField = Ti.UI.createTextField({
	hintText : 'Password',
	passwordMask : true,
	height : heightt * 0.09,
	width : widthh * 0.80,
	top : heightt * 0.40,
	left : widthh * 0.10,
	autocorrect : false,
	keyboardType : Titanium.UI.KEYBOARD_EMAIL,
	autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(passwordField);

var signInBtn = Ti.UI.createButton({
	title : 'Sign In',
	width : widthh * 0.30,
	height : heightt * 0.06,
	top : heightt * 0.50,
	left : widthh * 0.10,
	color : '#FFFFFF',
	borderRadius : 10,
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
	borderColor : '#112f55'

});
win.add(signInBtn);

var back_fn = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'images/cs-signtitle.png');
var back = Titanium.UI.createImageView({
	image : back_fn,
	top : heightt * 0.55,
	width : widthh * 0.99
});
win.add(back);

var signUpBtn = Ti.UI.createButton({
	title : 'Sign Up',
	width : widthh * 0.30,
	height : heightt * 0.06,
	top : heightt * 0.50,
	left : widthh * 0.60,
	color : '#FFFFFF',
	borderRadius : 10,
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
	borderColor : '#112f55'
});
win.add(signUpBtn);
var once=true;
//Method Updated by Amit koranne for remember me.
var flag = Ti.App.Properties.getString('autologin');
if (Ti.App.Properties.getString('autologin') == 'true') {
//	if(once){
	if(Ti.App.Properties.getString('logouted')=='777'){
		
	emailField.value = "";
	passwordField.value ="";
	Ti.App.Properties.setString('logouted','8888');
	
	}else{
		
		emailField.value = Ti.App.Properties.getString('session_email');
	passwordField.value = Ti.App.Properties.getString('session_pass');
	
	setTimeout(function() {
		loadingIndicator.show();
		//hide method call
		setTimeout(function() {
			loadingIndicator.hide();
		}, 1000);
		login();
	}, 250);
		
		
	}
//	}
	
}

try {
	signUpBtn.addEventListener('click', function(e) {
		
		e.source.width = widthh * 0.4;
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
			e.source.width = widthh * 0.30;
			e.source.height = heightt * 0.06;
			e.source.backgroundGradient = {
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
			};

		}, 1000);

		Titanium.Platform.openURL('http://chefsheet.com/auth/users/sign_up');
		setTimeout(function() {
			e.source.width = widthh * 0.3;
			e.source.height = heightt * 0.06;
		}, 800);
	});
} catch(e) {
}

//**********************************************

try {
	signInBtn.addEventListener('click', function(e) {
		try {			
			Ti.UI.Android.hideSoftKeyboard();			
			setTimeout(function() {
				loadingIndicator.hide();
			}, 500);
		} catch(e) {
		}

		e.source.width = widthh * 0.4;
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
			e.source.width = widthh * 0.30;
			e.source.height = heightt * 0.06;
			e.source.backgroundGradient = {
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
			};

		}, 1000);

		error_shown = false;
		entered = false;
		try {

			myactivityIndicator.hide();

		} catch(exc) {
		} finally {
			if (emailField.value == 'dev' && (passwordField.value == 'true' || passwordField.value == 'false')) {
				switch (passwordField.value) {
					case 'true':
						Ti.App.Properties.setString('developer', true);
						break;
					case 'false':
						Ti.App.Properties.setString('developer', false);
						break;
				}
			} else {

				Ti.App.Properties.setString('autologin', autoLogSwitch.value);

				checkwhether_signin_button_click = true;

				if ((emailField.value.length == 0 ) || (passwordField.value.length == 0))//logic added by yogesh
				{
					alertfillemailpass.show();
				} else//logic added by yogesh
				{

					myactivityIndicator.show();

					//hide method call
					setTimeout(function() {
						myactivityIndicator.hide();
					}, 800);

					login();

				}

			}
		}
		setTimeout(function() {
			e.source.width = widthh * 0.3;
			e.source.height = heightt * 0.06;
		}, 8000);

	});
} catch(e) {
}

function login() {
	try {
		var xhr = Titanium.Network.createHTTPClient(); 
		xhr.onload = function(e) {
			entered = true;

			var response = JSON.parse(this.responseText);
			Ti.App.Properties.setString('token', response.token);
			Ti.App.Properties.setString('user_name', response.name);
			Ti.App.Properties.setString('user_email', emailField.value);
			Ti.App.Properties.setString('user_pass', passwordField.value);
			Ti.App.Properties.setString('session_email', emailField.value);
			Ti.App.Properties.setString('session_pass', passwordField.value);
			Ti.API.info('user name: ' + response.name);

			if (response.token != undefined) {
				//win.tabGroup.setActiveTab(0);
				setTimeout(function() {
					myactivityIndicator.hide();
					win.close({
						//transition : Titanium.UI.iPhone.AnimationStyle.CURL_UP
					});
				}, 100);
				Ti.App.fireEvent('signedIn');
			} else {
				alert("Email or Password is incorrect");
			}
			
		};

		xhr.onerror = function(e) {

			Ti.API.info("post error:" + e.error);

			try {
				if (checkwhether_signin_button_click) {

					myactivityIndicator.hide();
				}

			} catch(exception) {
			} finally {
				if (!error_shown) {
					error_shown = true;

					if (checkwhether_signin_button_click) {
						if (Titanium.Network.online) {
							alertwrongemailpass.show();
						} else {
							alertnoInternet.show();
						}
					}	//END logic added by yogesh for removing give alert on load of page
				} //end of if 1
			} //end of finally
		};

		var url = global_url + '/api/v1/tokens.json';
		xhr.open("POST", url);

		xhr.send({
			"email" : emailField.value,
			"password" : passwordField.value
		});

	} catch(e) {
	}

	if(autoLogSwitch.value){
		Ti.App.Properties.setString('valueRemm','1');
		Ti.App.Properties.setString('autologin',true);
	}else{
		Ti.App.Properties.setString('valueRemm','0');
		Ti.App.Properties.setString('autologin',false);
	}
	
}

