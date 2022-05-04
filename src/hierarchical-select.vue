<template>
  <div>
    <hierarchical-select-recursion
        :nodes="nodes"
        :selected="selected"
        :nodesSelected="nodesSelected"
        :name="name"
        :option-value="optionValue"
        :option-name="optionName"
        :option-name-default="optionNameDefault"
        :css-classes="cssClasses"
        :css-styles="cssStyles"
        :change-select="changeSelect"
        :removePreset="removePreset"
        :transition-name="transitionName"
        :direction="direction"
        :only-last="onlyLast"
        @select-new-value="onSelected"
    >
    </hierarchical-select-recursion>
    <input v-if="onlyLast" :name="name" :value="lastValue" hidden>
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
  components: { HierarchicalSelectRecursion },
  props: {
    selected: { type: String | Number, default: '' },
    nodes: { type: Array },
    name: { type: String, default: 'name[]' },
    optionValue: { type: String, default: 'id' },
    optionName: { type: String, default: 'name' },
    optionNameDefault: { type: String, default: '- choice -' },
    cssClasses: { type: Array | Object, default: function () {return ['vue-hierarchical-select']} },
    cssStyles: { type: String, default: '' },
    changeSelect: { type: Function, default: function () {} },
    maxColumnWidth: { type: Number, default: 10000 },
    transitionName: { type: String, default: '' },
    onlyLast: { type: Boolean, default: false }
  }
  ,
  methods: {
    listenDirection () {
      this.direction = window.innerWidth > this.maxColumnWidth ? 'row' : 'column'

      let mediaQuery = window.matchMedia('(min-width:' + this.maxColumnWidth + 'px)')
      let listener = (e) => this.direction = e.matches ? 'row' : 'column'
      mediaQuery.addListener(listener)
      this.$once('hook:beforeDestroy', () => mediaQuery.removeListener(listener))
    },
    onSelected (value) {
      this.lastValue = value
    },
    removePreset (variable) {
      this.nodesSelected.splice(this.nodesSelected.indexOf(variable), 1)
    },
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
          if (nodesSelected.indexOf(this.selected) === -1) {
            if (node.children !== undefined || node[value] === this.selected) {
              nodesSelected.push(node[value])
            }
          }
        })

        if (nodesSelected.indexOf(this.selected) !== -1) {
          break
        }
      }
    }

    this.nodesSelected = nodesSelected
  },
  mounted () {
    this.lastValue = this.selected
    this.listenDirection()
  },
  data: function () {
    return {
      nodesSelected: null,
      lastValue: null,
      direction: '',
    }
  }
}
</script>

<style>
@import "./styles/hierarchical-select.scss";
</style>
