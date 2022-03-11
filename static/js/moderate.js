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
                userName.append('<h3>' + this.user_name + '</h3>');
                $('article.posts').append(userName);
                $.each(user.posts, function(post) {
                    let userPosts = $(document.createElement('div'));
                    userPosts.append('<img src="/static/images/' + this.foto + '">');
                    $.each(data.reports, function() {
                        if (this.post_id === post.id) {
                            userPosts.append('<p>' + this.sender_uname + ': '  + this.reporte + '</p>');
                        }
                    });
                    let removeButton = $(document.createElement('button'));
                    removeButton.html('Eliminar');
                    removeButton.attr('onclick', 'deletePost("' + this.id + '")');
                    userPosts.append(removeButton);
                    let forgiveButton = $(document.createElement('button'));
                    forgiveButton.html('Perdonar');
                    forgiveButton.attr('onclick', 'forgivePost("' + this.id + '")');
                    userPosts.append(forgiveButton);
                    userName.append(userPosts);
                });
            });
        });
    }
    loadReports();
});