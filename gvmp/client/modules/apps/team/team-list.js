import App from "../../app/app"
import Player from "../../player/player"

class TeamList extends App {
    constructor() {
        super("TeamListApp")
        this.forwardableEvents.add("responseTeamMembers")
    }

    onReady() {
        mp.events.callRemote("requestTeamMembers", Player.remoteHashKey)
    }
}

export default new TeamList()
