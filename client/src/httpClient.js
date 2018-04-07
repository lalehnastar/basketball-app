import axios from 'axios'
import jwtDecode from 'jwt-decode'

// instantiate axios
const httpClient = axios.create()

httpClient.getToken = function() {
	return localStorage.getItem('token')
}

httpClient.setToken = function(token) {
	localStorage.setItem('token', token)
	return token
}

httpClient.getCurrentUser = function() {
	const token = this.getToken()
	console.log(token)
	if(token) return jwtDecode(token)
	return null
}

httpClient.logIn = function(credentials) {
	return this({ method: 'post', url: '/api/users/authenticate', data: credentials })
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

// logIn and signUp functions could be combined into one since the only difference is the url we're sending a request to..
httpClient.signUp = function(userInfo) {
	return this({ method: 'post', url: '/api/users', data: userInfo})
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

httpClient.logOut = function() {
	localStorage.removeItem('token')
	delete this.defaults.headers.common.token
	return true
}
httpClient.getAllTeams = function(){

    return this({ method: 'get', url:'/api/teams' })
}

httpClient.createTeam = function(fields){

    return this({ method: 'post', url:'/api/teams', data: fields })
}

httpClient.getTeam = function(id){
    return this({ method: 'get', url:`/api/teams/${id}`})
}

httpClient.deleteTeam = function(id){
    return this({ method: 'delete', url:`/api/teams/${id}`})
}

httpClient.updateTeam = function(id, fields){
    return this({ method: 'patch', url:`/api/teams/${id}`, data: fields})
}

// During initial app load attempt to set a localStorage stored token
// as a default header for all api requests.
httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient