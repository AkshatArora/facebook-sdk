var User = require('./models/user');
const request =require('request-promise');

const queryTerm ='Fiat';
const searchType = 'page';



module.exports = function(app, passport){
	    // pass it in as part of the url 
   
	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user });
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email,user_posts,user_photos']}));

	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/profile',
	                                      failureRedirect: '/' }));


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');


const userFieldSet = 'name, link, is_verified, picture';
  const pageFieldSet = 'name, category, link, picture, is_verified';


 app.get('/facebook-search/:id', (req, res) => {

  // you need permission for most of these fields
  const userFieldSet = 'id, name, about, email, accounts, link, is_verified, significant_other, relationship_status, website, picture, photos, feed';

  const options = {
    method: 'GET',
    uri: `https://graph.facebook.com/v2.8/${req.params.id}`,
    qs: {
      access_token: 'EAAETWf69D8sBAOuwOuhPZATdIgCHGeQBFuMqsdOf2NJhvcfX98TxvZCyynvRU2SnGqrRvlLHPWZCap40FySpZCSayW22glFVUCiFZBbYV2ZBth7ZA3xJpOCdiKY4CWR3gEECayiA5pVkXgqxsnZCNOKtiQz1yqF59IJQczWzOxEOZCdE4pUz7kh13KaSXyBZBAZA8gykhx4fJAKMgZDZD',
      fields: userFieldSet
    }
  };
  request(options)
    .then(fbRes => {
      res.json(fbRes);
    })
})


  app.post('/facebook-search', (req, res) => {
    const  { queryTerm, searchType } = req.body;

    const options = {
      method: 'GET',
      uri: 'https://graph.facebook.com/search',
      qs: {
        access_token: 'EAAETWf69D8sBAI8y3TWQqAuMfk3ueoK1VkHXqRz5ltry2bnuvKbzH9AEpaDTVzZAHn7d891BTi51s1GjJlOrZCgddVnJ042wGUng6IlvR4zyWFZCNYoF7zaIgEfntZAMwRbix09mnGYP6KUYHGkj7YIGb2sNZC9sMCs6cwdBl0gZDZD',
        q: queryTerm,
        type: searchType,
        fields: searchType === 'page' ? pageFieldSet : userFieldSet
      }
    };

    request(options)
      .then(fbRes => {
// Search results are in the data property of the response.
// There is another property that allows for pagination of results.
// Pagination will not be covered in this post,
// so we only need the data property of the parsed response.
        const parsedRes = JSON.parse(fbRes).data; 
        res.json(parsedRes);
      })
  });


 



	})
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}
