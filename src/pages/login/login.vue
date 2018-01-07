<template src="./login.html">
</template>

<script>
import cookie from "../../cookies/cookie";
export default {
  name: 'LoginComponent',
  data() {
    return {
      loginUser: {
        username: '',
        password: ''
      },
      redirectUrl: '',
      rules: {
        username: [{
          required: true,
          message: '用户名必须输入'
        }, {
          max: 15,
          min: 6,
          message: '长度在6到15之间',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码必须输入'
        }, {
          max: 15,
          min: 6,
          message: '长度在6到15之间',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch("show");
      this.$http.post('/api/api/user/login', this.loginUser).then(function(res) {
        if(res.data.data) {
          this.$store.dispatch("hide");
          cookie.setToken(res.data.data);
          var url = this.redirectUrl || '/';
            this.$router.push({path: url});
        } else {
          alert('登录不成功');
        }
      });
    },
    getQuery() {
      this.redirectUrl = this.$route.query.url;
    }
  },
  created() {
    this.getQuery();
  },
  updated() {
    this.getQuery();
  }
}
</script>
