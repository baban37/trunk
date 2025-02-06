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
        output += config.YELLOW + "------------------------------------------------"
        +"欢迎使用控制台工具------------------------------------------------\n";
        output += helpShow.showAllHelp(pageNum);
        output += "------------------------------------------------"
        +"控制台工具------------------------------------------------\n";
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
                &&(myOrder == null || myOrder.price < order.price)
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
    },
    /**
     * 买东西
     * @param {*} buyType 买什么类型的东西
     * @param {*} roomName 买的房间名
     * @param {*} jyNum 交易量
     * @param {*} isBuy 是否购买 0不买 1买
     * @param {*} param 判断和谁交易的参数使用房间名字
     */
    buySomething : function(buyType,roomName,jyNum,isBuy,param){
        if(buyType == null || buyType == undefined){
            buyType = RESOURCE_ENERGY;
        }
        if(roomName == null || roomName == undefined){
            roomName = "E52S29"; 
        }
        if(jyNum == null || jyNum == undefined){
            jyNum = 1; 
        }
        if(isBuy == null || isBuy == undefined){
            isBuy = 0; 
        }
        if(param == null || param == undefined){
            param = ""; 
        }
        var nowEnergy = Game.rooms[roomName].terminal.store.getUsedCapacity(buyType);


        var orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: buyType});
        //给orders从高到低排序
        orders.sort(function(a,b){
            return - b.price + a.price;
        })
        let output = "";
        output += config.YELLOW;
        var myOrder = null;
        //找前10的订单
        for(var i=0;i<10;i++){
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
            output += "交易量:"+jyNum+"\n";
            output += "当前能量:"+nowEnergy+"\n";
            output += "交易后能量"+(nowEnergy-cost+jyNum)+"\n";
            var costCir = jyNum * order.price;
            output += "这单生意的价格:"+costCir+"\n\n\n\n";
            if(
                isBuy == 1
                && order.roomName == param
                &&(myOrder == null || myOrder.price > order.price)
            ){
                myOrder = order;
            }
        }
        if(isBuy == 1 && myOrder!= null){
            output += "--------------------------我购买的订单--------------------------\n";
            var isOK=Game.market.deal(myOrder.id, jyNum, roomName);
            if(isOK!=0){
                output += "交易失败"+config.OVER
                return output;
            }
            var cost = Game.market.calcTransactionCost(jyNum, myOrder.roomName, roomName);
            // Game.market.deal(myOrder.id, jyNum, roomName);
            output += "订单物品:"+buyType+"\n";
            output += "订单id:"+myOrder.id+"\n";
            output += "订单价格:"+myOrder.price+"\n";
            output += "订单房间名:"+myOrder.roomName+"\n";
            output += "该订单还可以交易多少资源:"+myOrder.remainingAmount+"\n";
            output += "订单当前可用的交易量:"+myOrder.amount+"\n";
            output += "这单生意消耗:"+cost+"\n";
            output += "交易量:"+jyNum+"\n";
            output += "当前能量:"+nowEnergy+"\n";
            output += "交易后能量"+(nowEnergy-cost+jyNum)+"\n";
            var costCir = jyNum * order.price;
            output += "这单生意的价格:"+costCir+"\n\n\n\n";
        }
        output += config.OVER;
        return output;
    },
    /**
     * 给其他房间发送能量
     * @param {*} roomName1 房间名消耗能量的房间
     * @param {*} roomName2 房间名接受能量的房间
     * @param {*} num 能量数量
     * @param {*} isSend 是否发送 0不发送 1发送
     * @param {*} note 留言
     */
    sendEnergy:function(roomName1,roomName2,num,isSend,note){
        if(roomName1 == null || roomName1 == undefined){
            roomName1 = "E51S29"; 
        }
        if(roomName2 == null || roomName2 == undefined){
            roomName2 = "E52S29"; 
        }
        if(num == null || num == undefined){
            num = 1; 
        }
        if(isSend == null || isSend == undefined){
            isSend = 0; 
        }
        if(note == null || note == undefined){
            note = "hello world"; 
        }
        var output = "";
        output += config.YELLOW;
        output += "房间名:"+roomName1+"\n";
        output += "房间名:"+roomName2+"\n";
        output += "能量数量:"+num+"\n";
        output += "是否发送:"+isSend+"\n";
        output += "留言:"+note+"\n";

        if(isSend == 1){
            var state = Game.rooms[roomName1].terminal.send(RESOURCE_ENERGY, num, roomName2,note);
            output += "发送状态:"+state+"\n";
        }else{
            var cost = Game.market.calcTransactionCost(num, roomName1, roomName2);
            output += "运输费用:"+cost+"\n";
        }
        output += config.OVER;
        return output;
    },
    /**
     * 在市场上创建一个订单
     * @param {string} type 订单类型（ORDER_SELL 或 ORDER_BUY）
     * @param {string} resourceType 资源类型
     * @param {number} price 资源的单价
     * @param {number} totalAmount 要交易的资源总量
     * @param {string} roomName 房间名称
     * @returns {string} 操作结果的描述
     */
    createMarketOrder: function(type, resourceType, price, totalAmount, roomName) {
        if (type !== ORDER_SELL && type !== ORDER_BUY) {
            return "无效的订单类型，必须是 ORDER_SELL 或 ORDER_BUY";
        }
        if (resourceType === undefined || resourceType === null) {
            return "资源类型不能为空";
        }
        if (price === undefined || price === null || isNaN(price)) {
            return "价格必须是有效的数字";
        }
        if (totalAmount === undefined || totalAmount === null || isNaN(totalAmount) || totalAmount <= 0) {
            return "交易总量必须是有效的正数";
        }
        if (roomName === undefined || roomName === null) {
            return "房间名称不能为空";
        }

        var result = Game.market.createOrder({
            type: type,
            resourceType: resourceType,
            price: price,
            totalAmount: totalAmount,
            roomName: roomName
        });

        if (result === OK) {
            return "订单创建成功";
        } else {
            return "订单创建失败，错误代码: " + result;
        }
    },

};
module.exports = gm;

