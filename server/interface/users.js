import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'nodemailer';
import User from '../dbs/models/users';
import Passport from './utils/passport';
import Axios from './utils/axios';
import Email from '../dbs/config';

const router = new Router({
  prefix: '/users'
});

const Store = new Redis().client;

router.post('/signup', async ctx => {
  const { username, password, email, code } = ctx.request.body;
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code');
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期'
        };
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证码错误'
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    };
  }

  const user = await User.find({ username });
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已被注册'
    };
    return;
  }
  const nuser = await User.create({
    username,
    password,
    email
  });
  if (nuser) {
    const res = await Axios.post('/signin', {
      username,
      password
    });
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      };
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    };
  }
});

router.post('/signin', async ctx => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      };
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        };
        return ctx.login(user);
      } else {
        ctx.body = {
          code: 1,
          msg: info
        };
      }
    }
  })(ctx, next);
});

router.post('/verify', async ctx => {
  const { username, email } = ctx.request.body;
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '请求过于频繁 '
    };
    return false;
  }
  const transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  });
  const ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email,
    user: username
  };
  const mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '验证码',
    html: `您的验证码是${ko.code}`
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      Store.hmset(
        `nodemail:${ko.user}`,
        'code',
        ko.code,
        'expire',
        ko.expire,
        'email',
        ko.email
      );
    }
  });
  ctx.body = {
    code: 0,
    msg: '验证码已发送'
  };
});

router.get('/exit', async ctx => {
  await ctx.logout();
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    };
  } else {
    ctx.body = {
      code: -1
    };
  }
});

router.get('/getUser', async ctx => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user;
    ctx.body = {
      user: username,
      email
    };
  } else {
    ctx.body = {
      user: '',
      email: ''
    };
  }
});

export default router;
