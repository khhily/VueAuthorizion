<template src="./header.html">
  
</template>

<script>
export default {
  name: 'homeHeader',
  data() {
      return {
          loginUser: {}
      };
  },
  methods: {
      clickMenu(cmd) {
          
      }
  },
  created() {
    //   this.$http.post('/api/api/user/getme').then(data => {
    //       if(data.data) {
    //           this.loginUser = data.data.data;
    //       }
    //   });
  }
}
</script>

