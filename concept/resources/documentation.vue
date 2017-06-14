<template>
  <div id="app">

    <!-- header -->
    <section>
      <nav class="nav has-shadow">
        <div class="nav-left">
          <a class="nav-item" @click="state.current = 'home'">
            <p class="logo">Cast </p>
            <i class="fa fa-angle-double-down is-large"></i>
          </a>
        </div>

        <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
        <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <!-- This "nav-menu" is hidden on mobile -->
        <!-- Add the modifier "is-active" to display it on mobile -->
        <div class="nav-right nav-menu">
          <a class="nav-item" @click="viewSearch">
            <span class="icon is-medium is-left">
              <i class="fa fa-search"></i>
            </span>
          </a>
          <a class="nav-item" @click="state.current = 'home'">
            Home
          </a>
          <a class="nav-item" href="documentation">
            Documentation
          </a>
          <a class="nav-item">
            Blog
          </a>

        </div>
      </nav>
    </section>

  
    <!-- Main App -->
    <section class="main"
    v-if="state.current == 'info'">
      
      <!-- Info Navigation -->
      <div class="sidebar">
        <c-sidebar :conceptNodes="info" :goals="userSettings.goals" :selected="selected">
          
        </c-sidebar>
        <!-- <div class="doclink">
          <a href="#intro">Intro</a>
          <a href="#user-goals">User Goals</a>
          <a href="#UI">UI</a>
          <a href="#features">Features</a>
          <a href="#folder-architecture">Folder Architecture</a>
          <a href="#functions">Functions</a>
        </div> -->
      </div>

      <!-- Display Area -->
      <div class="display">
        <concept-display :selected="selected" :viewProperties="userSettings">
          
        </concept-display>
      </div>

    </section>
    <!-- footer -->
  </div>
</template>



<script>

import cSidebar from './components/cSidebar.vue'
import conceptDisplay from './components/conceptDisplay.vue'
import checkList from './components/checkList.vue'
import cNode from './components/cNode.vue'
import {HTTP} from './http-common.js' 
import {userSettings} from './user-settings.js'
import {documentationInfo} from './user-settings.js'

// TO-DO: Change database

export default {
  name: 'documentation',
  data () {
  return {
      // Data to view
      displayType: 'convLayer',
      info: documentationInfo,
      selected: {item: {title: 'Error Nothing loaded'}},
      // User Settings
      userSettings: {
        goals: [],
        todos: []
      },
      // UI State Data
      state: {
        current: "info",
        search: {
          input: "",
          results: [],
          errorMessage: ""
        },
        display: {

        }
      }
    }
  },
  components: {
    cSidebar,
    conceptDisplay,
    checkList,
    cNode
  },
  created: function() {
    // Get Goal Data
    this.userSettings = userSettings;
    this.selected.item = this.info[1];
    // Get Tree Data

      //Connection Created

      // Load Data For Sidebar

      HTTP.get('document/documentation/33:0/*:-1').then(function(response) {
        this.info[1].layers.push(response.data);
      }.bind(this));
      
  },
  computed: {
    hasResults() {
      return this.state.current === 'search' && this.state.search.results.length > 0;
    },
    hasError() {
      return this.state.search.errorMessage != '';
    }
  },

  methods: {
    getTodos() {
      Event.$on('checklist', (items) => {
        
        this.userSettings.todos.push(...items);
      })
    },
    viewSearch() {
      this.state.current = "search";
    },
    searchInfo() {
      if (this.state.search.input == '') {
        this.state.search.results = [];
        this.state.search.errorMessage = "Please enter something in to search";
      }
      else {
        this.state.search.results = this.info.filter(node => {
          const regex = new RegExp(this.state.search.input, 'gi');
          return node.title.match(regex)
        });
        if (!this.hasResults) {
          this.state.search.errorMessage = "Sorry nothing was found";
        }
      }
    },
    viewResults() {
      this.state.current = "results";
    },
    clearError() {
      this.state.search.errorMessage = "";
    }
  }
}
//lang="scss"
</script>






<!-- Styles  -->
  <style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    min-width: 800px;
    margin: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  p {
    margin: 5px;
  }

  h6 {
    margin-bottom: 50px;
  }

  h1 {
    margin-top: 40px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    text-align: left;
  }

  a {
    color: #42b983;
  }
  .topbar {
    
  }

  .home {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;

    overflow: scroll;
  }

  .details {
    display: flex;
    align-items: stretch;
    flex-grow: 1;

    overflow: scroll;
  }

  .search {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
  }

  .main {
    display: flex;
    align-items: stretch;
    flex-grow: 1;
  }

  .searchbar {
    display: flex;
    margin: 20px 100px 30px 100px;
  }

  .input {
    border-radius: 22px
  }

  .textArea {
    margin-top: 40px;
    margin: auto;
    padding-left: 100px;
    padding-right: 100px;
    max-width: 1000px;
    align-self: center;
    text-align: left;
   }

  .results {
    display: flex;
    align-items: stretch;
    flex-grow: 1;
    margin: 0px 100px 0px 100px;
  }

  .result-block {
    border: 1px solid rgb(219,219,219);
    
    padding-right: -1px;
    flex-grow: 1;
  }

  .doclink {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 240px;
    min-width: 240px;

    overflow: scroll;
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .goal {
    flex-grow: 1;
  }

  .sidebar {
    width: 300px;
    min-width: 260px;
    font-size: 12px;
    align-items: stretch;

    display: flex;
    border-right: 1px solid rgb(219,219,219);
  }

  .display {
    text-align: left;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 10px;

    display: flex;
    flex-direction: column;
  }

  .checklist {
    width: 240px;
    min-width: 240px;
    display: flex;
    flex-direction: column;
  }

  .logo {
    font-size:22px;
    font-weight: bold;
    margin: 0;
  }

  .title {
    
  }



  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease;
  }
  .fade-leave-to, .fade-enter {
    opacity: 0;
    transform: scale(1.0, 0.0);
    transform-origin: 0% 0%;
  }

  

  </style>
