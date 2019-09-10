//<![CDATA[
$(document).ready(function(){

$("#btngenerate").on("click",function(){
var generateurl = $("#generateurl").val(),
generatelink = $("#generatelink"),		
generateloading = $("#generateloading"),		
resulturl = $('#resulturl');			

if (generateurl == "") {
$("#generateurl").focus();
return false;
}

$("#copytoclipboard").html("<span class='fa fa-floppy-o'></span> Copy URL");
generateloading.removeClass('hidden');
generatelink.addClass('hidden');
$.ajax({
url : '/feeds/posts/summary?alt=json-in-script',
type: 'get',
dataType: 'jsonp',
success: function(data) {
var link = '',
content = data.feed.entry,
links =new Array();	
if (content !== undefined) {
for (var i = 0; i < content.length; i++) {
for (var j = 0; j < content[i].link.length; j++) {
if (content[i].link[j].rel == "alternate") {
link = content[i].link[j].href;
break;
}
}
links[i] = link;
var randindex = Math.random() * links.length; 
randindex = parseInt(randindex);
}
resultgenerate = links[randindex] + "#?o=" + aesCrypto.encrypt(convertstr(generateurl),convertstr('root'));
generateloading.addClass('hidden');
generatelink.removeClass('hidden');
resulturl.val(resultgenerate);
}else {
resulturl.val('No result!');
}
},
error: function() {
resulturl.val('Error loading feed!');
}
});
});

var clipboard = new ClipboardJS('.copytoclipboard');
clipboard.on('success', function(e) {
$("#copytoclipboard").html("<span class='fa fa-check'></span> Link Copied to Clipboard");
});	

})
//]]>
