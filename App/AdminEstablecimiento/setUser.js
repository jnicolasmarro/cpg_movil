import { API_URL } from "@env"

const setUser = async (token, user) => {
  return fetch(`${API_URL}/adminEstablecimiento/adminEsta/` + token.header_id_user, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.token,
      id_user: token.header_id_user
    },
    body: JSON.stringify({
      nombre_usuario: user.nombre,
      email: user.email,
      numero_celular: user.celular,
      contraseñaNueva: user.contraseñaNueva,
      contraseñaActual: user.contraseñaActual
    })
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      throw error
    });
}

export { setUser }