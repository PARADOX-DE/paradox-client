# Lokaler Client
# Node : v14.16.0 - node-sass: ^4.14.1
## Browser installieren und Starten
```bash
cd gvmp/browser
npm ci
npm run serve
```

## Client builden
```bash
cd gvmp/client
gulp build
```

# Anzeige Komponenten im Browser
Vue Browser starten und Console öffnen:
```bash
npm run serve
F12 -> console
```

### Windows
```bash
components.Windows.show("FENSTERNAME", data )
```
##
#### Login
```bash
components.Windows.show("Login",JSON.stringify({name:"blaa"}))
```
##
#### Bank
```bash
components.Windows.show('Bank','{"name": "Thomas Mayer", "money": 1110, "balance": 1110, "history": [{"betrag": 123456}], "overviewTotal": [{"text": "Harz 4","betrag": 23030},{"text": "Entwicklersteuer","betrag": 23030}],"overviewIn": [{"betrag": 23030},{"betrag": 23030},{"betrag": 23030}],"overviewOut": [{"betrag": 23030},{"betrag": 23030},{"betrag": 23030}],"overviewInTransfer": [{"name": "Unbekannt","betrag": 23030},{"name": "Walter Hartz","betrag": 23030},{"name": "Walter Hartz","betrag": 23030}],"overviewOutTransfer": [{"name": "Simon Hooker","betrag": 23030},{"name": "Walter Hartz","betrag": 23030},{"name": "Walter Hartz","betrag": 23030}]}')
```
##
#### Tattoo
```bash
components.Windows.show("TattooShop", '{"tattoos":[{"Price":150000,"Name":"Tattoo1","TattooHash":"aaa"},{"Price":155000,"Name":"Tattoo2","TattooHash":"bbb"}]}')
```
##
#### Clothes Shop
Slots laden:
```bash
components.Windows.show("ClothingShop", '{"name":"Test Shop","slots":[{"id":1,"name":"Maske"},{"id":4,"name":"Hosen"}]}')
```
Kategorien laden:
```bash
components.Windows.show("ClothingShop", '{"categories":[{"id":1,"name":"Bandanas"},{"id":2,"name":"Hüte"}]}')
```
Kleidung laden:
```bash
components.Windows.show("ClothingShop", '{"clothes":[{"id":1,"name":"Bandana grau"},{"id":2,"name":"Bandana gelb"}]}')
```
##
### Wardrobe
```bash
components.Windows.show("Wardrobe", '{"slots":[{"Id":"1","Name":"Maske"},{"Id":"11","Name":"Oberbekleidung"},{"Id":"8","Name":"Unterbekleidung"},{"Id":"4","Name":"Hosen"},{"Id":"6","Name":"Schuhe"},{"Id":"3","Name":"Körper"},{"Id":"10","Name":"Markierung"},{"Id":"7","Name":"Accessoires"},{"Id":"p-0","Name":"Hut"},{"Id":"p-1","Name":"Brille"},{"Id":"p-2","Name":"Ohr"},{"Id":"p-6","Name":"Uhr"}],"wearing":{"p-1":{"Id":1820,"Name":"Leer","Slot":1,"IsProp":true},"p-7":{"Id":2020,"Name":"Leer","Slot":7,"IsProp":true},"p-0":{"Id":2417,"Name":"Zylinder Weiß/Beige","Slot":0,"IsProp":true},"p-2":{"Id":1345,"Name":"Cabochon Diamant Gold (Beide)","Slot":2,"IsProp":true},"3":{"Id":3984,"Name":"Langarm v1","Slot":3,"IsProp":false},"7":{"Id":5107,"Name":"Leer","Slot":7,"IsProp":false},"8":{"Id":3987,"Name":"Leer","Slot":8,"IsProp":false},"1":{"Id":450,"Name":"Shirtkopftuch Schwarz","Slot":1,"IsProp":false},"4":{"Id":1025,"Name":"Neonhose Grau","Slot":4,"IsProp":false},"6":{"Id":2547,"Name":"Neonsneaker Grau","Slot":6,"IsProp":false},"11":{"Id":2910,"Name":"Neonjacke Grau","Slot":11,"IsProp":false}}}')
```
##
### HUD
HUD laden
```bash
components.Hud.visible = true
```
##
#### Computer
Computer laden
```bash
components.Computer.app = "ComputerMainScreen"
```

Apps einspielen und danach anklicken
```bash
components.DesktopApp.responseComputerApps('[{"id":1,"appName":"FraktionListApp","name":"Fraktionsverwaltung","icon":"../../assets/PoliceDesktop.svg"}]')
```
##
##### FraktionsApp
```bash
components.FraktionListApp.members = [{"list":[{"id":60453,"name":"Tyson Carter","rang":12,"title":"Pr�sident","payday":5000,"rights":{"storage":true,"manage":true,"bank":true}},{"id":22345,"name":"Max Mustermann","rang":11,"title":"Vize-Pr�sident","payday":4000,"rights":{"storage":true,"manage":true,"bank":true}},{"id":12345,"name":"Hans Juergen","rang":1,"title":"Prospect","payday":3000,"rights":{"storage":true,"manage":true,"bank":true}}],"manage":1}]
```
#
#### Smartphone
```bash
components.Smartphone.show("PhoneMainScreen")
```
##
##### SettingsApp
```bash
components.HomeApp.apps = [{"id": "SettingsApp", "name": "Einstellungen", "icon": "https://image.flaticon.com/icons/svg/744/744904.svg"}]
```

##
##### NMenu
```bash
components.NMenu.dataItems = [{name:'Test',icon:'Animation.png',slot:0},{name:'Test',icon:'Animation.png',slot:1},{name:'Test',icon:'Animation.png',slot:2},{name:'Test',icon:'Animation.png',slot:3},{name:'Test',icon:'Animation.png',slot:4},{name:'Test',icon:'Animation.png',slot:5},{name:'Test',icon:'Animation.png',slot:6},{name:'Test',icon:'Animation.png',slot:7},{name:'Test',icon:'Animation.png',slot:8},{name:'Test',icon:'Animation.png',slot:9},{name:'Test',icon:'Animation.png',slot:10},{name:'Test',icon:'Animation.png',slot:11},{name:'Test',icon:'Animation.png',slot:12},{name:'Test',icon:'Animation.png',slot:13},{name:'Test',icon:'Animation.png',slot:14},{name:'Test',icon:'Animation.png',slot:15}]
```