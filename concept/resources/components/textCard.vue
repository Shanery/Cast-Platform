<template>
  <div class="card">
    <!-- Header -->
    <header class="card-header" v-if="card.key != 'in'">
      <h3 class="card-header-title" @click="selectedLayer.item = main.items">
        {{ title }}
        {{ card.title}}
      </h3>
      <a class="button is-small is-inverted" @click="createNewElement = true">+ Item</a>
      <a class="button is-small is-inverted" v-if="!isEdge(card.key)">+ Field</a>
      <a class="card-header-icon" @click="isToggled = !isToggled">
        <span class="icon">
          <i class="fa fa-angle-up" v-if="isToggled"></i>
          <i class="fa fa-angle-down" v-else></i>
        </span>
      </a>
    </header>
    <!-- Body -->
    <div class="card-content" v-show="isToggled">
      <!-- Headings -->
      <div class="content" v-for="info in main.items">
        <span class="tag sub-header is-info" v-if="info.item.hasOwnProperty('type') && (info.item.type != '') && (info.item.type != null)"
        @click="selectedLayer.item = info.item">
          {{info.item.type}}
        </span>
        <span class="tag sub-header is-info" v-else-if="info.item.hasOwnProperty('title') && (info.item.title != '') && (info.item.title != null)" @click="selectedLayer.item = info.item">
          {{ info.item.title }}
        </span>
        <!-- Text -->
        <div class="textbox" v-if="typeof(info.item) === 'string'"> 
          <p>{{ info.item }}</p>
        </div>
        <div class="textbox" v-else-if="typeof(info.item) === 'object'" v-for="text in info.item.text">
          <p>{{ text }}</p>
        </div>

        <!-- Other Info -->
        <text-card :selectedLayer="selectedLayer" v-for="view in info.subViews" v-if="card.depth > 0" :card="view" :key="view.key"></text-card>
        <!-- New Field -->
        <new-element v-if="createNewElement" @added-card="addCard" @exit="createNewElement = false"></new-element>
      </div>
      <!-- Display Extra Info -->
      <div class="content" v-if="main.extras.length > 0">
        <div class="extras" v-if="extrasToggled" @click="extrasToggled = !extrasToggled">
          <p>Less</p>
          <span class="icon is-small">
            <i class="fa fa-angle-up"></i>
          </span>
        </div>
        <div class="extras" @click="extrasToggled = !extrasToggled" v-else>
          <p>More</p>
          <span class="icon is-small" >
            <i class="fa fa-angle-down"></i>
          </span>
        </div>
        <div class="content" v-for="info in main.extras" v-show="extrasToggled">
          <span class="tag sub-header is-info" v-if="info.item.hasOwnProperty('type') && (info.item.type != '')&& (info.item.type != null) ">{{info.item.type}}">{{info.item.type}}</span>
          <p v-for="text in info.item.text">
            {{ text }}
          </p>
          <text-card :selectedLayer="selectedLayer" v-for="view in info.subViews" v-if="card.depth > 0" :card="view" :key="view.key"></text-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import newElement from "./newElement.vue"
import {isEdge, toTitle} from "../common-functions.js"

  //Vue Script
  export default {
    name: "textCard",
    props: {
      card: Object,
      top: {type: Boolean,
        default: false},
      selectedLayer: Object
    },
    data: function() {
      return {
        isToggled: true,
        extrasToggled: false,
        createNewElement: false
      }
    },
    computed: {
      // Go through all the values and create cards from the data.
      title () {
        if (this.card.key == undefined) {
          return "";
        }
        return toTitle(this.card.key);
      },
      main () {
        if (this.card.value == undefined) {
          return {};
        }
        var value = this.card.value;
        var items = [];
        var extras = [];

        for (var i = 0; i < value.length; i++) {
          
          var info = value[i];
          var keys = Object.keys(info);
          var views = {};

          // Create card for any data that isn't text
          // You need, key, depth, value and number.
          for (var j in keys) {
            if (typeof(info[keys[j]]) === 'object' && keys[j] != "text") {
                // Reformat Sub Views Re-representations
                var rerep_in = new RegExp('in_rerepresentation'); 

                // Ignore in_representations
                if (!keys[j].match(rerep_in)) {
                  var rerep = new RegExp('rerepresentation');
                  var key = keys[j];
                  var val = info[keys[j]];
                  var out = new RegExp('out_')
                  // Make sure that there's a value...
                  if (info[keys[j]] != null) {
                    // Filter Representations
                    if (keys[j].toLowerCase().match(rerep)) {
                      key = 'Other Representations'
                    } 
                    // Filter Outputs
                    else if (keys[j].toLowerCase().match(out)) {
                      console.log(keys[j]);
                      key = key.replace('out_', "");
                      key = key.replace('Out_', "");
                      key = key.replace(/\b\w/g, function(l){ return l.toUpperCase() });
                      val = [];

                      for (var x in info[keys[j]]) {
                        val.push(info[keys[j]][x]);
                      }
                    }


                    views[key] =  {
                      key: key,
                      depth: this.card.depth - 1,
                      value: this.arrayCast(val)
                    }
                    if (Array.isArray(info[keys[j]])) {
                      views[key].number = info[keys[j]].length;
                    } else {
                      views[key].number = 1;
                    }
                  }
                  
                }
              }
            } 
          // Add either to cards to view or to extras
          if (i < this.card.number) {
            items.push({
              item: info,
              subViews: views
            });
          } else {
            extras.push({
              item: info,
              subViews: views
            });
          }
          
        }
        return {"items": items, "extras": extras};
      }
    },
    methods: {
      addCard(item) {
        this.createNewElement = false;

        var text = [];

        for (var i in item.text) {
          text.push(item.text[i].text)
        };

        item['text'] = text;

        this.card.value.push(item);
      },
      arrayCast(item) {
        if (Array.isArray(item)) {
          return item;
        } else {
          return [item];
        }
      },
      isEdge(key) {
        return isEdge(key);
      }
    },
    created: function() {
      if (this.card.depth <= 0 && this.top == false) {
        this.isToggled = false;
      } 
    },
    components: {
      newElement
    }
  }
</script>

<style scoped>
  .card-header {
    height: 36px;
    min-height: 36px;
    background-color: rgb(240,240,240);
    align-items: center;
  }

  .card-header h3 {
    font-size: 1em;
    font-weight: 500;
    margin: 0px;
  }

  .card-content {
    padding: 10px 0px 10px 0px;
  }

  .card-content h1 {
    font-size: 1.5em;
  }
  .content {
    font-size: 12px;
    align-items: stretch;
  }
  .content:not(:last-child) {
    margin-bottom: 5px;
  }
  
  .textbox {
    display: flex;
    flex-direction: row;
  }

  .textbox p {
    padding: 0px 12px 0px 12px;
    margin-bottom: 12px;
    flex-grow: 1;
  }

  .content p {
    padding: 0px 12px 0px 12px;
  }

  .extras {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    align-self: center;
    background-color: rgb(250,250,250);
    height: 15px;
    text-align: center;

    margin-bottom: 12px;
  }

  .extras p {
    font-size: 10px;
  }

  .sub-header {
    cursor: pointer;
    margin: 10px;
  }

  .card-footer {
    height: 36px;
    min-height: 36px;
  }
</style>