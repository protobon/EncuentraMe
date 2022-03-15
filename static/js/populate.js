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
            $('div.posts').empty();
            $('#todos').prop('checked', true);
            $.each(data.lost, function () {
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postLostNew = $(document.createElement('div'));
                postLostNew.addClass('card');
                postLostNew.addClass('pet');
                postLostNew.addClass('pet_lost');
                postLostNew.addClass(this.mascota);
                let userInfo = $(document.createElement('div'));
                userInfo.addClass('user'); /**/
                userInfo.addClass('card-img-top');
                userInfo.append('<a href="/' + this.id + '"></a>');
                postLostNew.find('a').append('<img class="card-img-top" src="/static/images/' + this.foto + '">');
                let cardBody = $(document.createElement('div'));
                cardBody.addClass('card-body');
                cardBody.append('<h5 class="card-title">' + this.nombre +' perdido/a!</h5>');
                cardBody.append('<p class="card-text">Fecha de publicación: ' + this.created_at +'</p">');
                cardBody.append('<p class="card-text">¡Se busca a ' + this.nombre + '! Perdido/a desde el día '
                + this.fecha + ' última vez visto en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' barrio ' + this.barrio + ' a las ' + this.hora + ' horas.\n'
                + 'Si lo viste por favor comunícate con ' + this.user_name + '.</p class="card-text">');
                if (this.phone) {
                    postLostNew.append('<p class="card-text">Teléfono: ' + this.phone + '</p class="card-text">');
                }
                let reportButton = $(document.createElement('button'));
                reportButton.html('Denunciar publicación');
                reportButton.addClass('btn');
                reportButton.addClass('btn-link');
                reportButton.addClass('btn-sm');
                reportButton.attr('onclick', 'reportPost("' + this.id + '")');
                postLostNew.append(userInfo);
                postLostNew.append(cardBody);
                postLostNew.append(reportButton);
                $('div.posts').append(postLostNew);
            });
            $.each(data.found, function () {
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postFoundNew = $(document.createElement('div'));
                postFoundNew.addClass('card');
                postFoundNew.addClass('pet');
                postFoundNew.addClass('pet_found');
                postFoundNew.addClass(this.mascota);
                let userInfo = $(document.createElement('div'));
                userInfo.addClass('user');
                userInfo.addClass('card-body');
                postFoundNew.append('<a href="/' + this.id + '"></a>');
                postFoundNew.find('a').append('<img class="card-img-top" src="/static/images/' + this.foto + '">');
                userInfo.append('<h5 class="card-title">' + this.mascota +' encontrado/a!</h5>');
                userInfo.append('<p class="card-text">Fecha de publicación: ' + this.created_at +'</p class="card-text">');
                postFoundNew.append(userInfo);
                postFoundNew.append('<p class="card-text">Se encontró el día ' + this.fecha + ' por barrio '
                + this.barrio + ' en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' a las ' + this.hora + ' horas.\n'
                + 'Si es tuyo o sabes de quien puede ser por favor comunícate con ' + this.user_name + '.</p class="card-text">');
                if (this.phone) {
                    postFoundNew.append('<p class="card-text">Teléfono: ' + this.phone + '</p class="card-text">');
                }
                let reportButton = $(document.createElement('button'));
                reportButton.html('Denunciar publicación');
                reportButton.addClass('btn');
                reportButton.addClass('btn-link');
                reportButton.addClass('btn-sm');
                reportButton.attr('onclick', 'reportPost("' + this.id + '")');
                postFoundNew.append(reportButton);
                $('div.posts').append(postFoundNew);
            });
        });
    }
    refreshFeed();
    window.refreshLost = function() {
        fetchAllPosts().then(function(data) {
            $('div.posts').empty();
            $('#todos').prop('checked', true);
            $.each(data.lost, function () {
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postLostNew = $(document.createElement('div'));
                postLostNew.addClass('card');
                postLostNew.addClass('pet');
                postLostNew.addClass('pet_lost');
                postLostNew.addClass(this.mascota);
                let userInfo = $(document.createElement('div'));
                userInfo.addClass('user');
                userInfo.addClass('card-body');
                postLostNew.append('<a href="/' + this.id + '"></a>');
                postLostNew.find('a').append('<img class="card-img-top" src="static/images/' + this.foto + '">');
                userInfo.append('<h5 class="card-title">' + this.nombre +' perdido/a!</h5>');
                userInfo.append('<p class="card-text">Fecha de publicación: ' + this.created_at +'</p class="card-text">');
                postLostNew.append(userInfo);
                postLostNew.append('<p class="card-text">¡Se busca a ' + this.nombre + '! Perdido/a desde el día '
                + this.fecha + ' última vez visto en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' barrio ' + this.barrio + ' a las ' + this.hora + ' horas.\n'
                + 'Si lo viste por favor comunícate con ' + this.user_name + '.</p class="card-text">');
                if (this.phone) {
                    postLostNew.append('<p class="card-text">Teléfono: ' + this.phone + '</p class="card-text">');
                }
                postLostNew.append('<a href="https://encuentrame.org.xelar.tech/report/' + this.id + '">Denunciar publicación</a>');
                let reportButton = $(document.createElement('button'));
                reportButton.html('Denunciar publicación');
                reportButton.addClass('btn');
                reportButton.addClass('btn-link');
                reportButton.addClass('btn-sm');
                reportButton.attr('onclick', 'reportPost("' + this.id + '")');
                postLostNew.append(reportButton);
                $('div.posts').append(postLostNew);
            });
        });
    }
    window.refreshFound = function() {
        fetchAllPosts().then(function(data) {
            $('div.posts').empty();
            $('#todos').prop('checked', true);
            $.each(data.found, function () {
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postFoundNew = $(document.createElement('div'));
                postFoundNew.addClass('card');
                postFoundNew.addClass('pet');
                postFoundNew.addClass('pet_found');
                postFoundNew.addClass(this.mascota);
                let userInfo = $(document.createElement('div'));
                userInfo.addClass('user');
                userInfo.addClass('card-body');
                postFoundNew.append('<a href="/' + this.id + '"></a>');
                postFoundNew.find('a').append('<img class="card-img-top" src="static/images/' + this.foto + '">');
                userInfo.append('<h5 class="card-title">' + this.mascota +' encontrado/a!</h5>');
                userInfo.append('<p class="card-text" class="card-text">Fecha de publicación: ' + this.created_at +'</p class="card-text">');
                postFoundNew.append(userInfo);
                postFoundNew.append('<p class="card-text">Se encontró el día ' + this.fecha + ' por barrio '
                + this.barrio + ' en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' a las ' + this.hora + ' horas.\n'
                + 'Si es tuyo o sabes de quien puede ser por favor comunícate con ' + this.user_name + '.</p class="card-text">');
                if (this.phone) {
                    postFoundNew.append('<p class="card-text">Teléfono: ' + this.phone + '</p class="card-text">');
                }
                postFoundNew.append('<a href="https://encuentrame.org.xelar.tech/report/' + this.id + '">Denunciar publicación</a>');
                let reportButton = $(document.createElement('button'));
                reportButton.html('Denunciar publicación');
                reportButton.addClass('btn');
                reportButton.addClass('btn-link');
                reportButton.addClass('btn-sm');
                reportButton.attr('onclick', 'reportPost("' + this.id + '")');
                postFoundNew.append(reportButton);
                $('div.posts').append(postFoundNew);
            });
        });
    }
});
