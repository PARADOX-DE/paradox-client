mkdir build

cd gvmp 

cd client
gulp build
xcopy "dist" "../../build" /h /i /c /k /e /r /y

cd browser
npm run build 
xcopy "dist" "../../build" /h /i /c /k /e /r /y

pause
