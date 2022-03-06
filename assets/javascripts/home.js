console.log('Hello');
$('.home-container .posts-container div label').on('click', function(){
    if($(this).next().css('display')=='none'){
        $('.comments-container').css('display','none');
        $(this).next().css('display','block');
    }
    else{
        $('.comments-container').css('display','none');
        $(this).next().css('display','none');
    }
});

