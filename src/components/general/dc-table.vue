<script>
	import moment from 'moment'
	import DcLoading from './dc-loading.vue'
	import DcPagination from './dc-pagination.vue'
	import _ from 'lodash'

	export default{
		name: 'DcTable',
		components:{
			DcLoading,
			DcPagination
		},
		props: {
			btn_novo: {type: Boolean, default: false},
			acoes: {type: Boolean, default: false},
			acoes_btn_edit: {type: Boolean, default: true},
			acoes_btn_remove: {type: Boolean, default: true},
			btn_add: {type: Boolean, default: false},
			btn_remover: {type: Boolean, default: false},
			columns: {type: Object|Array, default: []},
			title_principal: {type: String},
			t_p_size: {type: String, default: '3'},
			placeholder: {type: String, default: 'Filtrar'},
			title_btn_novo: {type: String},
			url_get: {type: String, default: ''},
			paginator: {type:Boolean, default: false},
			is_paginate: {type:Boolean, default: true},
			is_searchable: {type:Boolean, default: true},
			ctrl: {type:Boolean, default: true},
			scroll: {type: Boolean, default: false},
			btn_remove_all: {type: Boolean, default: true},
			acao_p_remove:{type: Boolean, default: false},
			f_default:{type: Number, default: 1},
			text_after_total:{type: String, default: ''},
			text_total_align:{type: String, default: 'right'},
			default_text_total:{type: String, default: 'Total Registros:'},
			a_dados:{type: String, default: 'dados'}

		},
		data(){
			return {
				isSearching: false,
				configs: {
					orderBy: 'descricao',
					order: 'asc',
					filter: '',
					reverse: 1,
					filter_option: '',
					filter_selected: ''
				},
				repos: [],
				pagination: [],
				tr_details: [],
				details: [],
				length_colspan: 99,
				total_data: 0
			}
		},
		mounted(){

			this.configs.filter_option = this.columns[this.f_default].id
			this.configs.filter_selected = this.columns[this.f_default].name
			const VmThis = this

			this.$store.commit('REMOVE_ALL_TABLE')

			if (this.url_get !== ''){

				this.isSearching = true

				this.$http
				.get(this.url_get)
				.then(res => {

					var data_table

					var data_table1 = res.data[this.a_dados]
					if (this.a_dados == 'company'){
						data_table = []
						data_table.push(data_table1)
					}else{
						data_table = data_table1
					}


					if(VmThis.is_paginate){
						VmThis.repos = data_table
						VmThis.total_data = data_table.total
					} else {
						VmThis.repos = data_table
						VmThis.total_data = data_table.length
					}

					VmThis.isSearching = false
					VmThis.pagination = data_table
				})

				this.$bus.$on('remove', obj => {
					var index = this.repos.indexOf(obj.dados);
					this.repos.splice(index, 1);
				})

				this.$bus.$on('create', obj => {

					var index = _.findIndex(this.repos, {'id': obj.dados.id})

					if (index !== -1){
						this.repos.splice(index, 1)
					}

					this.repos.unshift(obj.dados)
					
				})

			}else{
				this.repos = this.dados
				this.total_data = this.$store.state.table.list.length
			}

			if(this.btn_add){
				this.length_colspan = this.length_colspan + 1
			}
			if(this.acoes){
				this.length_colspan = this.length_colspan + 1
			}
			if(this.btn_remover){
				this.length_colspan = this.length_colspan + 1
			}
			this.length_colspan = this.length_colspan + _.size(this.columns)
		},
		computed:{
			list(){

				if (this.url_get == ''){
					this.repos = this.$store.state.table.list
					this.total_data = this.$store.state.table.list.length
				}

				var filter = this.configs.filter
				const list = _.orderBy(this.repos, this.configs.orderBy, this.configs.order)

				this.reverse = 1;

				if (_.isEmpty(filter)) {
					return list;
				}

				var result = _.filter(list, repo => {
					return repo[this.filter_term].indexOf(filter) >= 0
				})

				return result

			},
			filter_term(){
				return this.configs.filter_option
			},
			table_list(){
				return this.$store.state.table.list
			}
		},
		methods:{
			format_date(data){
				return moment(data).format('DD/MM/YYYY hh:mm')
			},
			set_filter_prop(c){
				this.configs.filter_option = c.id
				this.configs.filter_selected = c.name
			},
			play_stop(obj){

				this.$emit('play_stop',{obj: obj})

                var item = this.repos.filter(el => {
					if (el[this.columns[0].id] == obj[this.columns[0].id]){

						el.controle = el.controle == 2 ? 1 : 2

						return el
					}
				})
			},
			setSelected(item){

				this.tr_details = []

				this.tr_details.push(item)

				this.$emit('tr_click',{obj: item})

			},
			sortBy: function(sortKey,orderBy) {

				if (this.configs.order == sortKey) {
					this.configs.order = 'desc',
					this.configs.reverse = -1;
					this.configs.orderBy = orderBy
				}else{
					this.configs.order = 'asc'
					this.configs.reverse = 1;
					this.configs.orderBy = orderBy
				}
			},
			add(dados,column_id){

				var index = this.table_list.map(function(el) {
					return el[column_id];
				}).indexOf(dados[column_id]);

				if(index !== -1){
					var txt = dados.descricao
					if(dados.descricao === undefined){
						txt = dados.nome
					}

					BootstrapDialog.show({
						title:'Informação',
						message: 'O item <b>'+txt+'</b> já foi inserido.',
						type: BootstrapDialog.TYPE_DANGER,
						onshown: function(dialogRef){
							setTimeout(function(){
								$j(".modal").modal("hide");
							},1000);
						},
					});
				}else{

					this.$store.commit('ADD_ITEM_TABLE', dados)
				}
			},
			adicionar(item,column_id){

				if (item === ''){
					this.details = this.repos.map(item2 => {
						this.add(item2,column_id)
					})
				}else{
					this.add(item,column_id)
				}

				//EVENT TO NAVIGATOR COMPONENTE
				this.$bus.$emit('set_actual_tab_is_edited')
			},
			remover(item){

				if (this.acao_p_remove){

					this.$emit('remover',{item: item})

				}else{

					if (item === undefined){
						this.$store.commit('REMOVE_ALL_TABLE')
					}else{
						this.$emit('remover',{dados: item})
						this.$store.commit('REMOVE_ITEM_TABLE', item)
					}

				}
				//EVENT TO NAVIGATOR COMPONENTE
				this.$bus.$emit('set_actual_tab_is_edited')
			},
			novo(){

				var last = _.last(this.repos)

				if (last == undefined){
					last = 0
				}

				this.$emit('novo',{last: last})

				this.$store.commit('SET_TABS_IS_EDITING', true)
			},
			editar(item){
				this.$emit('editar',{item: item})

				this.$store.commit('SET_TABS_IS_EDITING', true)
			},
			excluir(item){
				this.$emit('excluir',{item: item})
			},
			listar(data){

				const VmThis = this

				this.$http
				.get(this.url_get+'?page='+data)
				.then(res => {

					VmThis.repos = res.data.dados.data
					VmThis.isSearching = false
					VmThis.pagination = res.data.dados
				})

			},
			switch(val){

				if (val == 0){
					val = 'Não'
				}else if(val == 1){
					val = 'Sim'
				}

				return val

			},
			length(val,tipo){

				if (tipo == 0){
					return `width:${val}`
				}else{
					return val
				}
			},
			change(obj){
				this.$store.commit('UPDATE_TABLE', obj)
				this.$bus.$emit('set_actual_tab_is_edited')
			},
			btn_executar(){
				this.$emit('btn_executar')
			},
			setTabEdited(){
                this.$bus.$emit('set_actual_tab_is_edited')
            },

		}
	}
