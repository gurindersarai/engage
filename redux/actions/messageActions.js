// authActions.js
import { clearCredentials,getCredentials,storeCredentials } from '../../utils/mmkvStorage';
import { setMessages,setPagination,prependMessage,setError,setStart } from '../slices/messageSlice';


  export const fetchMessages = (to=false,cPage=1) => async (dispatch) => {
    console.log('TO Ki aa',to);
    if(!to)return;
    
    let credentials = getCredentials();
    console.log('CCEE',credentials.token);
    console.log('CPAGE',cPage);
    // clearCredentials();
   await fetch('http://192.168.225.88/api/messages/'+to+'/'+cPage, {
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
            console.log('SERVER STATUS:',serverStatus, data.status);

            if(!data.status){
              console.log('SERVER STATUS: ',serverStatus, data.status);
              dispatch(setError(data.message));
            }else{
              console.log('cpage: '+cPage+' > ',data.pagination_data);
              console.log('MM',data.messages.data);
              if(cPage> 1){
                console.log('Dmess: ',JSON.stringify(data.messages));
              dispatch(prependMessage(data.messages.data));
              }else{
                dispatch(setMessages(data.messages.data));
              }
              dispatch(setPagination(data.pagination_data));
            }

          })
          .catch(error => {
            // console.error('TC Err THIS');
            dispatch(setError(error));
          });
           
};
