<template src="./header.html">
  
</template>

<script>
import cookie from "./../../cookies/cookie";
import breadcrumb from "./breadcrumb/breadcrumb";
export default {
  data() {
      return {
          loginUser: {}
      };
  },
  methods: {
      clickMenu(cmd) {
          
      },
      exit() {
          cookie.removeToken();
          this.$router.push({path: '/base'});
      },
      changepwd() {

      }
  },
  created() {
  },
  components: {
      breadcrumb
  }
}
</script>

<style lang="less" src="./header.less">

</style>


