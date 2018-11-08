function emphasis(match, p1, p2, string){
  console.log(p1, p1.length, p2, p2.length);
  var index = p1.lastIndexOf(p2);
  console.log(index, p1, p1.length, p2, p2.length);
  if(index != -1　&& index + p2.length == p1.length)
  {
    var cut_empStr = p1.slice(0, index);
    return cut_empStr + '<span class=\"emp \">' + p2 + '</span>';
  }
  return match;
}

function ruby(match, p1, p2, string)
{
  console.log(match, p1, p2);
  return '<ruby>' + p1 + '<rt>' + p2 + '</rt></ruby>';
}

function strong(match, p1, p2, string)
{
  var index = p1.indexOf(p2);
  if(index != -1)
  {
    var cut_empStr = p1.slice(0, index);
    return cut_empStr + '<strong>' + p2 + '</strong>';
  }
  return match;
}

$(function(){
  marked.setOptions({breaks: true});
  $('#editor').keyup(function(){
    var src = $(this).val();
    var html = marked(src);

    html = html.replace(/[｜](.+?)《(.+?)》/g, ruby);
    html = html.replace(/(.+?)［＃「(.+?)」に傍点］/g, emphasis);
    html = html.replace(/(.+?)［＃「(.+?)」は太字］/g, strong);
    $('#result').html(html);
  });

  $('.contain').on('click', function(event){
    event.preventDefault();
    $(this).toggleClass('vertical');
  });

  const handler = () => {
  };
});
