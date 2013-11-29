jQuery(document).ready(function()
{
	jQuery('#go_fullscreen').on('click', function()
	{
		alert('request fulscreen');
		screenfull.request();
	});
});