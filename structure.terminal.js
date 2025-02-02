const { forEach } = require("lodash");
const consoleManager = require("./consoleManager");
/**
 * 这个是交易所代码
 * 需要是就使用,不需要的时候注释掉
 * 注意交易所无论是卖还是买都需要消耗自己的能量进行交易(消耗自己的能量作为中介费)
 */
var structureTerminal = {
    /** @param {StructureTerminal} terminal **/
    run: function (terminal) {
        /************************* 卖 *************************/
        //我的订单
        var myOrder = null;
        var isBuy = false;//false为购买能量,true为贩卖U
        if(isBuy){
            var orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_HYDROGEN});
            //给orders从高到低排序
            orders.sort(function(a,b){
                return b.price - a.price;
            })
            var jyNum = 5000;
            //找前10的订单
            for(var i=0;i<10;i++){
                var order = orders[i];
                var cost = Game.market.calcTransactionCost(jyNum, order.roomName, "E51S29");
                if(
                    // cost < 3140
                    order.roomName == "E31S39"
                    ) {
                    var num = Game.market.deal(order.id, jyNum, terminal.room.name);
                    console.log(num);
                    break;
                }
    
            }
        }else{
            var orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: RESOURCE_ENERGY});
            //给orders从高到低排序
            orders.sort(function(a,b){
                return -b.price + a.price;
            })
            var jyNum = 10000;
            //找前10的订单
            for(var i=0;i<10;i++){
                var order = orders[i];
                var cost = Game.market.calcTransactionCost(jyNum, order.roomName, "E52S29");
                if(
                    // cost < 3140
                    order.roomName == "E43S27"
                    ) {
                    var num = Game.market.deal(order.id, jyNum, terminal.room.name);
                    consoleManager.log(num);
                    break;
                }
    
            }
        }



       
        // if(cost < 1000 && myOrder.price > 25 ){
        //     var num = Game.market.deal(myOrder.id, 1000, terminal.room.name);
        //     console.log(num);
        // }

        // 已经获取到单价最高的订单开始交易
        // var num = Game.market.deal(myOrder.id, 2000, terminal.room.name);
        // console.log(num);

        /************************* 买 *************************/
    }

}
module.exports = structureTerminal;