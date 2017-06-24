<template>
  <div class="options">
    <div class="panel-block option-item" v-if="hasDisplayInfo">
      <label class="label">{{ displayInfo.type }}</label>
      <div class="field">
        <label class="label">Presets</label>
        <p class="control is-expanded">
          <span class="select">
            <select>
              <option v-for="preset in displayInfo.presets">{{preset.name}}</option>
            </select>
          </span>
        </p>
      </div>
    </div>

    <div class="panel-block option-item" 
    v-if="hasDisplayInfo">
      <label class="label">Requested Views</label>
      <div class="request-item" v-for="view in displayInfo.options.requested">
        <p class="name">{{ view.type }}</p>
        <p class="control"><input class="input priority" type="number" v-model="view.priority"></p>
        <span class="icon eye is-small"
        @click="view.visible = !view.visible">
          <i class="fa" :class="{'fa-eye': view.visible, 'fa-eye-slash': !view.visible}"></i>
        </span>
      </div>
    </div>
    
    <div class="panel-block option-item" 
    v-if="hasDisplayInfo"> 
      Font S
    </div>

  </div>
</template>

<script>
  //Vue Script
  export default {
    name: "",
    props: {
      displayInfo: Object,
      hasDisplayInfo: Boolean
    },
    data: function() {
      return {
      }
    },
    computed: {

    },
    methods: {
      
    },
    mounted: function() {
      
    },
    components: {
      
    }
  }
</script>

<style>
  .icon.eye {
    padding: 15px;
  }

  .options {
    display: flex;
    flex-direction: column;
  }

  .panel-block.option-item {
    display: flex;
    flex-direction: column;

    align-items: stretch;
    border-style: solid;
    border-color: #dbdbdb;
    border-width: 0px 0px 1px 0px ;
  }

  .panel-block .field {
    display: flex;
    flex-direction: column;
  }
  
  .request-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 5px;
  }

  .name {
    flex-grow: 1;
    margin-right: 5px;
  }

  .input.priority {
    width: 40px;
  }
</style>