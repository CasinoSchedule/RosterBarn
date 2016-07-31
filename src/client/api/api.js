import axios from 'axios';
import Cookie from 'js-cookie';

// 'api-token-auth':"Authorization: Token ${token}";
var instance = axios.create();
var interceptor;

instance.new = function (url) {
 this.defaults.baseURL = url;
 // this.defaults.headers = {'Content-Type' : 'application/x-www-form-urlencoded'};
};

if (Cookie.get('token')) {
 var token = Cookie.get('token');
 interceptor = instance.interceptors.request.use(function(config){
   config.headers['Authorization'] = 'Token ' + token;
<<<<<<< HEAD
   // console.log("axios api token", token);
=======
   console.log("axios api token", token);
>>>>>>> 08de97c22fca98c39e9f063d4f621877bdb6b0cf
   return config;
 });
}

instance.login = function(user, pass) {
 return this.post('api-token-auth/', {username: user, password: pass})
   .then(function(resp){
     var token = resp.data.token;
     console.log("token", token);
     Cookie.set('token', token);
     interceptor = this.interceptors.request.use(function(config){
       config.headers['Authorization'] = 'Token ' + token;
       console.log("login_config_token", token);
       return config;
     })
     return resp;
   }.bind(this));
};

instance.logout = function() {
  console.log("api_logout");
  Cookie.remove('token');
 this.interceptors.request.eject(interceptor);
 return true;
}

export default instance;