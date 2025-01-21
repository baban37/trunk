var structureLink = {
    /** @param {StructureLink} link **/
   run: function(link) {
        if(link.id != '678a17afd4dfc40f9a129a25' && link.id != "678e4dfcd4756d8c7e21df72"){
                return ;
        }
        if(link.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            return;
        }
        var targets = link.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_LINK
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 400;
            }
        });
        var closestStructure = link.pos.findClosestByPath(targets);
        link.transferEnergy(closestStructure);
   }
}
module.exports = structureLink;