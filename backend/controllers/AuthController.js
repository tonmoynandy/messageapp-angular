const User =  require('../models/users');
const  AuthController = {

	signup : function(request, response) {

		let insertData = request.body;

		User.checkEmailExist(insertData.email, function(data){
			if (data != null) {
				response.send({status:0,message : 'Email Already exist, choose another one'})
			} else {
				User.insert(insertData, function(data){
					response.send({status : 1 });
				})		
			}
		})
		
		
	},
	signin : function(request, response) {
		let postData = request.body;
		User.checkLogin(postData, function(data) {
			if (data.status == true) {
				var cookies 		= new global.Cookies( request, response);
				global.systems.config.bcrypt.init().hash(data.user.get('_id').toString(), global.systems.config.bcrypt.saltRounds, function(err, hash) {
		       		
		       		request.session.user = data.user;
		       		response.send({status: data.status,id : hash});
		       	});
				
			} else {
				response.send({status: data.status});
			}
		})
	}

};

module.exports = AuthController;