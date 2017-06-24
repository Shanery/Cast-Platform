<template>
  <li class="tab-box" :class="tabSelected">
    <a>
      <p @click="changeTab">{{ tab.tabView.name }}</p>
            <button class="button is-light" @click="deleteTab(); ">
              <span class="icon is-small">
                <i class="fa fa-times"></i>
              </span>
            </button>
    </a>
    
  </li>
</template>

<script>
  //Vue Script
  export default {
    name: "",
    props: {
      tab: Object,
      display: Object
    },
    data: function() {
      return {
      }
    },
    computed: {
      tabSelected() {
        if (this.tab == this.display.currentTab) {
          return "is-active";
        } else {
          return "";
        }
      }
    },
    methods: {
      changeTab() {
        this.display.currentTab = this.tab;
        Event.$emit('changeTab', this.display.currentTab);
      },
      deleteTab() {
        let currentTab = this.display.currentTab;
        let tabs = this.display.tabs;
        let index = tabs.indexOf(this.tab);

        // TODO: Fix this. Update Doesn't happen before the removal/splice
        

        this.splice(tabs, index);

        // After Deleted Change to Next Available
        //
        if (tabs.length == 0) {
          console.log("case 1")
          this.display.currentTab = {tabView: {name:"none"}};
        } else if (tabs.length == index) {
          console.log("case 2")
          this.display.currentTab = tabs[index - 1];
        }  else {
          console.log("case 3")
          this.display.currentTab = tabs[index];
        }
      },
      splice(tabs, index) {
        if (index > -1) {
          tabs.splice(index, 1);
        }
      }
    },
    mounted: function() {
      
    },
    components: {
      
    }
  }
</script>

<style scoped>
  .tabs a {
    padding: 0.5em 0.5em;
  }

  .tab-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
  }

  .button {
    padding: 5px;
    height: inherit;
    border-radius: 10px;
    margin-left: 8px;
  }

  .button.is-light {
    color: rgb(210,210,210);
  }

  .icon {
    margin-top: -7px;
    margin-bottom: -7px;
  }

</style>