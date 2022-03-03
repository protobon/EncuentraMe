$(document).ready(function () {
    async function fetchAllPosts() {
        const response = await fetch('https://encuentrame.org.xelar.tech/api/posts/');
        const data = await response.json();
        return (data);
    }
    window.refreshFeed = function() {
        fetchAllPosts().then(function(data) {
            $('article.posts').empty();
            $('#todos').prop('checked', true);
            $.each(data.lost, function () {
                let postLostNew = $(document.createElement('div'));
                postLostNew.addClass('pet');
                postLostNew.addClass('pet_lost');
                postLostNew.addClass(this.mascota);
                postLostNew.append('<p>¡Se busca a ' + this.nombre + '! Perdido/a desde el día '
                + this.fecha + ' última vez visto en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' barrio ' + this.barrio + ' a las ' + this.hora + ' horas.\n'
                + 'Si lo viste por favor comunícate con Usuario.</p>');
                postLostNew.append('<a href="/' + this.id + '"></a>');
                postLostNew.find('a').append('<img src="/static/images/' + this.foto + '">');
                $('article.posts').append(postLostNew);
            });
            $.each(data.found, function () {
                let postFoundNew = $(document.createElement('div'));
                postFoundNew.addClass('pet');
                postFoundNew.addClass('pet_found');
                postFoundNew.addClass(this.mascota);
                postFoundNew.append('<p>Se encontró el día ' + this.fecha + ' por barrio '
                + this.barrio + ' en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' a las ' + this.hora + ' horas.\n'
                + 'Si es tuyo o sabes de quien puede ser por favor comunícate con Usuario.</p>');
                postFoundNew.append('<a href="/' + this.id + '"></a>');
                postFoundNew.find('a').append('<img src="/static/images/' + this.foto + '">');
                $('article.posts').append(postFoundNew);
            });
        });
    }
    refreshFeed();
    window.refreshLost = function() {
        fetchAllPosts().then(function(data) {
            $('article.posts').empty();
            $('#todos').prop('checked', true);
            $.each(data.lost, function () {
                let postLostNew = $(document.createElement('div'));
                postLostNew.addClass('pet');
                postLostNew.addClass('pet_lost');
                postLostNew.addClass(this.mascota);
                postLostNew.append('<p>¡Se busca a ' + this.nombre + '! Perdido/a desde el día '
                + this.fecha + ' última vez visto en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' barrio ' + this.barrio + ' a las ' + this.hora + ' horas.\n'
                + 'Si lo viste por favor comunícate con Usuario.</p>');
                postLostNew.append('<a href="/' + this.id + '"></a>');
                postLostNew.find('a').append('<img src="static/images/' + this.foto + '">');
                $('article.posts').append(postLostNew);
            });
        });
    }
    window.refreshFound = function() {
        fetchAllPosts().then(function(data) {
            $('article.posts').empty();
            $('#todos').prop('checked', true);
            $.each(data.found, function () {
                let postFoundNew = $(document.createElement('div'));
                postFoundNew.addClass('pet');
                postFoundNew.addClass('pet_found');
                postFoundNew.addClass(this.mascota);
                postFoundNew.append('<p>Se encontró el día ' + this.fecha + ' por barrio '
                + this.barrio + ' en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' a las ' + this.hora + ' horas.\n'
                + 'Si es tuyo o sabes de quien puede ser por favor comunícate con Usuario.</p>');
                postFoundNew.append('<a href="/' + this.id + '"></a>');
                postFoundNew.find('a').append('<img src="static/images/' + this.foto + '">');
                $('article.posts').append(postFoundNew);
            });
        });
    }
});
