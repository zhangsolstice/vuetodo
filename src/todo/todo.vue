<template lang="pug">
//- 
  整个主体分为三部分：input，item和tabs 
-//
  section(class="real-app")
    //-绑定enter键的keyup事件来触发addTodo方法
    input(
      type="text" 
      class="add-input" 
      autofocus="autofocus" 
      placeholder="What is next "
      @keyup.enter="addTodo"
    )
    Item(
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    )
    Tabs(
      :filter="filter"
      :todos="todos"
      @togole="togoleFilter"
      @clearAllCompleted="clearAllCompleted"
    )
</template>

<script>
//引入两个子组件，为id设置初始值
import Tabs from './tabs.vue'
import Item from './item.vue'
let id = 0;

export default {
  data() {
    return {
      todos: [],
      //filter初始值为all
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filteredTodos(){
      //当filter值为all时，显示所有添加的列表项
      if(this.filter === 'all'){
        return this.todos
      }
      //将判断的布尔值结果赋给completed
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo(e){
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo(id){
      this.todos.splice(this.todos.findIndex(todo => todo.id == id),1)
    },
    togoleFilter(state){
      this.filter = state
    },
    clearAllCompleted(){
      this.todos = this.todos.filter(todo =>!todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .real-app
    width 600px
    margin 0 auto 
    box-shadow 0 0 5px #666

  .add-input
    position relative 
    margin 0
    width 100%
    font-size 24px
    font-family inherit 
    font-weight inherit 
    line-height 1.4em
    border none 
    outline none 
    color inherit 
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none 
    box-shadow inset 0 -2px 1px rgba(0,0,0,0.03)
</style>

