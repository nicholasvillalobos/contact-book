import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();


  };

  dopeFunction = () => {
    console.log("big titty bitches");
  }

  addContact = () => {
    const data = {
      name: "dick",
      email: "penis@dick.com",
      phone: "1234567890",
      owner: "5cf5cfca7c69529e049fe4c8"
    }

    axios
      .post("/api/users/contacts", data)
      .then(res => console.log(res, localStorage.jwtToken))
      .catch(err =>
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
            deleted: false
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


        // send through axios here

        this.state ({
            name: '',
            email: '',
            phone: '',
            deleted: false
        })
    }
render() {
  //  const { user } = this.props.auth;bi j
return (

            <div style={{marginTop: 20}}>
                  <h3>Add New Contact</h3>
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                          <label>Name</label>
                          <input  type="text"
                                  className="form-control"
                                  value={this.state.todo_description}
                                  onChange={this.onChangeTodoDescription}
                                  />
                      </div>
                      <div className="form-group">
                          <label>Email</label>
                          <input  type="text"
                                  className="form-control"
                                //  value={this.state.todo_responsible}
                                //  onChange={this.onChangeTodoResponsible}
                                  />
                      </div>

                      <div className="form-group">
                          <label>Phone Number</label>
                          <input  type="text"
                                  className="form-control"
                                //  value={this.state.todo_responsible}
                                //  onChange={this.onChangeTodoResponsible}
                                  />
                      </div>

                  </form>

                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    onClick={this.addContact}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Add Contact
                  </button>


            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
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
