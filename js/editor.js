let indentBlock_flag = false;
let indent = 0;
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
    return cut_empStr + '<span class=\"' + string + '\">' + p1 + '</span>';
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

function primaryTitleBlock(match, p1) {
  return "<span class=\"primaryTitle\">" + p1 + "</span>";
}
function middleTitleBlock(match, p1) {
  return "<span class=\"middleTitle\">" + p1 + "</span>";
}
function subTitleBlock(match, p1) {
  return "<span class=\"subTitle\">" + p1 + "</span>";
}


function pagebreak(match, p1) {
  console.log(match, p1);
  return "<p id=\"pagebreak\"></p>";
}

function convertCharToNum(match, p1, p2, p3) {
  var res = "";
  str = p1;
  console.log(match, p1, p2, p3);
  for (var index = 0; index < str.length; index++) {
    res = res + String.fromCharCode(str.charCodeAt(index) - 65248);
  }
  return parseInt(res);
}

function substrNum(str) {
  var res = str.match(/[０-９0-9]/g, (s) => {
    return s;
  });
  var indentNum = res.join('').replace(/[０-９]/g, (s) => { return String.fromCharCode(s.charCodeAt(0) - 65248); });
  if (indentNum == NaN) return str;
  return parseInt(indentNum);
}

function indentLine(match, p1, p2) {
  console.log(match, p1, p2);
  var space = '　'.repeat(substrNum(match));
  return "<p>" + space + p1 + "</p>";
}

function indentBlockStart(match, p1) {
  var indentNum = substrNum(match);
  indentBlock_flag = true;
  this.indent = indentNum;
  return '<p style="padding-left: ' + indentNum + 'em;">';
}

function indentBlockEnd(match) {
  indentBlock_flag = false;
  return "</p>";
}

function convert(str) {
  var html = str.replace(/\n/g, '　\n');
  console.log(html);
  html = marked(html, { sanitize: true });
  html = html.replace(/[｜](.+?)《(.+?)》/g, ruby);
  html = html.replace(/(.+?)［＃「(.+?)」に傍点］/g, emphasis);
  html = html.replace(/(.+?)［＃「(.+?)」は太字］/g, strong);
  html = html.replace(/(.+?)［＃「(.+?)」は大見出し］/g, primaryTitle);
  html = html.replace(/［＃大見出し］(.+?)［＃大見出し終わり］/g, primaryTitleBlock);
  html = html.replace(/(.+?)［＃「(.+?)」は中見出し］/g, middleTitle);
  html = html.replace(/［＃中見出し］(.+?)［＃中見出し終わり］/g, middleTitleBlock);
  html = html.replace(/(.+?)［＃「(.+?)」は小見出し］/g, subTitle);
  html = html.replace(/［＃小見出し］(.+?)［＃小見出し終わり］/g, subTitleBlock);
  html = html.replace(/［＃改ページ］/g, pagebreak);
  html = html.replace(/［＃[０-９0-9]字下げ］(.+?)\n/g, indentLine);
  html = html.replace(/［＃ここから[０-９0-9]字下げ］/g, indentBlockStart);
  html = html.replace(/［＃ここで字下げ終わり］/g, indentBlockEnd);

  console.log(html);
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

