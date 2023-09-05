// authActions.js
import { clearCredentials,getCredentials,storeCredentials } from '../../utils/mmkvStorage';
import { authStart, authSuccess, authFailure,authLogout } from '../slices/authSlice';

export const login = (formData) => async (dispatch) => {
  dispatch(authStart());

   await fetch('http://192.168.225.88/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
          .then(response => {
            const serverStatus = response.status;
                    return response.json()
              .then(data => {
                return { serverStatus, data };
              });
          })
          .then(({ serverStatus, data }) => {
            // const message = data.message;
            // setErrors({apiError:message});
            console.log('DDDD',serverStatus, data);
      // Dispatch the success action with the user data
      if(data.status){
          dispatch(authSuccess(data));
          storeCredentials(data.user, data.token);

        }else{
          // console.error('LD',data);
          dispatch(authFailure(data.message));
        }
          })
          .catch(error => {
            // console.error('LE',error);
            dispatch(authFailure(error));
          });
          
  // return async (dispatch) => {
  //   try {
  //     // Make an API call to authenticate the user
  //     const response = await fetch('/api/login', {
  //       method: "POST",
  //       body: { email, password },
  //     });
  //     storeCredentials(response.data.username, response.data.password);

  //     // Dispatch the success action with the user data
  //     dispatch({
  //       type: 'LOGIN_SUCCESS',
  //       payload: response.data,
  //     });
  //   } catch (error) {
  //     // Dispatch the failure action with the error message
  //     dispatch({
  //       type: 'LOGIN_FAILURE',
  //       payload: error.response.data.error,
  //     });
  //   }
  // };
};

export const register = (formData) => async (dispatch) => {
  dispatch(authStart());

    
  await fetch('http://192.168.225.88/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    const serverStatus = response.status;
            return response.json()
      .then(data => {
        return { serverStatus, data };
      });
  })
  .then(({ serverStatus, data }) => {
    // const message = data.message;
    // setErrors({apiError:message});
    console.log('RRR',serverStatus, data);
// Dispatch the success action with the user data
if(data.status){
  dispatch(authSuccess(data));
  storeCredentials(data.user, data.token);
}else{
  dispatch(authFailure(data.message));
}
  })
  .catch(error => {
    console.error(error);
    dispatch(authFailure(error));
  });
};

export const logout = (payload) => async (dispatch) => {
  console.log('logoyt');
  dispatch(authLogout());
  clearCredentials();

};
export const tempAuthValidation = (payload) => async (dispatch) => {
    dispatch(authSuccess(payload));
};
  export const verifyToken = (formData=null) => async (dispatch) => {
    let credentials = getCredentials();
    console.log('CC',credentials.token);
    // clearCredentials();
   await fetch('http://192.168.225.88/api/verifyToken', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.token}`,
            },
          })
          .then(response => {
            const serverStatus = response.status;
                    return response.json()
              .then(data => {
                return { serverStatus, data };
              });
          })
          .then(({ serverStatus, data }) => {
            // const message = data.message;
            // setErrors({apiError:message});
            console.log('TC',serverStatus, data.status);

            if(!data.status){
              console.log('TC INSI',serverStatus, data.status);
              dispatch(authLogout());
              clearCredentials();
              // console.log('GETC',getCredentials());
            }else{
              dispatch(authSuccess(credentials));
            }

          })
          .catch(error => {
            // console.error('TC Err THIS');

          });
           
};
