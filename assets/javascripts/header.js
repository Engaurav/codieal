
$(function(){
    var current = location.pathname;
    $('nav ul li a').each(function(){
        var $this = $(this);
        // console.log($this);
        // console.log($this.attr('href'));
        // console.log(current);

        if($this.attr('href')==current){
            $this.addClass('active');
        }

        // if the current path is like this link, make it active
        // if($this.attr('href').indexOf(current) !== -1){
        //     $this.addClass('active');
        // }
    })
})