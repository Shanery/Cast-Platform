<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Item</p>
        <button class="delete" @click="exit"></button>
      </header>
      <section class="modal-card-body">
        <!-- Field Type -->
        <div class="field">
          <label class="label" >Field Name</label>
          <p class="control">
            <input class="input" type="text" placeholder="Select Field Name" v-model="form.type">
          </p>
        </div>
        <!-- Field Texts -->
        <div class="field">
          <label class="label" >Field Text</label>
          <p class="control"
          v-for="text in form.text">
            <textarea class="textarea" type="text" placeholder="Select Field Name" v-model="text.text"></textarea>
          </p>
          <button class="button" @click="form.text.push({text:''})">Add More Text</button>
        </div>
        <!-- Add Subfields -->
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" @click="save">Save changes</a>
        <a class="button">Cancel</a>
      </footer>
    </div>
  </div>
</template>

<script>
  //Vue Script
  export default {
    name: "",
    props: {
    },
    data: function() {
      return {
        form: {
          type: "",
          text: [{text: ""}]
        }
      }
    },
    computed: {

    },
    methods: {
      save () {
        this.$emit('added-card', this.form);
      },
      exit () {
        this.$emit('exit');
      }
    },
    mounted: function() {
      
    },
    components: {
      
    }
  }
</script>

<style>
  
</style>