</script>

<template>
	<div>
		<div >
			<div v-show="title_principal !== undefined">
				<div v-if="t_p_size == 3">
					<h3 class="span12">{{ title_principal }}</h3>
				</div>
				<div v-else-if="t_p_size == 4">
					<h4 class="span12">{{ title_principal }}</h4>
				</div>
				<div v-else-if="t_p_size == 5">
					<h5 class="span12">{{ title_principal }}</h5>
				</div>
				<hr>
			</div>
			<div class="row">
				<div class="col-md-12" style="height: 500px;">
					<div v-show="is_searchable">
						<div v-if="btn_novo">
							<div class="input-group">
								<div class="input-group-btn">
						        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Filtro: {{ this.configs.filter_selected}} <span class="caret"></span></button>
						        <ul class="dropdown-menu">
						          <li><a v-for="c in columns" @click="set_filter_prop(c)">{{ c.name }}</a></li>
						        </ul>
						      </div><!-- /btn-group -->
								<input type="text" class="form-control" :placeholder="placeholder" v-model="configs.filter">
								<span class="input-group-btn">
							       <button class="btn btn-default"  @click="novo" type="button"><i class="glyphicon glyphicon-plus" aria-hidden="true"></i> {{ title_btn_novo }}</button>
							    </span>
							</div>
						</div>
						<div v-else>
							<div class="input-group">
								<div class="input-group-btn">
							        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Filtro: {{ this.configs.filter_selected}} <span class="caret"></span></button>
							        <ul class="dropdown-menu">
							          <li><a v-for="c in columns" @click="set_filter_prop(c)">{{ c.name }}</a></li>
							        </ul>
						      	</div><!-- /btn-group -->
								<input type="text" class="form-control" :placeholder="placeholder" v-model="configs.filter">
							</div>
						</div>
					</div>
					<br>
					<div class="text-center" v-if="isSearching">
						<dc-loading></dc-loading>
					</div>

					<div v-else :class="{'tscroll': scroll, '': !scroll}">
						<table class="table table-bordered table-hover">
							<thead>
								<tr>
									<th :colspan="length_colspan" :style="'text-align:'+text_total_align">{{ default_text_total }} {{ total_data }} {{ text_after_total }}</th>
								</tr>
								<tr>
									<th v-show="btn_add" width="1%" nowrap class="text-center">
										<i @click="adicionar('',columns[0].id)" class="btn btn-default btn-xs" v-tooltip="'Adicionar Todos'"><i class="glyphicon glyphicon-check"></i></i>
									</th>
									<th class="text-center" v-for="column in columns" v-show="column.visible" :width="column.ordem === 0 ? '5%' : length(column.length,1)">
										{{ column.name }}
										<i class="pull-right" @click="sortBy('asc',column.id)">
											<span v-if="configs.reverse == 1"><i class="glyphicon glyphicon-sort-by-attributes"></i></span>
											<span v-if="configs.reverse == -1"><i class="glyphicon glyphicon-sort-by-attributes-alt"></i></span>
										</i>
									</th>
									<th v-show="acoes" class="text-center">Ações</th>
									<th v-show="btn_remover" class="text-center"  width="1%" nowrap>
										<div v-if="btn_remove_all">
										<i @click="remover()" class="btn btn-default btn-xs" v-tooltip="'Remover Todos'"><b><i class="glyphicon glyphicon-share"></i></b></i>
										</div>
										<div v-else><i class="fa fa-times"></i></div>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="d in list" @click="setSelected(d)"  :class="{'info': tr_details.includes(d),'': !tr_details.includes(d)}">
									<td v-show="btn_add" width="1%" nowrap class="text-center">
										<i @click="adicionar(d, columns[0].id)" class="btn btn-default btn-xs" v-tooltip="'Adicionar'"><i class="glyphicon glyphicon glyphicon-menu-left"></i></i>
									</td>
									<td class="text-center" :style="length(c.length,0)" v-for="c in columns" v-show="c.visible" :width="c.ordem === 0 ? '5%' : length(c.length,1)">

										<!-- Texto comum --> 
										<div v-if="c.type == 'text'">
											{{ d[c.id] }}
										</div>

										<!-- Data --> 
										<div v-if="c.type == 'date'">
											{{ format_date(d[c.id]) }}
										</div>

										<!-- Cpf --> 
										<div v-if="c.type == 'cpf'">
											{{ d[c.id] }}
										</div>

										<!-- Input Text --> 
										<div v-else-if="c.type == 'input-text'">
											<input type="text" :id="c.id" :name="c.id" class="form-control text-center" v-model="d[c.id]" @change="change(d)"/>
										</div>

										<!-- Play / Stop --> 
										<div v-else-if="c.type == 'play_stop'">
											<i class="fa " :class="{ 'fa-play-circle-o fa-2x': d.controle == 2, 'fa-stop-circle-o fa-2x': d.controle == 1}" style="cursor: pointer;" @click="play_stop(d)" aria-hidden="true"></i>
										</div>

										<!-- Progress bar --> 
										<div v-else-if="c.type == 'progress_bar'">
											<div class="progress progress-striped">
											  <div class="progress-bar progress-bar-success" role="progressbar" style="width: 50%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">50%</div>
											</div>
										</div>

										<!-- Button --> 
										<div v-else-if="c.type == 'button'">
											<button class="btn btn-default" @click="btn_executar()">Executar</button>
										</div>

									</td>
									<td v-show="acoes" width="1%" nowrap class="text-center" >
										<i v-show="acoes_btn_edit" @click="editar(d)" class="btn btn-default btn-xs" v-tooltip="'Editar'"><i class="glyphicon glyphicon-pencil"></i></i>
										<i v-show="acoes_btn_remove" class="btn btn-default btn-xs" v-tooltip="'Excluir'" @click="excluir(d)"><i class="glyphicon glyphicon-trash"></i></i>
									</td>
									<td v-show="btn_remover" width="1%" nowrap class="text-center">
										<i @click="remover(d)" class="btn btn-default btn-xs" v-tooltip="'Remover'"><i class="glyphicon glyphicon-menu-right"></i></i>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="text-center" v-if="paginator">
							<dc-pagination :source="pagination" @navigate="listar"></dc-pagination>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.tscroll{
		width: 100%;
		height: 70%;
		overflow: auto;
	}
</style>