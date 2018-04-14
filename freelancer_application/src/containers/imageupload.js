import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class ImageUpload extends Component {
    render(){
        return (
            <div className="col-sm-3">
                <div className="card" style={{width: 15 +"rem"}}>
                    <img className="card-img-top" src={this.props.current_profile_details.imgPath} alt="Upload Photo" />
                    <div className="card-body">
                        <h6 className="card-title font-weight-bold">{this.props.current_user.emailid}</h6>
                        <p className="card-text">{this.props.current_profile_details.phone}</p>
                    </div>
                </div>
            </div>
        );
    }
};


const mapStateToProps = state => {
    return {
        current_user: state.userProfile,
        current_profile_details : state.profileDetails,
    }
};


export default withRouter(connect(mapStateToProps,null)(ImageUpload));

