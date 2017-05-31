<template>
  <ul class="list-container">
    
    <li v-for="item in checklist" v-show="item.isChecked">
      <div class="list-item" >
        <p class="list-text">{{ item.title }}</p>
        <input type="checkbox">
      </div>

    </li>
    
  </ul>
</template>

<script>
  export default {
    name: 'checkList',
    props: {
      checklist: Array
    },
    data: function() {
      return {
        
      } 
    }
  }

  //
</script>
  
<style scoped>
  .list-container {
    display: flex;
    flex-direction: column;
    border-width: 1px 0px 1px 1px;
    border-style: solid;
    border-color: rgb(219,219,219);
    text-align: left;
    flex-grow: 1;
  }
  .list-item {
    display: flex;
    flex-direction: row;
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: rgb(219,219,219);
    text-align: left;
    padding-left: 4px;
    padding-right: 4px;
    align-items: center;
  }
  .list-text {
    font-size: 1rem;
    flex-grow: 1;
  }

</style>