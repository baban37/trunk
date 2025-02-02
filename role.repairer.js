const data = require("./DataCenter");

var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {     
        if(creep.memory.repairering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairering = false;
            // creep.say('获取能量');
	    }
        else if(!creep.memory.repairering && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairering = true;
	        // creep.say('前往修理');
	    }
 
        // 修理工的能量不足,获取能量
        if(!creep.memory.repairering) {  
            var targets = data.roomStructures.get(creep.room.name).filter(structure => {
                (structure.structureType == STRUCTURE_CONTAINER)//这个ID是冲级的container 
                && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 300;
            }) ;
			if(targets.length > 0) {
				// 找到最近的目标
				var closestTarget = creep.pos.findClosestByPath(targets);
				if(closestTarget) {
					if(creep.withdraw(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
					}
                    return;
				}
			}
            targets = data.roomStructures.get(creep.room.name).filter(structure => {
                (structure.structureType == STRUCTURE_STORAGE) 
					&& structure.store.getUsedCapacity(RESOURCE_ENERGY) > 300;
            }) ;
			if(targets.length > 0) {
				// 找到最近的目标
				var closestTarget = creep.pos.findClosestByPath(targets);
				if(closestTarget) {
					if(creep.withdraw(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
					}
                    return;
				}
			}
            targets = creep.room.find(FIND_SOURCES, {
                filter: (source) => {
					return source.energy > 0;
				}
            });
            if(targets.length > 0) {
				// 找到最近的目标
				var closestTarget = creep.pos.findClosestByPath(targets);
				if(closestTarget) {
					if(creep.harvest(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
					}
                    return;
				}
			}

            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }

        }else{
            var isStart = data.getHarvestersByRoomName(creep.room.name).length == 0;
            if(isStart){
                var targets = data.roomStructures.get(creep.room.name).filter(structure => {
                    (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ) 
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }) ;
            	//当前没有harvester了,紧急情况	
                if(targets.length > 0) {
                    // 找到最近的目标
                    var closestTarget = creep.pos.findClosestByPath(targets);
                    if(closestTarget) {
                        if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        
            //这个是绑定的修复建筑
            var needRepairId = creep.memory.repairThingId;
            if(needRepairId == undefined){
                //初始化
                needRepairId = this.findNeedRepair(creep);
            }
            var needRepair = Game.getObjectById(needRepairId);
            if(needRepair !=null && needRepair.hits/needRepair.hitsMax * 1.0 > 0.9){
                needRepairId = this.findNeedRepair(creep);
                needRepair = Game.getObjectById(needRepairId);
            }
            // 如果修理工不在目标建筑旁边，则移动到目标建筑
            if(needRepair != null && creep.repair(needRepair) == ERR_NOT_IN_RANGE) {
                creep.moveTo(needRepair, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            if(needRepair == null || needRepair == undefined){
                //当前修理工空闲
                var targets = data.roomStructures.get(creep.room.name).filter(structure => {
                    (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN 
                        // || structure.structureType == STRUCTURE_TOWER 
                        // || structure.structureType == STRUCTURE_CONTAINER 
                        ) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }) ;
                if(targets.length > 0) {
                    // 找到最近的目标
                    var closestTarget = creep.pos.findClosestByPath(targets);
                    if(closestTarget) {
                        if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }else{
                    targets = data.roomStructures.get(creep.room.name).filter(structure => {
                        (structure.structureType == STRUCTURE_TOWER 
                            //|| structure.structureType == STRUCTURE_STORAGE
                        ) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }) ;
                    if(targets.length > 0){
                        var closestTarget = creep.pos.findClosestByPath(targets);
                        if(closestTarget) {
                            if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }else{
                        targets = data.roomStructures.get(creep.room.name).filter(structure => {
                            (structure.structureType == STRUCTURE_STORAGE) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }) ;
                        if(targets.length > 0){
                            var closestTarget = creep.pos.findClosestByPath(targets);
                            if(closestTarget) {
                                if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                                }
                            }
                        }
                    }

                }


            }
        }
        
    },
    /** @param {Creep} creep **/
    findNeedRepair:function(creep){
         // 查找需要修理的建筑,不修墙
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax 
            && (structure.hits / structure.hitsMax) * 1.0 < 0.6
            && structure.structureType != STRUCTURE_WALL
            && structure.structureType != STRUCTURE_RAMPART
        });
        if(targets.length > 0){
            var target = creep.pos.findClosestByPath(targets);
            if(target == undefined || target == null){
                creep.memory.repairThingId = undefined;
                return undefined;
            }
            creep.memory.repairThingId = target.id;
            return creep.pos.findClosestByPath(targets).id;
        }
    }
};

module.exports = roleRepairer;
