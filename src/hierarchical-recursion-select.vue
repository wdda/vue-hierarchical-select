<template>
    <div>
        <select v-bind:class="cssClasses"
                v-on:change="change"
                v-bind:name="name"
                v-model="value"
        >
            <option value="" v-html="optionNameDefault"></option>
            <option v-for="node in nodes" v-bind:value="node[optionValue]" v-html="node[optionName]"></option>
        </select>
        <template v-for="node in nodes" v-if="value == node[optionValue] && node.children.length">
            <hierarchical-select-recursion :nodes="node.children"
                              :selected="selected"
                              :nodesSelected="nodesSelected"
                              :name="name"
                              :option-value="optionValue"
                              :option-name="optionName"
                              :css-classes="cssClasses"
                              :option-name-default="optionNameDefault"
                              :change-select="changeSelect"
            >
            </hierarchical-select-recursion>
        </template>
    </div>
</template>

<script>
  export default {
    name: 'HierarchicalSelectRecursion',
    props: [
      'nodes',
      'selected',
      'nodesSelected',
      'name',
      'optionValue',
      'optionName',
      'cssClasses',
      'optionNameDefault',
      'changeSelect'
    ],
    created: function () {
      self = this;

      if (this.nodesSelected) {
        this.nodes.forEach(function (node) {
          if (self.nodesSelected.indexOf(node[self.optionValue]) != -1) {
            self.value = node[self.optionValue];
          }
        })
      }
    },
    methods: {
      change () {
        this.$children.forEach(function(childComponent) {
          childComponent.value = ''
        })

        if (this.changeSelect) {
          this.changeSelect(this.value);
        }
      }
    },
    data: function () {
      return {
        value: ''
      }
    }
  }
</script>
