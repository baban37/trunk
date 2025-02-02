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

		if(creep.memory.building){
			//先看是否有harvester
			var isHarvesters = data.getHarvestersByRoomName(creep.room.name).length > 0;
			if(!isHarvesters){
				//当前没有harvester了,紧急情况	
				var structures = data.roomStructures.get(creep.room.name);
				var targets = structures.filter(structure => {
					(structure.structureType == STRUCTURE_EXTENSION ||
					structure.structureType == STRUCTURE_SPAWN ) 
					&& structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
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
				return ;
			}


			//获取所有的建造目标
			var targets = data.roomConstructionSites.get(creep.room.name).filter(site => {
				return site.structureType === STRUCTURE_EXTENSION ||
					site.structureType === STRUCTURE_SPAWN ||
					site.structureType === STRUCTURE_ROAD;
			});
			//开始建造
			if(targets.length > 0) {
				// 找到最近的目标
				var closestTarget = creep.pos.findClosestByPath(targets);
				if(closestTarget) {
					if(creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
						creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
					}
					return;
				}
			}else {
				targets = data.roomConstructionSites.get(creep.room.name);
				if(targets.length > 0) {
					// 找到最近的目标
					var closestTarget = creep.pos.findClosestByPath(targets);
					if(closestTarget) {
						if(creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
							creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
						}
						return;
					}
				}
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
						targets = data.roomStructures.get(creep.room.name).filter(structure => {
							(structure.structureType == STRUCTURE_CONTAINER ) 
							&& structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
						});
						// 查找需要传输能量的目标结构 注意当前存储的能量不会直接用于孵化
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
		
		//没有能量了，开始获取能量
	    else if(!creep.memory.building){
			//优先去CONTAINER中获取能量
			targets = data.roomStructures.get(creep.room.name).filter(structure => {
				(structure.structureType == STRUCTURE_CONTAINER 
				|| structure.structureType == STRUCTURE_STORAGE
				||structure.structureType == STRUCTURE_LINK) 
				&& structure.store.getUsedCapacity(RESOURCE_ENERGY) > 300;
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
					filter:(source)=>source.energy > 0
				});
				var source = creep.pos.findClosestByPath(sources);
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
				}
			}
	    }
		//当前已经没有建造目标了,先考虑做搬运工,在考虑升级
		
	}
	
};

module.exports = roleBuilder;