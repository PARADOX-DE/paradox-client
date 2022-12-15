mkdir build

cd build
mkdir game_resources

mkdir img 

cd img
mkdir itemImages

cd ..
cd ..

cd gvmp 

cd client
call gulp build
xcopy "dist" "../../build" /h /i /c /k /e /r /y

cd ..
cd browser
call npm run build
xcopy "dist" "../../build" /h /i /c /k /e /r /y

cd ..
xcopy "game-resources" "../../build/game_resources" /h /i /c /k /e /r /y
xcopy "item-assets" "../../build/img/itemImages" /h /i /c /k /e /r /y

pause
