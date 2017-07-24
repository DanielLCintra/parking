<script>

  import DcTable from '../general/dc-table.vue'
  import DcForm from './form.vue'
  import DcModal from '../general/dc-modal.vue'
  import _ from 'lodash'


  export default{
    name:'DcClienteMain',
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
              id: 'client_name',
              name:'Nome',
              ordem: 1,
              type: 'text',
              visible: true
          },
          2:{
              id: 'cpf',
              name:'CPF',
              ordem: 2,
              type: 'cpf',
              visible: true
          },
          3:{
              id: 'phone',
              name:'Telefone',
              ordem: 3,
              type: 'cpf',
              visible: true
          }
        }
      }
    },  
    methods:{
      novo(obj){

        var last_id = 0

        if(obj.last !== 0){
          last_id = obj.last.id
        }

        this.$bus.$emit('open-form-cliente',{last_id: last_id})
      
      },
      editar(obj){

        this.$bus.$emit('open-form-cliente', {cliente: obj.item})
      
      },
      excluir(obj){
        const VmThis = this

        VmThis.$http.delete(`client/${obj.item.id}`).then(res=>{
          
          VmThis.$bus.$emit('remove',{dados: obj.item})
          
          VmThis.$bus.$emit('open-modal',{titulo: 'Sucesso',texto: 'Cliente excluído com sucesso.',cor: 'green'})

        })
      }
    }
  }
</script>

<template>  
  <div >
    <dc-table :columns="columns" url_get="client" a_dados="clients" title_principal="Clientes" :is_paginate="false" scroll acoes btn_novo title_btn_novo="Novo Cliente" @novo="novo" @editar="editar" @excluir="excluir"></dc-table>
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