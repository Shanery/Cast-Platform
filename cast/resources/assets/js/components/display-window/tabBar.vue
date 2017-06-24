<template>
  <div class="tabs is-boxed">
      <ul>
          <display-tab v-for="tab in display.tabs" :key="tab.name" :tab="tab" :display="display"></display-tab>
          <li><a @click="newTab">+</a></li>
      </ul>
  </div>
</template>

<script>
import displayTab from './displayTab.vue'

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
      newTab() {
        var newTab = {
          tabView: {name: "New Tab",
                    displayInfo: {}}
        };
        this.display.tabs.push(newTab);
        this.display.currentTab = newTab;
        Event.$emit('changeTab', newTab);
      }
    },
    mounted: function() {
      
    },
    components: {
      displayTab
    }
  }
</script>

<style>
  .tabs {
    align-items: flex-start;
    flex-shrink: 0;
    margin: 5px 5px 0px 5px;
  }

  .tabs.is-boxed:not(:last-child) {
    margin-bottom: 0px; 
  }
</style>