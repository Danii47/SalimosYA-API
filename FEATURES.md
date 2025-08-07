# Features implemented in the API

## Auth
- [x] **POST** `/auth/login` - Login user
- [x] **POST** `/auth/register` - Register user
- [x] **POST** `/auth/logout` - Logout user

## Authenticated user (/me)
- [x] **GET** `/me` - Get user information
- [x] **PATCH** `/me` - Update user information
- [x] **GET** `/me/friends` - Get authenticated user's friends
- [ ] **POST** `/me/friends/:id` - Send friend request
- [ ] **DELETE** `/me/friends/:id` - Remove friend
- [ ] **POST** `/me/friends/:id/accept` - Accept friend request

## Public users (/users)
- [x] **GET** `/users/:id` - Get user information
- [x] **GET** `/users/:id/friends` - Get user's friends


TODO: Implement the view of locals without being logged in (not relevant info, to view the people ammount it will be necessary to be logged in)