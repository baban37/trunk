const { forEach } = require('lodash');
const config = require('./Config');
const data = require('./DataCenter');
/** truck是大卡车,只干一件事运输的事 */
var roleTrucker = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //先获取当前的状态0是获取能量,1是运输返回
        var state = creep.memory.state;
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'trucker');
        var isOut = creep.memory.isOut;
        if(isOut == undefined){
            var outNum = 0
            for(var i = 0; i < creeps.length;i++){
                if(creeps[i].memory.isOut){
                    outNum++;
                }
            }
            var roomLength = data.getTruckersByRoomName(creep.room.name).length;
            if(outNum < 4 && roomLength > 2){
                creep.memory.isOut = true;
                isOut = true;
            }else{
                creep.memory.isOut = false;
                isOut = false;
            }
        }
        if(state == undefined){
            //初始化状态为0,即为运输状态
            creep.memory.state = 0;
            state = 0;
        }else if(state == 0){
            //判断身上是不是已经装满了
            if(creep.store.getFreeCapacity() < creep.store.getUsedCapacity()){
                //已经装满了
                creep.memory.state = 1;
                state = 1;
            }
        }else if(state == 1){
            //判断身上是不是已经空了
            if(creep.store.getUsedCapacity() == 0){
                //已经空了
                creep.memory.state = 0;
                state = 0;
            }
        }
        if(state == 1){
            //运输返回
            this.InTransit(creep);
        }else if(state == 0 && !isOut){
            //获取能量
            this.GetEnergy(creep);
        }else if(isOut){
            //在外打工
            this.OutWork(creep);
        }


    },
    /**
     * 运输返回
     * @param {Creep} creep
     */
    InTransit : function(creep){
        if(creep.memory.isOut){
            if(creep.room.name != config.MY_ROOM_NAME){
                //返回基地
                creep.moveTo(new RoomPosition(25, 25, config.MY_ROOM_NAME),{visualizePathStyle: {stroke: '#ffaa00'}});
                return;
            }
            //给storage能量
            var structures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
           
            if(creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structures[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return;
            
        }
        //给制造商能量
        var structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION
                    ||structure.structureType == STRUCTURE_SPAWN)
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        //最近的建筑
        var closestStructure;
        if(structures.length > 0){
            closestStructure = creep.pos.findClosestByPath(structures);
            if(creep.transfer(closestStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestStructure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return;
        }
        //给link能量
        structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK)
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 400
                && (structure.id == "678a17afd4dfc40f9a129a25" || 
                    structure.id == "678e4dfcd4756d8c7e21df72");
            }
        });
        if(structures.length > 0 && !creep.memory.isOut){
            closestStructure = creep.pos.findClosestByPath(structures);
            if(creep.transfer(closestStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestStructure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return;
        }
        //给防御塔能量
        structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER)
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 400;
            }
        });
        if(structures.length > 0 && !creep.memory.isOut){
            closestStructure = creep.pos.findClosestByPath(structures);
            if(creep.transfer(closestStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestStructure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return;
        }

        //给storage能量,这个大概率填不满,所以这个要放在最后
        structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE)
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(structures.length > 0){
            closestStructure = creep.pos.findClosestByPath(structures);
            if(creep.transfer(closestStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestStructure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return;
        }

    },

    /**
     * 获取能量
     * @param {Creep} creep
     */
    GetEnergy:function(creep){
        var structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
                && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(structures.length > 0){
            structures.sort(function(a,b){
                return b.store.getUsedCapacity(RESOURCE_ENERGY) - a.store.getUsedCapacity(RESOURCE_ENERGY);
            });
            if(creep.withdraw(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structures[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                creep.memory.state = 1;
            }
            return;
        }else{

            var structures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
            if(structures.length > 0){
                if(creep.withdraw(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structures[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }else{
                    creep.memory.state = 1;
                }
                return;
            }
        }
        
    },
    /**
     * 在外打工
     * @param {Creep} creep
     */
    OutWork:function(creep){
        //获取当前目标房间名字
        var roomName = creep.memory.roomName;
        if(roomName == undefined){
            var rooms = Game.rooms;
            var maxRoom = null;
            var maxEnergy = 0;
            forEach(rooms,(room)=>{
                var nowEnergy = 0;
                var structures = room.find(FIND_STRUCTURES,{
                    filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER
                })
                if(structures.length > 0){
                    forEach(structures,(structure)=>{
                        nowEnergy += structure.store.getUsedCapacity(RESOURCE_ENERGY);
                    });
                    if(room.name == config.MY_ROOM_NAME){
                    }else if(maxEnergy == 0 || maxRoom == null){
                        maxRoom = room;
                        maxEnergy = nowEnergy;
                    }else if(nowEnergy > maxEnergy){
                        maxRoom = room;
                        maxEnergy = nowEnergy;
                    }
                }
            });
            if(maxRoom != null){
                roomName = maxRoom.name;
                creep.memory.roomName = roomName;
            }
        }
        if(roomName == undefined){
            //没有目标房间
            return;
        }
        //移动到目标房间
        if(creep.room.name!= roomName){
            creep.moveTo(new RoomPosition(25, 25, roomName),{visualizePathStyle: {stroke: '#ffaa00'}});
            return ;
        }
        //获取能量
        var targets = creep.room.find(FIND_STRUCTURES,{
            filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER
                && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 1000
        });
        if(targets.length > 0){
            //获取最近的
            var closestTarget = creep.pos.findClosestByPath(targets);
            if(creep.withdraw(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                creep.memory.state = 1;
                creep.memory.roomName = undefined;
            }
        }

    }
};
module.exports = roleTrucker;