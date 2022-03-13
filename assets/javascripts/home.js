{
    //method to submit data to form using ajax 
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        console.log(newPostForm);
        newPostForm.submit(function (e) {
            e.preventDefault();


            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('.posts-container').prepend(newPost);
                    // $(' .delete-post-button',newPost);
                    deletePost($(' .delete-post-button',newPost));
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });

    }

    //method to create a post in dom
    let newPostDom = function (post) {
        return $(`<div id="post-${ post._id}">
            <a class="delete-post-button" href="/posts/destroy/${ post._id }"><i class="fas fa-trash-alt"></i></a>
    
            <h6>
                ${ post.user.name}
            </h6>
        <p>
            ${ post.content}
        </p>
     
        <label for="down" id="down-arrow">Comments <i class="fas fa-angle-down"></i></label>
       
        <div class="comments-container">
            <%for (comment of post.comments) { %>
                <%- include('_comment.ejs') -%>
            <%}%>
            <div class="add-comment">
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type Here to add comments... " required>
                        <input type="hidden" name="post" value="<%= post.id %>">
                        <input type="submit" value="Add Comment">
                    </form>
            </div>
        </div>
    </div>`);
    }




    // method to delete a post from dom addes by post form currently
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            console.log(deleteLink);
            e.preventDefault();

            $.ajax({
                type: 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    console.log(data);
                    $(`#post-${data.data.post}`).remove();
                },err: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();
}




$('.home-container .posts-container div label').on('click', function () {
    if ($(this).next().css('display') == 'none') {
        $('.comments-container').css('display', 'none');
        $(this).next().css('display', 'block');
    }
    else {
        $('.comments-container').css('display', 'none');
        $(this).next().css('display', 'none');
    }
});

