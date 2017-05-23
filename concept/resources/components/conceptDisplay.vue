<!-- Component that delegates data off display card components -->

<template>
  <div class="display">
    <h1>{{selected.item.title}}</h1>
    

    <!-- Display card for any settings which are requested and checked -->
    <display-card v-for="view in requestedViews" v-if="view.checked && selected.item.hasOwnProperty(view.title.toLowerCase())" :cardInfo="selected.item[view.title.toLowerCase()]" :cardTitle="view.title" :key="view.title"></display-card>

  </div>

</template>

<script>
import displayCard from "./displayCard.vue"

export default {
  name: "conceptDisplay",
  props: {
    selected: Object,
    viewProperties: Object
  },
  data: function() {
    return {
      requestedViews: []
    }
  },
  computed: {
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
    this.requestedViews = [];

    // Load views from viewProperties
    var goal;
    for (goal in this.viewProperties) {
      this.getViews(this.viewProperties[goal], false);
    }
  },
  components: {
    displayCard
  }
}

</script>

<style>
  h1 {
    font-size: 16px;
  }

  .display {
    display: flex;
    flex-direction: column;
  }
</style>

