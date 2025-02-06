const config = require("./Config");
/**塔的代码 */
var structureTower = {
     /** @param {StructureTower} tower **/
    run: function(tower) {
            
            // 优先攻击敌人
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
                return;
            }
            var nowEnergy = tower.store.getUsedCapacity(RESOURCE_ENERGY);
            if(nowEnergy <= 500){
                // 能量不够了 不进行维修
                return;
            }
            // 维修最靠近的建筑
            var repairThingId = tower.room.memory.repairThingId;
            if(repairThingId == undefined){
                var closestDamagedStructure = this.findNeedRepair(tower);
                if(closestDamagedStructure == null){
                    repairThingId = undefined;
                    tower.room.memory.repairThingId = undefined;
                    return;
                }
                repairThingId = closestDamagedStructure.id;
                tower.room.memory.repairThingId = repairThingId;
            }else{
                var repairThing = Game.getObjectById(repairThingId);
                if(repairThing != null 
                && repairThing.structureType != STRUCTURE_WALL
                && repairThing.structureType!= STRUCTURE_RAMPART
                && repairThing.hits / repairThing.hitsMax * 1.0 > 0.9
                ){
                    repairThingId = undefined;
                    tower.room.memory.repairThingId = undefined;
                }
                else if(
                    repairThing != null 
                    && repairThing.structureType == STRUCTURE_WALL
                    && repairThing.hits >= 10*config.M
                ){
                    repairThingId = undefined;
                    tower.room.memory.repairThingId = undefined;
                }
                else if(
                    repairThing!= null
                    && repairThing.structureType == STRUCTURE_RAMPART
                    && repairThing.hits >= 10*config.M 
                ){
                    repairThingId = undefined;
                    tower.room.memory.repairThingId = undefined;
                }


            }
            var repairThing = Game.getObjectById(repairThingId);
            if(repairThing) {
                tower.repair(repairThing);
            }
            // 防御塔不能升级控制器
            // if (room.controller && room.controller.my && room.controller.level < 8) {
            //     tower.upgradeController(room.controller);
            // }

            
        
    },
    /** @param {StructureTower} tower **/
    findNeedRepair : function(tower){
        var structures = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter:(structure) => (structure.hits < structure.hitsMax 
                && (structure.hits / structure.hitsMax) * 1.0 < 0.6
                && structure.structureType != STRUCTURE_WALL
                && structure.structureType!= STRUCTURE_RAMPART)
                ||(
                    structure.structureType == STRUCTURE_RAMPART
                    && (structure.hits / structure.hitsMax) * 1.0 < 0.1
                )
        });
        // if(structures == null 
        // || structures == undefined
        // || structures.length == 0){
        //     structures = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //         filter:(structure) => (structure.hits < structure.hitsMax 
        //             && (structure.hits / structure.hitsMax) * 1.0 < 0.6
        //             &&(structure.structureType == STRUCTURE_WALL
        //             || structure.structureType == STRUCTURE_RAMPART)
        //             )
        //     });
        // }
        return structures;

    }
};

module.exports = structureTower;
