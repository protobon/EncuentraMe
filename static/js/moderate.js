$(document).ready(function () {
    async function fetchReports() {
        const response = await fetch('https://encuentrame.org.xelar.tech/api/posts/reported');
        const data = await response.json();
        return data;
    }
    window.loadReports = function() {
        fetchReports().then(function(data) {
            $.each(JSON.parse(data.reported_user_posts), function(user) {
                $.each(user, function(post) {
                    let userName = $(document.createElement('div'));
                    userName.append('<h3>' + post.user_name + '</h3>');
                    let userPost = $(document.createElement('div'));
                    userPost.append('<img src="/static/images/' + post.foto + '">');
                    $.each(data.reports, function(report) {
                        if (report.post_id === post.id) {
                            userPost.append('<p>' + report.sender_uname + ': '  + report.reporte + '</p>');
                        }
                    });
                    let removeButton = $(document.createElement('button'));
                    removeButton.html('Eliminar');
                    removeButton.attr('onclick', 'deletePost("' + post.id + '")');
                    userPost.append(removeButton);
                    let forgiveButton = $(document.createElement('button'));
                    forgiveButton.html('Perdonar');
                    forgiveButton.attr('onclick', 'forgivePost("' + post.id + '")');
                    userPost.append(forgiveButton);
                    userName.append(userPost);
                });
                $('article.posts').append(userName);
            });
        });
    }
    loadReports();
});