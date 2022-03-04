$(document).ready(function() {
    const url = window.location.href;
    const urlArray = url.split('/');
    const postId = urlArray[urlArray.length - 1];
    async function fetchSinglePost() {
        try {
            const response = await fetch("https://encuentrame.org.xelar.tech/api/posts/" + postId);
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const data = await response.json();
            return (data);
        } catch (err) {
            console.log(err);
        }
    }
    window.displayPost = function () {
        fetchSinglePost().then(function(post) {
            $('head').append('<meta property="og:image"         content="https://encuentrame.org.xelar.tech/static/images/' + post.foto + '" />');
            $('article.post').empty();
            if (postId.includes("lost")) {
                let postLostAnimal = $(document.createElement('div'));
                postLostAnimal.addClass('pet');
                postLostAnimal.addClass('pet_lost');
                postLostAnimal.addClass(post.animal);
                postLostAnimal.append('<p>¡Se busca a ' + post.nombre + '! Perdido/a desde el día '
                + post.fecha + ' última vez visto en las inmediaciones de ' + post.calle_1 +
                ' y ' + post.calle_2 + ' barrio ' + post.barrio + ' a las ' + post.hora + ' horas.\n'
                + 'Si lo viste por favor comunícate con Usuario.</p>');
                postLostAnimal.append('<a href="/' + post.id + '"></a>');
                postLostAnimal.find('a').append('<img src="/static/images/' + post.foto + '">');
                let shareOnFb = $('#share-on-fb');
                shareOnFb.append('<div class="fb-share-button" data-href="' + url + '" data-layout="button" data-size="small"></div>');
                $('article.post').append(postLostAnimal);
            } else {
                let postFoundAnimal = $(document.createElement('div'));
                postFoundAnimal.addClass('pet');
                postFoundAnimal.addClass('pet_found');
                postFoundAnimal.addClass(post.animal);
                postFoundAnimal.append('<p>Se encontró el día ' + post.fecha + ' por barrio '
                + post.barrio + ' en las inmediaciones de ' + post.calle_1 +
                ' y ' + post.calle_2 + ' a las ' + post.hora + ' horas.\n'
                + 'Si es tuyo o sabes de quien puede ser por favor comunícate con Usuario.</p>');
                postFoundAnimal.append('<a href="/' + post.id + '"></a>');
                postFoundAnimal.find('a').append('<img src="/static/images/' + post.foto + '">');
                let shareOnFb = $('#share-on-fb');
                shareOnFb.append('<div class="fb-share-button" data-href="' + url + '" data-layout="button" data-size="small"></div>');
                $('article.post').append(postFoundAnimal);
            }
        });
    }
    displayPost();
});