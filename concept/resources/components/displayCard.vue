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

      </div>
    </div>
    <!-- Footer -->
    <footer v-if="hasFooter" class="card-footer">
      <a class="card-footer-item">Check</a>
    </footer>

    

      <!-- Fix to be adaptive -->
  </div>
</template>

<script>
  export default {
    name: 'displayCard',
    props: {
      cardTitle: String,
      // Data of the card to be displayed
      cardInfo: [Array, Object],
      hasFooter: Boolean
    },
    data() {
      return {
        toggled: false
      }
    },
    mounted() {
      var i;
      for (i in this.cardInfo) {
        if (typeof(this.cardInfo[i]) === 'string') {
          if (this.cardInfo[i].includes("#")) {
            var user = 'root';
            var password = 'waffl3c0pt3r';

            var config = {
              auth: {
                username: user,
                password: password
              }
            };

            axios.get(('http://localhost:2480/query/conceptmapper/sql/select @this.toJSON("fetchPlan:*:-1") from' + this.cardInfo[i]), config)
            .then(function(response) {
              
              var data = []
              
              dat.push(JSON.parse(response.data.result[0].this))
              this.cardInfo = data
            }.bind(this));
          }
        }
      }
    },

    computed: {
      displayableContent() {
        var keys = Object.keys(this.cardInfo);
        
        let views = {};
        var i;

        for (i in keys) {
          if (typeof(this.cardInfo[keys[i]]) === 'string') {
            views[keys[i]] =  {
              key: keys[i],
              value: this.cardInfo[keys[i]]
            }
          }
        }

        return views;
      },
      displayableCards() {
        var keys = Object.keys(this.cardInfo);
        
        let views = {};
        var i;

        for (i in keys) {
          if (typeof(this.cardInfo[keys[i]]) === 'object') {
            views[keys[i]] =  {
              key: keys[i],
              value: this.cardInfo[keys[i]]
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