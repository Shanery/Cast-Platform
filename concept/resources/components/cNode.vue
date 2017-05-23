<template>
  <li class="cnode">
    <!-- Individual Bar -->
    <div class="bar panel-block" v-bind:class="isSelected">
      
      <div v-on:click="toggleFold">
        <div :class="{'icono-caretRight': !toggled, 'icono-caretDown': toggled}"></div>
      </div>

      <h1 class="t-title title is-marginless" v-on:click="selectSection(node)">{{ node.title }}</h1>

      <h2 class="subtitle is-marginless"> {{ node.type }} </h2>
      
    </div>
    <!-- Repeat Goal -->
    <ul class="cnode" v-show="toggled">
      <c-node v-for="node in node.out_Subfield" :key="node.title" :node="node.in" :selected="selected"></c-node>
    </ul>
  </li>
</template>

<script>

export default {
  name: 'cNode',
  props: {
    node: Object,
    selected: Object
  },
  computed: {
    // TODO Fix this thing to IDs
    isSelected: function() {
      return {
        selectedItem: this.selected.item.title == this.node.title
      }
    }
  },
  data: function() {
    return {
      toggled: false 
    }
  },
  methods: {
    toggleFold: function() {
      this.toggled = !this.toggled
    },
    selectSection: function(node) {
      this.selected.item = node
    }
  }
}

</script>

<style scoped>
  .cnode {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    padding-left: 5px;
  }

  .bar {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
  }

  .panel-block:first-child {
    border-top: 0px;
  }
  .panel-block {
    border-left: 0px;
  }
  
  .title {
    flex-grow: 1;
    padding-left: 5px;
    font-size: 1rem;
    text-align: left;
    font-weight: 500;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .selectedItem {
    color: blue;
  }

  .icono-caretRight {
    transform: scale(0.6,0.6);
    margin: 0px;
  }
  .icono-caretDown {
    transform: rotate(90deg) scale(0.6,0.6);
    margin: 0px;
  }
</style>