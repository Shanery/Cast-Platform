<template>
  <li class="mainNode">
    <!-- Individual Bar -->
    <div class="option panel-block" :class="{'item': !hasSubOption}" >
      
      <i v-if="hasSubOption" v-on:click="toggleFold" :class="{'icono-caretRight': !toggled, 'icono-caretDown': toggled}"></i>

      <div class="t-title">{{ option.title }}</div>

      <input class="check" v-if="!hasSubOption" type="checkbox" v-model="option.isChecked">
    </div>
    <!-- Repeat Tasks -->
    <div class="otherOption" v-show="toggled">
      <list-node v-for="option in option.subOptions" :key="option.title" :option="option"></list-node>
    </div>
  </li>


</template>

<script>

export default {
  name: "listNode",
  props: {
    option: Object
    // Expect goal
  },
  data: function() {
    return {
      toggled: true
    }
  },
  computed: {
    hasSubOption: function() {
      if (this.option.hasOwnProperty('subOptions')) {
        if (this.option.subOptions.length > 0) {
          return true;
        }
      }
      return false;
    }
  },
  created: function() {
    
    // Create Checked State Data.
    if (!this.hasSubOption) {
      this.$set(this.option, 'isChecked', true);
    }
  },
  mounted: function() {
    if (this.option.title.toLowerCase() == 'checklist') {
      Event.$emit('checklist', this.option.subOptions)
    }
  },
  methods: {
    toggleFold: function() {
      this.toggled = !this.toggled;
    }
  }
}

</script>

<style scoped>
  .mainNode {
    text-align: left;
    font-size: 1rem;
  }
  
  .option {
    display: flex;
    align-items: center;
    padding: 0px;
  }

  .item {
    padding-left: 5px;
  }

  .t-title {
    flex-grow: 1;
    padding-left: 5px;
    .font-size: 1rem;
  }

  .panel-block:first-child {
    border-top: 0px;
  }
  .panel-block {
    border-left: 0px;
    margin: 0px;
  }

  .check {
    margin-right: 3px;
  }

  .otherOption {
    padding-left: 10px;
  }

  .icono-caretRight {
    transform: scale(0.6,0.6);
  }
  .icono-caretDown {
    transform: rotate(90deg) scale(0.6,0.6);
  }

</style>