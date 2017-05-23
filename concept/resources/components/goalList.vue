<template>
  <div>
    <div class="titleBar">
      <h1>Goal List</h1>
      <button class="addGoal">+</button>
    </div>
    <!-- List of Goals. -->
    
    <list-node v-for="goal in userGoals" :option="goal" :key="goal.title"></list-node>
  

  </div>

</template>

<script>
import listNode from './listNode.vue'

export default {
  name: "goalList",
  props: {
    userGoals: Array
    // Expect goal
  },
  data: function() {
    return {
      selected: []
    }
  },
  created: function() {
    // Figure out way of Setting selected items...
    // I think each item having its own selected setting is good. 
  },
  methods: {
    // Toggle Goal
    // Delete Goal
  },
  components: {
    listNode
  }
}

</script>

<style>
  h1 {
    font-size: 12px;
    float: left;
    flex-grow: 1;
  }

  .addGoal {
    float: right;
  }

  .titleBar {
    display: flex;
    text-align: left;
    align-items: center;
    background-color: rgb(220,220,220);
  }
</style>