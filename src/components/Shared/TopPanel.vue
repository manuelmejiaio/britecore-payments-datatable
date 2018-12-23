
<template>
  <div>
    <div class="topnav" ref="topPanel">
      <a class="logo" href="#">
        <img src="~@/assets/logo.png" alt="BriteCore" height="120">
      </a>
      <div class="links" @click="alertNavigationBar">
        <a href="#">Home</a>
        <a href="#">Help</a>
        <a href="#">Log out</a>
        <a href="javascript:void(0);" class="icon" @click="expandNavigation()">
          <i class="fa fa-bars"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    expandNavigation () {
      let topPanel = this.$refs.topPanel
      if (topPanel.className === 'topnav') {
        topPanel.className += ' responsive'
      } else {
        topPanel.className = 'topnav'
      }
    },
    alertNavigationBar () {
      alert('this is a dummy Navigation Bar')
    }
  }
}
</script>

<style lang="scss">
$bg-color: white;
$link-color: grey;

.topnav {
  overflow: hidden;
  background-color: $bg-color;
  margin-top: 20px;
}

.topnav a.logo {
  float: left;
}

.topnav .links {
  margin-top: 35px;
  float: right;
}

.topnav .links a {
  display: inline-block;
  color: $link-color;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  font-weight: bold
}

.topnav .links a:hover {
  background-color: #ddd;
}

.topnav .links .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav .links a {
    display: none;
  }
  .topnav .links a.icon {
    float: right;
    display: block;
  }
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive .links .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive .links a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
