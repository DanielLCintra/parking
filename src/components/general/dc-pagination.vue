<script>

	import {range} from 'lodash'

	export default{
		components:{

		},
		props:['source'],
		data(){
			return {

			}
		},
		computed:{
			pages(){
				const s = this.source

				return this.generatePagesArray(s.current_page,s.total,s.per_page,12)
			}
		},
		methods:{
			navigate(ev, page){
				ev.preventDefault()
				this.$emit('navigate',page)
			},
			nextPrev(ev, page){

				if (page == 0 || page == this.source.last_page+1){
					return;
				}

				this.navigate(ev, page)

			},
			generatePagesArray: function(currentPage, collectionLength, rowsPerPage, paginationRange){
			    var pages = [];
			    var totalPages = Math.ceil(collectionLength / rowsPerPage);
			    var halfWay = Math.ceil(paginationRange / 2);
			    var position;

			    if (currentPage <= halfWay) {
			        position = 'start';
			    } else if (totalPages - halfWay < currentPage) {
			        position = 'end';
			    } else {
			        position = 'middle';
			    }

			    var ellipsesNeeded = paginationRange < totalPages;
			    var i = 1;
			    while (i <= totalPages && i <= paginationRange) {
			        var pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
			        var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
			        var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
			        if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
			            pages.push('...');
			        } else {
			            pages.push(pageNumber);
			        }
			        i ++;
			    }
			    return pages;
			},

			calculatePageNumber: function(i, currentPage, paginationRange, totalPages){
			    var halfWay = Math.ceil(paginationRange/2);
			    if (i === paginationRange) {
			        return totalPages;
			    } else if (i === 1) {
			        return i;
			    } else if (paginationRange < totalPages) {
			        if (totalPages - halfWay < currentPage) {
			        return totalPages - paginationRange + i;
			    } else if (halfWay < currentPage) {
			        return currentPage - halfWay + i;
			    } else {
			        return i;
			    }
			    } else {
			        return i;
			    }
			}
		}

	}
</script>

<template>
	<div>
		<nav aria-label="Page navigation example">
		  <ul class="pagination">

		    <li :class="{ disabled: source.current_page == 1}">
		    	<a @click="nextPrev($event, source.current_page-1)" style="cursor:pointer;"><i class="glyphicon glyphicon-chevron-left"></i></a>
		    </li>

		    <li v-for="(page, key, index) in pages" :key="index" :class="{ active: source.current_page == page}">
		    	<span v-if="page == '...'">{{ page }}</span>
		    	<a v-if="page != '...'" @click="navigate($event, page)" style="cursor:pointer;">{{page}}</a>
		    </li>

		    <li :class="{ disabled: source.current_page == source.last_page}">
		    	<a @click="nextPrev($event, source.current_page+1)" style="cursor:pointer;"><i class="glyphicon glyphicon-chevron-right"></i></a>
		    </li>

		  </ul>
		</nav>
	</div>
</template>

<style>

</style>
