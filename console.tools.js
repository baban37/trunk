const config = require("./Config");
const { forEach } = require("lodash");

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
            {
                name:"buyEnergy",
                GM:{
                    configurable: true,
                    get : buyEnergy
                } 
            }
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
    output += "buyEnergy\t卖资源\n";
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
function buyEnergy(){
    
    var orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_UTRIUM});
    //给orders从高到低排序
    orders.sort(function(a,b){
        return b.price - a.price;
    })
    let output = "";
    output += config.YELLOW;
    //找前10的订单
    for(var i=0;i<10;i++){
        var myOrder = orders[i];
        var cost = Game.market.calcTransactionCost(1000, myOrder.roomName, "E52S29");
        output += "--------------------------订单"+(i+1)+"--------------------------\n";
        output += "订单物品:"+RESOURCE_UTRIUM+"\n";
        output += "订单id:"+myOrder.id+"\n";
        output += "订单价格:"+myOrder.price+"\n";
        output += "订单房间名:"+myOrder.roomName+"\n";
        output += "该订单还可以交易多少资源:"+myOrder.remainingAmount+"\n";
        output += "订单当前可用的交易量:"+myOrder.amount+"\n";
        output += "这单生意消耗:"+cost+"\n";
        output += "交易量:"+1000+"\n";
        //计算可以获得多少利益
        var profit = (1000 - cost) * myOrder.price;
        output += "这单生意可以获得:"+profit+"\n\n\n\n";

    }
    output += config.OVER;
   
    
    return output;
}

module.exports = consoleTools;