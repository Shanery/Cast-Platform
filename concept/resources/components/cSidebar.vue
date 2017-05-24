<template>
  <nav class="panel">
    <p class="panel-heading is-left">
      Views
    </p>

    <!-- TODO: How to remove repeated code??? -->
    <!-- Search Bar -->
    <div class="panel-block">
      <p class="control has-icons-left">
        <input v-if="currentTab == 'Views'" class="input is-small" type="text" placeholder="Search" v-model="search.views">
        <input v-else-if="currentTab == 'Guides'" class="input is-small" type="text" placeholder="Search" v-model="search.guides">
         <input v-else-if="currentTab == 'Goals'" class="input is-small" type="text" placeholder="Search" v-model="search.goals">
        <input v-if="currentTab == 'Options'" class="input is-small" type="text" placeholder="Search" v-model="search.options">
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
      </p>
    </div>

    <!-- Panel Option Tabs -->
    <p class="panel-tabs">
      <a href="#" 
      v-for="tab in tabs" :key="tab.title"
      :class="{'is-active': currentTab == tab.title}" 
      @click="changeTab(tab)">
        {{tab.title}}

        <span class="icon is-small is-left">
          <i :class="tab.icon"></i>
        </span>
      </a>
    </p>

    <!-- Panel Content Items -->
    <div class="content-items">
      <ul v-show="currentTab == 'Views'">
        <c-node v-for="node in matches" :key="node.title" :node="node" :selected="selected"></c-node>
      </ul>
      <ul v-show="currentTab == 'Goals'">
        <list-node v-for="option in goals" :key="option.title" :option="option" :selected="selected"></list-node>
      </ul>
    </div>
   
   <!-- Footer -->
    <footer class="panel-block is-option">
      <button class="button is-primary is-outlined is-fullwidth">
        Reset all filters
      </button>
    </footer>
  </nav>

</template>

<script>
import cNode from "./cNode"
import listNode from "./listNode"

export default {
  name: "cSidebar",
  components: { cNode, listNode },
  props: {
    conceptNodes: Array,
    goals: Array,
    selected: Object
  },
  data: function() {
    return {
      currentTab: "Views",
      tabs: [
        {
          title: "Views",
          icon: "fa fa-tv"
        },
        {
          title: "Guides",
          icon: "fa fa-sitemap"
        },
        {
          title: "Goals",
          icon: "fa fa-bullseye"
        },
        {
          title: "Options",
          icon: "fa fa-gear"
        }
      ],
      search: {
        views: '',
        guides: '',
        goals: '',
        options: ''
      }
    }
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab.title;
    }
  },
  computed: {
    matches() {
      if (this.search.views == '') {
        return [];
      }
      return this.conceptNodes.filter(node => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(this.search.views, 'gi');
        return node.title.match(regex)
      });
    }
  }
}

</script>

<style scoped>
  .panel {
    display: flex;
    flex-direction: column;
    margin-right: 3px;
  }

  ul {
    width: 100%;
  }

  i {
    padding: 11px 7px 11px 7px;
  }

  .content-items {
    flex-grow: 1;
    overflow: auto;
  }

  .is-option {
    border-top: 1px solid rgb(219, 219, 219);
  }

</style>