<template>
  <div id="app">
    <h1 v-html="title"></h1>
    <input v-model="newItem" @keyup.enter="addNew"/>
    <ul>
    	<li v-for="item in items" 
    		v-bind:class="[liClass,{finished:item.isFinished}]"
    		v-on:click="toggleFin(item)">
    		{{item.label}}
    	</li>
    </ul>
  </div>
</template>

<script>
import Store from './store.js'
//console.log(Store);
export default {
  data:function(){
  	return {
  		title:'this is my first vue project from mk',
  		items:Store.fetch(),
  		liClass:'thisIsLiclass',
  		newItem:''
  	}
  },
  watch:{
  	items:{
  		handler:function(item){
  			//console.log(val,oldval);
  			Store.save(item)
  		},
  		deep:true //深拷贝
  	}
  },
  methods:{
  	toggleFin:function(item){
  		console.log(item);
  		item.isFinished = !item.isFinished;
  	},
  	addNew:function(){
  		if(this.newItem != ''){
	  		this.items.push({
	  			label:this.newItem,
	  			isFinished:false
	  		});
  		}
  		this.newItem = '';
  	}
  }
}
</script>

<style>
.finished{text-decoration: line-through;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
