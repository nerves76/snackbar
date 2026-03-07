on open location theURL
	set theURL to theURL as text

	-- Strip the scheme "terminal://"
	set stripped to text 12 thru -1 of theURL

	-- Extract app name (everything before first "/")
	set AppleScript's text item delimiters to "/"
	set parts to text items of stripped
	set appName to item 1 of parts

	-- Extract directory path (everything after app name)
	if (count of parts) > 1 then
		set dirPath to "/" & (items 2 thru -1 of parts as text)
	else
		set dirPath to POSIX path of (path to home folder)
	end if

	set AppleScript's text item delimiters to ""

	-- URL-decode the path (handle %20, etc.)
	set dirPath to do shell script "python3 -c 'import sys, urllib.parse; print(urllib.parse.unquote(sys.argv[1]))' " & quoted form of dirPath

	-- Verify directory exists
	try
		do shell script "test -d " & quoted form of dirPath
	on error
		display dialog "Directory not found: " & dirPath buttons {"OK"} default button "OK" with icon caution
		quit
		return
	end try

	-- All handlers use shell commands to avoid Automation permission issues
	try
		if appName is "iterm" or appName is "iterm2" then
			do shell script "open -a iTerm " & quoted form of dirPath
		else if appName is "warp" then
			do shell script "open -a Warp " & quoted form of dirPath
		else if appName is "ghostty" then
			do shell script "open -a Ghostty " & quoted form of dirPath
		else
			-- Terminal.app: "open -a Terminal <dir>" opens a new window in that directory
			do shell script "open -a Terminal " & quoted form of dirPath
		end if
	on error errMsg
		display dialog "Error: " & errMsg buttons {"OK"} default button "OK" with icon caution
	end try

	quit
end open location

on idle
	quit
	return 1
end idle
