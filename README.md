# capstone

- get started with documentation https://documenter.getpostman.com/view/16551157/UVC6jSVT
- url: https://capstoneeee.herokuapp.com

## authentication Api

| Methods | Urls                     | Actions      |
| ------- | ------------------------ | ------------ |
| post    | '/api/auth/signup'       | for sign up  |
| post    | '/api/auth/signin'       | signin       |
| post    | '/api/auth/refreshtoken' | refreshToken |

## Cart details Api

| Methods | Urls                  | Actions          |
| ------- | --------------------- | ---------------- |
| put     | '/api/addCart/:id',   | create cart      |
| put     | '/api/removeCart/:id' | remove cart      |
| get     | '/api/Cart/:id',      | get card details |

## DonationPost Api

| Methods | Urls                    | Actions            |
| ------- | ----------------------- | ------------------ |
| get     | '/api/donationPost'     | all donation posts |
| post    | '/api/donationPost/:id' | create post        |
| put     | '/api/donationPost/:id' | update post        |
| delete  | '/api/donationPost/:id' | deleteDonationPost |
| get     | '/api/donationPost/:id' | get post by id     |

## orders Api

| Methods | Urls             | Actions      |
| ------- | ---------------- | ------------ |
| post    | '/api/order/:id' | create order |
| get     | '/api/order'     | getAllOrders |

## user Api

| Methods | Urls            | Actions                |
| ------- | --------------- | ---------------------- |
| get     | '/api/user/:id' | get user details by id |

## payment api

| Methods | Urls                  | Actions                                |
| ------- | --------------------- | -------------------------------------- |
| post    | '/create/orderId'     | create instance of payment in razorpay |
| post    | '/api/payment/verify' | to verify the payment                  |
