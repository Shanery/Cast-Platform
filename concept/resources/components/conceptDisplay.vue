<!-- Component that delegates data off display card components -->

<template>
  <div class="disp">
    <h1>{{selected.item.title}}</h1>
    

    <!-- Display card for any settings which are requested and checked -->
    <div class="horizontalBox"
    v-if="selected.item.displayType == 'convLayer'">
      <!-- Main Layer -->
      <conv-layer :layer="main" :useFilter="true" :userSettings="userSettings"></conv-layer>
    </div>
    <div v-else>
      <div v-for="item in displayableContent"> 
        {{ item.value }}
      </div>
      <div v-for="item in displayableCards"> 
        <display-card :cardTitle="item.key.toUpperCase()" :cardInfo="item.value" :hasFooter="true"></display-card>
      </div>
    </div>

  </div>

</template>

<script>
import displayCard from "./displayCard.vue"
import convLayer from "./convLayer.vue"

import {isEmpty} from "../common-functions.js"

export default {
  name: "conceptDisplay",
  props: {
    selected: Object,
    viewProperties: Object
  },
  data: function() {
    return {
      userSettings: {
        descriptions: {
          display: true,
          number: 1,
          depth: 3,
          displayType: "textCard"
        },
        desiredProperties: {
          display: true,
          number: 3, // Fold the rest... Future task
          depth: 1,
          displayType: "textCard"
        },
      }
    }
  },
  computed: {
    main() {
      return this.selected.item.layers[0];
    },
    displayableContent() {
      var keys = Object.keys(this.selected.item);
      
      let views = {};
      var i;

      for (i in keys) {
        if (typeof(this.selected.item[keys[i]]) === 'string') {
          views[keys[i]] =  {
            key: keys[i],
            value: this.selected.item[keys[i]]
          }
        }
      }

      return views;
    },
    displayableCards() {
      var keys = Object.keys(this.selected.item);
      
      let views = {};
      var i;

      for (i in keys) {
        if (typeof(this.selected.item[keys[i]]) === 'object') {
          views[keys[i]] =  {
            key: keys[i],
            value: this.selected.item[keys[i]]
          }
        }
      }

      return views;
    }
  },
  methods: {
    hasProp: function(property) {
      if (this.selected.item.hasOwnProperty(property)) {
        if (this.selected.item[property].length > 0) {
          return true;
        }  
      }
      return false;
    },

    // Recursive Search for Views
    getViews: function(goal, isView) {
      if (goal.hasOwnProperty('checked') && isView) {
        this.requestedViews.push(goal);
      }
      if (goal.hasOwnProperty('subOptions') && goal.subOptions.length > 0) {
        
        if (goal.title.toLowerCase() == "views") {
          isView = true;
        } else {
          isView = false;
        }
        var option;
        for (option in goal.subOptions) {
          this.getViews(goal.subOptions[option], isView)
        }
      }
    }
  },
  mounted: function() {
  },
  components: {
    displayCard,
    convLayer
  }
}

</script>

<style scoped>
  .horizontalBox {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-grow: 1;
  }

  h1 {
    font-size: 21px;
    font-weight: 400;
  }

  .disp {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    flex-wrap: nowrap;

  }
</style>

