
function emphasis(match, p1, p2) {
  var index = p1.lastIndexOf(p2);
  if (index != -1 && index + p2.length == p1.length) {
    var cut_empStr = p1.slice(0, index);
    return cut_empStr + '<span class=\"emp \">' + p2 + '</span>';
  }
  return match;
}

function ruby(match, p1, p2) {
  return '<ruby>' + p1 + '<rt>' + p2 + '</rt></ruby>';
}

function strong(match, p1, p2) {
  var index = p1.lastIndexOf(p2);
  if (index != -1 && index + p2.length == p1.length) {
    var cut_empStr = p1.slice(0, index);
    return cut_empStr + '<strong>' + p2 + '</strong>';
  }
  return match;
}

function title(match, p1, p2, string) {
  var index = p1.lastIndexOf(p2);
  if (index != -1 && index + p2.length == p1.length) {
    var cut_empStr = p1.slice(0, index);
    return cut_empStr + '<span class=\"' + string + '\">' + p2 + '</span>';
  }
  return match;
}

function primaryTitle(match, p1, p2) {
  return title(match, p1, p2, "primaryTitle");
}

function middleTitle(match, p1, p2) {
  return title(match, p1, p2, "middleTitle");
}

function subTitle(match, p1, p2) {
  return title(match, p1, p2, "subTitle");
}

function pagebreak(match, p1) {
  return "<p id=\"pagebreak\"></p>";
}

function convert(str) {
  var html = str.replace(/\n/g, '　\n');
  html = marked(html);
  html = html.replace(/[｜](.+?)《(.+?)》/g, ruby);
  html = html.replace(/(.+?)［＃「(.+?)」に傍点］/g, emphasis);
  html = html.replace(/(.+?)［＃「(.+?)」は太字］/g, strong);
  html = html.replace(/(.+?)［＃「(.+?)」は大見出し］/g, primaryTitle);
  html = html.replace(/(.+?)［＃「(.+?)」は中見出し］/g, middleTitle);
  html = html.replace(/(.+?)［＃「(.+?)」は小見出し］/g, subTitle);
  html = html.replace(/［＃改ページ］/g, pagebreak);
  html = html.replace(/\n/g, '　<br />');
  if (html == '') return '';
  return $('#result').html(html);
}


window.onload = function () {
  new Vue({
    el: '#main',
    data: {
      input: '',
    },
    filters: {
      convert: convert,
    },
    methods: {
      vertical: function (event) {
        event.preventDefault();
        $('#preview').toggleClass('vertical');
      }
    }
  });

  new Vue({
    el: '#toPDF',
    methods: {
      print: function (event) {
        var hide_elm = $('.form-control, .header');
        hide_elm.addClass('print');
        if ($('.vertical') !== null) {
          $('.contain').toggleClass('preview');
        }

        window.print();
        hide_elm.removeClass('print');
        $('.contain').removeClass('preview');
      }
    }
  });
};

