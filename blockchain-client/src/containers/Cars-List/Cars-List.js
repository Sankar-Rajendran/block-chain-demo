import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Cars-List.css';



class CarsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carsList: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3500/chain')
            .then(res => {
                const carsList = res.data.chain.splice(1, res.data.chain.length - 1);
                this.setState({ carsList });
            })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            carsList: nextProps.carsList
        });
    }


    render() {
        const carsList = this.state.carsList;

        const NewButton = () => {
            return (
                <div className="new-button-div">
                    <Link to={'/new'}>
                        <button className="button-transaction-new">Add New Transaction</button>
                    </Link>
                </div>
            )
        }

        const CarsList = () => {
            return (
                carsList.map(car => {
                    return (
                        <div key={car.index} >
                            <div className="Cars-List">
                                <p>Old Owner : {car.transactions[0].oldOwner}</p>
                                <p>Current Owner : {car.transactions[0].newOwner}</p>
                                <p> Sale Amount : {car.transactions[0].saleAmount}</p>
                                <p>Date : {car.transactions[0].date}</p>
                                <p>Hash : <span className="hash-value">{car.hash}</span> </p>
                                <p>Previous hash : <span className="hash-value"> {car.previous_hash} </span> </p>
                                <p>Remarks : {car.transactions[0].remarks}</p>
                            </div>
                            <div className="spacer">
                            </div>
                        </div>
                    )
                }
                )
            )
        }


        const CarDetail = () => {
            let car = carsList[0];
            if (carsList.length > 0) {
                return (
                    <div>
                        <div className="Cars-List">
                            <p> Engine Chasis No : {car.transactions[0].engineChasisNo}</p>
                            <p>Color : {car.transactions[0].color}</p>
                            <p>Vehicle No : {car.transactions[0].vehicleNo}</p>
                        </div>
                        <div className="spacer">
                        </div>
                    </div>
                )
            }
            else {
                return null;
            }
        }
        return (
            <div>
                <CarDetail />
                <NewButton />
                <CarsList />
            </div>



        )
    }
}

export default CarsList;