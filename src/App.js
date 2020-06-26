import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './components/Modal';
import axios from 'axios';
const todoItems = [
      {
        id: 1,
        banned_username: "Go to Market",
        ban_reason: "Buy ingredients to prepare dinner",
      }
    ]
class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        todoList: []
      };
    }
    componentDidMount() {
      this.refreshList();
    }
    refreshList = () => {
      axios
          .get("https://bannylist.herokuapp.com/api/testviews/")
          .then(res => this.setState({ todoList: res.data }))
          .catch(err => console.log(err));
    };
    renderItems = () => {
        const newItems = this.state.todoList
        return newItems.map(item => (


          <tr key={item.id}>
            <td>
                {item.banned_username}
            </td>
            <td>
                {item.ban_reason}
            </td>
            <td>
              <button onClick={() => this.editItem(item)} className="btn btn-secondary mr-2"> Edit </button>
              <button onClick={() => this.handleDelete(item)} className="btn btn-danger"> Delete </button>
            </td>
          </tr>


        ));
    };
    handleDelete = item => {
        alert("delete" + JSON.stringify(item));
        axios
          .delete(`https://bannylist.herokuapp.com/api/testviews/${item.id}`)
          .then(res => this.refreshList());
    };
    createItem = () => {
        const item = { banned_username: "", ban_reason: ""};
        this.setState({ activeItem: item, modal: !this.state.modal });
    };
      editItem = item => {
         this.setState({ activeItem: item, modal: !this.state.modal });
    };
    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
    handleSubmit = item => {
        this.toggle();
        if (item.id) {
          axios
          .put(`https://bannylist.herokuapp.com/api/testviews/${item.id}/`, item)
          .then(res => this.refreshList());
          return;
        }
        axios
        .post("https://bannylist.herokuapp.com/api/testviews/", item)
        .then(res => this.refreshList());
};
    render() {
      return (
        <main>
        <h2 >Banned Users</h2>
        <div>
          <table className='intro'>
            {this.renderItems()}
          </table>
          </div>
          <div className="row ">
            <div className="col-md-6 col-sm-5 mx-auto p-0">
              <div className="card p-3">

                  <button onClick={this.createItem} className="btn btn-primary">
                    Ban User
                  </button>

              </div>
            </div>
          </div>
          {this.state.modal ? (
              <Modal
                  activeItem={this.state.activeItem}
                  toggle={this.toggle}
                  onSave={this.handleSubmit}
              />
          ) : null}
        </main>
      );
    }
  }

export default App;
