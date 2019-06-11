import React, { Component } from "react";
import PropTypes from "prop-types";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import SearchField from "react-search-field";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./dash.css"

class Dashboard extends Component {
  // runs when page loads
  componentDidMount = () => {
    this.getContacts();
    console.log("You tried");
  }

  getContacts = () => {
    axios
      .get("/api/users/contacts/" + localStorage.userId)
      .then(res => {
        this.setState((state, props) => {
          const tmp = res.data.length > 0 ? res.data[0]._id : null
          return { shownContacts: res.data, contacts: res.data, toDelete: tmp };
        });
      }).catch(err => {
        console.log("Nice try");
      });

      // // update the shownContacts
      // this.setState((state, props) => {
      //   return { shownContacts: this.state.contacts };
      // });
  }

  checkLocalStorage = () => {
    console.log(localStorage);
  }

  checkState = () => {
    console.log(this.state.contacts)
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  deleteContact = () => {
    axios.delete('/api/users/contacts/' + this.state.toDelete)
      .then((res) => {
        console.log("deleted!");
        // clear search bar here!
        this.getContacts();
        console.log(this.state.toDelete);
      }).catch(() => {
        console.log("delete failed");
      })
    }

  radioChange = (contactId) => {
    console.log("radio button change");
    this.setState((state, props) => {
      return { toDelete: contactId };
    });
  }

  searchChange = (str) => {
    if (str == '') {
      this.setState((state, props) => {
        return { shownContacts: this.state.contacts };
      });
      return;
    }
    const tmp = this.state.shownContacts.filter(contact => contact.name.includes(str));
    this.setState((state, props) => {
      return { shownContacts: tmp };
    });
  }

  addContact = () => {
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      owner: localStorage.userId
    }

    axios
      .post("/api/users/contacts", data)
      .then(res => {
        // clear search bar here!
        this.getContacts();
      }).catch(err =>
        console.log("error")
      );
  }

  constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            phone: '',
            deleted: false,
            toDelete: '',
            shownContacts: [],
            contacts: []
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        this.state ({
            name: '',
            email: '',
            phone: '',
            deleted: false
        })
    }

    renderContactItem = (data) => {
      return (
        <RadioButton value={this.state.toDelete} key={data._id}>
          <div onClick={() => this.radioChange(data._id)}
              classNames="contact-list">
            <p>{data.email}</p>
            <p>{data.name}</p>
            <p>{data.phone}</p>
          </div>
        </RadioButton>

      );
    }

    render() {
      return (
        <div style={{ background:"lightgray", width:"100%", height:"650px"}}>
        <SearchField
          placeholder="Search..."
          onChange={this.searchChange}
          classNames="test-class"
        />
        <h3 style={{
          fontFamily: "monospace"
        }}>Add New Contact</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input  type="text"
                    className="form-control"
                    id="name"
                    value={this.state.todo_description}
                    onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input  type="text"
                    id="email"
                    className="form-control"
                  //  value={this.state.todo_responsible}
                  //  onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input  type="text"
                    id="phone"
                    className="form-control"
                  //  value={this.state.todo_responsible}
                  //  onChange={this.onChangeTodoResponsible}
            />
          </div>
        </form>
        <RadioGroup horizontal>
          {this.state.shownContacts.map(item =>
            this.renderContactItem(item)
          )}
        </RadioGroup>
          <button
            onClick={this.addContact}
            className="btn btn-large waves-effect waves-light hoverable black accent-3"
          >
            Add Contact
          </button>
          <button
            onClick={this.onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable black accent-3"
          >
            Logout
          </button>
          <button
            onClick={this.deleteContact}
            className="btn btn-large waves-effect waves-light hoverable black accent-3"
          >
            Delete
          </button>
          </div>
        );
      }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
