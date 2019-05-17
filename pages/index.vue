<template>
  <main>
    <div v-if="subscribe===1">
      <p>您已经关注西邦公众号。</p>
      <p v-if="count===-1">
        不具备抽奖资格
      </p>
      <p v-else>
        本日抽奖次数： {{ count }}
      </p>
      <p>
        <button @click.stop="submit">
          试试手气
        </button>
      </p>
      <hr>
      <div>
        <p>当前配置说明：</p>
        <ul>
          <li>不限制IP</li>
          <li>每日可抽奖1次</li>
          <li>奖品不限制总数</li>
          <li>中奖率1%</li>
          <li>必须先关注公众号</li>
        </ul>
        <p>示例项目，没有进行UI美化，可根据实际需要进行定制。如您有个性化活动吸粉需求，可咨询公众号“西邦”，或电话：025-58177588。</p>
      </div>
    </div>
    <div v-else>
      <p>您尚未关注本公众号，请先关注后再进行抽奖。</p>
      <p><img src="/qr.jpg" alt="二维码"></p>
      <p>
        <button @click.stop="refresh">
          刷新页面
        </button>
      </p>
    </div>
  </main>
</template>

<script>
export default {
  data: () => ({
    count: -1,
    subscribe: 0
  }),
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const { openid = '' } = this.$route.query;
      if (openid === '') {
        window.location.href = '/api/wechat/login';
      }
      const { data: { count = -1, subscribe = 0 } } = await this.$axios.$get(`/api/user/check?openid=${openid}`);
      this.count = count;
      this.subscribe = subscribe;
    },
    refresh() {
      window.location.reload();
    },
    async submit() {
      const { openid = '' } = this.$route.query;
      const { data: { result = -1 } } = await this.$axios.$get(`/api/user/feeling?openid=${openid}`);
      if (result === -1) {
        alert('已抽奖过咯');
      }
      if (result === 0) {
        alert('未中奖，请明天再试');
      }
      if (result === 1) {
        alert('恭喜你，获得10元红包，请在公众号中查收');
      }
    }
  }
};
</script>
