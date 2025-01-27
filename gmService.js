const config = require("./Config");
const { forEach } = require("lodash");
const helpShow = require("./helpShow");
/**
 * GM事务
 * global.gm.
 * 
 */
const gm = {
   /**
    *  展示
    *  @param {*} pageNum 页数
    *  每页5条
    */
    help : function(pageNum){
        if(pageNum == undefined || pageNum == null){
            pageNum = 1;
        }
        let output = "";
        /** 给出颜色 */
        output += config.YELLOW + "------------------------欢迎使用控制台工具------------------------\n";
        output += helpShow.showAllHelp(pageNum);
        output += "------------------------控制台工具------------------------\n";
        /** 只要有颜色就必须用这个结尾 */
        output += config.OVER;
        return output;
    },
    /**
     * 获取所有的房间
     */
    getAllRoom : function() {
        let output = "";
        output += config.YELLOW;
        output += "当前我拥有的房间列表:\n";
        for (var roomId in Game.rooms) {
            output += roomId + "\t";
        }
        output += config.OVER;
        return output;
    },

    /**
     * 获取房间的能量
     * @param {*} roomName 房间名
     * @returns 
     */
    getRoomEnergy : function(roomName) {
        let output = "";
        output += config.YELLOW;
        output += "房间的能量信息:\n";
        if(roomName != undefined && roomName != null){
            var room = Game.rooms[roomName];
            output += roomName + " : " + room.energyAvailable + "/" + room.energyCapacityAvailable + "\n";
        }else{
            for (var roomId in Game.rooms) {
                var room = Game.rooms[roomId];
                output += roomId + " : " + room.energyAvailable + "/" + room.energyCapacityAvailable + "\n";
            }
        }
        output += config.OVER;
        return output;
    },
    /**
     * 看谁要买东西
     * @param {*} buyType 卖什么类型的东西
     * @param {*} roomName 卖的房间名
     * @param {*} jyNum 交易量
     * @param {*} isBuy 是否购买 0不卖 1卖
     * @param {*} param 判断和谁交易的参数使用房间名字
     * @returns 
     */
    sellSomething : function(sellType,roomName,jyNum,isSell,param){
        if(sellType == null || sellType == undefined){
            sellType = RESOURCE_HYDROGEN;
        }
        if(roomName == null || roomName == undefined){
            roomName = "E51S29"; 
        }
        if(jyNum == null || jyNum == undefined){
            jyNum = 1;
        }
        if(isSell == null || isSell == undefined){
            isSell = 0; 
        }
        if(param == null || param == undefined){
            param = ""; 
        }
        var orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: sellType});
        if(orders.length == 0){
            return "当前没有订单";
        }
        //给orders从高到低排序
        orders.sort(function(a,b){
            return  b.price - a.price;
        })
        let output = "";  
        output += config.YELLOW;
        output += "当前预计交易量:"+jyNum+"\n";
        var myOrder = null;
        //找前10的订单
        for(var i=0;i<10;i++){
            var order = orders[i];
            var cost = Game.market.calcTransactionCost(jyNum, order.roomName, roomName);
            output += "--------------------------订单"+(i+1)+"--------------------------\n";
            output += "订单物品:"+sellType+"\n";
            output += "订单id:"+order.id+"\n";
            output += "订单价格:"+order.price+"\n";
            output += "订单房间名:"+order.roomName+"\n";
            output += "该订单还可以交易多少资源:"+order.remainingAmount+"\n";
            output += "订单当前可用的交易量:"+order.amount+"\n";
            output += "这单生意消耗:"+cost+"\n";
            //计算可以获得多少利益
            var profit = jyNum * order.price;
            output += "这单生意可以获得:"+profit+"\n\n\n\n";
            if( isSell == 1
                &&order.roomName == param
            ){
                myOrder = order;
            }
        }
        if(myOrder != null
        && isSell == 1){
            output += "--------------------------购买的订单--------------------------\n";
            var cost = Game.market.calcTransactionCost(jyNum, order.roomName, roomName);
            output += "订单物品:"+sellType+"\n";
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
            Game.market.deal(myOrder.id, jyNum, roomName);
            output += "交易完成这单生意可以获得:"+profit+"\n\n\n\n";
        }
    
        output += config.OVER;
       
        
        return output;
    }

};
module.exports = gm;

