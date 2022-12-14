mkdir build

cd gvmp 

cd browser
npm run build 
xcopy "dist" "../../build" /h /i /c /k /e /r /y

pause
