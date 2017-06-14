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
    


    <!-- Home Page -->
    <transition name="fade">
      <section
      v-if="state.current === 'home'">
        <div>
          <h1 class="title is-1">
            Welcome to Cast
          </h1>

          <h6 class="title is-6">
            Knowledge simplified, functional, fluid.
          </h6>
        </div>
      </section>
    </transition>

    <!-- Search Bar -->
    <section class="searchbar control has-icons-left" 
    v-if="this.state.current === 'search' || this.state.current === 'home'"
      @keydown="clearError">
      <input class="input is-medium" type="text" placeholder="Search" 
      v-model="state.search.input" 
      @keyup.enter="searchInfo"
      @click="state.current = 'search';clearError()">
      
      <span class="icon is-medium is-left">
        <i class="fa fa-search"></i>
      </span>
    </section>
    <!-- Error Message -->
    <div class="error"
    v-if="hasError && state.current == 'search'">
      <span class="tag is-danger">
        {{state.search.errorMessage}}
      </span>
    </div>

    <!-- Guide... -->
    <transition name="fade">
      <div v-show="state.current === 'home'">
              
        <div class="intro content">
          <h1>What is Cast?</h1>
          
          <p>
            <strong>Cast is a way of creating and representing knowledge in concepts.</strong> We can think about knowledge as facts and concepts as a way if organizing and making use of those facts. Knowledge by itself doesn't do much. When we are thinking and solving problems, we aren't only recalling facts, we are using this knowledge for a particular purpose or function. <strong>Concepts are a way of giving knowledge functionality.</strong> The result is information that:
          </p>

          <ul>
            <li>Explains its' significance and uses</li>
            <li>Can be adapted to solve specific user goals such as learning a skill or designing a piece of software</li>
            <li>Adapts the presentation of information to a user's preferences</li>
          </ul>

          <p>
            Cast does this by allowing you to use and create structures for information. For example:
          </p>

          <ol>
            <li>The Technical Rate of Substitution (TRS): Imagine that you you are a company or factory. The TRS describes the amount of input A you swap for input B in order to keep the same amount of output. For example, if you had 2 automatic juicers and 6 workers squeezing juice by hand to create 10L of juice, the TRS would mean the number of workers you would replace for one automatic juicer and still produce 10L of juice.</li>
            <li>Expected Value: The average value you would expect to get if you repeat an experiment in the long run. For example, the expected value of rolling a six-sided dice is 3.5. If you rolled a dice many many times, in the long run, the average value of the dice roll would approach 3.5.</li>
          </ol>

          <p>
            Without structure, to the regular person, these two pieces of information might seem completely unrelated. However they are related in a more subtle way. They are related in that they both provide a way of figuring out an optimal choice.
            The Technical Rate of Substitution can tell you the cheapest way to produce a certain amount of output while The Expected Value can tell you the best way to handle risk, like making bets in blackjack.
          </p>

          <p>
            Having this structured understanding of information provides two main benefits. Firstly, structure helps you categorize and learn the information you are taking in. For example, trying to remember the Secondly, once you learn how to use the structure, you can use your past experience to help you understand and solve problems with new information. Mathematics is a perfect example of how learning one structure (algebra) can help you solve problems across a broad range of areas. You start of by defining relationships (different equations), then you figure out some of the values, and then you can calculate the unknown values that you are interested in!
            There are many more very useful structures (which we will call templates) to learn.
          </p>

          <h1>Want to learn more?</h1>
          
          <p>
            Go to the documentation page! Tutorials coming soon.
          </p>

        </div>
      </div>
    </transition>

    <!-- Search Page -->
    <section class="search"
    v-if="hasResults"> 
      <!-- Content Results -->
        <div class="results">
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
    v-if="state.current == 'results'">
      
      <!-- Info Navigation -->
      <div class="sidebar">
        <c-sidebar :conceptNodes="info" :goals="userSettings.goals" :selected="selected"></c-sidebar>
      </div>

      <!-- Display Area -->
      <div class="display">
        <concept-display 
        :selected="selected" 
        :viewProperties="userSettings"></concept-display>
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
        current: "home",
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

  .intro {
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
