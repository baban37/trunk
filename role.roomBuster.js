/**房间终结者
 * 就干房间的控制器
 */
const config = require('./Config');
var roleRoomBuster = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //先判断当前creep是否抵达目标房间
        var busterRoom = creep.memory.busterRoom;
        if(busterRoom == undefined || busterRoom == null){
            var roomBusters = _.filter(Game.creeps, (creep) => creep.memory.role == 'roomBuster');
            var room0Num = 0;
            var room1Num = 0;
            for (let i = 0; i < roomBusters.length; i++) {
                const temp = roomBusters[i];
                if(temp.memory.busterRoom == config.RESERVED_ROOM_NAME[1]){
                    room1Num++;
                }else if(temp.memory.busterRoom == config.RESERVED_ROOM_NAME[0]){
                    room0Num++;
                }
            }
            if(room0Num > room1Num){
                creep.memory.busterRoom = config.RESERVED_ROOM_NAME[1];
                busterRoom = config.RESERVED_ROOM_NAME[1];
            }else{
                creep.memory.busterRoom = config.RESERVED_ROOM_NAME[0];
                busterRoom = config.RESERVED_ROOM_NAME[0];
            }
        }
        var room = creep.room;
        //判断当前是否在目标房间
        if(room.name == busterRoom){
            var state;
            if(room.controller.owner != null 
                && !room.controller.my
            ){
                state = creep.claimController(room.controller);
            }else{
                state = creep.reserveController(room.controller);
            }
            if(!room.controller.my 
                && state == ERR_NOT_IN_RANGE) {
                    creep.moveTo(room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
        }else{
            creep.moveTo(new RoomPosition(25, 25, busterRoom),{visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};
module.exports = roleRoomBuster;

