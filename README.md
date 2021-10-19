# capstone

hosted in: https://capstoneeee.herokuapp.com
for sign in-> https://capstoneeee.herokuapp.com/api/auth/signin

## authentication Api

post '/api/auth/signup' for sign up
post '/api/auth/signin' signin
post '/api/auth/refreshtoken' refreshToken

## Cart details Api

put '/api/addCart/:id', create cart
put '/api/removeCart/:id' remove cart
get '/api/Cart/:id', get card details

## DonationPost Api

get '/api/donationPost' all donation posts
post '/api/donationPost/:id' create post
put '/api/donationPost/:id' update post
delete '/api/donationPost/:id' deleteDonationPost
get '/api/donationPost/:id' get post by id

## orders Api

post '/api/order/:id' create order
get '/api/order' getAllOrders

## user Api

get '/api/user/:id' get user details by id
