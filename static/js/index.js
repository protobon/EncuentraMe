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
});

