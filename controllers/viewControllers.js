const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async(req,res) =>{
    // 1) Get Tour Data From Collection
    const tours = await Tour.find();
    // 2) Build Template
    // 3) Render That Template Using Tour Data From 1)
    res.status(200).render('overview',{
      title: 'All Tours',
      tours
    })
});

exports.getTourPage = catchAsync(async(req,res, next) =>{
  // 1) Get The Data, For The Requested Tour(Including Reviews And Guides)
  const tour = await Tour.findOne({slug: req.params.slug}).populate({
    path: 'reviews',
    fields: 'Review Rating User'
  });
  if(!tour){
    return next(new AppError('There is No Tour Name',404))
  }
  // 2) Build Template
  // 3) Render Template Using Data From 1)
    res.status(200).render('tour',{
      title: `${tour.name} Tour`,
      tour
    })
});

exports.getLoginForm = (req,res) =>{
  res.status(200).render('login',{
    title:'Login In Your Account'
  })
}; 

exports.getAccount = (req,res) =>{
  res.status(200).render('account',{
    title:'Your account'
  })
  
};

exports.updateUserData = catchAsync(async(req, res, next) =>{
  // console.log('Update User Data',req.body);
  const updateUser = await User.findByIdAndUpdate(req.user.id,{
    name: req.body.name,
    email: req.body.email
  },{
    new: true,
    runValidators: true
  }
  );
  res.status(200).render('account',{
    title:'Your account',
    user: updateUser 
  });

});