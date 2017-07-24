<script>

  import DcTable from '../general/dc-table.vue'
  import _ from 'lodash'

  export default{
    name:'DcPagamentosMain',
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
              id: 'vehicle_id',
              name:'Id Veículo',
              ordem: 1,
              type: 'text',
              visible: true
          },
          2:{
              id: 'parking_place_id',
              name:'Id Vaga',
              ordem: 2,
              type: 'text',
              visible: true
          },
          3:{
              id: 'entry',
              name:'Entrada',
              ordem: 3,
              type: 'date',
              visible: true
          },
          4:{
              id: 'exit',
              name:'Saída',
              ordem: 4,
              type: 'date',
              visible: true
          },
          5:{
              id: 'created_at',
              name:'Criado em',
              ordem: 5,
              type: 'date',
              visible: true
          },
          6:{
              id: 'updated_at',
              name:'Atualizado em',
              ordem: 6,
              type: 'date',
              visible: true
          }
        }
      }
    },  
  }
</script>

<template>  
  <div >
    <dc-table :columns="columns" url_get="payment" a_dados="clients" title_principal="Pagamentos" :is_paginate="false" scroll></dc-table>
  </div>
</template>

<style>
  .box-table{
    background-color: #FFF;
    border: 1px solid #E0E0E0;

  }
</style>