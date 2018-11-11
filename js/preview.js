$(function(){
    $(document).ready(function(){    
        if(window.opener)
        {
            console.log("Can access parent tab");
            var resultContents = window.opener.$("#result");
            var contain = window.opener.$(".vertical");
            console.log(contain, resultContents);
            var html = resultContents.html();
            if(contain !== null)
            {
                html = "<div class=\"vertical\"><div class=\"preview\">" + html + "</div></div>";
            }
            console.log(html);
            $("#preview_result").html(html);
        }
    });

});