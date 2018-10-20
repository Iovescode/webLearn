import React, { Component } from 'react';

import Tolist from './toList'

class App extends Component {
  constructor(props){
    super(props)
    this.btn=this.btn.bind(this)
    this.chang=this.chang.bind(this)
    this.dels=this.dels.bind(this)
    this.state={
      list:[],
      inputval:''
    }

  }
  
  btn(){
    this.setState({
      list:[...this.state.list,this.state.inputval]
    })
  }

  chang(e){
    this.setState({
      inputval:e.target.value
    })
  }

  dels(index){
   const list=[...this.state.list]
    list.splice(index,1)
    this.setState({list})
  }

  render() {
    return (  
      <div>
        <input value={this.state.inputval} onChange={this.chang}/>
        <button onClick={this.btn}>add</button>

        <ul>
          {this.state.list.map((item ,index)=>{
            return <Tolist   my={this.dels} cont={item} key={index} idnex={index}/>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
