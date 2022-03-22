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

    async function fetchPostsLost() {
        try {
            const response = await fetch('https://encuentrame.org.xelar.tech/api/posts/lost');
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const data = await response.json();
            return (data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchPostsFound() {
        try {
            const response = await fetch('https://encuentrame.org.xelar.tech/api/posts/found');
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const data = await response.json();
            return (data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchPostsResolved() {
        try {
            const response = await fetch('https://encuentrame.org.xelar.tech/api/posts/completed');
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const data = await response.json();
            return (data);
        } catch (err) {
            console.log(err);
        }
    }

    async function getUserLink(uid) {
        try {
            const response = await fetch("https://encuentrame.org.xelar.tech/api/users/" + uid);
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const user = await response.json();
            return (user);
        } catch (err) {
            console.log(err);
        }
    }

    window.refreshFeed = function() {
        fetchAllPosts().then(function(all_posts) {
            $('div.posts').empty();
            $('#todos').prop('checked', true);
            $.each(all_posts, function () {
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let post = $(document.createElement('div')); /*1*/
                post.addClass('card row justify-content-around g-2'); /*1*/
                if (this.nombre) {
                    post.addClass('pet pet_lost');/*1*/
                } else {
                    post.addClass('pet pet_found');/*1*/
                }
                let individualPost = $(document.createElement('div'));
                individualPost.addClass('individual col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 p-2');
                individualPost.addClass(this.mascota);
                let cardImg = $(document.createElement('div'));/*2*/
                cardImg.addClass('user'); /*2*/
                cardImg.addClass('card-img-top');/*2*/
                cardImg.append('<a href="/' + this.id + '"></a>');/*3*/
                cardImg.find('a').append('<img class="img-fluid rounded" src="/static/images/' + this.foto + '">');/*4*/
                let cardBody = $(document.createElement('div'));/*5*/
                cardBody.addClass('card-body');/*5*/
                if (this.nombre) {
                    cardBody.append('<h5 class="card-title">' + this.nombre + ' perdido/a!</h5>');/*6*/
                } else {
                    cardBody.append('<h5 class="card-title">' + this.mascota + ' encontrado/a!</h5>');/*6*/
                }
                cardBody.append('<p class="card-text">Fecha de publicación: ' + this.created_at +'</p">');/*7*/
                const user_id = this.user_id;
                const fecha = this.fecha;
                const calle_1 = this.calle_1;
                const calle_2 = this.calle_2;
                const barrio = this.barrio;
                const hora = this.hora;
                const user_name = this.user_name;
                if (this.nombre) {
                    const nombre = this.nombre;
                    getUserLink(user_id).then(function(user) {
                        cardBody.append('<p class="card-text">¡Se busca a ' + nombre + '! Perdido/a desde el día '
                        + fecha + ' última vez visto en las inmediaciones de ' + calle_1 + ' y ' + calle_2 + ' barrio '
                        + barrio + ' a las ' + hora + ' horas.\n' + 'Si lo viste por favor comunícate con\
                        <a target="_blank" href="' + user.fb_profile + '">' + user_name + '</a>.</p>');/*7*/
                    });
                } else {
                    getUserLink(user_id).then(function(user) {
                        cardBody.append('<p class="card-text">Se encontró el día ' + fecha + ' por barrio '
                        + barrio + ' en las inmediaciones de ' + calle_1 + ' y ' + calle_2 + ' a las '
                        + hora + ' horas.\n' + 'Si es tuyo o sabes de quien puede ser por favor comunícate con\
                        <a target="_blank" href="' + user.fb_profile + '">' + user_name + '</a>.</p>');
                    });
                }
                if (this.phone) {
                    cardBody.append('<p class="card-text">Teléfono: ' + this.phone + '</p>');
                }/*7*/
                let reportButton = $(document.createElement('button'));/*8*/
                reportButton.html('Denunciar publicación');
                reportButton.addClass('btn');/*8*/
                reportButton.addClass('btn-link');/*8*/
                reportButton.addClass('btn-sm');/*8*/
                reportButton.attr('onclick', 'reportPost("' + this.id + '")');/*8*/
                individualPost.append(post);
                post.append(cardImg);/*append img, body and btn*/
                post.append(cardBody);
                post.append(reportButton);
                $('div.posts').append(individualPost);
            });
        });
    }
    refreshFeed();
    window.refreshLost = function() {
        fetchPostsLost().then(function(all_posts_lost) {
            $('div.posts').empty();
            $('#todos').prop('checked', true);
            $.each(all_posts_lost, function () {
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postLostNew = $(document.createElement('div')); /*1*/
                postLostNew.addClass('card g-2'); /*1*/
                postLostNew.addClass('pet');/*1*/
                postLostNew.addClass('pet_lost');/*1*/
                let individualPost = $(document.createElement('div'));
                individualPost.addClass('individual col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 p-2');
                individualPost.addClass(this.mascota);
                let cardImg = $(document.createElement('div'));/*2*/
                cardImg.addClass('user'); /*2*/
                cardImg.addClass('card-img-top');/*2*/
                cardImg.append('<a href="/' + this.id + '"></a>');/*3*/
                cardImg.find('a').append('<img class="img-fluid rounded" src="/static/images/' + this.foto + '">');/*4*/
                let cardBody = $(document.createElement('div'));/*5*/
                cardBody.addClass('card-body');/*5*/
                cardBody.append('<h5 class="card-title">' + this.nombre +' perdido/a!</h5>');/*6*/
                cardBody.append('<p class="card-text">Fecha de publicación: ' + this.created_at +'</p">');/*7*/
                const nombre = this.nombre;
                const user_id = this.user_id;
                const fecha = this.fecha;
                const calle_1 = this.calle_1;
                const calle_2 = this.calle_2;
                const barrio = this.barrio;
                const hora = this.hora;
                const user_name = this.user_name;
                getUserLink(user_id).then(function(user) {
                    cardBody.append('<p class="card-text">¡Se busca a ' + nombre + '! Perdido/a desde el día '
                    + fecha + ' última vez visto en las inmediaciones de ' + calle_1 + ' y ' + calle_2 + ' barrio '
                    + barrio + ' a las ' + hora + ' horas.\n' + 'Si lo viste por favor comunícate con\
                    <a target="_blank" href="' + user.fb_profile + '">' + user_name + '</a>.</p>');/*7*/
                });
                if (this.phone) {
                    cardBody.append('<p class="card-text">Teléfono: ' + this.phone + '</p>');
                }/*7*/
                let reportButton = $(document.createElement('button'));/*8*/
                reportButton.html('Denunciar publicación');
                reportButton.addClass('btn');/*8*/
                reportButton.addClass('btn-link');/*8*/
                reportButton.addClass('btn-sm');/*8*/
                reportButton.attr('onclick', 'reportPost("' + this.id + '")');/*8*/
                individualPost.append(postLostNew);
                postLostNew.append(cardImg);/*append img, body and btn*/
                postLostNew.append(cardBody);
                postLostNew.append(reportButton);
                $('div.posts').append(individualPost);
            });
        });
    }
    window.refreshFound = function() {
        fetchPostsFound().then(function(all_posts_found) {
            $('div.posts').empty();
            $('#todos').prop('checked', true);
            $.each(all_posts_found, function () {
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let postFoundNew = $(document.createElement('div'));/*1*/
                postFoundNew.addClass('card row justify-content-around g-2');
                postFoundNew.addClass('pet');
                postFoundNew.addClass('pet_found');
                let individualPost = $(document.createElement('div'));
                individualPost.addClass('individual col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 p-2');
                individualPost.addClass(this.mascota);
                let cardImg = $(document.createElement('div'));
                cardImg.addClass('user'); /*2*/
                cardImg.addClass('card-img-top');/*2*/
                cardImg.append('<a href="/' + this.id + '"></a>');/*3*/
                cardImg.find('a').append('<img class="img-fluid rounded" src="/static/images/' + this.foto + '">');/*4*/
                let cardBody = $(document.createElement('div'));/*5*/
                cardBody.addClass('card-body');/*5*/
                cardBody.append('<h5 class="card-title">' + this.mascota +' encontrado/a!</h5>');/*6*/
                cardBody.append('<p class="card-text">Fecha de publicación: ' + this.created_at +'</p">');/*7*/
                const user_id = this.user_id;
                const fecha = this.fecha;
                const calle_1 = this.calle_1;
                const calle_2 = this.calle_2;
                const barrio = this.barrio;
                const hora = this.hora;
                const user_name = this.user_name;
                getUserLink(user_id).then(function(user) {
                    cardBody.append('<p class="card-text">Se encontró el día ' + fecha + ' por barrio '
                    + barrio + ' en las inmediaciones de ' + calle_1 + ' y ' + calle_2 + ' a las '
                    + hora + ' horas.\n' + 'Si es tuyo o sabes de quien puede ser por favor comunícate con\
                    <a target="_blank" href="' + user.fb_profile + '">' + user_name + '</a>.</p>');
                });
                if (this.phone) {
                    cardBody.append('<p class="card-text">Teléfono: ' + this.phone + '</p>');
                }/*7*/
                let reportButton = $(document.createElement('button'));
                reportButton.html('Denunciar publicación');
                reportButton.addClass('btn');
                reportButton.addClass('btn-link');
                reportButton.addClass('btn-sm');
                reportButton.attr('onclick', 'reportPost("' + this.id + '")');
                individualPost.append(postFoundNew);
                postFoundNew.append(cardImg);
                postFoundNew.append(cardBody);
                postFoundNew.append(reportButton);
                $('div.posts').append(individualPost);
            });
        });
    }
    window.refreshResolved = function() {
        fetchPostsResolved().then(function(all_posts_resolved) {
            $('div.posts').empty();
            $('#todos').prop('checked', true);
            $.each(all_posts_resolved, function () {
                this.created_at = new Date(this.created_at).toLocaleString('es-UY');
                let post = $(document.createElement('div')); /*1*/
                post.addClass('card row justify-content-around g-2'); /*1*/
                post.addClass('pet pet_resolved');/*1*/
                let individualPost = $(document.createElement('div'));
                individualPost.addClass('individual col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 p-2');
                individualPost.addClass(this.mascota);
                let cardImg = $(document.createElement('div'));/*2*/
                cardImg.addClass('user'); /*2*/
                cardImg.addClass('card-img-top');/*2*/
                cardImg.append('<a href="/' + this.id + '"></a>');/*3*/
                cardImg.find('a').append('<img class="img-fluid rounded" src="/static/images/' + this.foto + '">');/*4*/
                let cardBody = $(document.createElement('div'));/*5*/
                cardBody.addClass('card-body');/*5*/
                cardBody.append('<h5 class="card-title">Encontré a mi familia!</h5>');/*6*/
                cardBody.append('<p class="card-text">Nos alegra enormemente anunciar que este animalito volvió a su hogar. Muchas gracias a todos los involucrados.\n¡Sigamos trabajando por más éxitos!');/*7*/
                individualPost.append(post);
                post.append(cardImg);/*append img, body and btn*/
                post.append(cardBody);
                $('div.posts').append(individualPost);
            });
        });
    }
});
