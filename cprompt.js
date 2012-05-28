/**
	Simple Cookie Prompt
	Idea: @panda_doodle - Coded: @michaelw90
	[forked & tweaked by Spiffin]
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
			['background:#fecbcb;', "Opting out or refusing to accept cookies may cause this website to function incorrectly. <label for='cPrompt_check'>To accept cookies please tick this box.</label> &nbsp;<input type='checkbox' id='cPrompt_check' onclick='cPrompt.doClick(1);'>"],

			['background:#e4e3ff;', "Some of the cookies we store are essential to make our site work and have already been set. " + (this.cookieLink != ''? "You can find out how and why we use cookies in our <a href='" + this.cookieLink + "'>cookie policy</a>." : '') + " <label for='cPrompt_check'>To accept cookies please tick this box.</label> &nbsp;<input type='checkbox' id='cPrompt_check' onclick='cPrompt.doClick(1);'>"],

			['background:#ffffe0;', "Thank you. Cookies have been accepted. You can opt out of this at any time by <a href='javascript: void(0);' onclick='cPrompt.doClick(0);'>clicking here</a>."],

			['background:#f8f8f8;', "This site uses cookies to store information on your computer. " + (this.cookieLink != ''? "To find out how we use them please <a href='" + this.cookieLink + "'>click here</a>." : '') + " &nbsp;<input type='checkbox' onclick='cPrompt.doClick(1);' id='cPrompt_check'>  &nbsp;<label for='cPrompt_check'>I accept cookies from this site.</label>"]
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
              style.cssText = 'border:1px solid #ddd;' + this.prompts[n][0];
              innerHTML = this.prompts[n][1] + "<a class=cookie_box_close onclick=cPrompt.hidePrompt(event)>x</a>";
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
          style.cssText = this.prompts[this.n][0] + 'width:0; padding:10px; border:1px solid #ddd; cursor:pointer;';
			innerHTML = '';
			h.onclick = function(){
				cPrompt.reshow();
			}
		}
		document.body.appendChild(h);
	},

	reshow: function(){
		with(this.p){
          style.cssText = 'border:1px solid #ddd;' + this.prompts[this.n][0];
          innerHTML = this.prompts[this.n][1] + "<a class=cookie_box_close onclick=cPrompt.hidePrompt(event)>x</a>";
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