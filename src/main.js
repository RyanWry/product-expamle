import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import App from './components/App.vue'
import Home from './components/Home.vue';

Vue.use(Router);
Vue.use(Resource);

var router = new Router();

router.map({
    '/': {
        component: Home,
    }
});

router.start(App, '#app');