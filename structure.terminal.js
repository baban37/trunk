const { forEach } = require("lodash");

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
        //获取订单
        var orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY});
        //寻找单价最高的订单
        forEach(orders,function(order){
            if(myOrder == null){
                myOrder = order;
            }
            if(order.price > myOrder.price){
                myOrder = order;
            }
        });
        if(myOrder == null){
            //当前没有可以使用的订单
            return;
        }else{
            console.log(
                "当前有可以交易的订单,订单内容为:\n"+
                "订单id:"+myOrder.id+"\n"+
                "订单价格:"+myOrder.price+"\n"+
                "订单房间名:"+myOrder.roomName+"\n"+
                "该订单还可以交易多少资源:"+myOrder.remainingAmount+"\n"+
                "订单当前可用的交易量:"+myOrder.amount+"\n"+
                "如果想要交易请在控制台使用交易代码进行交易"
            );
        }
        var cost = Game.market.calcTransactionCost(1000, myOrder.roomName, terminal.room.name);
        console.log(cost);
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