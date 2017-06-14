<template>
  <div class="card">
    <!-- Header -->
    <header class="card-header">
      <h1 class="card-header-title">
        {{ cardTitle }}
      </h1>
      <a class="card-header-icon" @click="toggle">
        <span class="icon">
          <i v-if="toggled" class="fa fa-angle-up"></i>
          <i v-else class="fa fa-angle-down"></i>
        </span>
      </a>
    </header>
    <!-- Content -->
    <div class="card-content">
      <div v-show="toggled" class="content">
        <!-- Array Content -->
        <div v-if="cardInfo.isArray">
          <div v-for="item in displayableCards">
            <display-card :cardTitle="item.key" :cardInfo="item.value" :hasFooter="false" :keys="item.key">
            </display-card>
          </div>
        </div>
        <!-- Object Content -->
        <div v-else>
          <p v-for="item in displayableContent">
            {{ item.value }}
          </p>
          <div v-for="item in displayableCards">
            <display-card :cardTitle="item.key" :cardInfo="item.value" :hasFooter="false" :keys="item.key">
            </display-card>
          </div>
        </div>





        <div v-if="hasThings">
          {{ data[0].summary }}       
        </div>







      </div>
    </div>
    <!-- Footer -->
    <footer v-if="hasFooter" class="card-footer">
      <a class="card-footer-item">Hello!!</a>
    </footer>

    

      <!-- Fix to be adaptive -->
  </div>
</template>

<script>
import {HTTP} from '../http-common.js'

  export default {
    name: 'displayCard',
    props: {
      cardTitle: String,
      // Data of the card to be displayed
      cardInfo: [Array, Object],
      hasFooter: Boolean,
      displayType: String
    },
    data() {
      return {
        toggled: false,
        data: {},
        hasThings: false
      }
    },
    created() {
      this.data = this.cardInfo;
    },
    mounted() {
      
    },

    computed: {
      displayableContent() {
        var keys = Object.keys(this.data);
        
        let views = {};
        var i;

        for (i in keys) {
          if (typeof(this.data[keys[i]]) === 'string') {
            if (this.data[keys[i]] != '@rid') {
              views[keys[i]] =  {
                key: keys[i],
                value: this.data[keys[i]]
              }
            }
          }
        }

        return views;
      },
      displayableCards() {
        var keys = Object.keys(this.data);
        
        let views = {};
        var i;

        for (i in keys) {
          if (typeof(this.data[keys[i]]) === 'object') {
            views[keys[i]] =  {
              key: keys[i],
              value: this.data[keys[i]]
            }
          }
        }

        return views;
      }
    },
    methods: {
      toggle() {
        this.toggled = !this.toggled;
      }
    }
  }
</script>

<style scoped>
  p {
    font-size: 12px;
    padding: 10px;
  }

  .content h1{
    margin-bottom: 0px;
    font-size: 16px;
    font-weight: 300;
  }

  h1 {
    font-weight: 500;
    flex-grow: 0;
    margin-bottom: 0px;
  }

  .card-header-title{
    font-size: 24px;
    flex-grow: 1;
  }

  .card-content {
    padding: 0px;
  }

  .box {
    display: flex;
    flex-direction: column;
  }
</style>