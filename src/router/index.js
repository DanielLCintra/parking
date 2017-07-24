import Vue from 'vue'
import Router from 'vue-router'
import DcPrincipal from '../components/principal.vue'
import DcClientes from '../components/clientes/main.vue'
import DcPagamentos from '../components/pagamentos/main.vue'
import DcEmpresas from '../components/empresas/main.vue'
import DcVeiculos from '../components/veiculos/main.vue'
import DcVagas from '../components/vagas/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'principal', component: DcPrincipal },
    { path: '/clientes', name: 'clientes', component: DcClientes },
    { path: '/pagamentos', name: 'pagamentos', component: DcPagamentos },
    { path: '/empresas', name: 'empresas', component: DcEmpresas },
    { path: '/veiculos', name: 'veiculos', component: DcVeiculos },
    { path: '/vagas', name: 'vagas', component: DcVagas }
  ]
})
