import axios from 'axios';
import FormData from 'form-data';

export const CREATE_USER = 'create_user';

export const AUTHENTICATE_USER = 'authenticate_user';

export const LOGOUT_USER = 'logout_user';

export const GET_IMAGES = 'get_images';

export const USER_PROFILE_UPDATE = 'profile_update';

export const GET_PROFILE_DETAILS = 'get_profile_details';

export const POST_PROJECT = 'post_project';

const ROOT_URL = 'http://localhost:3001';

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

export function getImages() {
    console.log("Inside the image Fetch action creator");
    const request= fetch(`${api}/files/`);

    return (dispatch) => {
        request.then(
            (res) => {
                console.log("Inside the image Fetch dispatcher function");
                console.log(res);
                if (res) {
                    dispatch({
                        type: GET_IMAGES,
                        payload: res
                    });
                }
            }
        ).catch(err => {
            console.info(err);
        })};
}


export function getUserProfile(emailId,callback) {
    console.log(`The emailId for which the profile should be fetched is ${emailId}`);
    const request = axios.get(`${ROOT_URL}/profile/getdetails/${emailId}`,{withCredentials: true});

    return (dispatch) => {
        request.then(
            ({data}) => {
                console.log("Inside the getUserProfile dispatcher function");
                console.log(data);
                callback(data);
                if (!data.user) {
                    //callback(data.user_profile);
                    dispatch({
                        type: GET_PROFILE_DETAILS,
                        payload: data.user
                    });
                }
            }
        )};
}
//Action Creator for the Login Page
export function profileUpdate(values,callback) {
    console.log('inside  user profile update action creator');
    console.info('profile_update_values',values);
    //const payload_response_data;
    const request = axios.post(`${ROOT_URL}/users/profile/update`,values,{withCredentials:true});

    return (dispatch) => {
        request.then(
            ({data}) => {
                console.log("Inside the profile update dispatcher function");
                console.log(data);
                callback(data);
                if (data.success) {
                    dispatch({
                        type: USER_PROFILE_UPDATE,
                        payload: data
                    });
                }
            }
        )};
}



export function uploadFile(payload,callback) {
    console.log("Inside the upload functionality");
    const request = fetch(`${api}/files/upload`, {
        method: 'POST',
        body: payload,
        credentials: 'include',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
        },
    });


    return (dispatch) => {
        request.then(res => {
            console.info('response',res);
            res.json().then( data => {
                console.log(data.filename);
                if (data.filename !== undefined) {
                    callback(data.filename);
                }
                else {
                    callback(false);
                }
            }
            )}).catch(error => {
            console.log("There is an error during Uploading of File");
            return error;
        });
        /*
                return {
                    type: CREATE_USER,
                    payload: request
                };*/
    };
}

//Action creator for the SignUp Page
export function createUsers(values,callback) {
    console.log('inside create user action creator');
    console.log(values);
    const request = axios.post(`${ROOT_URL}/signup`,values)
        .then(
            ({data}) => {
                console.log(`The data returned by signup api is : ${JSON.stringify(data)}`);
                if (data.emailid !== undefined || data !== null){
                    callback(data);
                } else {
                    callback('error');
                }
            })
        .catch(function (error) {
            if(error.response.status === 401){
                callback('error');
            }
            console.log(JSON.stringify(error));
        });

    return {
        type: CREATE_USER,
        payload: request
    };
}


//Action Creator for the Login Page
export function authenticateUser(values,callback) {
    console.log('inside authenticate user action creator');
    console.log(values);
    //const payload_response_data;
    const request = axios.post(`${ROOT_URL}/login`,values,{withCredentials:true});

        return (dispatch) => {
        request.then(
            ({data}) => {
                console.log("Inside the dispatcher function");
                console.log(data);
                callback(data);
                if (data) {
                    //getUserProfile(data.user.emailid);
                    console.log(`User returned is ${data}`)
                    dispatch({
                        type: AUTHENTICATE_USER,
                        payload: data
                    });
                }
            }
        )};
}



//Action Creator for the Login Page
export function postProject(values,callback) {
    console.log('inside authenticate user action creator');
    console.log(JSON.stringify(values));
    let body = new FormData();
    /*body.append('')*/
    Object.keys(values).forEach(( key ) => {
        if (key === 'files')
            console.log("values[key] is ");
            console.log(values[key]);
        body.append(key, values[ key ]);
    });

    for (let pair of body.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    console.log("The body after mapping is");
    console.info(body);
    console.log("raw values is ");
    console.info(values);

    const request =fetch(`${ROOT_URL}/projects/new`, {
        method:'POST',
        body: body,
/*        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'multipart/form-data'
        },*/
    });
    //const payload_response_data;
/*    const request = axios({
        url : `${ROOT_URL}/projects/new`,
        method: 'POST',
        formData: body,
        withCredentials:true,
        headers: {
            'accept':'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type' : `multipart/form-data`,
        }
    });*/
    //const request = axios.post(`${ROOT_URL}/projects/new`,body);

    return (dispatch) => {
        request.then(
            (/*{data}*/) => {
                console.log("Inside the post project dispatcher function");
                /*console.log(data);
                callback(data);
                if (data.success) {
                    dispatch({
                        type: POST_PROJECT,
                        payload: data
                    });
                }*/
            }
        )};
}


export function logout(callback) {
    const request = axios.post(`${ROOT_URL}/users/logout`,{withCredentials:true});
    console.log("Inside the logout action creator")

    return (dispatch) => {
        request.then(
            ({data}) => {
                console.log("Inside the Log Out dispatcher function");
                console.log(data);
                callback();
                dispatch({
                    type: LOGOUT_USER,
                    payload: {}
                });
            }
        )
    };

}