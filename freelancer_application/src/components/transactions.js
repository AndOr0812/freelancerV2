import React,{Component} from 'react';
import PieChart from 'react-simple-pie-chart';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Header from './headers';
import Home from '../containers/home';

class Transactions extends Component{
    componentWillMount(){
        if (JSON.stringify(this.props.current_user.isLoggedIn) === '{}'){
            this.props.history.push('/login');
        }
    }

    render(){
        return(<div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <Header/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <Home/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">Pie Chart for Income and Withdrawn amount</div>
                                </div>
                                <h4>Income</h4>
                            </div>
                            <div className="col-sm-8">
                            <PieChart
                                slices={[
                                    {
                                        color: '#f00',
                                        value: 10,
                                        name: "Income"
                                    },
                                    {
                                        color: '#0f0',
                                        value: 20,
                                        name: "WithDrawn"
                                    },
                                ]}
                            />
                            </div>
                            <div className="col-sm-2">
                                <div className="float-right">
                                <h4>WithDrawn</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mt-4">
                    <div className="row">
                        <div className="col-sm-12 mt-4">
                            <div className="col-sm-6"><h4>Total Funds:</h4></div>
                            <div className="col-sm-6"><h5>1050$$</h5></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <button type="button" className="btn btn-primary btn-block" onClick={this.handleBidClick}>Add Money</button>
                        </div>
                        <div className="col-sm-6">
                            <button type="button" className="btn btn-primary btn-block" onClick={this.handleBidClick}>WithDraw Money</button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <h4>Transaction History</h4>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Type</th>
                                <th scope="col">From/TO</th>
                                <th scope="col">Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">{new Date().toLocaleDateString()}</th>
                                <td>Income</td>
                                <td>Self</td>
                                <td>5000</td>
                            </tr>
                            <tr>
                                <th scope="row">{new Date().toLocaleDateString()}</th>
                                <td>Withdrawn</td>
                                <td>akhil.bhavirisetty@gmail.com</td>
                                <td>2000</td>
                            </tr>
                            <tr>
                                <th scope="row">{new Date().toLocaleDateString()}</th>
                                <td>Withdrawn</td>
                                <td>akhibuddi@gmail.com</td>
                                <td>1950</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps=(state)=>{
    return {
        current_user:state.userProfile,
        current_profile_details : state.profileDetails,
    }
};

export default withRouter(connect(mapStateToProps)
    (Transactions));
