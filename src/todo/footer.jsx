//引入footer.styl文件
import '../assets/styles/footer.styl'

export default {
  data(){
    return{
      author: 'zhangsolstice'
    }
  },
  //使用渲染函数代替模板
  render(){
    return(
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}