function devidePage(html)
{
    var copy_html = html;
    var sentences = copy_html.split(/['<p>(.?)</p>'|'<br>']/);
    var sentences = $.grep(sentences, function(e){return e !== "";});
    console.log(sentences);
    var array = [];
    var page = [];
    var count = 0;
    $.each(sentences, function(index, sentence){
        console.log(index, sentence);
        var tmplines = sentence.match(/(.{40})/g);
        $.each(tmplines, function(index, line){
            if(count < 40){
                array.push(line);
                count++;
            }
            else
            {
                console.log(array);
                console.log(page);
                page[page.length] = array;
                count = 0;
                array = [];
                array.push(line);
            }
        });
    });
    if(array.length > 0){
        page[page.length] = array;
    }
    console.log("page", page);
    return 0;
}

$(function(){
    $(document).ready(function(){    
        if(window.opener)
        {
            console.log("Can access parent tab");
            var resultContents = window.opener.$("#result");
            var contain = window.opener.$(".vertical");
            var html = resultContents.html();
            
            if(contain.length > 0)
            {
                html = "<div class=\"vertical\"><div class=\"preview\">" + html + "</div></div>";
            }
            $("#preview_result").html(html);
        }
    });

});
