'use strict';
const Schema = global.mongoose.Schema;
const table = 'users';
const MODEL = global.mongoose.model(
	table, 
	new Schema({ type: Schema.Types.Mixed }, { strict : false, versionKey: false }), 
	table);

const User = {
	checkEmailExist : function(email, callback) {
		MODEL.findOne({email:email})
		.exec()
		.then(function(data){
			callback(data);
		})
	},

	insert : function(data,callback) {
		
		global.systems.config.bcrypt.init().hash(data.password, global.systems.config.bcrypt.saltRounds, function(err, hash) {
			data.password = hash;
			var insertdata = new MODEL(data);
			insertdata.save(function(err,data){
				if (err) {
				callback(err);
				} else {
				callback(data);
				}
			});
		});
	},
	checkLogin : function(postData, callback) {
		MODEL.findOne({email:postData.email}).exec().then(function(data){
			if(data) {

				global.systems.config.bcrypt.init().compare(postData.password, data.get('password'), function(err, hashData) {

					callback({status:hashData, user : data});
				});		
			} else {
				callback({status: false});
			}
		})
		
	}
};

module.exports = User;