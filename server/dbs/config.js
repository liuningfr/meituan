export default {
  dbs: 'mongodb://127.0.0.1:27017',
  redis: {
    get host() {
      return '127.0.0.1';
    },
    get port() {
      return 6379;
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com';
    },
    get port() {
      return '1119633612@qq.com';
    },
    get pass() {
      return 'buavodvqvtckhiei';
    }
  },
  get code() {
    return () => {
      return Math.random()
        .toString(16)
        .slice(2, 6)
        .toUpperCase();
    };
  },
  get expire() {
    return () => {
      return new Date().getTime() + 60 * 60 * 1000;
    };
  }
};