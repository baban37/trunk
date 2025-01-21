const { forEach } = require("lodash");
const tower = require('structure.tower');
const linker = require('structure.linker');
/**各个建筑开始工作 */
module.exports = {
   startWork: function() {
        var rooms = Game.rooms;
        forEach(rooms, function (room) {
            if(room.controller == undefined){
                return;
            }
            if(room.controller.my == false){
                return;
            }
            var structures = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER
                        ||structure.structureType == STRUCTURE_LINK
                        );
                }
            });
            for(let i = 0; i < structures.length; i++){
                var structure = structures[i];
                if(structure.structureType == STRUCTURE_TOWER){
                    tower.run(structure);
                }
                if(structure.structureType == STRUCTURE_LINK){
                    linker.run(structure);
                }
            }
        });
    }
}
