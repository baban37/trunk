const config = require('./Config');
/**
 * 控制台输出管理器
 * 该模块用于统一管理控制台输出，提供了一个`log`方法来输出信息
 * 可以通过修改`log`方法来定制输出的格式和行为
 */
module.exports = {
    /**
     * 输出信息到控制台
     * @param {string} message - 要输出的信息
     */
    log: function(message) {
        var isOutPut = config.ISOUTPUT;
        if(!isOutPut){
            return;
        }else{
            console.log(`[${new Date().toISOString()}] ${message}`);
        }
    }
};
