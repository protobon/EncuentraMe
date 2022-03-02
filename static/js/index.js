<<<<<<< HEAD
// $(document).ready(function () {
//     $('#lost').click(function () {
//         $('div.pet_found').each(function(i, obj) {
//             $(obj).hide();
//         });
//         $('div.pet_lost').each(function(i, obj) {
//             $(obj).show();
//         });
//     });
//     $('#found').click(function () {
//         $('div.pet_lost').each(function(i, obj) {
//             $(obj).hide();
//         });
//         $('div.pet_found').each(function(i, obj) {
//             $(obj).show();
//         });
//     });
//     $('#all').click(function () {
//         refreshFeed();
//         $('div.pet_lost').each(function(i, obj) {
//             $(obj).show();
//         });
//         $('div.pet_found').each(function(i, obj) {
//             $(obj).show();
//         });
//     });
// });
=======
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

>>>>>>> fc876814b6ae18f2d8eaa4431c710ee1f3f29372
