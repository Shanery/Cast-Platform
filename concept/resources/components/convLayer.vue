<template>
  <!-- Insert HTML -->
  <div class="layer">
    <div class="card">
      <!-- Layer Head -->
      <header class="card-header">
        <h3 class="card-header-title" v-if="layer != undefined">
          {{ layer.title }}
          {{ layer.type }}
        </h3>
        <h6 v-if="layer != undefined">
          {{ layer["@class"] }}
        </h6>
        <a class="card-header-icon" @click="isToggled = !isToggled">
          <span class="icon">
            <i class="fa fa-angle-down"></i>
          </span>
        </a>
      </header>

      <!-- Layer Content -->
      <div class="card-content">
        <div class="content" v-for="card in displayable">
          <text-card :card="card" :selectedLayer="selectedLayer" :top="true"></text-card>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item">+Representation</a>
        <a class="card-footer-item">+Transform</a>
        <a class="card-footer-item">Delete</a>
      </footer>
    </div>
    <conv-layer :userSettings="userSettings"  :layer="selectedLayer.item[0]" :useFilter="false" 
    v-if="hasContent && isArray"></conv-layer>
    <conv-layer :userSettings="userSettings" :layer="selectedLayer.item" :useFilter="false"
    v-else-if="hasContent && !isArray"></conv-layer>
  </div>

</template>

<script>
import textCard from "./textCard.vue"
import {isEdge, isEmpty} from "../common-functions.js"
  //Vue Script
  export default {
    name: "convLayer",
    props: {
      layer: Object,
      userSettings: Object,
      useFilter: Boolean
    },
    data: function() {
      return {
        isToggled: true,
        selectedLayer: {
          main: {},
          item: {},
          end: {}
        }
      }
    },
    computed: {
      //Displayable if the property exists, property display is true, and the property isn't an edge.
      displayable() {
        if (this.layer == undefined) {
          return {};
        }

        var keys = Object.keys(this.layer);
        let views = {};

        // Check Whether this is computed or real layer
        if (this.useFilter) {
          for (var i in keys) {
            if (!isEdge(keys[i])) {
              if (typeof(this.layer[keys[i]]) === 'object' && this.userSettings.hasOwnProperty(keys[i])) {
                if (this.userSettings[keys[i]].display) {
                  var rerep_in = new RegExp('in_rerepresentation'); 
                  if (!keys[i].match(rerep_in)) {
                    
                    // Make sure that there's a value...
                    if (this.layer[keys[i]] != null) {
                      var rerep = new RegExp('rerepresentation');

                      var key = keys[i];
                      
                      if (keys[i].match(rerep)) {
                        key = 'Other Representations'
                      } 

                      views[key] =  {
                        key: key,
                        depth: this.userSettings[keys[i]].depth,
                        number: this.userSettings[keys[i]].number,
                        value: this.layer[keys[i]]
                      }
                    } 
                  }
                } 
              }
            }
          }
        } else {
          for (var i in keys) {
            if (typeof(this.layer[keys[i]]) === 'object' && !this.userSettings.hasOwnProperty(keys[i])) {
              var rerep_in = new RegExp('in_rerepresentation'); 
              if (!keys[i].match(rerep_in)) {
                
                // Make sure that there's a value...
                if (this.layer[keys[i]] != null) {
                  var rerep = new RegExp('rerepresentation');

                  var key = keys[i];
                  
                  if (keys[i].match(rerep)) {
                    key = 'Other Representations'
                  } 

                  views[key] =  {
                    key: key,
                    depth: 2,
                    number: this.layer[keys[i]].length,
                    value: this.layer[keys[i]]
                  }
                } 
              }
            }
          }
        }
        return views
      },
      hasContent() {
        return !isEmpty(this.selectedLayer.item);
      },
      isArray() {
        return Array.isArray(this.selectedLayer.item);
      }
    },
    created() {
      this.selectedLayer = {
        main: {},
        item: {},
        end: {}
      }
    },
    methods: {
      
    },
    components: {
      textCard
    }
  }

  /*
    layer Data Structure
    {
      layerType: "GOAL",
      title: String,
      description: Object,
      otherReps: [Object] (edges... The edge document describes the change.),
      
      *Optional*
      Desired Properties of Product...
       -> Output properties & Tests

    }
    REP
    {
      title: String (This describes re-representation goal),
      description: {Object...
        text: String,
        graph: Future Graph Structure}
      otherReps: [String],
      
      *Optional*
      Transform type: eg. Conversion into action

    }
      
    Other Data Types too...

  */
  /*
    Questions...
    
  */
  

</script>

<style scoped>
  .layer {
    display: flex;
    flex-direction: row;
  }

  .card {
    max-width: 350px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-right: 5px;
  }
  
  .card-header {
    height: 48px;
    min-height: 48px;
  }

  .card-header h6 {
    align-self: center;
  }

  .card-header-title {
    
  }

  .card-content {
    flex-grow: 1;
    padding: 12px 0px 12px 0px;
    overflow-y: scroll;
  }
  .card-content h1 {
    font-size: 1.5em;
  }



  .content {
    padding: 0px;
  }

  .content p {
    padding-left: 12px;
    padding-right: 12px;
    margin-bottom: 12px;
  }

  .card-footer {
    height: 48px;
    min-height: 48px;
  }

</style>

