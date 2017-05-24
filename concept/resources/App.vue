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

    <!-- Main App -->
    <section class="main">
      
      <!-- Info Navigation -->
      <div class="sidebar">
        <c-sidebar :conceptNodes="info" :goals="userSettings.goals" :selected="selected"></c-sidebar>
      </div>

      <!-- Display Area -->
      <div class="display">
        <concept-display :selected="selected" :viewProperties="userSettings"></concept-display>
      </div>

      <!-- Todo List -->
      <div class="todo">
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
import axios from 'axios'

// TO-DO: Change database

// Goal Data
  var proc = {
    title: "Process",
    subOptions: [
      {
        title: "Views",
        subOptions: [
          {
            title: "Goals"
          },
          {
            title: "Alternatives"
          },
          {
            title: "Examples"
          },
          {
            title: "Practice"
          }
        ]
      },
      {
        title: "Checklist",
        subOptions: [
          {
            title: "Practice"
          },
          {
            title: "Lawry"
          },
          {
            title: "Whatever"
          },
        ]
      }
    ]
  };

  var goals = [];
  goals.push({
    title: "Learning Skills",
    subOptions: [proc]
  });

// Todo Data

export default {
  name: 'app',
  data () {
    return {
      info: [{title: 'Error Nothing loaded'}],
      selected: {item: {title: 'Error Nothing loaded'}},
      userSettings: {
        goals: [],
        todos: []
      }
    }
  },
  components: {
    cSidebar,
    conceptDisplay,
    checkList
  },
  created: function() {
    // Get Goal Data
    this.userSettings.goals = goals;

    // Get Tree Data
      var user = 'root';
      var password = 'waffl3c0pt3r';

      var config = {
        auth: {
          username: user,
          password: password
        }
      };

      //Connection Created
      axios.get('http://localhost:2480/connect/conceptmapper', config)
      .then(function(response) {
        console.log(response.data)
      });


      // Load Data For Sidebar
      axios.get('http://localhost:2480/query/conceptmapper/sql/select @this.toJSON("fetchPlan:*:-1") from field', config)
      .then(function(response) {
        
        var dat = []
        
        dat.push(JSON.parse(response.data.result[0].this))
        this.info = dat

        console.log(JSON.parse(response.data.result[0].this))

        this.selected.item = dat[0].out_Subfield[0].in
      }.bind(this));

      this.getTodos();
  },
  methods: {
    getTodos() {
      Event.$on('checklist', (items) => {
        
        this.userSettings.todos.push(...items);
      })
    }
  }
}
//lang="scss"
</script>







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

.sidebar {
  width: 300px;
  min-width: 260px;
  font-size: 12px;
  align-items: stretch;

  display: flex;
  border-right: 1px solid rgb(219,219,219);
  margin-right: 3px;
}

.display {
  text-align: left;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 10px;
}

.todo {
  width: 240px;
  min-width: 240px;
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
