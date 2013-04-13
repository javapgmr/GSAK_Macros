' VBS file to get the source html of a web page
' 
' Takes two command line parameters:
' First is the full URL of the page to get
' Second is the full path to the file to store it in
' That's it - no frills.
' Free for use under GNU GPL
' Lignumaqua
' 4-29-07 V0.1 B




Set objArgs = WScript.Arguments
requiredURL = objArgs(0)
requiredFile = objArgs(1)

Call GetHTML (requiredURL,requiredFile)

'-------------------------------------


Function GetHTML(fileURL,hdLocation)
'connect to a URL and downloads the file

	Set xmlHTTP = CreateObject("MSXML2.ServerXMLHTTP")

		xmlHTTP.open "GET", fileURL, false
	    	xmlHTTP.send()
		
	set myStream = CreateObject("ADODB.Stream")

		myStream.Open
		myStream.Type = 1 'adTypeBinary
	 
		myStream.Write xmlHTTP.ResponseBody 	'Give the XML string to the ADO Stream
		myStream.Position = 0    		'Set the stream position to the start

	set FSO = Createobject("Scripting.FileSystemObject")

		if fso.Fileexists(hdLocation) then 

			Fso.DeleteFile hdLocation

		End If		
	
		myStream.SaveToFile hdLocation
		myStream.Close

	set FSO = Nothing
	Set myStream = Nothing
	Set xmlHTTP = Nothing

End Function