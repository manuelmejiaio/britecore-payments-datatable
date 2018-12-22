<template>
  <div class="topnav">
    <div v-if="actionAvailable">
      <select
        v-model="selectedOption"
        @change="$emit('changeStatus',selectedOption);selectedOption = null"
      >
        <option value selected disabled hidden>Select Status</option>
        <option
          v-for="(option, index) in options"
          :disabled="optionDisabled"
          :key="index"
          :value="option.text"
        >{{'Mark as ' + option.text }}</option>
      </select>
      <button type="button" @click="$emit('exportToXLS')">
        <i class="fas fa-file-excel"></i> Export to Excel
      </button>
    </div>
    <div class="search-container">
      <input
        type="text"
        @keyup="$emit('search', $event.target.value)"
        class="fa"
        :placeholder="'\uf002 Search..'"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNavigation',
  props: ['actionAvailable', 'optionDisabled'],
  data () {
    return {
      selectedOption: '',
      options: [
        { text: 'processed', value: 'processed' },
        { text: 'progress', value: 'in progress' },
        { text: 'hold', value: 'hold' },
        { text: 'canceled', value: 'canceled' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$main-color: #0191a9;
// nav bar
.topnav {
  overflow: hidden;
  background-color: #e9e9e9;
  border: 2px solid $main-color;
  border-radius: 5px;
}

.actions {
  float: left;
  display: block;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  margin: 5px;
}

.topnav select {
  @extend .actions;
  padding: 6px 8px;
}

.topnav button {
  @extend .actions;
  padding: 7px 8px;
  color: white;
  border: none;
  background-color: green;
  border-radius: 5px;
}

.topnav button:hover {
  background-color: #458b00;
  cursor: pointer;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #2196f3;
  color: white;
}

.topnav .search-container {
  float: right;
  margin: 0px 5px 5px 0px;
}

.topnav input[type="text"] {
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: none;
}

@media screen and (max-width: 600px) {
  .topnav .search-container {
    float: none;
  }
  .topnav a,
  .topnav input[type="text"],
  .topnav .search-container button {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav input[type="text"] {
    border: 1px solid #ccc;
  }
}
</style>
