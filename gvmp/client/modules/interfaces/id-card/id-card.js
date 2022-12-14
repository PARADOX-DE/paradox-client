import Component from "../../components/component"
import player from '../../player/player'

class IdCard extends Component {
    constructor() {
        super("IdCard")

        mp.events.add("showPerso", (firstname, lastname, birthday, address, level, id, casino, govLevel) => {
            if(player.cduty && casino >= 1){
                if(casino == 1){
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '1', '')`)
                }else if(casino == 2){
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '2', '')`)
                }else if(casino == 3){
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '3', '')`)
                }else if(casino == 4){
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '4', '')`)
                }
            }else{
                this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '0', '${govLevel}')`)
            }
        })
        mp.events.add("showDienstausweis", (behoerde, dienstnummer, casino, fistname, lastname, cduty, govLevel) => {
            if(player.cduty && casino >= 1){
                if(casino == 1){
                    if(cduty == 1){
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '1', '${fistname}', '${lastname}', '1', '')`)
                    }else{
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '1', '${fistname}', '${lastname}', '0', '')`)
                    }
                }else if(casino == 2){
                    if(cduty == 1){
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '2', '${fistname}', '${lastname}', '1', '')`)
                    }else{
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '2', '${fistname}', '${lastname}', '0', '')`)
                    }
                }else if(casino == 3){
                    if(cduty == 1){
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '3', '${fistname}', '${lastname}', '1', '')`)
                    }else{
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '3', '${fistname}', '${lastname}', '0', '')`)
                    }
                }else if(casino == 4){
                    if(cduty == 1){
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '4', '${fistname}', '${lastname}', '1', '')`)
                    }else{
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '4', '${fistname}', '${lastname}', '0', '')`)
                    }
                }
            }else{
                if(cduty == 1){
                    this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '0', '${fistname}', '${lastname}', '1', '${govLevel}')`)
                }else{
                    this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '0', '${fistname}', '${lastname}', '0', '${govLevel}')`)
                }
            }
        })
    }
}

export default new IdCard()