/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-home' : '&#x61;',
			'icon-newspaper' : '&#x62;',
			'icon-pencil' : '&#xe002;',
			'icon-camera' : '&#xe003;',
			'icon-play' : '&#xe004;',
			'icon-file' : '&#xe005;',
			'icon-cabinet' : '&#xe006;',
			'icon-support' : '&#xe007;',
			'icon-user' : '&#xe008;',
			'icon-search' : '&#xe009;',
			'icon-key' : '&#xe00a;',
			'icon-locked' : '&#xe00b;',
			'icon-unlocked' : '&#xe00c;',
			'icon-wrench' : '&#xe00d;',
			'icon-pie' : '&#xe00e;',
			'icon-stats-up' : '&#xe00f;',
			'icon-remove' : '&#x63;',
			'icon-cancel' : '&#xe011;',
			'icon-checkmark' : '&#xe012;',
			'icon-cancel-2' : '&#xe013;',
			'icon-enter' : '&#xe014;',
			'icon-exit' : '&#xe015;',
			'icon-minus' : '&#xe016;',
			'icon-plus' : '&#xe017;',
			'icon-thumbs-up' : '&#xe018;',
			'icon-thumbs-down' : '&#xe019;',
			'icon-download' : '&#xe01a;',
			'icon-upload' : '&#xe01b;',
			'icon-link' : '&#xe01c;',
			'icon-link-2' : '&#xe01d;',
			'icon-menu' : '&#xe01e;',
			'icon-twitter' : '&#xe01f;',
			'icon-facebook' : '&#xe020;',
			'icon-google-plus' : '&#xe021;',
			'icon-code' : '&#xe022;',
			'icon-embed' : '&#xe023;',
			'icon-github' : '&#xe024;',
			'icon-skype' : '&#xe025;',
			'icon-cloud' : '&#xe026;',
			'icon-search-2' : '&#xe027;',
			'icon-house' : '&#xe028;',
			'icon-next' : '&#x10d;',
			'icon-first' : '&#x107;',
			'icon-last' : '&#x17e;',
			'icon-previous' : '&#x111;',
			'icon-linkedin' : '&#xe02d;',
			'icon-plus-2' : '&#xe02e;',
			'icon-close' : '&#xe02f;',
			'icon-location' : '&#xe030;',
			'icon-mobile' : '&#xe031;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};