mkdir build

cd build
mkdir game_resources

cd img
mkdir itemImages

cd ..
cd ..

cd gvmp 

cd client
gulp build
xcopy "dist" "../../build" /h /i /c /k /e /r /y

cd browser
npm run build 
xcopy "dist" "../../build" /h /i /c /k /e /r /y

cd ..
xcopy "game-resources" "../../build/game_resources" /h /i /c /k /e /r /y
xcopy "item-assets" "../../build/img/itemImages" /h /i /c /k /e /r /y

pause
