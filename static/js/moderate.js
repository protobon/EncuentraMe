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
                post.addClass('pet');
                post.addClass('pet-lost');
                post.append('<a href="https://encuentrame.org.xelar.tech/profile' + this.user_id + '"></a>');
                post.find('a').append('<h3>' + this.user_name + '</h3>');
                post.append(';<img src="/static/images/' + this.foto + '">');
                post.append('<p>' + this.created_at + '</p>');
                $.each(this.comments, function() {
                    post.append('<p>' + this + '</p>');
                });
                let deleteButton = $(document.createElement('button'));
                deleteButton.addClass('btn');
                deleteButton.addClass('btn-danger');
                deleteButton.attr('type', 'button');
                deleteButton.html('Eliminar');
                deleteButton.attr('onclick', 'deletePost("' + this.id + '")');
                post.append(deleteButton);
                let forgiveButton = $(document.createElement('button'));
                forgiveButton.addClass('btn');
                forgiveButton.addClass('btn-primary');
                forgiveButton.attr('type', 'button');
                forgiveButton.html('Perdonar');
                forgiveButton.attr('onclick', 'forgivePost("' + this.id + '")');
                post.append(forgiveButton);
                $('article.posts').append(post);
            });
            $.each(data.found, function() {
                let post = $(document.createElement('div'));
                post.addClass('pet');
                post.addClass('pet-found');
                post.append('<h3>' + this.user_name + '</h3>');
                post.append('<p>' + this.user_id + '</p>');
                post.append('<img src="/static/images/' + this.foto + '">');
                post.append('<p>' + this.created_at + '</p>');
                $.each(this.comments, function() {
                    post.append('<p>' + this + '</p>');
                });
                let deleteButton = $(document.createElement('button'));
                deleteButton.addClass('btn');
                deleteButton.addClass('btn-danger');
                deleteButton.attr('type', 'button');
                deleteButton.html('Eliminar');
                deleteButton.attr('onclick', 'deletePost("' + this.id + '")');
                post.append(deleteButton);
                let forgiveButton = $(document.createElement('button'));
                forgiveButton.addClass('btn');
                forgiveButton.addClass('btn-primary');
                forgiveButton.attr('type', 'button');
                forgiveButton.html('Perdonar');
                forgiveButton.attr('onclick', 'forgivePost("' + this.id + '")');
                post.append(forgiveButton);
                $('article.posts').append(post);
            });
        });
    }
    loadReports();
});