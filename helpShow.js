/**
 * 这里是通过help展示所有的gm命令
 * 这里应该有且仅有一个方法就是展示所有的gm命令
 */
const help = {
    /** 每一页的数量 */
    pageSize : 5,
    GMCommand : [
        {
            name : "help",
            desc : "显示gm命令",
            params : "page(页数)"
        },
        {
            name : "getAllRoom",
            desc : "获取我的所有的房间",
            params : "无" 
        },
        {
            name : "getRoomEnergy",
            desc : "获取房间的能量",
            params : "roomName(房间名可选)"
        },
        {
            name : "sellSomething",
            desc : "看谁要买东西",
            params : "buyType 卖什么类型的东西 \t" +
            "roomName 卖的房间名\t" +
            "jyNum 交易量\t"+
            "isBuy 是否购买 0不卖 1卖\t " +
            "param 判断和谁交易的参数使用房间名字"
        },
        {
            name : "buySomething",
            desc : "看谁要卖东西",
            params : "buyType 买什么类型的东西 \t" + 
            "roomName 买的房间名\t" +
            "jyNum 交易量\t"+
            "isBuy 是否购买 0不买 1买\t " +
            "param 判断和谁交易的参数使用房间名字"
        },
        {
            name : "sendEnergy",
            desc : "给其他房间发送能量",
            params : "roomName1 房间名消耗能量的房间\t" +
            "roomName2 房间名接受能量的房间\t" +
            "num 能量数量\t" +
            "isSend 是否发送 0不发送 1发送\t" +
            "note 留言"
        },
    ],

    showAllHelp : function(page){
        if(page != undefined || page != null){
            var maxPage = Math.ceil(this.GMCommand.length/size); 
            if(page > maxPage){
                return "当前页数为:\t"+page+"\t页,最大页数为:\t"+maxPage+"\t页\n";
            }
        }else{
            page = 1;
        }
        var size = this.pageSize;
        var start = size * (page-1);
        var end = size * page;
        let out = "当前第:\t"+page+"\t页\n";
        for(let i = start;i<end;i++){
            if(i >= this.GMCommand.length){
                break;
            }
            let command = this.GMCommand[i];
            out += command.name + "\t" + command.desc + "\t参数:" + command.params + "\n";
        }
        return out;

    }
}
module.exports = help;