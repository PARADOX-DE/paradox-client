import _player from "../player/player"

class Attachments {
    constructor() {

        this.attachmentsSyncEntities = []
        this.steamAttachmentsRange = 30;

        this.wasRagdoll = {};
        this.collided = {};
        this.isOpeningDoor = false;
        this.isInWater = false;
        this.controlsToDisable = [12, 13, 14, 15, 16, 17, 24, 25, 37, 45, 47, 58, 69, 70, 92, 114, 140, 141, 142, 143, 257, 263, 264, 331];
        this.controlsLength = this.controlsToDisable.length;

        var attachmentHandler = this;

        // custom attachmentssyncrange
        setInterval(function() {
            if(_player != null && _player.attachmentsync) {
                if(attachmentHandler.attachmentsSyncEntities != null) {
                    mp.players.forEachInStreamRange(
                        (streamedPlayer, id) => {
                            let streamedEntityPos = streamedPlayer.position
                            let distance = _player.getDistance(streamedEntityPos)
                            if(distance < attachmentHandler.steamAttachmentsRange)
                            {
                                if(!attachmentHandler.attachmentsSyncEntities.includes(streamedPlayer.handle)) {

                                    attachmentHandler.attachmentsSyncEntities.push(streamedPlayer.handle);
                                    mp.events.callRemoteUnreliable("requestAttachmentsPlayer", streamedPlayer, _player.remoteHashKey);
                                }
                            }
                            else if (attachmentHandler.attachmentsSyncEntities.includes(streamedPlayer.handle)) {
                                let index = attachmentHandler.attachmentsSyncEntities.indexOf(streamedPlayer.handle)

                                if(index > -1) {
                                    attachmentHandler.removeAllAttachments(streamedPlayer);
                                    attachmentHandler.attachmentsSyncEntities.splice(index, 1)
                                }
                            }
                        }
                    );
                }
            }
        }, 1500)

        mp.events.add('entityStreamOut', entity => {
            if (entity.__attachmentObjects) {
                this.removeAllAttachments(entity);
            }

            // Remove from customSync 
            if(entity) {
                let index = this.attachmentsSyncEntities.indexOf(entity)

                if(index > -1) {
                    this.attachmentsSyncEntities.splice(index, 1)
                }
            }
        });

        const render = async () => {
            while (true) {
                if (_player == null)
                {
                    await mp.game.waitAsync(50);
                    continue;
                }

                if (_player.isCarrying) for (let i = 0; i < this.controlsLength; i++) mp.game.controls.disableControlAction(2, this.controlsToDisable[i], true);

                mp.players.forEachInStreamRange(
                    async (player, id) => {
                        if(this.attachmentsSyncEntities.indexOf(player.handle) > -1) {
                            if(player.hasCollidedWithAnything()){
                                this.collided[player.remoteId] = true;
                            }else{
                                if(this.collided[player.remoteId]){
                                    await this.checkAnimations( mp.players.atRemoteId(player.remoteId));
                                    this.collided[player.remoteId] = false;
                                }
                            }

                            if(player.isRagdoll()){
                                this.wasRagdoll[player.remoteId] = true;
                            }else {
                                if(this.wasRagdoll[player.remoteId]){
                                    let that = this;
                                    setTimeout(async function () {
                                        await that.checkAnimations( mp.players.atRemoteId(player.remoteId));
                                    }, 2000);
                                    this.wasRagdoll[player.remoteId] = false;
                                }
                            }
                        }
                    }
                );

                await mp.game.waitAsync(150);
            }
        }

        render();

        mp.events.add('setAttachments', async (entity, data) => {
            if(entity !== undefined && entity != null && entity.handle != null && data !== undefined &&
                (this.attachmentsSyncEntities.includes(entity.handle) || entity == mp.players.local)) {
                await this.setAttachments(entity, data);
            }
        });

        mp.events.add('removeAllAttachments', (entity) => {
            if(entity !== undefined && entity != null && entity.handle != null && this.attachmentsSyncEntities.includes(entity.handle) || entity == mp.players.local) {
                this.removeAllAttachments(entity);
            }
        });

        mp.events.add('resyncAttachments', async (entity) => {
            if(entity !== undefined && entity != null && entity.handle != null && this.attachmentsSyncEntities.includes(entity.handle) || entity == mp.players.local) {
                await this.resyncAttachments(entity);
            }
        });
    }

    async setAttachments(entity, data){
        if(data !== undefined) {
            let newAttachments = data.length > 0 ? JSON.parse(data) : [];

            if (entity.handle !== 0) {
                let oldAttachments = entity.__attachments;

                if (!oldAttachments) {
                    oldAttachments = [];
                    entity.__attachmentObjects = {};
                }
                if(oldAttachments != [] && newAttachments != [])
                {
                    for(let oldattachment of oldAttachments)
                    {
                        // in den alten attachments ist was, was in den neuen nicht ist -> remove
                        if(newAttachments.findIndex(a => a.Id === oldattachment.Id)  === -1)
                        {
                            this.removeAttachment(entity, oldattachment)
                        }
                    }
                }

                if(newAttachments != [] && oldAttachments != [])
                {
                    for(let newattachment of newAttachments)
                    {
                        // in den neuen attachments ist was, was in den alten nicht ist -> add
                        if(oldAttachments.findIndex(a => a.Id === newattachment.Id)  === -1)
                        {
                            await this.addAttachment(entity, newattachment)
                        }
                    }
                }

                entity.__attachments = newAttachments;
            }
        }
    }

