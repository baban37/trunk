const { forEach } = require("lodash");
const config = require('./Config');
/**
 * 这个是隔壁的建筑师的代码,
 * 当隔壁没有建造的建筑了,就会变成修理工
 */
var roleOtherBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        /** 获取需要建筑的房间名字 */
        var roomName = creep.memory.roomName;
        if(roomName == undefined){
            //初始化 指定房间,该房间指定后不在修改
            var reservedRoom = config.RESERVED_ROOM_NAME;
            var otherBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'otherBuilder');
            
            var roomName0=0;
            var roomName1=0;

            for(let i = 0; i < otherBuilders.length; i++){
                var otherBuilder = otherBuilders[i];
                if(otherBuilder.memory.roomName == undefined 
                || otherBuilder.memory.roomName == ''
                || otherBuilder.memory.roomName == null){
                    continue;
                }else if(otherBuilder.memory.roomName == reservedRoom[0]){
                    roomName0++;
                }else if(otherBuilder.memory.roomName == reservedRoom[1]){
                    roomName1++;
                }
            }
            if(roomName0 < roomName1){
                roomName = reservedRoom[0];
            }else if(roomName1 < roomName0){
                roomName = reservedRoom[1];
            }else if(roomName0 == roomName1){
                roomName = reservedRoom[0];
            }
        }

        creep.memory.roomName = "E51S29";
        if(creep.memory.building && creep.store.getUsedCapacity() == 0) {
            creep.memory.building = false;
            // creep.say('开始获取能量');
	    }else
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        // creep.say('建造中');
	    }   
        
	    if(creep.memory.building) {
            //先判断是否在指定房间中
            if(creep.room.name != roomName){
                creep.moveTo(new RoomPosition(25, 25, roomName),{visualizePathStyle: {stroke: '#ffaa00'}});
                return;
            }
            var room = creep.room;
            var targets = room.find(FIND_CONSTRUCTION_SITES,{
                filter: (structure) => 
                    structure.structureType == STRUCTURE_SPAWN
            });
            if(targets.length == 0){
                //已经修完了SPAWN
                targets = room.find(FIND_CONSTRUCTION_SITES,{
                    filter: (structure) => 
                        structure.structureType == STRUCTURE_CONTAINER
                });
            }
            if(targets.length == 0){
                //已经修完了CONTAINER
                targets = room.find(FIND_CONSTRUCTION_SITES);
            }
            if(targets.length > 0) {
                // 找到最近的目标
                var closestTarget = creep.pos.findClosestByPath(targets);
                if(creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                //变成修理工隔壁修理工
                //这个是绑定的修复建筑
                var needRepairId = creep.memory.repairThingId;
                if(needRepairId == undefined){
                    //初始化
                    needRepairId = this.findNeedRepair(creep);
                }
                var needRepair = Game.getObjectById(needRepairId);
                if( needRepair!=null && needRepair.hits/needRepair.hitsMax*1.0 > 0.75){
                    needRepairId = this.findNeedRepair(creep);
                }
                // 如果修理工不在目标建筑旁边，则移动到目标建筑
                if(needRepair!=null && creep.repair(needRepair) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(needRepair, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }else{
            //先判断是否在我的房间中
            // if(creep.room.controller.my == false){
            //     //不在指定房间中,前往指定房间
            //     //当前在我的房间,去隔壁的房间挖矿
            //     var exitDir = creep.room.find(FIND_EXIT_BOTTOM);
            //     //现在是只有一个出口所以这样,后期会进行修改
            //     creep.moveTo(exitDir[0],{visualizePathStyle: {stroke: '#ffaa00'}});
            //     return;
            // }
            //只去STRUCTURE_CONTAINER中获取能量
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
				// 找到最近的目标
				var closestTarget = creep.pos.findClosestByPath(targets);
				if(closestTarget) {
					if(creep.withdraw(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
					}
				}
			}
            if((!creep.room.controller.my || creep.room.name != "E49S55")
            && targets.length == 0){
                //不是我的房间,就地取材
                targets = creep.room.find(FIND_SOURCES);
            }
            if(targets.length > 0) {
				// 找到最近的目标
				var closestTarget = creep.pos.findClosestByPath(targets);
				if(closestTarget) {
					if(creep.harvest(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
					}
				}
			}else{
                creep.moveTo(new RoomPosition(25, 25, config.MY_ROOM_NAME),{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

    },
    /** @param {Creep} creep **/
    findNeedRepair:function(creep){
        // 查找需要修理的建筑,不修墙
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax 
            && (structure.hits / structure.hitsMax) * 1.0 < 0.5
            && structure.structureType != STRUCTURE_WALL)
            ||(
                structure.structureType == STRUCTURE_RAMPART
                && (structure.hits / structure.hitsMax) * 1.0 < 0.1
            )
        });
        if(targets.length > 0){
            creep.memory.repairThingId = creep.pos.findClosestByPath(targets).id;
            return creep.pos.findClosestByPath(targets).id;
        }
    }
};

module.exports = roleOtherBuilder;