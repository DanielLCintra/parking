<script>

  import DcTable from '../general/dc-table.vue'
  import DcForm from './form.vue'
  import DcModal from '../general/dc-modal.vue'
  import _ from 'lodash'

  export default{
    name:'DcVeiculosMain',
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
              id: 'client_id',
              name:'Cliente',
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
              id: 'plate',
              name:'Placa',
              ordem: 3,
              type: 'text',
              visible: true
          },
          4:{
              id: 'brand',
              name:'Marca',
              ordem: 4,
              type: 'text',
              visible: true
          },
          5:{
              id: 'model',
              name:'Modelo',
              ordem: 5,
              type: 'text',
              visible: true
          },
          6:{
              id: 'color',
              name:'Cor',
              ordem: 6,
              type: 'text',
              visible: true
          },
          7:{
              id: 'year',
              name:'Ano',
              ordem: 7,
              type: 'text',
              visible: true
          },
          8:{
              id: 'created_at',
              name:'Criado em',
              ordem: 8,
              type: 'date',
              visible: true
          },
          9:{
              id: 'updated_at',
              name:'Atualizado em',
              ordem: 9,
              type: 'date',
              visible: true
          }
        }
      }
    }, 
    methods:{
      novo(obj){

        console.log(obj.last)

        var last_id = 0

        if(obj.last !== 0){
          last_id = obj.last.id
        }

        this.$bus.$emit('open-form-veiculo',{last_id: last_id})
      
      },
      editar(obj){

        this.$bus.$emit('open-form-veiculo', {veiculo: obj.item})
      
      },
      excluir(obj){

        const VmThis = this

        VmThis.$http.delete(`vehicle/${obj.item.id}`).then(res=>{
          
          VmThis.$bus.$emit('remove',{dados: obj.item})
          
          VmThis.$bus.$emit('open-modal',{titulo: 'Sucesso',texto: 'Veículo excluído com sucesso.',cor: 'green'})

        })
      }
    } 
  }
</script>

<template>  
  <div >
    <dc-table :columns="columns" url_get="vehicle" a_dados="clients" title_principal="Veículos" :is_paginate="false" scroll acoes btn_novo title_btn_novo="Novo Veículo" @novo="novo" @editar="editar" @excluir="excluir" f_default="3"></dc-table>
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