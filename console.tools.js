const config = require("./Config");
const { forEach } = require("lodash");

/**
 * 这个是控制台使用的工具
 * 将想要在控制台使用的方法放在这里,然后就可以在控制台进行调用了
 * 现在这些都是不能变动的死方法没有办法将参数传入
 * 废弃了
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
                name:"buySomething",
                GM:{
                    configurable: true,
                    get : buySomething
                } 
            },
            {
                name:"sellSomething",
                GM:{
                    configurable: true,
                    get : sellSomething 
                }
            },
            {
                name:"sendEnergy",
                GM:{
                    configurable: true,
                    get : sendEnergy
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
    output += "buySomething\t卖资源\n";
    output += "sellSomething\t买资源\n";
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
function buySomething(){
    var buyType = RESOURCE_HYDROGEN;
    var roomName = "E51S29";
    var orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: buyType});
    //给orders从高到低排序
    orders.sort(function(a,b){
        return  b.price - a.price;
    })
    let output = "";  
    output += config.YELLOW;
    var jyNum = 9000;
    output += "当前预计交易量:"+jyNum+"\n";
    var myOrder = null;
    //找前10的订单
    for(var i=0;i<10;i++){
        if(myOrder == null){
            myOrder = orders[0]; 
        }
        var order = orders[i];
        var cost = Game.market.calcTransactionCost(jyNum, order.roomName, roomName);
        output += "--------------------------订单"+(i+1)+"--------------------------\n";
        output += "订单物品:"+buyType+"\n";
        output += "订单id:"+order.id+"\n";
        output += "订单价格:"+order.price+"\n";
        output += "订单房间名:"+order.roomName+"\n";
        output += "该订单还可以交易多少资源:"+order.remainingAmount+"\n";
        output += "订单当前可用的交易量:"+order.amount+"\n";
        output += "这单生意消耗:"+cost+"\n";
        //计算可以获得多少利益
        var profit = jyNum * myOrder.price;
        output += "这单生意可以获得:"+profit+"\n\n\n\n";
        if(
            // myOrder.price < order.price
            order.roomName == "E19S49"
            ){
            myOrder = order;
        }
    }
    output += "--------------------------最优订单--------------------------\n";
    var cost = Game.market.calcTransactionCost(jyNum, order.roomName, roomName);
    output += "订单物品:"+buyType+"\n";
    output += "订单id:"+myOrder.id+"\n";
    output += "订单价格:"+myOrder.price+"\n";
    output += "订单房间名:"+myOrder.roomName+"\n";
    output += "该订单还可以交易多少资源:"+myOrder.remainingAmount+"\n";
    output += "订单当前可用的交易量:"+myOrder.amount+"\n";
    output += "这单生意消耗:"+cost+"\n";
    if(jyNum>myOrder.amount){
        jyNum = myOrder.amount; 
    }
    //计算可以获得多少利益
    var profit = jyNum * myOrder.price;
    output += "这单生意可以获得:"+profit+"\n\n\n\n";
    
    // Game.market.deal(myOrder.id, jyNum, roomName);

    output += config.OVER;
   
    
    return output;
}
function sellSomething(){
    var orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: RESOURCE_ENERGY});
    //给orders从高到低排序
    orders.sort(function(a,b){
        return - b.price + a.price;
    })
    let output = "";
    output += config.YELLOW;
    var jyNum = 40000;
    var nowEnergy = 10614 ;
    var myOrder = null;
    var roomName = "E51S29";
    //找前10的订单
    for(var i=0;i<10;i++){
        var order = orders[i];
        var cost = Game.market.calcTransactionCost(jyNum, order.roomName, "E51S29");
        output += "--------------------------订单"+(i+1)+"--------------------------\n";
        output += "订单物品:"+RESOURCE_ENERGY+"\n";
        output += "订单id:"+order.id+"\n";
        output += "订单价格:"+order.price+"\n";
        output += "订单房间名:"+order.roomName+"\n";
        output += "该订单还可以交易多少资源:"+order.remainingAmount+"\n";
        output += "订单当前可用的交易量:"+order.amount+"\n";
        output += "这单生意消耗:"+cost+"\n";
        output += "交易量:"+jyNum+"\n";
        output += "当前能量:"+nowEnergy+"\n";
        output += "交易后能量"+(nowEnergy-cost+jyNum)+"\n";
        var costCir = jyNum * order.price;
        output += "这单生意的价格:"+costCir+"\n\n\n\n";
        if(
            order.roomName == "E48S33"
        ){
            myOrder = order;
        }
    }
    output += config.OVER;
    // Game.market.deal(myOrder.id, jyNum, roomName);
    return output;
}
function sendEnergy(){
       console.log("sendEnergy");
}

module.exports = consoleTools;