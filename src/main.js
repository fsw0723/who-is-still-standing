// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import App from './App';

import './bootconf.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
let originalVueComponent = Vue.component;
Vue.component = function(name, definition) {
    if (name === 'bFormCheckboxGroup' || name === 'bCheckboxGroup' ||
        name === 'bCheckGroup' || name === 'bFormRadioGroup') {
        definition.components = {bFormCheckbox: definition.components[0]}
    }
    originalVueComponent.apply(this, [name, definition])
};
Vue.use(BootstrapVue);
Vue.use(MuseUI);

Vue.component = originalVueComponent;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});


