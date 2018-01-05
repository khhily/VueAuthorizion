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
      redirectUrl: ''
    }
  },
  methods: {
    login() {
      this.$http.post('/api/api/user/login', this.loginUser).then(function(res) {
        if(res.body.data) {
          alert('登录成功');
          console.log(res.data);
          // data.json().then(function(d){
          //   console.log(d);
          //   cookie.setToken(d.body.data);
            
          // });
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
