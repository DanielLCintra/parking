<script>

  import DcTable from '../general/dc-table.vue'
  import _ from 'lodash'


  export default{
    name:'DcVagasMain',
    components:{
      DcTable
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
              id: 'company_id',
              name:'Empresa',
              ordem: 1,
              type: 'text',
              visible: true
          },
          2:{
              id: 'parking_place_name',
              name:'Nome',
              ordem: 2,
              type: 'text',
              visible: true
          },
          3:{
              id: 'vehicle_last_entry',
              name:'Última Entrada',
              ordem: 3,
              type: 'date',
              visible: true
          },
          4:{
              id: 'created_at',
              name:'Criado Em',
              ordem: 4,
              type: 'date',
              visible: true
          },
          5:{
              id: 'updated_at',
              name:'Atualizado Em',
              ordem: 5,
              type: 'date',
              visible: true
          }
        }
      }
    },  
    methods:{

    }
  }
</script>

<template>  
  <div >
    <dc-table :columns="columns" url_get="parking-place" a_dados="clients" title_principal="Vagas" :is_paginate="false" scroll></dc-table>
  </div>
</template>

<style>
  .box-table{
    background-color: #FFF;
    border: 1px solid #E0E0E0;

  }
</style>