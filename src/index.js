import HierarchicalSelect from './hierarchical-select.vue'

HierarchicalSelect.install = function(Vue){
  Vue.component(HierarchicalSelect.name, HierarchicalSelect)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(HierarchicalSelect);
}

export default HierarchicalSelect
