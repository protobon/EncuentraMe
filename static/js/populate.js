$(document).ready(function () {
    async function fetchAllPosts() {
        try {
            const response = await fetch('https://encuentrame.org.xelar.tech/api/posts/');
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const data = await response.json();
            return (data);
        } catch (err) {
            console.log(err);
        }
    }
    window.refreshFeed = function() {
        fetchAllPosts().then(function(data) {
            $('article.posts').empty();
            $('#todos').prop('checked', true);
            $.each(data.lost, function () {
                this.fecha = new Date(this.fecha).toLocaleDateString('es-UY');
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postLostNew = $(document.createElement('div'));
                postLostNew.addClass('pet');
                postLostNew.addClass('pet_lost');
                postLostNew.addClass(this.mascota);
                let userInfo = $(document.createElement('div'));
                userInfo.addClass('user');
                userInfo.append('<h3>' + this.nombre +' perdido/a!</h3>');
                userInfo.append('<p>Fecha de publicación: ' + this.created_at +'</p>');
                postLostNew.append(userInfo);
                postLostNew.append('<p>¡Se busca a ' + this.nombre + '! Perdido/a desde el día '
                + this.fecha + ' última vez visto en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' barrio ' + this.barrio + ' a las ' + this.hora + ' horas.\n'
                + 'Si lo viste por favor comunícate con ' + this.user_name + '.</p>');
                postLostNew.append('<a href="/' + this.id + '"></a>');
                postLostNew.find('a').append('<img src="/static/images/' + this.foto + '">');
                $('article.posts').append(postLostNew);
            });
            $.each(data.found, function () {
                this.fecha = new Date(this.fecha).toLocaleDateString('es-UY');
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postFoundNew = $(document.createElement('div'));
                postFoundNew.addClass('pet');
                postFoundNew.addClass('pet_found');
                postFoundNew.addClass(this.mascota);
                let userInfo = $(document.createElement('div'));
                userInfo.addClass('user');
                userInfo.append('<h3>' + this.mascota +' encontrado/a!</h3>');
                userInfo.append('<p>Fecha de publicación: ' + this.created_at +'</p>');
                postFoundNew.append(userInfo);
                postFoundNew.append('<p>Se encontró el día ' + this.fecha + ' por barrio '
                + this.barrio + ' en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' a las ' + this.hora + ' horas.\n'
                + 'Si es tuyo o sabes de quien puede ser por favor comunícate con ' + this.user_name + '.</p>');
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
                this.fecha = new Date(this.fecha).toLocaleDateString('es-UY');
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postLostNew = $(document.createElement('div'));
                postLostNew.addClass('pet');
                postLostNew.addClass('pet_lost');
                postLostNew.addClass(this.mascota);
                let userInfo = $(document.createElement('div'));
                userInfo.addClass('user');
                userInfo.append('<h3>' + this.nombre +' perdido/a!</h3>');
                userInfo.append('<p>Fecha de publicación: ' + this.created_at +'</p>');
                postLostNew.append(userInfo);
                postLostNew.append('<p>¡Se busca a ' + this.nombre + '! Perdido/a desde el día '
                + this.fecha + ' última vez visto en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' barrio ' + this.barrio + ' a las ' + this.hora + ' horas.\n'
                + 'Si lo viste por favor comunícate con ' + this.user_name + '.</p>');
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
                this.fecha = new Date(this.fecha).toLocaleDateString('es-UY');
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postFoundNew = $(document.createElement('div'));
                postFoundNew.addClass('pet');
                postFoundNew.addClass('pet_found');
                postFoundNew.addClass(this.mascota);
                let userInfo = $(document.createElement('div'));
                userInfo.addClass('user');
                userInfo.append('<h3>' + this.mascota +' encontrado/a!</h3>');
                userInfo.append('<p>Fecha de publicación: ' + this.created_at +'</p>');
                postFoundNew.append(userInfo);
                postFoundNew.append('<p>Se encontró el día ' + this.fecha + ' por barrio '
                + this.barrio + ' en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' a las ' + this.hora + ' horas.\n'
                + 'Si es tuyo o sabes de quien puede ser por favor comunícate con ' + this.user_name + '.</p>');
                postFoundNew.append('<a href="/' + this.id + '"></a>');
                postFoundNew.find('a').append('<img src="static/images/' + this.foto + '">');
                $('article.posts').append(postFoundNew);
            });
        });
    }
});
