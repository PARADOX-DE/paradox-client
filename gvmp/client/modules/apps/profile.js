import App from "../app/app"
import player from "../player/player"

class ProfileApp extends App {
    constructor() {
        super("ProfileApp")
        this.forwardableEvents.add("responseSpecialProfilData")
    }

    onReady() {
        this.updateProfile()
    }

    updateProfile() {
        this.callOnBrowser(`setProfileData('${JSON.stringify({ Vorname: player.firstName, Nachname: player.lastName, Level: player.level, ID: player.playerId, Business: player.business, GwdNote: this.getGwd(), ZivildienstNote: this.getZWD(), Haus: this.getHouse(), Team: this.getTeam(), Handy: player.phone, Beruf: this.getJob(), Skill: player.jobsSkill, Krankenversicherung: player.insurance })}')`)
    }

    getHouse(){
        let house = player.house

        if(house == 0){
            return "Kein Haus"
        }
        else {
            return house
        }
    }

    getGwd(){
        let gwd = player.gwdNote

        if(gwd == 0) {
            return "Nicht vorhanden"
        }else {
            return gwd
        }
    }

    getZWD(){
        let zwd = player.zwdNote

        if(zwd == 0) {
            return "Nicht vorhanden"
        }else {
            return zwd
        }
    }

    getJob() {
        let job = player.job

        switch(job) {
            case 1:
                return "Waffendealer"
                break
            case 2:
                return "Fälscher"
                break
            case 3:
                return "Kredithai"
                break
            case 4:
                return "Pilot"
                break
            case 5:
                return "Farmer"
                break
            case 6:
                return "Fischer"
                break
            case 7:
                return "Lifeguard"
                break
            case 8:
                return "Mechaniker"
                break
            case 9:
                return "Busfahrer"
                break
            case 10:
                return "Stripper"
                break
            case 11:
                return "Makler"
                break
            case 12:
                return "Trucker"
                break
            case 13:
                return "Gärtner"
                break
            case 14:
                return "Anwalt"
                break
        }
    }

    getTeam() {
        let team = player.team

        switch(team) {
            case 0:
                return "Zivilisten"
                break
            case 1:
                return "Los Santos Police Department"
                break
            case 2:
                return "Front Yard Ballas"
                break
            case 3:
                return "Department of Motor Vehicles"
                break
            case 4:
                return "Weazel News"
                break
            case 5:
                return "Federal Investigation Bureau"
                break
            case 6:
                return "The Lost"
                break
            case 7:
                return "Los Santos Medic Center"
                break
            case 8:
                return "Irish Mob"
                break
            case 9:
                return "La Cosa Nostra"
                break
            case 10:
                return "Yakuza"
                break
            case 11:
                return "High Rollin Hustlers"
                break
            case 12:
                return "Grove Familie"
                break
            case 13:
                return "U.S. Army"
                break
            case 14:
                return "Regierung"
                break
            case 15:
                return "Angels of Death MC"
                break
            case 16:
                return "Department of Public Order and Safety"
                break
            case 17:
                return "Triaden"
                break
            case 18:
                return "Los Santos Vagos"
                break
            case 19:
                return "The Marabunta Grande"
                break
            case 20:
                return "North Nation Miliz" // Rofl
                break
            case 21:
                return "SWAT"
                break
            case 22:
                return "Bratwa"
                break
            case 23:
                return "Los Santos Sheriff Department"
                break
            case 24:
                return "Hounds of Hell MC"
                break
            case 25:
                return "Grapeseed Rednecks"
                break
            case 26:
                return "Los Santos Customs"
                break
            case 27:
                return "International Contract Agency"
                break
            case 28:
                return "Los Santos Metal Corporation"
                break
            case 29:
                return "East LS Mining Corporation"
                break
            case 30:
                return "Vanilla Unicorn"
                break
            case 42:
                return "Outlaws MC"
                break
            case 43:
                return "Bruderschaft"
                break
            case 44:
                return "Madrazo Cartel"
                break
            case 45:
                return "Bosozoku-Kai"
                break
        }
    }
}

export default new ProfileApp()