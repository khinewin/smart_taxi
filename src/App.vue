<template>
  <div id="app">
    <div id="nav">
        <Navbar></Navbar>
    </div>
   <div class="mt-4 pt-1">
     <router-view/>
   </div>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar"
  export default {
    components: {Navbar},

  }
</script>
<style>

</style>
