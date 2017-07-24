<script>

  import DcTable from '../general/dc-table.vue'
  import _ from 'lodash'
  import DcForm from './form.vue'
  import DcModal from '../general/dc-modal.vue'

  export default{
    name:'DcEmpresasMain',
    components:{
      DcTable,
      DcForm,
      DcModal  
    },
    data(){
      return{
        columns:{
          0:{
              id: 'id',
              name:'Id',
              ordem: 0,
              type: 'text',
              visible: true
          },
          1:{
              id: 'company_name',
              name:'Nome',
              ordem: 1,
              type: 'text',
              visible: true
          },
          2:{
              id: 'cnpj',
              name:'Cnpj',
              ordem: 2,
              type: 'text',
              visible: true
          },
          3:{
              id: 'phone',
              name:'Telefone',
              ordem: 3,
              type: 'text',
              visible: true
          },
          4:{
              id: 'created_at',
              name:'Criado em',
              ordem: 4,
              type: 'date',
              visible: true
          },
          5:{
              id: 'updated_at',
              name:'Atualizado em',
              ordem: 5,
              type: 'date',
              visible: true
          }
        }
      }
    },  
    methods:{
      editar(obj){

        this.$bus.$emit('open-form-empresa', {empresa: obj.item})
      
      },
    }
  }
</script>

<template>  
  <div>
    <dc-table :columns="columns" url_get="company" a_dados="company" title_principal="Empresas" :is_paginate="false" scroll acoes acoes_btn_edit :acoes_btn_remove="false" @editar="editar"></dc-table>
    <dc-form></dc-form>
    <dc-modal></dc-modal>
  </div>
</template>

<style>
  .box-table{
    background-color: #FFF;
    border: 1px solid #E0E0E0;

  }
</style>