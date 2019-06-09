import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();


  };

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
    const { user } = this.props.auth;
return (



            <div style={{marginTop: 20}}>
                  <h3>Add New Contact</h3>
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                          <label>Email</label>
                          <input  type="text"
                                  className="form-control"
                                  value={this.state.todo_description}
                                  onChange={this.onChangeTodoDescription}
                                  />
                      </div>
                      <div className="form-group">
                          <label>Phone Number</label>
                          <input  type="text"
                                  className="form-control"
                                  value={this.state.todo_responsible}
                                  onChange={this.onChangeTodoResponsible}
                                  />
                      </div>
                      <div className="form-group">
                          <div className="form-check form-check-inline">
                              <input  className="form-check-input"
                                      type="radio"
                                      name="priorityOptions"
                                      id="priorityLow"
                                      value="Low"
                                      checked={this.state.todo_priority==='Low'}
                                      onChange={this.onChangeTodoPriority}
                                      />
                              <label className="form-check-label">Low</label>
                          </div>
                          <div className="form-check form-check-inline">
                              <input  className="form-check-input"
                                      type="radio"
                                      name="priorityOptions"
                                      id="priorityMedium"
                                      value="Medium"
                                      checked={this.state.todo_priority==='Medium'}
                                      onChange={this.onChangeTodoPriority}
                                      />
                              <label className="form-check-label">Medium</label>
                          </div>
                          <div className="form-check form-check-inline">
                              <input  className="form-check-input"
                                      type="radio"
                                      name="priorityOptions"
                                      id="priorityHigh"
                                      value="High"
                                      checked={this.state.todo_priority==='High'}
                                      onChange={this.onChangeTodoPriority}
                                      />
                              <label className="form-check-label">High</label>
                          </div>
                      </div>
                      <div className="form-group">
                          <input type="submit" value="Delete" className="btn btn-primary" />
                      </div>
                  </form>



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
