module.exports = function(app, passport){
    
    app.get('/',function(req,res){
        res.render('index.ejs');
    });
    
    app.get('/login', function(req,res){
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });
    
    app.get('/views/loginNav',function(req,res){
        res.render('loginNav.ejs');
    });
    
   app.post('/login', passport.authenticate('local-login',{
       successRedirect: '/profile',
       failureRedirect:'/login',
       failureFlash:true
   }));
    
    app.get('/signup',function(req,res){
       res.render('signup.ejs', {message: req.flash('signupMessage')}); 
    });
    
    app.post('/signup', passport.authenticate('local-signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash:   true
    }));
    
    //Protected part by login authentication
    app.get('/profile', isLoggedIn, function(req,res){
        res.render('profile.ejs',{
            user: req.user
        });
    });
    app.get('/loginNav', isLoggedIn, function(req,res){
        res.render('loginNav.ejs',{
            user: req.user
        });
    });
    app.get('/signup-nav', isLoggedIn, function(req,res){
        res.render('signup-nav.ejs',{
            user: req.user
        });
    });
    app.get('/about', isLoggedIn, function(req,res){
           res.render('about.ejs',{
            user: req.user,
               title: "About Me"
        });
    });
    app.get('/research', isLoggedIn, function(req,res){
        var projects = moviesJSON.projects;
        res.render('research.ejs',{
            title: "Publications",
            projects: projects,
            user: req.user
        });
    });
    app.get('/contact', isLoggedIn, function(req,res){
        res.render('contact.ejs',{
            user: req.user
        });
    });
    
     app.get('/projects', isLoggedIn, function(req,res){
        var projects = moviesJSON.projects;
        res.render('projects.ejs',{
             title: "Project Portfolio",
            projects : projects,
            user: req.user
        });
    });
    
    app.get('/project_types/:project_number?',function(req, res){
    var project_number = req.params.project_number;
    var projects = moviesJSON.projects;
    
    if(project_number >= 1 && project_number <= 6){
    
    var project = projects[project_number - 1];
    var title = project.title;
    var main_characters = project.main_characters;
        
    res.render('project-single',{
    projects : projects,
    title: title,
    project: project,
    main_characters: main_characters
    });
    }
    else {
        res.render('notFound',{
           projects:projects,
            title: "Page does not exist"
        });
    }
});
app.get('*', function(req, res){
    var movies = moviesJSON.movies;
    res.render('notFound',{
        movies:movies,
        title:"Page does not exist"
    });
});
        
   
    
    //Logout
    app.get('/logout',function(req,res){
        req.logout();
        res.redirect('/');
    });
};

//User login test
function isLoggedIn(req,res,next){
    //if user is authenticated move on to next line
    if(req.isAuthenticated())
        return next();
    //if user not authenticated redirect to home page
    res.redirect('/');
 }

var moviesJSON = require('../movies.json'); //var variable_name can be anything



/*//about
app.get('/about', );

exports.about = function(req, res){
    var movies = moviesJSON.movies;
    res.render('home',{
    title: "Star Wars Movies",
    movies : movies
    });
};

//movie single
exports.movie_single = function(req, res){
    var episode_number = req.params.episode_number;
    var movies = moviesJSON.movies;
    
    if(episode_number >= 1 && episode_number <= 6){
    
    var movie = movies[episode_number - 1];
    var title = movie.title;
    var main_characters = movie.main_characters;
        
    res.render('movie_single',{
    movies : movies,
    title: title,
    movie: movie,
    main_characters: main_characters
    });
    }
    else {
        res.render('notFound',{
           movies:movies,
            title: "Page does not exist"
        });
    }
};

exports.notFound = function(req, res){
    var movies = moviesJSON.movies;
    res.render('notFound',{
        movies:movies,
        title:"Page does not exist"
    });
};*/