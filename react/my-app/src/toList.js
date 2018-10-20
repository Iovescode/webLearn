import React, { Component } from 'react';
class Todolist extends Component {
    constructor(props){
        super(props)
        this.del=this.del.bind(this)
    }
    
    del(){
        this.props.my(this.props.index)
    }
  render() {
    return (
      <div>
          <li onClick={this.del} >{this.props.cont}</li>
      </div>
    );
  }
}

export default Todolist;
