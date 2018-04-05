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
                                       :removePreset="removePreset"

        >
        </hierarchical-select-recursion>
    </div>
</template>


<script>
  import HierarchicalSelectRecursion from './hierarchical-recursion-select.vue'

  Vue.mixin({
    methods: {
      handleRecursionNode (node, func) {
        this.handleRecursion(node, 'children', func)
      },
      handleRecursionComponent (component, func) {
        this.handleRecursion(component, '$children', func)
      },
      handleRecursion (node, type, func) {
        func(node)
        if (node[type] && node[type] !== undefined) {
          for (let child of node[type]) {
            this.handleRecursion(child, type, func)
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
      cssClasses: {type: Array | Object, default: function () {return ['vue-hierarchical-select']}},
      changeSelect: {type: Function, default: function () {}}
    },
    methods: {
      removePreset (variable) {
        this.nodesSelected.splice(this.nodesSelected.indexOf(variable), 1)
      }
    },
    created: function () {
      self = this
      let nodesSelected = []
      let value = self.optionValue

      if (this.selected) {
        for (let i = 0; i < this.nodes.length; i++) {
          let node = this.nodes[i]
          nodesSelected = [node[value]]

          this.handleRecursionNode(node, node => {
            if (nodesSelected.indexOf(this.selected) == -1) {
              if (node.children !== undefined || node[value] == this.selected) {
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
