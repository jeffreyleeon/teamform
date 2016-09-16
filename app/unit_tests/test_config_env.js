describe('Test config/env.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
   describe('Configure environment variables', function() {

	  it('Firebase API Key should be set', function() {
	  	var value = env.FB_API_KEY;
	  	expect(value).toBeTruthy();
	  });

     it('Firebase Auth Domain should be set', function() {
      var value = env.FB_AUTH_DOMAIN;
      expect(value).toBeTruthy();
     });

     it('Firebase Database URL should be set', function() {
      var value = env.FB_DATABASE_URL;
      expect(value).toBeTruthy();
     });

     it('Firebase Storage Bucket should be set', function() {
      var value = env.FB_STORAGE_BUCKET;
      expect(value).toBeTruthy();
     });
   });
});