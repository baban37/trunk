const data = require("./DataCenter");
//建筑工角色,当没有建筑目标时,变为升级人员
var roleBuilder = {
	// 查找需要传输能量的目标结构
    findEnergyTransferTargets: function(creep) {
		var structures = data.roomStructures.get(creep.room.name);
		var targets = structures.filter(structure => {
            		structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER
                    // ||structure.structureType == STRUCTURE_CONTAINER
                    &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
		});

        return targets;
    },

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            // creep.say('开始获取能量');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        // creep.say('建造中');
	    }

		//获取所有的建造目标
		var targets = data.roomConstructionSites.get(creep.room.name);
		//开始建造
	    if(targets.length > 0 && creep.memory.building) {
			// 找到最近的目标
			var closestTarget = creep.pos.findClosestByPath(targets);
			if(closestTarget) {
				if(creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
					creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
	    }
		//没有能量了，开始获取能量
	    else if(!creep.memory.building){
			//优先去CONTAINER中获取能量
			targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER 
						|| structure.structureType == STRUCTURE_STORAGE
						||structure.structureType == STRUCTURE_LINK) 
					&& structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
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
				var sources = creep.room.find(FIND_SOURCES);
				if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
				}
			}
	    }
		//当前已经没有建造目标了,先考虑做搬运工,在考虑升级
		else {
			var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
			// 没有搬运工了,就先搬运
			if(harvesters.length < 1){
				// 查找需要传输能量的目标结构
				var targets = this.findEnergyTransferTargets(creep);
				if(targets.length > 0) {
					// 找到最近的目标
					var closestTarget = creep.pos.findClosestByPath(targets);
					if(closestTarget) {
						if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
							creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
						}
					}
				} else {
					// 查找需要传输能量的目标结构 注意当前存储的能量不会直接用于孵化
					targets = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return (structure.structureType == STRUCTURE_CONTAINER ) 
							&& structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
						}
					});
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
			}
			// 有搬运工了,就升级
			else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
		}
	}
	
};

module.exports = roleBuilder;