const consoleManager = require('./consoleManager');
// 清除内存 将不存在的creep从内存中清除
module.exports = {
    clean: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                consoleManager.log('有creep嘎了,嘎掉的creep名字为:'+name+",他是:"+Memory.creeps[name].role);
                delete Memory.creeps[name];
            }
        }
    }
};
