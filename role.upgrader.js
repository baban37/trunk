const data = require("./DataCenter");
//升级人员
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            // creep.say('开始获取能量');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        // creep.say('前往升级');
	    }
		
		if(creep.memory.upgrading) {
			var isHarvesters = data.getHarvestersByRoomName(creep.room.name).length > 0;
			if(!isHarvesters){
				//当前没有harvester了,紧急情况
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN )
                                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }	
                    });
				if(targets.length > 0) {
					// 找到最近的目标
					var closestTarget = creep.pos.findClosestByPath(targets);
					if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});	
					}	
					
				}	
			}
			else if(creep.upgradeController(creep.room.controller)== ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
		}
        else {
			data.roomStructures;
            //优先去CONTAINER中获取能量
			targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER
						|| structure.structureType == STRUCTURE_STORAGE 
						||structure.structureType == STRUCTURE_LINK
						) 
					&& structure.store.getUsedCapacity(RESOURCE_ENERGY) > 150;
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
			else{
                var sources = creep.room.find(FIND_SOURCES,{
					filter: (source) => {
						return source.energy > 0;
					}
				});
				var source = creep.pos.findClosestByPath(sources);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
	}
};

module.exports = roleUpgrader;