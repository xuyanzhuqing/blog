module.exports =  {
	Login: {
		account : String,
  		password : String
	},
	Log: {
		account: String,
		type: String,
		lastModified: String
	},
	Learn: {
		id: String,
	    name: String,
	    language: String,
	    theme: String,
	    desc: String,
	    content: '',
	    lastModified: Date
	},
	Poetry: {
		id: String,
    name: String,
    language: String,
    desc: String,
    author: String,
    content: '',
    lastModified: Date
	},
	Image: {
		id: String,
		author: String,
		content: Object,
		file: String,
		lastModified: Date
	},
	Home: {
		account: String,
		pageView: Number,
		isCreate: Boolean,
		logo: Object,
		poetry: Object,
		userinfo: Object,
		tag: Object,
		lastModified: Date
	},
	User: {
		logo: String
	},
	Count: {
		num: Number,
		lastModified: Date,
		ip: Number
	}
};
