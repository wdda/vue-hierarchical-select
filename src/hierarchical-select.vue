<template>
    <div>
        <hierarchical-select-recursion :nodes="nodes"
                          :selected="selected"
                          :nodesSelected="nodesSelected"
                          :name="name"
                          :option-value="optionValue"
                          :option-name="optionName"
                          :option-name-default="optionNameDefault"
                          :css-classes="cssClasses"
                          :change-select="changeSelect"
        >
        </hierarchical-select-recursion>
    </div>
</template>


<script>
  import HierarchicalSelectRecursion from './hierarchical-recursion-select.vue'

  Vue.mixin({
    methods: {
      handleRecursionNode (node, func) {
        func(node)
        if (node.children && node.children.length > 0) {
          for (let childNode of node.children) {
            func(childNode)
            this.handleRecursionNode(childNode, func)
          }
        }
      }
    }
  })

  export default {
    name: 'HierarchicalSelect',
    components: {HierarchicalSelectRecursion},
    props: {
      selected: {type: String | Number, default: ''},
      nodes: {type: Array},
      name: {type: String, default: 'name[]'},
      optionValue: {type: String, default: 'id'},
      optionName: {type: String, default: 'name'},
      optionNameDefault: {type: String, default: '- choice -'},
      cssClasses: {type: Array | Object, default: function() {return ['vue-hierarchical-select'];}},
      changeSelect: {type: Function, default: function () {}}
    },
    created: function () {
      self = this
      let nodesSelected = []
      let value = self.optionValue;

      if (this.selected) {
        for (let i = 0; i < this.nodes.length; i++) {
          let node = this.nodes[i]
          nodesSelected = [node[value]]

          this.handleRecursionNode(node, node => {
            if (nodesSelected.indexOf(this.selected) == -1) {
              if (node.children.length > 0 || node[value] == this.selected) {
                nodesSelected.push(node[value])
              }
            }
          })

          if (nodesSelected.indexOf(this.selected) != -1) {
            break
          }
        }
      }

      this.nodesSelected = nodesSelected
    },
    data: function () {
      return {
        nodesSelected: null
      }
    }
  }
</script>
