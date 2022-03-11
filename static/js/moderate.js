$(document).ready(function () {
    async function fetchReports() {
        const response = await fetch('https://encuentrame.org.xelar.tech/api/posts/reported');
        const data = await response.json();
        return data;
    }
    window.loadReports = function() {
        fetchReports().then(function(data) {
            $.each(data.reported_user_posts, function(user) {
                let userName = $(document.createElement('div'));
                userName.append('<h3>' + this + '</h3>');
                $.each(user, function(post) {
                    let userPost = $(document.createElement('div'));
                    userPost.append('<img src="/static/images/' + this.foto + '">');
                    $.each(data.reports, function() {
                        if (this.post_id === post.id) {
                            userPost.append('<p>' + this.sender_uname + ': '  + this.reporte + '</p>');
                        }
                    });
                    let removeButton = $(document.createElement('button'));
                    removeButton.html('Eliminar');
                    removeButton.attr('onclick', 'deletePost("' + this.id + '")');
                    userPost.append(removeButton);
                    let forgiveButton = $(document.createElement('button'));
                    forgiveButton.html('Perdonar');
                    forgiveButton.attr('onclick', 'forgivePost("' + this.id + '")');
                    userPost.append(forgiveButton);
                    userName.append(userPost);
                });
                $('article.posts').append(userName);
            });
        });
    }
    loadReports();
});