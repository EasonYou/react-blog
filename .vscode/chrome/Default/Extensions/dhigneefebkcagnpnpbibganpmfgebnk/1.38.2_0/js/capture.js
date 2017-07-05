var bLoaded;

var bPluginEnabled;
var sExtFilterList;

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

function include(arr, obj) 
{
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return true;
    }
}

function checkDownloadLink(linkUrl) 
{
    if(sExtFilterList == null || sExtFilterList.length == 0)
    	return false;
    
    var url = parseUri(linkUrl);

    var protocol = url.protocol ? url.protocol.toLowerCase() : "";
    if( protocol != "http" && protocol != "https" && protocol != "ftp" )
    	return false;
    
    var file_name = url.file ? url.file.toLowerCase() : "";
    var file_ext = "." + file_name.substr((~-file_name.lastIndexOf(".") >>> 0) + 2);
 
    console.log("Check Link: filename = " + file_name + ", ext = " + file_ext);
    
    var filter_list = sExtFilterList.toLowerCase().split(";");
    if(include(filter_list, file_ext))
        return true;
    else
    	return false;
}

function CheckConfig(url)
{
	chrome.runtime.sendMessage(
		{name:'CheckConfig', url:url},
		function (response)
		{
		}
	);
}

// link click event
function onLinkClick(event) {
	if (bPluginEnabled)
	{
		var linkUrl = this.href;

        var checkResult = checkDownloadLink(linkUrl);
        if (checkResult != false) 
        {
    		chrome.runtime.sendMessage({name:"CaptureDownload", link:linkUrl, cookie:document.cookie, referurl:document.location.href});
    		return event.preventDefault();
    	}
	}
}

function RegisterEventListener()
{
	// attach link click event
	for( var i = 0; i < document.links.length; i++ ) {
		var link = document.links[i];
		link.addEventListener("click", onLinkClick, false);
	}
	
	chrome.extension.onMessage.addListener(
		function(message, sender, sendResponseCallback)
		{
			if (message.name == "UpdatePluginConfig")
			{
				bPluginEnabled = message.enable;
				sExtFilterList = message.ext_list;
			}
			else if (message.name == "OnActivated")
			{
				if (bLoaded)
				{
					// tab actived, reload plugin config
					CheckConfig(document.location.href);
				}
			}
		}
	);
}

function Init()
{
	bLoaded = true;
	
	CheckConfig(document.location.href);
	
	RegisterEventListener();
}

Init();