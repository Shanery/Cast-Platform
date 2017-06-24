<!-- <template>
  <div class="display">
    
    <section class="text-block" v-for="item in content">
      <text-el :element="item"></text-el>
    </section>
    


  </div>
</template> -->

<script>
import element_factory from './view-filter.js'
  //Vue Script
  export default {
    name: "",
    render(createElement) {
      let el = element_factory(this.current.tabView.displayInfo);
      let tagName = el.tagName;
      let options = el.options;
      let children = [];

      for (let i in this.content) {
        children.push(
          createElement(
            el.childrenType,
            {
              props: {
                element: this.content[i].value,
                type: this.content[i].key,
                index: Number(i)
              },
              'class': 'text-block'
            }
          )
        );
      }
      

      


      return createElement(tagName, options, children);
    },
    props: {
      current: Object
    },
    data: function() {
      return {
      }
    },
    computed: {
      // Array
      content() {
        let views = [];

        if (this.current.tabView.hasOwnProperty("content")) {
          let blocks = this.current.tabView.content.value;

          for (let i in blocks) {
            let keys = Object.keys(blocks[i]);
            for (let j in keys) {
              views.push({key: keys[j], value:blocks[i][keys[j]]});
            }
          }
        }
        return views;
      }
    },
    methods: {

    },
    mounted: function() {
      Event.$on('viewSelect', (items) => {
        this.current.tabView = items;
      })
    },
    components: {
      
    }
  }
</script>

<style scoped>
  h3:first-child {
    font-size: 24px;
    font-weight: 600;
    font-family: 'Raleway', sans-serif;
  }

  .display {
    flex-grow: 1;
    flex-direction: column;
    padding: 20px 15px;
    overflow-y: auto;
  }

  .text-block {
    margin: 10px 24px;

    /*font-family: 'Roboto Slab', serif;*/
    font-family: 'Lora', serif;
    /*font-family: 'PT Serif', serif;*/
    /*font-family: 'Noto Serif', serif;*/
  }

  .group-wrap {
    display: flex;
    flex-direction: column;
  }
</style>