const consoleManager = require('./consoleManager');
var structureLink = {
    /** @param {StructureLink} link **/
   run: function(link) {
        if(link.id != '678a17afd4dfc40f9a129a25' 
        && link.id != "678e4dfcd4756d8c7e21df72"
        && link.id!= "6790a5692c03987675631077"){
                return ;
        }
        if(link.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            return;
        }
        if(link.id != "6790a5692c03987675631077"){
            var targets = link.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_LINK
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 400
                    && structure.id != "6790a5692c03987675631077";
                }
            });
            var closestStructure = link.pos.findClosestByPath(targets);
            link.transferEnergy(closestStructure);
        }else{
            var targets = link.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_LINK;
                }
            });
            var temp  = link.transferEnergy(targets[0]);
            consoleManager.log("temp:"+temp);
        }
        
   }
}
module.exports = structureLink;