    async resyncAttachments(entity){

        if (entity.handle !== 0 && entity.__attachments.length > 0) {

            // remove all
            for(let oldattachment of entity.__attachments)
            {
                this.removeAttachment(entity, oldattachment)
            }
            // add again
            for(let newattachment of entity.__attachments)
            {
                await this.addAttachment(entity, newattachment)
            }
        }
    }

    removeAllAttachments(entity){
        if (entity.handle !== 0 && entity.__attachments.length > 0) {
            // remove all
            for(let oldattachment of entity.__attachments)
            {
                this.removeAttachment(entity, oldattachment)
            }
        }
    }

    async checkAnimations(entity) {
        try {
            if (entity.__animationData === undefined || entity.__animationData == null) {
                return;
            }

            if (entity.__animationData.Active == true && !entity.vehicle) {
                mp.game.streaming.requestAnimDict(entity.__animationData.AnimationDict);
                while (!mp.game.streaming.hasAnimDictLoaded(entity.__animationData.AnimationDict)) {
                    await mp.game.waitAsync(5);
                }

                entity.taskPlayAnim(entity.__animationData.AnimationDict, entity.__animationData.AnimationName, entity.__animationData.AnimationSpeed, 1.0, -1, entity.__animationData.AnimationFlags, 1.0, false, false, false);
            }

            if (entity.__attachmentObjects !== undefined && entity.__attachmentObjects != null) {
                Object.keys(entity.__attachmentObjects).forEach(attachment => {

                    if (attachment.needsAnimation) {
                        if (!mp.game.invoke('0x1F0B79228E461EC9 ', entity.handle, attachment.animationDict, attachment.animationName, 1)) {
                            entity.taskPlayAnim(attachment.animationDict, attachment.animationName, 8, -4, -1, attachment.animationFlag, 0, false, false, false);
                        }
                        if (!mp.game.invoke('0x1F0B79228E461EC9 ', mp.players.local.handle, attachment.animationDict, attachment.animationName, 3)) {
                            entity.taskPlayAnim(attachment.animationDict, attachment.animationName, 8, -4, -1, attachment.animationFlag, 0, false, false, false);
                        }
                    }
                });
            }
        } catch (e) {
            // mp.game.graphics.notify("Exception - Animations: Falls bestehen bleibt, bitte reloggen!")
        }
    }

    async addAttachment(entity, attachment) {
        if (!entity.__attachmentObjects.hasOwnProperty(attachment.id)) {

          let object = mp.objects.new(attachment.model, entity.position, {
              dimension: entity.dimension
          });

          let count = 0;

          while ((object == null || object.handle === 0) && count < 30) {
              await mp.game.waitAsync(100);
              count++;
          }

          if (object == null || object.handle === 0) return;

          object.attachTo(entity.handle, entity.getBoneIndex(attachment.bone), attachment.offset.x, attachment.offset.y, attachment.offset.z, attachment.rotation.x, attachment.rotation.y, attachment.rotation.z, false, false, false, false, 2, true);

          entity.__attachmentObjects[attachment.id] = object;

          if (attachment.needsAnimation) {
              mp.game.streaming.requestAnimDict(attachment.animationDict);

              while (!mp.game.streaming.hasAnimDictLoaded(attachment.animationDict)) {
                  await mp.game.waitAsync(5);
              }

              entity.taskPlayAnim(attachment.animationDict, attachment.animationName, 8, -4, -1, attachment.animationFlag, 0, false, false, false);
          }

          if (attachment.isCarrying) {
              if (mp.players.local.id === entity.id) {
                  _player.isCarrying = true;
                  mp.players.local.weapon = mp.game.joaat('weapon_unarmed');
              }
          }
      }
    }

    removeAttachment(entity, attachment) {
        if (entity.__attachmentObjects.hasOwnProperty(attachment.id)) {

            let obj = entity.__attachmentObjects[attachment.id];
            delete entity.__attachmentObjects[attachment.id];

            if (mp.objects.exists(obj)) {
                obj.destroy();

                if (attachment.needsAnimation) {
                    entity.stopAnimTask(attachment.animationDict, attachment.animationName, 3);
                }

                if(_player.isCarrying && attachment.isCarrying)
                {
                    if(mp.players.local.id === entity.id)
                    {
                        _player.isCarrying = false;

                        Object.keys(entity.__attachmentObjects).forEach(attachment=>{
                            if(attachment.isCarrying)
                                _player.isCarrying = true;
                        });
                    }
                }
            }
        }
    }

    async initAttachments(entity) {
        for (let attachment of entity.__attachments) {
            await this.addAttachment(entity, attachment);
        }
    }

    removeAllAttachments(entity) {
        if(entity.__attachments !== undefined) {
            if(entity.__attachments && entity.__attachments != []) {
                for(let attachment of entity.__attachments)
                {
                    if(entity.__attachments.findIndex(a => a.Id === attachment.id)  === -1)
                    {
                        this.removeAttachment(entity, attachment)
                    }
                }
                entity.__attachments = [];
                entity.__attachmentObjects = {};
            }
        }
    }
}

export default new Attachments();
