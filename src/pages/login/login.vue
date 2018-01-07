<template src="./login.html">
</template>

<script>
import cookie from "../../cookies/cookie";
export default {
  name: "LoginComponent",
  data() {
    return {
      loginUser: {
        username: "",
        password: ""
      },
      error: {
        show: false,
        message: ""
      },
      redirectUrl: "",
      rules: {
        username: [
          {
            required: true,
            message: "用户名必须输入"
          },
          {
            max: 15,
            min: 3,
            message: "长度在6到15之间",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码必须输入"
          },
          {
            max: 15,
            min: 6,
            message: "长度在6到15之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      var self = this;
      self.$refs["loginForm"].validate(valid => {
        self.$http
          .post("/api/api/user/login", { data: self.loginUser })
          .then(function(res) {
            if (res.data.data) {
              cookie.setToken(res.data.data);
              var url = self.redirectUrl || "/";
              self.$router.push({ path: url });
            } else {
              self.error.show = true;
              self.error.message = "用户名或密码错误";
              setTimeout(() => {
                self.error.show = false;
              }, self.$store.state.messageHideDelay);
            }
          });
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
};
</script>
