<template>
    <div>
        <select v-bind:class="cssClasses"
                v-bind:name="name"
                v-model="value"
                @change="change"

        >
            <option value="" v-html="optionNameDefault"></option>
            <option v-for="node in nodes" v-bind:value="node[optionValue]" v-html="node[optionName]"></option>
        </select>

        <template v-for="node in nodes" v-if="node.children !== undefined && node[optionValue] == value">
            <hierarchical-select-recursion :nodes="node.children"
                                           :nodesSelected="nodesSelected"
                                           :name="name"
                                           :option-value="optionValue"
                                           :option-name="optionName"
                                           :css-classes="cssClasses"
                                           :option-name-default="optionNameDefault"
                                           :change-select="changeSelect"
                                           :removePreset="removePreset"
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
      'nodesSelected',
      'name',
      'optionValue',
      'optionName',
      'cssClasses',
      'optionNameDefault',
      'changeSelect',
      'removePreset'
    ],
    mounted: function () {
      self = this

      if (this.nodesSelected) {
        this.nodes.forEach(function (node) {
          if (self.nodesSelected.indexOf(node[self.optionValue]) != -1) {
            self.value = node[self.optionValue]
            self.removePreset(self.value)
          }
        })
      }
    },
    methods: {
      change () {
        self = this

        if (this.changeSelect) {
          let newValue = ''

          if (this.value != '') {
            newValue = this.value
          } else {
            if (this.$parent.value !== undefined) {
              newValue = this.$parent.value
            }
          }

          this.changeSelect(newValue)
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
