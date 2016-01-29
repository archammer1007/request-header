module.exports = function(app){
	//redirect requests to the main page to /whoami instead
	app.get('/', function(request,response){
		response.redirect('/whoami');
	});
	
	app.get('/whoami', function(request,response){
		//initialize object for return
		var infoObj = {
			ipaddress: null,
			language: null,
			software: null
		}
		
		//get ipaddress of request
		infoObj.ipaddress = request.headers['x-forwarded-for'];
		//get language of request (only the first if there are multiple)
		infoObj.language = request.headers['accept-language'].split(',')[0];
		
		//get operating system info of request, using a regular expression to extract the information we want
		var ua = request.headers['user-agent'];
		var re = /\((.*)\)/
		var reArray = re.exec(ua);
		infoObj.software = reArray[1];
		
		//send response
		response.send(infoObj);
	});
	
};