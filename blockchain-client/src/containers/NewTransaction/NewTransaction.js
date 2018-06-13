import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './NewTransaction.css';

class NewTransaction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canMine: false,
            loading: false,
            miningDone: false,
            oldOwner: '',
            newOwner: '',
            date: '',
            kmDriven: '',
            remarks: '',
            saleAmount: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewTransaction = this.addNewTransaction.bind(this);
        this.doMining = this.doMining.bind(this);
    }


    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    settingInitialValues(initialValues) {
        this.setState({
            oldOwner: initialValues.oldOwner,
            newOwner: initialValues.newOwner,
            date: initialValues.date,
            kmDriven: initialValues.kmDriven,
            saleAmount: initialValues.saleAmount
        });
    }

    componentWillMount() {
        axios.get('http://localhost:3500/lasttransaction')
            .then(res => {
                this.settingInitialValues(res.data.lastTransaction.transactions[0]);
            })
    }

    doMining() {
        this.setState({ loading: true });
        axios.get('http://localhost:3500/mine')
            .then(res => {
                this.setState({ loading: false, miningDone: true })
            })
    }


    addNewTransaction = () => {
        axios.post(`http://localhost:3500/transactions/new`, {
            oldOwner: this.state.oldOwner,
            newOwner: this.state.newOwner,
            saleAmount: this.state.saleAmount,
            date: this.state.date,
            kmDriven: this.state.kmDriven,
            remarks: this.state.remarks
        }).then(res => {
            this.setState({ canMine: true });
        })
    }

    render() {
        const textAreaStyle = {
            height: '50px',
            width: '300px'
        }



        const FormElements = () => {
            return (
                <div>
                    <div>
                        Old Owner Name: <input type="text" name='oldOwner' onChange={this.handleChange} value={this.state.oldOwner}></input>
                    </div>
                    <div className="spacer"></div>
                    <div>
                        Current Owner Name: <input type="text" name='newOwner' onChange={this.handleChange} value={this.state.newOwner}></input>
                    </div>
                    <div className="spacer"></div>
                    <div>
                        Date: <input type="text" name='date' onChange={this.handleChange} value={this.state.date}></input>
                    </div>
                    <div className="spacer"></div>
                    <div>
                        kmDriven: <input type="text" name='kmDriven' onChange={this.handleChange} value={this.state.kmDriven}></input>
                    </div>
                    <div className="spacer"></div>
                    <div>
                        Sale Amount: <input type="text" name='saleAmount' onChange={this.handleChange} value={this.state.saleAmount}></input>
                    </div>
                    <div className="spacer"></div>
                    <div>
                        Remarks: <textarea style={textAreaStyle} type="text" name='remarks' onChange={this.handleChange} value={this.state.remarks}></textarea>
                    </div>

                    <div className="spacer"></div>

                    <div>
                        <div className="new-button-div">
                            <button onClick={this.addNewTransaction} className="button-transaction-new">ADD</button>
                        </div>
                    </div>
                </div>
            )
        }


        const LoadingElements = () => {
            if (this.state.canMine && !this.state.loading && !this.state.miningDone) {
                return (
                    <div>
                        <div className="new-button-div">
                            <p>Kindly click on mine , so that new transaction data will be added to the chain</p>
                            <button onClick={this.doMining} className="button-transaction-new">Mine</button>
                        </div>
                    </div>
                )
            }

            if (this.state.canMine && this.state.loading) {
                return (
                    <div>
                        <div className="new-button-div">
                            <button className="button-transaction-new">Minining.......</button>
                        </div>
                    </div>
                )

            }

            if (this.state.miningDone && !this.state.loading) {
                return (
                    <div>
                        <div className="new-button-div">
                            <p>New Record is added succefully to the chain</p>
                            <button onClick={() => window.history.go(-1)} className="button-transaction-new">Back to records list</button>
                        </div>
                    </div>
                )

            }
        }

        return (
            <div className="Cars-List">
                {!this.state.canMine ?
                    <FormElements /> :
                    <LoadingElements />
                }
            </div>


        )
    }
}

export default NewTransaction;