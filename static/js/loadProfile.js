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
    loadProfile();
});
