<script>

	import DcLoading from './dc-loading.vue'

	export default{
		name: 'DcNavigator',
		props: {
			nome_tab: {type: String, default: ''},
			next_tab: {type: String, default: ''},
			previous_tab: {type: String, default: ''},
			titulo_previous: {type: String, default: 'Anterior'},
			titulo_home: {type: String, default: 'Principal'},
			titulo_next: {type: String, default: 'Próximo'},
			icone_next: {type: String, default: 'glyphicon-forward'},
			icone_previous: {type: String, default: 'glyphicon-backward'},
			icone_home: {type: String, default: 'glyphicon-home'},
			titulo_select: {type: String, default: 'Item'},
			home_link: {type: String, default: ''},
			id_select: {type: String, default: ''},
			desc_select: {type: String, default: ''},
			btn_salvar: {type: Boolean, default: true},
		},
		components:{
			DcLoading
		},
		data(){
			return {
				isSearching: false,
				isProcessing: false,
				move_tab: false,
				tab_redirect: '',
				local: ''
			}
		},
		mounted(){
			this.set_navigation_false()

			this.$bus.$on('processando', obj =>{
				this.isProcessing = obj.val
			})

			this.$bus.$on('set_actual_tab_is_edited', obj =>{
				this.setTabEdited()
			})

			this.$bus.$on('go_home_page', obj =>{
				this.home()
			})

			this.$bus.$on('go_to_tab', obj =>{
				this.go_to_router(obj.url_tab)
			})

			this.$nextTick(function () {
				this.$bus.$emit('set-active', {active: this.nome_tab})
			})

			// if (this.$store.state.navigator.item_id == 0){
			// 	this.$router.push(home_link)
			// }
		},
		methods:{
			home(){
				this.$emit('home')

				var h = {
					list: [],
					id: 0
				}

				this.$store.commit('SET_NAVIGATOR_ITEM_ID', h.id)
				// this.$store.commit('SET_NAVIGATOR_LIST', h.list)
				this.$store.commit('SET_TABS_IS_EDITING', false)
				this.clear_table()
				this.go_to_router('')
			},
			clear_table(){
				this.$store.commit('REMOVE_ALL_TABLE')
			},
			gravar(){
				this.$emit('gravar',{id_item: this.item_id, nome_tab: this.nome_tab, move_tab: this.move_tab})
			},
			change(){
				this.$emit('change',{id_item: this.item_id})
			},
			confirm_modal(){
				const vmNavigator = this

				BootstrapDialog.show({
                title:'Aviso',
                message: 'Algumas informações foram editadas, desaja salvar as modificações?',
                type: BootstrapDialog.TYPE_WARNING,
                buttons: [{
                    label: 'Salvar e Prosseguir',
                    cssClass: 'btn-primary',
                    action: function(dialogItself){
                    	vmNavigator.move_tab = true
                        dialogItself.close()
                        vmNavigator.gravar()
                    }
                },{
                    label: 'Prosseguir',
                    action: function(dialogItself){
                        if(vmNavigator.local == "tab"){
                        	vmNavigator.go_to_router(vmNavigator.tab_redirect)
                        }else{
                        	vmNavigator.home()
                        }
                        vmNavigator.set_navigation_false()
                        dialogItself.close()
                    }
                }]
                });
			},
			change_tab(tab_to_move, local){
				this.tab_redirect = tab_to_move
				this.local = local
				if(this.local == "tab"){
					if(this.$store.state.navigator.is_edited == true){
						this.confirm_modal()
					}else{
						this.go_to_router(this.tab_redirect)
					}
				}else{
					if(this.$store.state.navigator.is_edited == true){
						this.confirm_modal()
					}else{
						this.home()
					}
				}
			},
			go_to_router(url){
				if (url == ''){
					url = this.home_link
				}
				this.$router.push(url)
			},
			set_navigation_false(){
				if (this.$store.state.navigator.success_save == true) {
					this.$store.commit('SET_STATE_SUCCESS_SAVE', false)
				}
				if (this.$store.state.navigator.is_edited == true) {
					this.$store.commit('SET_STATE_TAB_IS_EDITED', false)
				}
				this.move_tab = false
			},
			setTabEdited(){
                if (this.$store.state.navigator.is_edited == false) {
                    this.$store.commit('SET_STATE_TAB_IS_EDITED', true)
                }
            }
		},
		computed:{
			list(){
				return this.$store.state.navigator.list
			},
			item_id(){
				return this.$store.state.navigator.item_id
			},
			redirect(){
				return this.$store.state.navigator.success_save
			}
		},
		watch: {
		    redirect: {
		        handler(val, oldVal) {
		        	if(this.move_tab == true){
		        		if(this.local == "tab"){
		            		this.go_to_router(this.tab_redirect);
		        		}else{
		        			this.home();
		        		}
		        	}
		        	this.set_navigation_false()
		        }
		    }
		},
	}
</script>

<template>
	<div>
		<br>
		<div class="row">
			<div class="col-md-12">
				<div class="col-md-4">
					<div v-if="isSearching">
						<div class="input-group">
						<span class="input-group-addon" id="basic-addon3"><i class="fa fa-cog fa-spin fa-1x fa-fw"></i></span>
						<input class="form-control" type="text" value="Estrategia" readonly="readonly">
						</div>
					</div>
					<div class="form-group" v-else>
						<div class="input-group" v-if="id_select !== '' && desc_select !== ''">
						  	<span class="input-group-addon" id="basic-addon3">{{ titulo_select }}</span>
						  	<select class="form-control" name="estrategia_id" @change="change()"  v-model="item_id" disabled="disabled">
								<option id="" value="ZZZ">( Selecione )</option>
								<option v-for="l in list" :id="l[id_select]" :value="l[id_select]">
									{{l[id_select]}} - {{l[desc_select]}}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div id="container">
						<div class="box" v-if="previous_tab !== ''" >
							<i class="btn btn-default" v-tooltip="titulo_previous" @click="change_tab(previous_tab, 'tab')"><i class="glyphicon" :class="icone_previous" style="color:black;"></i></i>
						</div>
						<div class="box" v-if="home_link !== ''">
							<i class="btn btn-default" v-tooltip="titulo_home" @click="change_tab(home_link, 'home')"><i class="glyphicon" :class="icone_home" style="color:black;"></i></i>
						</div>
						<div class="box" v-if="next_tab !== ''" >
							<i class="btn btn-default" v-tooltip="titulo_next" @click="change_tab(next_tab, 'tab')"><i class="glyphicon" :class="icone_next" style="color:black;"></i></i>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div style="float:right; margin: 0 20px 20px 20px;" v-show="btn_salvar">
						<span class="btn btn-default" @click="gravar()"><i class="glyphicon glyphicon-floppy-disk"></i> Salvar</span>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
        	<div class="col-md-12">
				<div class="row">
					<div class="col-md-4">
					</div>
					<div class="col-md-4">
						<div class="text-center" v-if="isProcessing">
							<Dc-loading :texto="'Processando...'"></Dc-loading>
						</div>
					</div>
					<div class="col-md-4">
					</div>
				</div>
			</div>
		</div>
		<hr style="margin-top:3px;">
	</div>
</template>

<style>
#container {
    width: 100%;
    border-color: blue;
    text-align: center;
}

.box {
    display: inline-block;
    margin: 0px 0px;
}
</style>
