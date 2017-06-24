<template>
  <div class="app">
    <!-- Navigation -->
      <section>
        <nav class="nav has-shadow">
          <!-- Logo -->
          <div class="nav-left">
            <a class="nav-item">
              <h1 class="logo">Cast</h1>
              <span class="icon is-medium">
                  <i class="fa fa-angle-double-down"></i>
              </span>
            </a>
          </div>

          <!-- Mobile Menu -->
          <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>
          
          <!-- Regular Menu -->
          <div class="nav-right nav-menu">
            <a class="nav-item">
              <span class="icon is-medium is-left">
                <i class="fa fa-search"></i>
              </span>
            </a>
            <a class="nav-item">Home</a>
            <a class="nav-item" href="documentation">Documentation</a>
            <a class="nav-item">Blog</a>
          </div>
        </nav>
      </section>
    
    <!-- Main -->
      <section class="main">
        <side-bar :info="sidebar"></side-bar>
        <display-window :display="display"></display-window>
      </section>
  </div>
</template>

<script>
import sideBar from './components/side-bar/sideBar.vue'
import displayWindow from './components/display-window/displayWindow.vue'


let tab = {
            tabView: {name: "New Tab",
                      displayInfo: {}}
          };


  //Vue Script
  export default {
    name: "app",
    props: {
      sidebar: Object,
    },
    data: function() {
      return {
        // UI States

        // Side Panel
        

        display: {
          currentTab: tab,
          tabs: [tab]
        }
        // Tabs
          // Selected Tag
          // List of Tabs...
        // Data elements
      }
    },
    computed: {

    },
    methods: {
      
    },
    mounted: function() {
      
    },
    components: {
      sideBar,
      displayWindow
    }
  }
</script>

<style>
  div {
    display: flex;
  }
  section {
    display: flex;
  }

  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
  }

  .main {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-grow: 1;
  }
</style>