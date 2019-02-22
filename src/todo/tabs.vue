<template lang="pug">
  div(class="helper")
    span(class="left") {{unFinishedTodoLength}} items left
    span(class="tabs")
      span(
        v-for="state in states"
        :key="state"
        :class="[state,filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
      ) {{state}}
    span(
      class="clear"
      @click="clearAllCompleted"
    ) Clear completed
</template>

<script>
export default {
  //父组件向子组件传递字符串对象filter和数组对象todos
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      //states数组初始包含三个值
      states: ['all','active','completed']
    }
  },
  methods: {
    //触发父组件的togole事件
    toggleFilter(state){
      this.$emit('togole',state)
    },
    //触发父组件的clearAllCompleted事件
    clearAllCompleted(){
      this.$emit('clearAllCompleted')
    }
  },
  computed:{
    //unFinishedTodoLength的值为：todos数组过滤出所有未完成的todo的新数组的length
    unFinishedTodoLength(){
      return this.todos.filter(todo => !todo.completed).length
    }
  }
}
</script>

<style lang="stylus" scoped>
  .helper
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0 
    line-height 30px
    background-color #ffffff
    font-size 14px
    font-smoothing antialiased 
  .left, .clear, .tabs
    padding 0 10px
  .left, .clear
    width 150px
  .left 
    text-algin center 
  .clear 
    text-align right
    cursor pointer
  .tabs
    width 200px
    display flex
    justify-content space-between
    * 
      display inline-block
      padding 0 10px
      cursor pointer
      border 1px solid rgba(175,47,47,0)
      &.actived
        border-color rgba(175,47,47,0.4)
        border-radius 5px
</style>
