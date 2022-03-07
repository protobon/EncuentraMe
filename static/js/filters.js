$(document).ready(function () {
    $('#show').text('Te mostraremos: Todos')
    $('#gatitos').click(function () {
        let mostrar = ($("input[type=radio][name=animal-selection]:checked").val())
        $('#show').text('Te mostraremos: '+mostrar)
        $('div.gato').each(function(i, obj) {
            $(obj).show();
        });
        $('div.perro').each(function(i, obj) {
            $(obj).hide();
        });
    });
    $('#perritos').click(function () {
        let mostrar = ($("input[type=radio][name=animal-selection]:checked").val())
        $('#show').text('Te mostraremos: '+mostrar)
        $('div.perro').each(function(i, obj) {
            $(obj).show();
        });
        $('div.gato').each(function(i, obj) {
            $(obj).hide();
        });
    });
    $('#todos').click(function () {
        let mostrar = ($("input[type=radio][name=animal-selection]:checked").val())
        $('#show').text('Te mostraremos: '+mostrar)
        $('div.perro').each(function(i, obj) {
            $(obj).show();
        });
        $('div.gato').each(function(i, obj) {
            $(obj).show();
        });
    });
    $('#all').click(function() {
        $('#all').addClass("btn-success");
        $('#all').removeClass("btn-outline-success");
        $('#lost').addClass("btn-outline-success");
        $('#lost').removeClass("btn-success");
        $('#found').addClass("btn-outline-success");
        $('#found').removeClass("btn-success");
    });
    $('#lost').click(function() {
        $('#lost').addClass("btn-success");
        $('#lost').removeClass("btn-outline-success");
        $('#all').addClass("btn-outline-success");
        $('#all').removeClass("btn-success");
        $('#found').addClass("btn-outline-success");
        $('#found').removeClass("btn-success");
    });
    $('#found').click(function() {
        $('#found').addClass("btn-success");
        $('#found').removeClass("btn-outline-success");
        $('#all').addClass("btn-outline-success");
        $('#all').removeClass("btn-success");
        $('#lost').addClass("btn-outline-success");
        $('#lost').removeClass("btn-success");
    });
    $('#post').click(function() {
        newPost();
    });
});
