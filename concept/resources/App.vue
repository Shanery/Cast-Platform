<template>
  <div id="app">

    <!-- header -->
    <section>
      <nav class="nav has-shadow">
        <div class="nav-left">
          <a class="nav-item">
            <h1 class="logo">Cast </h1>
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
          <a class="nav-item">
            Home
          </a>
          <a class="nav-item">
            Documentation
          </a>
          <a class="nav-item">
            Blog
          </a>

        </div>
      </nav>
    </section>
    
    <!-- Search Page -->
    <section class="search"
    v-if="state.current === 'search'">
      <!-- Search Bar -->
      <div class="searchbar control has-icons-left">
        
        <input class="input is-medium" type="text" placeholder="Search" 
        v-model="state.search.input" 
        @keydown.enter="search">
        
        <span class="icon is-medium is-left">
          <i class="fa fa-search"></i>
        </span>
      </div>
      
      <div class="results" v-if="state.search.isResult">
        <!-- Content Results -->
        <div class="column"> 
          <p>
            Contents
          </p>

          <div class="result-block">
            <c-node v-for="result in state.search.results"
          :node="result" :selected="selected" :key="result.title"> </c-node>
          </div>
        </div>

        <div class="column">

          <p>Goals</p>
          <div class="result-block">
            
          </div>

          <button class="button is-primary is-outlined" @click="viewResults">
            Explore</button>

        </div>
      </div>
    </section>

    <!-- Main App -->
    <section class="main"
    v-else>
      
      <!-- Info Navigation -->
      <div class="sidebar">
        <c-sidebar :conceptNodes="info" :goals="userSettings.goals" :selected="selected"></c-sidebar>
      </div>

      <!-- Display Area -->
      <div class="display">
        <concept-display :selected="selected" :viewProperties="userSettings"></concept-display>
      </div>

      <!-- Todo List -->
      <div class="checklist">
        <check-list :checklist="userSettings.todos">
          
        </check-list>
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

// TO-DO: Change database

export default {
  name: 'app',
  data () {
    return {
      // Data to view
      info: [{title: 'Error Nothing loaded'}],
      selected: {item: {title: 'Error Nothing loaded'}},
      // User Settings
      userSettings: {
        goals: [],
        todos: []
      },
      // UI State Data
      state: {
        current: "search",
        search: {
          input: "",
          isResult: false,
          results: []
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

    // Get Tree Data
      

      //Connection Created
      HTTP.get('connect/conceptmapper')
      .then(function(response) {
        console.log(response.data);
      });


      // Load Data For Sidebar
      HTTP.get('query/conceptmapper/sql/select @this.toJSON("fetchPlan:*:-1") from field')
      .then(function(response) {
        
        var data = [];
        
        data.push(JSON.parse(response.data.result[0].this))
        this.info = data;

        console.log(JSON.parse(response.data.result[0].this));
      }.bind(this));

      this.getTodos();
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
    search() {
      if (this.search.views == '') {
        this.state.search.results = [];
        this.state.search.isResult = false;
      }
      else {
        this.state.search.results = this.info.filter(node => {
          const regex = new RegExp(this.state.search.input, 'gi');
          return node.title.match(regex)
        });

        this.state.search.isResult = true;
      }
    },
    viewResults() {
      this.state.current = "results"
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
  }

  h1, h2 {
    font-weight: normal;
    margin: 10px;
  }

  p {
    margin: 5px;
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

  .main {
    display: flex;
    align-items: stretch;
    flex-grow: 1;
  }

  .search {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
  }

  .searchbar {
    display: flex;
    margin: 30px 100px 30px 100px;
  }

  .input {
    border-radius: 30px
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
    margin: ;
  }

  .display {
    text-align: left;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 10px;
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
    flex-grow: 1;
  }
  </style>
