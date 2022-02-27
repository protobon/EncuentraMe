$(document).ready(function () {
    $('#lost').click(function () {
        $('div.pet_found').each(function(i, obj) {
            $(obj).hide();
        });
        $('div.pet_lost').each(function(i, obj) {
            $(obj).show();
        });
    });
    $('#found').click(function () {
        $('div.pet_lost').each(function(i, obj) {
            $(obj).hide();
        });
        $('div.pet_found').each(function(i, obj) {
            $(obj).show();
        });
    });
    $('#all').click(function () {
        $('div.pet_lost').each(function(i, obj) {
            $(obj).show();
        });
        $('div.pet_found').each(function(i, obj) {
            $(obj).show();
        });
    });
});
