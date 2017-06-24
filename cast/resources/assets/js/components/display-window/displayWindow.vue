<template>
  <div class="view">
    <tab-bar :display="display"></tab-bar>
    <view-display :current="display.currentTab"></view-display>
  </div>
</template>

<script>
import tabBar from './tabBar.vue'
import viewDisplay from './viewDisplay.vue'

  //Vue Script
  export default {
    name: "",
    props: {
      display: Object
    },
    data: function() {
      return {
      }
    },
    computed: {

    },
    methods: {
      
    },
    mounted: function() {
      
    },
    components: {
      tabBar,
      viewDisplay
    }
  }
</script>

<style>
  .view {
    flex-grow: 1;
    flex-direction: column;
    align-items: stretch;
  }
</style>