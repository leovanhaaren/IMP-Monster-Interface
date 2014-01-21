jQuery(document).ready(function()
{
    jQuery.backstretch("img/background3.jpg");

	jQuery('.fancybox-media').fancybox({
		openEffect  : 'none',
		closeEffect : 'none',
		helpers : {
			media : {}
		}
	});
});