import React,{ Component } from 'react';
//import ImageGridList from "../components/ImageGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {uploadFile,getImages} from "../actions";

class fileUploadComponent extends Component {

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);

        console.log("The uploaded payload is ");
        console.info(payload);
        console.log("calling the uploadfile dispatcher function");
        this.props.uploadFile(payload);/*
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data
                            });
                        });
                }
            });*/

    };


    componentDidMount() {
        this.props.getImages();
    };

    render(){
        return ( <div >
                <Typography
                    align={'center'}
                    type="display3"
                >
                    My Photo App
                </Typography>
                <TextField
                    className={'fileupload'}
                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />
                <img src="http://localhost:5000/uploads/mypic-1521332636649.jpeg" alt="MyImage"/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        images : state.images
    }
};

export default withRouter(connect(mapStateToProps,{uploadFile,getImages})(fileUploadComponent));