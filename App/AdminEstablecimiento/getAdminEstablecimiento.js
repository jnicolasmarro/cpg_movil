import { API_URL } from "@env"

const getUser = (token) => {
    return fetch(`${API_URL}/adminEstablecimiento/adminEsta/` + token.header_id_user, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.token,
        id_user: token.header_id_user
      }
    })
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {        
        throw error
      });
  };

export {getUser}