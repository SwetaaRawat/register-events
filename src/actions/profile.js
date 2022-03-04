import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR,CLEAR_PROFILE } from "./types";
import { BASE_URL } from "./../config/default";

//Create or update profile
export const createProfile = (formData,  edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post(BASE_URL+'/api/dashboard', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    console.log(res.data);
     
    dispatch(setAlert(edit ? 'Profile Update' : 'Data Saved!', 'success'));
    
  
    
  } catch (err) {
   const errors = err.response.data.errors;
   console.log(errors);

   if (errors) {
     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
     
   }
    
   dispatch({
     type: PROFILE_ERROR,
     payload: {
       msg: err.response.data.statusTest,
       status: err.response.status,
     },
   });
  }
};


//Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  console.log("Profile Requested");
  try {
    const res = await axios.get(BASE_URL + "/api/profile/me");
    console.log("Profile data", res);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};


// Delete Data
export const deleteData = () => async dispatch => {
  if(window.confirm('Are you sure? This data will be deleted!')){
    try {
     await axios.delete(BASE_URL+'/api/dashboard');
       
      dispatch({type: CLEAR_PROFILE});
      
  
      dispatch(setAlert('Your data has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.data.statusTest,
          status: err.response.status,
        },
      });
    }
  }
  
};


