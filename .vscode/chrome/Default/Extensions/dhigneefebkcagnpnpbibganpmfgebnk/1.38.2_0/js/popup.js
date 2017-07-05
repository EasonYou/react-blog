// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var extension;
var bPluginEnabled;
var bIsInWebsiteBlackList;
var bIsInPageBlackList;

function OnClickEnableDownloadCapture(e)
{
	extension.SetPluginEnabled(!bPluginEnabled);
	extension.UpdatePluginConfig();
	window.close();
}

function OnClickLaunchProgram(e)
{
	extension.OnLaunchProgram();
	window.close();
}

function Init()
{
	extension = chrome.extension.getBackgroundPage();
	bPluginEnabled = extension.bPluginEnabled;
	
	document.getElementById('EnableDownloadCapture').innerText = chrome.i18n.getMessage("popup_enable_bitcomet");
	document.getElementById('LaunchProgram').innerText = chrome.i18n.getMessage("popup_launch_program");

	if (bPluginEnabled)
	{
		document.getElementById('EnableDownloadCapture').className = 'item item-select';
	}
	else
	{
		document.getElementById('EnableDownloadCapture').className= 'item';
	}
}

document.addEventListener('DOMContentLoaded',
	function ()
	{
		document.getElementById('EnableDownloadCapture').addEventListener('click', OnClickEnableDownloadCapture);
		document.getElementById('LaunchProgram').addEventListener('click', OnClickLaunchProgram);

		Init();
	}
);
