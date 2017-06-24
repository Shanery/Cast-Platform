<template>
  <nav class="panel sidebar">
    <!-- Header -->
    <p class="panel-heading">
      Concepts
    </p>
    <!-- Search Bar -->
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="Search">
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
      </p>
    </div>

    <!-- Tabs -->
    <p class="panel-tabs">
      <a href="#" 
      v-for="tab in info.tabs" :key="tab.title"
      :class="{'is-active': info.currentTab == tab.title}" 
      @click="changeTab(tab)">
        {{tab.title}}

        <span class="icon is-small is-left">
          <i :class="tab.icon"></i>
        </span>
      </a>
    </p>
    <!-- View Content -->
    <div class="panel-group" v-show="info.currentTab == 'Views'">
      <view-item v-for="item in info.views.listItems" :key="item.name" :info="item" :selected="info.views.selected"></view-item>
    </div>
    <div class="panel-group" v-show="info.currentTab == 'Guides'">
      
    </div>
    <div class="panel-group" v-show="info.currentTab == 'Goals'">
      
    </div>

    <!-- OPTIONS -->
    <div class="panel-group" v-show="info.currentTab == 'Options'">
      
      <option-view :displayInfo="displayInfo" :hasDisplayInfo="hasDisplayInfo"></option-view>

    </div>


    <!-- Footer -->
    <div class="panel-block">
      <button class="button is-primary is-outlined is-fullwidth">
        Reset all filters
      </button>
    </div>
  </nav>
</template>

<script>
import viewItem from "./viewItem.vue"
import optionView from "./optionView.vue"
  //Vue Script
  export default {
    name: "",
    props: {
      info: Object
    },
    data: function() {
      return {

      }
    },
    computed: {
      displayInfo() {
        let selected = UserData.sideData.views.selected;

        if (selected.item.hasOwnProperty('displayInfo')) {
          return selected.item.displayInfo;
        } else {
          return {}
        }
      },
      hasDisplayInfo() {
        return this.displayInfo.hasOwnProperty('type');
      }
    },
    methods: {
      changeTab(tab) {
        this.info.currentTab = tab.title;
      }
    },
    mounted: function() {
      Event.$on('changeTab', (tab) => {
        this.info.views.selected.item = tab.tabView
      })
    },
    components: {
      viewItem, optionView
    }
  }
</script>

<style>
  .sidebar {
    flex-grow: 0;
    width: 320px;
    min-width: 320px;
  }

  .panel {
    display: flex;
    flex-direction: column;
  }

  .panel:not(:last-child) {
    margin-bottom: 5px;
  }

  .panel-group {
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    border-right: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    border-left: 1px solid #dbdbdb;

    overflow-y: auto;
  }
  .panel-group .panel-block:first-child {
      border-top: 0px;
  }

  .panel-group .panel-block {
    border-right: 0px;
    border-left: 0px;
  }

</style>