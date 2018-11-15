'use strict';

const Service = require('egg').Service;

class UserService extends Service {

    // 用户登录
    async login(userName, passWord) {
        // 检测用户是否存在
        const userInfo = await this.getUserInfoForUserName(userName);
        if (!userInfo.token) throw new Error('用户名不存在！');
        if (userInfo.pass_word !== passWord) throw new Error('用户密码不正确！');
        if (userInfo.is_use !== 0) throw new Error('用户被冻结不能登录，请联系管理员！');

        // 设置redis登录态
        this.app.redis.set(`${userInfo.token}_user_login`, JSON.stringify(userInfo), 'EX', this.app.config.user_login_timeout);
        // 设置登录cookie
        this.ctx.cookies.set('usertoken', userInfo.token);

        return userInfo;
    }

    // 用户注册
    async register(userName, passWord) {
        // 检测用户是否存在
        const userInfo = await this.getUserInfoForUserName(userName);
        if (userInfo.token) throw new Error('用户注册：用户已存在！');

        // 新增用户
        const token = this.app.signwx({
            mark: 'markuser',
            timestamp: new Date().getTime(),
            random: this.app.randomString(),
        }).paySign;

        const user = this.ctx.model.User();
        user.user_name = userName;
        user.pass_word = passWord;
        user.token = token;
        user.create_time = new Date();
        user.level = userName === 'admin' ? 0 : 1;

        // 设置redis登录态
        this.app.redis.set(`${userInfo.token}_user_login`, JSON.stringify(userInfo), 'EX', this.app.config.user_login_timeout);
        // 设置登录cookie
        this.ctx.cookies.set('usertoken', token);

        return await user.save();
    }

    // 根据用户名称查询用户信息
    async getUserInfoForUserName(userName) {
        return await this.ctx.model.User.findOne({ user_name: userName }).exec() || {};
    }

    // 查询用户列表信息（分页）
    async getUserList(pageNos, pageSize, userName) {
        pageNos = pageNos * 1;
        pageSize = pageSize * 1;

        const query = {};
        if (userName) query.user_name = userName;

        const count = Promise.resolve(this.ctx.model.User.count(query).exec());
        const datas = Promise.resolve(
            this.ctx.model.User.find(query).skip((pageNos - 1) * pageSize)
                .limit(pageSize)
                .exec()
        );
        const all = await Promise.all([ count, datas ]);

        return {
            datalist: all[1],
            totalNum: all[0],
            pageNo: pageNos,
        };
    }

    // 冻结解冻用户
    async setIsUse(usertoken, isUse) {
        isUse = isUse * 1;
        const result = await this.ctx.model.User.update(
            { token: usertoken },
            { is_use: isUse },
            { multi: true }
        ).exec();
        // 清空登录态
        this.app.redis.set(`${usertoken}_user_login`, '');
        return result;
    }

    // 删除用户
    async delete(usertoken) {
        const result = await this.ctx.model.User.findOneAndRemove({ token: usertoken }).exec();
        // 清空登录态
        this.app.redis.set(`${usertoken}_user_login`, '');
        return result;
    }

    // 根据token查询用户信息
    async finUserForToken(usertoken) {
        return await this.ctx.model.User.findOne({ token: usertoken }).exec();
    }

}

module.exports = UserService;
