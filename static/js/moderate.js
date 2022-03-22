$(document).ready(function () {
    async function fetchReports() {
        const response = await fetch('https://encuentrame.org.xelar.tech/api/posts/reported');
        const data = await response.json();
        return data;
    }
    window.loadReports = function() {
        fetchReports().then(function(data) {
            $.each(data.lost, function() {
                let post = $(document.createElement('div'));
                post.addClass('card justify-content-around col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 p-2 g-2');
                post.addClass('pet');
                post.addClass('pet-lost');
                let cardImg = $(document.createElement('div'));/*2*/
                cardImg.addClass('user'); /*2*/
                cardImg.addClass('card-img-top');/*2*/
                cardImg.append('<a href="https://encuentrame.org.xelar.tech/profile/' + this.user_id + '"></a>');
                post.find('a').append('<h3>' + this.user_name + '</h3>');
                post.append('<img class="img-fluid rounded" src="/static/images/' + this.foto + '">');
                post.append('<p>' + this.created_at + '</p>');
                $.each(this.comments, function() {
                    post.append('<p>' + this + '</p>');
                });
                let deleteButton = $(document.createElement('button'));
                deleteButton.addClass('btn');
                deleteButton.addClass('enc-btn-danger');
                deleteButton.attr('type', 'button');
                deleteButton.html('Eliminar');
                deleteButton.attr('onclick', 'deletePost("' + this.id + '")');
                post.append(deleteButton);
                let forgiveButton = $(document.createElement('button'));
                forgiveButton.addClass('btn');
                forgiveButton.addClass('enc-btn-happy');
                forgiveButton.attr('type', 'button');
                forgiveButton.html('Perdonar');
                forgiveButton.attr('onclick', 'forgivePost("' + this.id + '")');
                post.append(cardImg);
                post.append(forgiveButton);
                $('div.posts').append(post);
            });
            $.each(data.found, function() {
                let post = $(document.createElement('div'));
                post.addClass('card justify-content-around col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 p-2 g-2');
                post.addClass('pet');
                post.addClass('pet-found');
                let cardImg = $(document.createElement('div'));/*2*/
                cardImg.addClass('user'); /*2*/
                cardImg.addClass('card-img-top');/*2*/
                cardImg.append('<img class="img-fluid rounded" src="/static/images/' + this.foto + '">');
                post.append('<h3>' + this.user_name + '</h3>');
                post.append('<p>' + this.user_id + '</p>');
                post.append('<p>' + this.created_at + '</p>');
                $.each(this.comments, function() {
                    post.append('<p>' + this + '</p>');
                });
                let deleteButton = $(document.createElement('button'));
                deleteButton.addClass('btn');
                deleteButton.addClass('enc-btn-danger');
                deleteButton.attr('type', 'button');
                deleteButton.html('Eliminar');
                deleteButton.attr('onclick', 'deletePost("' + this.id + '")');
                post.append(deleteButton);
                let forgiveButton = $(document.createElement('button'));
                forgiveButton.addClass('btn');
                forgiveButton.addClass('enc-btn-happy');
                forgiveButton.attr('type', 'button');
                forgiveButton.html('Perdonar');
                forgiveButton.attr('onclick', 'forgivePost("' + this.id + '")');
                post.append(cardImg);
                post.append(forgiveButton);
                $('div.posts').append(post);
            });
        });
    }
    loadReports();
});