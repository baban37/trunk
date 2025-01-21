/**
 * 冲级的时候专门用来搬东西的
 */
var roleControllerUper = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //判断是否搬运
        var targets = creep.room.find(FIND_STRUCTURES,{
            filter: (structure) => {
                return (structure.id == "676f9e3aa941a1be93b670c2"
                && structure.room.name == creep.room.name)
                || (structure.id == "6773b86947b61c8002edacfd"
                && structure.room.name == creep.room.name);
            }
        });
        if(targets.length == 0){
            return ;
        }
        if(creep.store.getUsedCapacity() == 0){
            var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_STORAGE);
				}
			});
			if(targets.length > 0) {
				// 找到最近的目标
                
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
			}
        }
        
        //搬运
        if(creep.transfer(targets[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#ffaa00'}});
        }

    }
};
module.exports = roleControllerUper;