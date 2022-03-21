$(document).ready(function () {
    const url = window.location.href;
    const urlArray = url.split('/');
    const userId = urlArray[urlArray.length - 1];
    async function fetchUserPosts() {
        try {
            const response = await fetch('https://encuentrame.org.xelar.tech/api/users/' + userId + "/posts");
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const data = await response.json();
            return (data);
        } catch (err) {
            console.log(err);
        }
    }
    window.loadProfile = function() {
        fetchUserPosts().then(function(data) {
            $.each(data.lost, function () {
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postLostNew = $(document.createElement('div'));
                postLostNew.addClass('card row justify-content-around g-2');
                postLostNew.addClass('pet');
                postLostNew.addClass('pet_lost');
                postLostNew.addClass(this.mascota);
                let individualPost = $(document.createElement('div'));
                individualPost.addClass('individual col-sm-12 col-md-6 col-lg-12 col-xl-12 p-3');
                let cardImg = $(document.createElement('div'));
                cardImg.addClass('user');
                cardImg.addClass('card-img-top');
                cardImg.append('<a href="/' + this.id + '"></a>');
                cardImg.find('a').append('<img class="img-fluid" src="/static/images/' + this.foto + '">');
                let cardBody = $(document.createElement('div'));
                cardBody.addClass('card-body');
                cardBody.append('<h5 class="card-title">' + this.nombre +' perdido/a!</h5>');
                cardBody.append('<p class="card-text">Fecha de publicación: ' + this.created_at +'</p">');
                cardBody.append('<p>¡Se busca a ' + this.nombre + '! Perdido/a desde el día '
                + this.fecha + ' última vez visto en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' barrio ' + this.barrio + ' a las ' + this.hora + ' horas.\n'
                + 'Si lo viste por favor comunícate con ' + this.user_name + '.</p>');
                let buttonsDiv = $(document.createElement('div'));
                buttonsDiv.addClass('buttons');
                let deleteButton = $(document.createElement('button'));
                deleteButton.addClass('btn');
                deleteButton.addClass('enc-btn-danger');
                deleteButton.attr('type', 'button');
                deleteButton.html('Eliminar');
                deleteButton.attr('onclick', 'deletePost("' + this.id + '")');
                buttonsDiv.append(deleteButton);
                let updateButton = $(document.createElement('button'));
                updateButton.addClass('btn');
                updateButton.addClass('enc-btn-happy');
                updateButton.attr('type', 'button');
                updateButton.html('¡Tengo a mi mascota!');
                updateButton.attr('onclick', 'resolvePost("' + this.id +'")');
                buttonsDiv.append(updateButton);
                cardBody.append(buttonsDiv);
                individualPost.append(postLostNew);
                postLostNew.append(cardImg);/*append img, body and btn*/
                postLostNew.append(cardBody);
                $('article.posts').append(individualPost);
            });
            $.each(data.found, function () {
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postFoundNew = $(document.createElement('div'));
                postFoundNew.addClass('card row justify-content-around g-2');
                postFoundNew.addClass('pet');
                postFoundNew.addClass('pet_found');
                postFoundNew.addClass(this.mascota);
                let individualPost = $(document.createElement('div'));
                individualPost.addClass('individual col-sm-12 col-md-6 col-lg-12 col-xl-12 p-3');
                let cardImg = $(document.createElement('div'));
                cardImg.addClass('user');
                cardImg.addClass('card-img-top');
                cardImg.append('<a href="/' + this.id + '"></a>');
                cardImg.find('a').append('<img class="img-fluid" src="/static/images/' + this.foto + '">');
                let cardBody = $(document.createElement('div'));
                cardBody.addClass('card-body');
                cardBody.append('<h5 class="card-title">' + this.mascota +' encontrado/a!</h5>');
                cardBody.append('<p class="card-text">Fecha de publicación: ' + this.created_at +'</p">');
                cardBody.append('<p>Se encontró el día ' + this.fecha + ' por barrio '
                + this.barrio + ' en las inmediaciones de ' + this.calle_1 +
                ' y ' + this.calle_2 + ' a las ' + this.hora + ' horas.\n'
                + 'Si es tuyo o sabes de quien puede ser por favor comunícate con ' + this.user_name + '.</p>');
                let buttonsDiv = $(document.createElement('div'));
                buttonsDiv.addClass('buttons');
                let deleteButton = $(document.createElement('button'));
                deleteButton.addClass('btn');
                deleteButton.addClass('btn-danger');
                deleteButton.attr('type', 'button');
                deleteButton.html('Eliminar');
                deleteButton.attr('onclick', 'deletePost("' + this.id + '")');
                buttonsDiv.append(deleteButton);
                let updateButton = $(document.createElement('button'));
                updateButton.addClass('btn');
                updateButton.addClass('btn-info');
                updateButton.attr('type', 'button');
                updateButton.html('¡Tengo a mi mascota!');
                updateButton.attr('onclick', 'resolvePost("' + this.id +'")');
                buttonsDiv.append(updateButton);
                cardBody.append(buttonsDiv);
                individualPost.append(postFoundNew);
                postFoundNew.append(cardImg);/*append img, body and btn*/
                postFoundNew.append(cardBody);
                $('article.posts').append(individualPost);
            });
        });
    }
    loadProfile();
});
