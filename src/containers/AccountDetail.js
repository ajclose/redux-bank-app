import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withdrawFunds }  from '../actions/index';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
//import router Link
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { CSSTransitionGroup } from 'react-transition-group'

class AccountDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
    this.withdraw = this.withdraw.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  withdraw(e) {
    e.preventDefault()
    this.setState({
      modal: false
    })
    this.props.withdrawFunds(e.target.value)
  }

  render() {
    if (!this.props.account) {
      return (
        <div>Please select an account</div>
      )
    }

    const userIdx = this.props.users.findIndex(user => user._id === this.props.user._id)
    const accountIdx = this.props.users[userIdx].accounts.findIndex(account => account.id === this.props.account.id)

    return (
      <div className="col-md-6">
        <div className= "card">
          <div className= "card-block">
            <h4 className= "card-title">Account Information</h4>
            <h6 className= "card-subtitle mb-2 text-muted">{this.props.account.accountType} for {this.props.user.name}</h6>
            <div className= "card-text">
              <div>Balance: ${this.props.users[userIdx].accounts[accountIdx].balance}</div>

            </div>
          </div>
          <Button className="btn btn-danger" onClick={this.toggle} >Withdraw Funds</Button>
          <Link className="btn btn-primary" to="/users" >Back to List of Users</Link>
          <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Please select the amount you would like to withdraw.  <p>Your account balance is: ${this.props.users[userIdx].accounts[accountIdx].balance}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" value={5} onClick={this.withdraw}>$5</Button>{' '}
              <Button color="primary" value={10} onClick={this.withdraw}>$10</Button>{' '}
              <Button color="primary" value={20} onClick={this.withdraw}>$20</Button>{' '}
              <Button color="primary" value={50} onClick={this.withdraw}>$50</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>


      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    users: state.users,
    user: state.selectedUser,
    account: state.selectedAccount
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    withdrawFunds: withdrawFunds
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
