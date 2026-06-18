# Movie Project Backend
### Contains backend of movie booking app
### Uses Zod validation and JWT Authentication
### Node runtime and express server to run backend
#### Uses in memory storage
# POST ROUTES
/signup - For User Signup\
/signin - For uses Signin- Creates JWT token\
/bookings/:userid - For User to book tickets - Authenticated Route
# GET ROUTES
/movies- To browse all movies\
/movies/:id - To view specific movie\
/movies/:id/shows - To view show times for movies\
/bookings/:userId - To show all bookings of a user - Authenticated Route\
/bookings/:userId/:bookingId - To view specific booking - Authenticated Route\
/summary/:userId - To get purchasing summary of a user - Authenticated Route
# PUT ROUTE
/bookings/:userId/:bookingId - To update # of seats in a booking - Authenticated Route\
# DELETE ROUTE
/bookings/:userId/:bookingId - To cancel a booking. Only changes status, does not remove - Authenticated Route

## BONUS
summary array gets updated every time user books or modifies or deletes\
No bonus routes done yet.\
Only backed, no frontend implemented yet.

