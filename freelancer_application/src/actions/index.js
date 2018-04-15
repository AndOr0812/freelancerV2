import axios from 'axios';
import FormData from 'form-data';

export const CREATE_USER = 'create_user';

export const AUTHENTICATE_USER = 'authenticate_user';

export const LOGOUT_USER = 'logout_user';

export const GET_IMAGES = 'get_images';

export const USER_PROFILE_UPDATE = 'profile_update';

export const GET_PROFILE_DETAILS = 'get_profile_details';

export const POST_PROJECT = 'post_project';

export const ALL_OPEN_PROJECTS = 'all_open_projects';

export const RELEVANT_PROJECTS = 'relevant_projects';

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
    if(!emailId){
        console.log("Inside the emailid is undefined");
        emailId = 'undefined';
    }
    const request = axios.get(`${ROOT_URL}/profile/getdetails/${emailId}`,{withCredentials: true});

    return (dispatch) => {
        request.then(
            ({data}) => {
                console.log("Inside the getUserProfile dispatcher function");
                console.log(data);
                callback(data);
                if (data.user) {
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
                if (data.code === 200) {
                    dispatch({
                        type: USER_PROFILE_UPDATE,
                        payload: data.user
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

//Action creator to fetch the list of all open projects

export function getAllProjects(callback) {
    console.log("Inside the getAll Projects action creator");

    const request = axios.get(`${ROOT_URL}/projects/all`,{withCredentials:true});

    return (dispatch) => {
        request.then(
            ({data}) => {
                console.log("Inside the get all open projects dispatcher function");
                console.log(data);
                callback(data);
                if (data) {
                    //getUserProfile(data.user.emailid);
                    console.log(`User returned is ${data}`)
                    dispatch({
                        type: ALL_OPEN_PROJECTS,
                        payload: data.projects
                    });
                }
            }
        )};
}

export function getRelevantProjects(values,callback) {
    console.log("Inside the get relevant Projects action creator");
    console.log(values);
    console.log(typeof values);
    var final_value="";
    if(!values || values === undefined || values === null){
        final_value="";
        return;
    }else {
        console.log("before final_value data is");
        final_value = values.substr(values.indexOf("[") + 1, values.lastIndexOf("]") -1);
        console.log("after final_value data is");
        console.log(final_value);
        console.log(typeof final_value);
    }
    const request = axios.get(`${ROOT_URL}/projects/relevant/${final_value}`,{withCredentials:true});

    return (dispatch) => {
        request.then(
            ({data}) => {
                console.log("Inside the get all open projects dispatcher function");
                console.log(data);
                callback(data);
                if (data) {
                    //getUserProfile(data.user.emailid);
                    console.log(`User returned is ${data}`)
                    dispatch({
                        type: RELEVANT_PROJECTS,
                        payload: data.projects
                    });
                }
            }
        )};
}


//Action Creator for the Login Page
export function postProject(values,callback) {
    console.log('inside post Project action creator');
    console.log(JSON.stringify(values));
    console.log(`values.proj_name is ${values.proj_name}`);
    let body = new FormData();
    body.set('proj_name',values.proj_name);
    body.set('proj_desc',values.proj_desc);
    body.set('proj_budget',values.proj_budget);
    body.set('proj_skills',values.proj_skills);
    body.set('proj_status',values.proj_status);
    body.set('employerId',values.employerId);
    body.set('employerName',values.employerName);
    //body.set('files',values.files);
    /*body.append('')*/
   /* Object.keys(values).forEach(( key ) => {
        /!*if (key === 'files')*!/
            console.log("values[key] is ");
            console.log(values[key]);
        body.set(key, values[ key ]);
    });*/

/*    for (let pair of body.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }*/

    console.log("The body after mapping is");
    console.info(body);
    console.log("raw values is ");
    console.info(values);

    const request =fetch(`${ROOT_URL}/projects/new`, {
        method:'POST',
        body: body,
        credentials:'include',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*'/*,
            'Content-Type': 'multipart/form-data'*/
        },
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
            (res) => {
                console.log("Inside the post project dispatcher function");
                console.log(res);
                if(res.ok){
                    res.json().then( json_data => {
                        callback(json_data);
                        if (json_data.code === 200) {
                            dispatch({
                                type: POST_PROJECT,
                                payload: json_data.user.ops[0]
                            });
                        }
                    });
                }
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