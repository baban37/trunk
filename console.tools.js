const config = require("./Config");

/**
 * 这个是控制台使用的工具
 * 将想要在控制台使用的方法放在这里,然后就可以在控制台进行调用了
 * 现在这些都是不能变动的死方法没有办法将参数传入
 */
var consoleTools ={
    initTools:function(){
        var consoleGm = [
            {
                name:"help",
                GM:{
                    // 这个不加的话，就不能修改了
                    configurable: true,
                    get: getHelpText
                }
            },
            {
                name:"lookRooms",
                GM:{
                    configurable: true,
                    get: getAllRoom
                }
            },
            {
                name:"getRoomEnergy",
                GM:{
                    configurable: true,
                    get:getRoomEnergy
                }
            },
        ]

        for(var i=0;i<consoleGm.length;i++){
            Object.defineProperty(global, consoleGm[i].name, consoleGm[i].GM);
        }
        
    }
}
function getHelpText() {
    let output = "";
    /** 给出颜色 */
    output += config.YELLOW + "欢迎使用控制台工具";
    output += "控制台指令列表:\n";
    output += "help\t帮助\n";
    output += "lookRooms\t查看当前房间信息\n";
    output += "getRoomEnergy\t查看当前房间的能量信息\n";
    /** 只要有颜色就必须用这个结尾 */
    output += config.OVER;
    return output;
}
function getAllRoom() {
    let output = "";
    output += config.YELLOW;
    output += "当前我拥有的房间列表:\n";
    for (var roomId in Game.rooms) {
        output += roomId + "\t";
    }
    output += config.OVER;
    return output;
}
function getRoomEnergy() {
    let output = "";
    output += config.YELLOW;
    output += "当前房间的能量信息:\n";
    for (var roomId in Game.rooms) {
        var room = Game.rooms[roomId];
        output += roomId + " : " + room.energyAvailable + "/" + room.energyCapacityAvailable + "\n";
    }
    output += config.OVER;
    return output;
}

module.exports = consoleTools;