/**
	Simple Cookie Prompt
	Idea: @panda_doodle - Coded: @michaelw90
**/
var cPrompt = {

	cookie: false,

	n: 3,

	hideOnAccept: false,

	minimisePrompt: false,

	cookieLink: '',

	prompts: [],

	p: null,

	init: function(){
		this.prompts = [
            ['position:absolute; width: 100%; filter: alpha(opacity=70); opacity: 0.7; color: #da7479;  background-color: #f9e5e6; padding: 6px 10px 6px 40px;', "Opting out or refusing to accept cookies may cause this website to function incorrectly. <label for='cPrompt_check'>To accept cookies please tick this box.</label> &nbsp;<input type='checkbox' style='position: relative;' id='cPrompt_check' onclick='cPrompt.doClick(1);'>"],

            ['filter: alpha(opacity=70); opacity: 0.7; color: #5694b1; border-color: #9ac9df; background-color: #d8ecf5; padding: 6px 10px 6px 40px;', "Some of the cookies we store are essential to make our site work and have already been set. " + (this.cookieLink != ''? "You can find out how and why we use cookies in our <a style='color: #5694b1; font-weight: bold;' href='" + this.cookieLink + "'>cookie policy</a>." : '') + " <label for='cPrompt_check'>To accept cookies please tick this box.</label> &nbsp;<input type='checkbox' style='position: relative;' id='cPrompt_check' onclick='cPrompt.doClick(1);'>"],

			['position:absolute; width: 100%; filter: alpha(opacity=70); opacity: 0.7; color: #91a44d; border-color: #c2d288; background-color: #e3ebc6; padding: 6px 10px 6px 40px;', "Thank you, cookies have been accepted. You can opt out of this at any time by <a style='color: #91a44d; font-weight: bold;' href='javascript: void(0);' onclick='cPrompt.doClick(0);'>clicking here</a>."],

			['filter: alpha(opacity=70); opacity: 0.7; color: #d9b31f; border-color: #f5dc7d; background-color: #fcf7d9; padding: 6px 10px 6px 40px;', "This site uses cookies to store information on your computer. " + (this.cookieLink != ''? "To find out how we use them please <a style='color: #d9b31f; font-weight: bold;' href='" + this.cookieLink + "'>click here</a>." : '') + " &nbsp;<input type='checkbox' onclick='cPrompt.doClick(1);' style='position: relative;' id='cPrompt_check'>  &nbsp;<label for='cPrompt_check'>I accept cookies from this site.</label>"]
		];
		var cookie = this.checkCookie();

		if(window.console){
			console.log(cookie, this.hideOnAccept, ((cookie == 2 && this.hideOnAccept) || cookie != 2));
		}

		if((cookie == 2 && !this.hideOnAccept) || cookie != 2){
			this.loadPrompt(cookie);
			this.p = document.getElementById('cookie_prompt_' + this.n);
			if(document.cookie.match(/cPrompt_hide=/) || this.minimisePrompt){
				this.hidePrompt(null);
			}
		}
	},
	checkCookie: function(){
		if(this.cookie === false){
			if(!document.cookie.match(/cPrompt_useCookies=/)){
				this.cookie = 3;
			}else if(document.cookie.match(/cPrompt_useCookies=(\d)($|;)/)){
				this.cookie = parseInt(RegExp.$1);
			}
		}
		return this.cookie;
	},

	loadPrompt: function(n){
		if(n == 3){
			this.saveCookie('useCookies', 1);
		}
		if(n > 3 || n < 0){
			if(window.console){
				console.log('Error: Undefined num (' + n + ')');
			}
		}else{
			this.n = n;
			var h = document.createElement('div');
			with(h){
              style.cssText = 'font-family: sans-serif; font-size: 11px; text-align:left; border: 1px solid;' + this.prompts[n][0];
              innerHTML = this.prompts[n][1] + "<a style='float:right; padding-right:50px; font-weight: bold; cursor:pointer;' onclick='cPrompt.hidePrompt(event)'>X</a>";
				className = 'cookie_box';
				id = 'cookie_prompt_' + n;
			}
			var b = document.body;
			b.insertBefore(h, b.firstChild);
		}
	},

	saveCookie: function(c, v){
		document.cookie = "cPrompt_" + c + "=" + v + ";expires=" + (new Date()).toGMTString().replace(/\d{4}/, '2050');
	},

	hidePrompt: function(e){
		if(e != null){
			this.saveCookie('hide', 1);
			e.stopPropagation();
		}
		var h = this.p;
		with(h){
          style.cssText = this.prompts[this.n][0] + 'width: 0; background-position: 3px center; padding: 10px; border: 1px solid; font-family: sans-serif; font-size: 11px; cursor:pointer;';
			innerHTML = '';
			h.onclick = function(){
				cPrompt.reshow();
			}
		}
		document.body.appendChild(h);
	},

	reshow: function(){
		with(this.p){
          style.cssText = 'font-family: sans-serif; font-size: 11px; text-align: left; border: 1px solid;' + this.prompts[this.n][0];
          innerHTML = this.prompts[this.n][1] + "<a style='float: right; padding-right:50px; font-weight: bold; cursor:pointer;' onclick='cPrompt.hidePrompt(event)'>X</a>";
		}
	},

	doClick: function(type){
		this.saveCookie('useCookies', (type == 0? 0 : 2));
		this.p.style.display = 'none';
		location.reload(true);
	},

	allowCookies: function(){
		return (cPrompt.checkCookie() == 1 || cPrompt.checkCookie() == 2);
	}
}
if(document.addEventListener){
	document.addEventListener("DOMContentLoaded", function(){
		cPrompt.init();
	}, false);
}else if(document.attachEvent){
	document.attachEvent("onreadystatechange", function(){
		if(document.readyState === "complete"){
			cPrompt.init();
		}
	});
};