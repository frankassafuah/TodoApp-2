import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// importing icons
import { faHatWizard, faUserSecret, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


// add icons to library
library.add(faHatWizard, faUserSecret, faPlus, faPenToSquare)

createApp(App)
    .use(VueAxios, axios)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')