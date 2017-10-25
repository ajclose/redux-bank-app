import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAccount }  from '../actions/index';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
//import router Link
import { Link } from 'react-router-dom';

class AccountDetail extends Component {
  render() {
    if (!this.props.account) {
      return (
        <div>Please select an account</div>
      )
    }
    return (
      <div className="col-md-6">
        <div className= "card">
          <div className= "card-block">
            <h4 className= "card-title">Account Information</h4>
            <h6 className= "card-subtitle mb-2 text-muted">{this.props.account.accountType} for {this.props.user.name}</h6>
            <div className= "card-text">
              <div>Balance: ${this.props.account.balance}</div>

            </div>
          </div>
          <Link className="btn btn-primary" to="/users" >Back to List of Users</Link>
        </div>


      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.selectedUser,
    account: state.selectedAccount
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectAccount: selectAccount
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
