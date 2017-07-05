var bPluginEnabled = true;
var bCaptureEnabledByHost;
var sExtFilterList;

function SetPluginEnabled(bEnabled)
{
    bPluginEnabled = bEnabled;

	UpdateBrowserActionIcon();
}

function UpdatePluginConfig()
{
	chrome.tabs.getSelected(null,
			function(tab)
			{
				chrome.tabs.sendMessage(tab.id, {name:"UpdatePluginConfig", enable:bPluginEnabled, ext_list:sExtFilterList});
			}
		);
}

// context menu click
function onStartupDownload(info, tab) 
{
	chrome.cookies.getAll({url:info.pageUrl}, function(cookies) {
		var cookie = "";
		for (i in cookies) {
			cookie = cookie.concat(cookies[i].name, "=", cookies[i].value, "; ");
		};
		InvokeDownload(info.linkUrl, cookie, info.pageUrl);
	});
}

// Invoke download
function InvokeDownload(link, cookie, referurl) 
{
	chrome.runtime.sendNativeMessage('com.bitcomet.chrome_extension',
	  { action:"Download", link:link, cookie:cookie, referurl:referurl },
	  function(response) {
	    console.log("Received " + response);
	  });
	return;
}

// Invoke get config
function InvokeGetConfig() 
{
	chrome.runtime.sendNativeMessage('com.bitcomet.chrome_extension',
	  { action:"GetConfig" },
	  function(response) {
	    console.log("Received Config: " + JSON.stringify(response));
	    if(bCaptureEnabledByHost == null || bCaptureEnabledByHost != response.plugin_enabled)
	    {
	        bCaptureEnabledByHost = response.plugin_enabled;
	        SetPluginEnabled(bCaptureEnabledByHost);
	    }
	    sExtFilterList = response.ext_list;
	    
	    UpdatePluginConfig();
	  });
	return;
}

// Invoke launch program
function OnLaunchProgram()
{
	chrome.runtime.sendNativeMessage('com.bitcomet.chrome_extension',
	  { action:"Launch_Program" },
	  function(response) {
	    console.log("Received " + response);
	  });
}

function CreateContextMenu(bEnableMenu)
{
	chrome.contextMenus.create({id:"BitCometContextMenu", type:"normal", title:chrome.i18n.getMessage("context_title"), contexts:["link"], onclick:onStartupDownload, enabled:bEnableMenu});
}

function UpdateContextMenu(bEnableMenu)
{
	chrome.contextMenus.update("BitCometContextMenu", {enabled:bEnableMenu});
}

function UpdateBrowserActionIcon()
{
   	var iconPath = bPluginEnabled ? "images/icon19_normal.png" : "images/icon19_disabled.png";
	chrome.browserAction.setIcon({path:iconPath});
}

function RegisterEventListener()
{
	chrome.tabs.onActivated.addListener(
		function (activeInfo)
		{
			chrome.tabs.sendMessage(activeInfo.tabId, {name:"OnActivated"});
		}
	);
	
	chrome.windows.onFocusChanged.addListener(
		function (windowId)
		{
		    if(chrome.windows.WINDOW_ID_NONE != windowId)
			    InvokeGetConfig();
		}
	);

	chrome.runtime.onMessage.addListener(
		function (request, sender, response)
		{
			if (request.name == "CaptureDownload")
			{
				InvokeDownload(request.link, request.cookie, request.referurl);
			}
			else if (request.name == "CheckConfig")
			{
			    InvokeGetConfig();
			}
		}
	);

}

function Init()
{
	InvokeGetConfig();
	
	CreateContextMenu(bPluginEnabled);
	
	UpdateBrowserActionIcon();
	
	RegisterEventListener();
}

Init();