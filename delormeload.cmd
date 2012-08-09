%1 -D0 -i gpx -f %2 -vs -o %3 -F usb:
if errorlevel 1 echo finished bad
if errorlevel 1 echo bad > DeLorme_results.txt
if errorlevel 1 pause
if errorlevel 1 goto end
echo finish ok
echo ok > DeLorme_results.txt
:end
