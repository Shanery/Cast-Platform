<template>
  <div class="panel-item">
    <a class="panel-block" :class="{'is-active': isSelected}">
      <p class="item-label" @click="select">
        {{ info.name }}
      </p>
      <span class="icon is-small" v-if="hasSubviews" @click="toggle">
        <i :class="toggleIcon"></i>
      </span>
    </a>
    <view-item v-if="toggleOpen" v-for="item in info.subViews" :info="item" :selected="selected" :key="item.name"></view-item>
  </div>
</template>

<script>
  //Vue Script
  export default {
    name: "viewItem",
    props: {
      info: Object,
      selected: Object
    },
    data: function() {
      return {
        toggleOpen: true
      }
    },
    computed: {
      isSelected() {
        return this.selected.item === this.info;
      },
      toggleIcon() {
        if (this.toggleOpen) {
          return 'fa fa-chevron-down';
        } else {
          return 'fa fa-chevron-up'
        }
      },
      hasSubviews() {
        return this.info.subViews.length > 0;
      }
    },
    methods: {
      select() {
        this.selected.item = this.info;
        Event.$emit('viewSelect', this.info);
      },
      toggle() {
        this.toggleOpen = !this.toggleOpen
      }
    },
    mounted: function() {
      
    },
    components: {
      
    }
  }
</script>

<style scoped>
  p {
    padding: 8px;
  }

  .panel-item {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }

  .panel-block {
    padding: 0px 12px;
  }

  .panel-block.is-active {
    border-left: 2px solid #00d1b2;
    color: #363636;
  }

  .is-active .item-label {
    font-weight: 500;
  }

  .item-label {
    font-weight: 200;
    flex-grow: 1;
    margin-bottom: 0px;
  }
</style>