<!-- Component that delegates data off display card components -->

<template>
  <div class="display">
    <h1>{{selected.item.title}}</h1>
    

    <!-- Display card for any settings which are requested and checked -->
    <div v-for="item in displayableContent"> 
      {{ item.value }}
    </div>
    <div v-for="item in displayableCards"> 
      <display-card :cardTitle="item.key.toUpperCase()" :cardInfo="item.value" :hasFooter="true"></display-card>
    </div>

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

<style scoped>
  h1 {
    font-size: 21px;
    font-weight: 400;
  }

  .display {
    display: flex;
    flex-direction: column;
  }
</style>

