const express=require('express');
const z=require('zod');
const jwt=require("jsonwebtoken");

const JWT_SECRET="mydbissecretful";

const app=express();
app.use(express.json());

function auth(req, res, next){
    const token=req.headers.token;
    const decoded=jwt.verify(token, JWT_SECRET);
    if(decoded.email){
        next();
    }else{
        return res.json({
            success:false,
            message:"You are not signed in"
        })
    }

    //Replace above auth with below commented auth for proper function of auth. Don't do when testing

    // const token=req.headers.token;
    // if(!token){
    //     return res.status(401).json({
    //         success:false,
    //         message:"No Valid Token"
    //     })
    // }
    // const decoded=jwt.verify(token, JWT_SECRET);
    // const user=db.users.find(x=>x.email==decoded.email);
    // //Todo token verification is stil fked up
    // if(!user || user.token!==token){
    //     return res.status(401).json({
    //         success:false,
    //         message:"You are not signed in"
    //     })  
    // }else{
    //     next();
    // }
}

const db = {
  users: [],
  movies: [
    {
      id:1,
      title:"Inception",
      genre:"Sci-Fi",
      duration:148,
      shows: [
        {
          showId:101,
          time:"10:00 AM",
          pricePerSeat:200,
          availableSeats:50
        },
        {
          showId:102,
          time:"2:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:103,
          time:"6:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    },
    {
      id:2,
      title:"The Dark Knight",
      genre:"Action",
      duration:152,
      shows: [
        {
          showId:201,
          time:"11:00 AM",
          pricePerSeat:200,
          availableSeats:50
        },
        {
          showId:202,
          time:"3:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:203,
          time:"7:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    },
    {
      id:3,
      title:"Interstellar",
      genre:"Sci-Fi",
      duration:169,
      shows: [
        {
          showId:301,
          time:"12:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:302,
          time:"5:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    }
  ],
  bookings:[],
  summary:[]
}
count=1;
bookId=1001;

const userSignupSchema=z.object({
    username:z.string(),
    password:z.string().min(3).max(10),
    email:z.email()
})

const userSigninSchema=z.object({
    email:z.email(),
    password:z.string().min(3).max(10)
})


app.post('/signup', (req, res)=>{
    const result=userSignupSchema.safeParse(req.body);
    if(!result.success){
        return res.status(401).json({
            success:false,
            message:"Invalid Credentials",
            userId:null
        })
    }
    const rData=result.data;
    const dup=db.users.filter(x=>x.email==rData.email);
    if(dup.length>0){
        return res.status(401).json({
            success:false,
            message:"Email already exists",
            userId:null
        })
    }

    const user={
        id:count,
        username:rData.username,
        password:rData.password,
        email:rData.email,
        token:null,
        bookings:[]
    }
    db.users.push(user);

    db.summary.push({
        userId:count,
        username:rData.username,
        totalBookings:0,
        totalAmountSpent:0,
        confirmedBookings:0,
        cancelledBookings:0,
        totalSeatsBooked:0
    })

    res.json({
        success:true,
        message:"User created successfully",
        userId:count++
    })
});

app.post('/signin', (req, res)=>{
    const result=userSigninSchema.safeParse(req.body);
    if(!result.success){
        return res.status(401).json({
            success:false,
            message:"Invalid Credentials",
            token:null
        })
    }
    const user=result.data;
    let dbuser=db.users.find(x=>x.email==user.email);

    if(!dbuser){
        return res.status(401).json({
            success:false,
            message:"User doesn't exist",
            token:null
        })
    }
    if (user.password!=dbuser.password){
        res.status(401).json({
            success:false,
            message:"Incorrect Credentials",
            token:null
        })
    }

    const token=jwt.sign({
        email:dbuser.email
    }, JWT_SECRET);
    dbuser.token=token

    res.json({
        success:true,
        message:"Signin Successful",
        token
    })
});

app.get('/movies', (req, res)=>{
    let movies=[];
    db.movies.forEach((x=>{
        movies.push({
            "Movie ID":x.id,
            "Title":x.title
        })
    }))
    res.json({
        success:true,
        movies
    })
});

app.get('/movies/:id', (req, res)=>{
    const movieId=req.params.id;
    const movie=db.movies.find(x=>x.id==movieId);
    if(!movie){
        res.status(401).json({
            success:false,
            message:"movie not found"
        })
    }
    res.json({
        success:true,
        movie:{
            "Movie Id":movie.id,
            "Movie Title":movie.title
        }
    })
});

app.get('/movies/:id/shows', (req, res)=>{
    const movieId=req.params.id;
    const movie=db.movies.find(x=>x.id==movieId);
    if(!movie){
        res.status(401).json({
            success:false,
            message:"movie not found"
        })
    }
    const shows=movie.shows
    res.json({
        success:true,
        shows
    })
});

app.use(auth);

const bookingSchema=z.object({
    movieId:z.number(),
    showId:z.number(),
    seats:z.number()
});

app.post('/bookings/:userid', (req, res)=>{
    const result=bookingSchema.safeParse(req.body);
    const userId=req.params.userid;
    const uname=req.username;

    const {movieId, showId, seats}= result.data;

    const movie=db.movies.find(x=>x.id===movieId);
    const show=movie.shows.find(x=>x.showId===showId);

    if(!movie || !show){
        return res.status(401).json({
            success:false,
            message:"Movie or show not found"
        })
    }

    if(show.availableSeats<seats){
        return res.status(401).json({
            success:false,
            message:"Not enough seats biyatchhh"
        })
    }

    const bookingId=bookId++;
    const totalAmount=seats*show.pricePerSeat;
    const date=new Date();

    db.bookings.push({
        userid:userId,
        bookingId:bookingId,
        movieId:movieId,
        showId:showId,
        seats:seats,
        totAmt:totalAmount,
        date:date.toLocaleString(),
        status:"Active"
    })

    const udata=db.summary.find(x=>x.userId==userId);
    udata.totalBookings+=1;
    udata.totalAmountSpent+=totalAmount
    udata.confirmedBookings+=1;
    udata.totalSeatsBooked+=seats;

    show.availableSeats-=seats;
    res.json({
        success:true,
        message:"Booking Successful",
        bookingId,
        movieTitle:movie.title,
        showTime:show.time,
        seats,
        totalAmount
    })
});

app.get('/bookings/:userId', (req, res)=>{
    const userId=req.params.userId;
    userBookings=db.bookings.filter(x=>x.userId=userId);
    let bookings=[]
    userBookings.forEach((x)=>{
        const movie=db.movies.find(i=>i.id==x.movieId);
        const show=movie.shows.find(i=>i.showId==x.showId);
        bookings.push({
            "Booking ID":x.bookingId,
            "Title":movie.title,
            "Booked On":x.date,
            "Time":show.time,
            "Seats":x.seats,
            "Invoice":x.totAmt,
            "Status":x.status
        });
    })
    res.json({
        success:true,
        bookings
    });
});

app.get('/bookings/:userId/:bookingId', (req, res)=>{
    const userID=req.params.userId;
    const bookingId=req.params.bookingId;
    userBookings=db.bookings.filter(x=>x.userId=userID);
    const specific=userBookings.find(x=>x.bookingId);

    if(!specific){
        return res.status(401).json({
            success:false,
            message:"Could not find booking"
        })
    }
    const movie=db.movies.find(x=>x.id==specific.movieId);
    const show=movie.shows.find(x=>x.showId==specific.showId);
    if(!movie || !show){
        return res.status(401).json({
            success:false,
            message:"Could not find movie or show"
        })
    }
    
    res.json({
        success:true,
        booking:{
            "Booking ID":bookingId,
            "Title":movie.title,
            "Booked On":specific.date,
            "Time":show.time,
            "Seats":specific.seats,
            "Invoice":specific.totAmt,
            "Status":specific.status
        }
    })
});

const puBookingSchema=z.object({
    seats:z.number()
})

app.put('/bookings/:userId/:bookingId', (req, res)=>{
    const result=puBookingSchema.safeParse(req.body);
    const userID=req.params.userId;
    const bookingId=req.params.bookingId;
    userBookings=db.bookings.filter(x=>x.userId=userID);
    const specific=userBookings.find(x=>x.bookingId);

    if(!specific){
        return res.status(401).json({
            success:false,
            message:"Could not find booking"
        })
    }
    const movie=db.movies.find(x=>x.id==specific.movieId);
    const show=movie.shows.find(x=>x.showId==specific.showId);
    if(!movie || !show){
        return res.status(401).json({
            success:false,
            message:"Could not find movie or show"
        })
    }

    const nseats=result.data.seats;
    if(nseats<=specific.seats || specific.status=="Cancelled"){
        return res.status(401).json({
            success:false,
            message:"Could not process request"
        });
    }

    if(show.availableSeats<(nseats-specific.seats)){
        return res.status(401).json({
            success:false,
            message:"Not enough seats!"
        });
    }

    const udata=db.summary.find(x=>x.userId==userId);
    udata.totalAmountSpent-=specific.totAmt;

    show.availableSeats-=(nseats-specific.seats);
    specific.totAmt=nseats*show.pricePerSeat;
    specific.seats=nseats;

    udata.totalAmountSpent+=specific.totAmt
    udata.totalSeatsBooked+=(nseats-specific.seats);
    
    res.json({
        success:true,
        message:"Updated seats"
    })
});

app.delete('/bookings/:userId/:bookingId', (req ,res)=>{
    const userID=req.params.userId;
    const bookingId=req.params.bookingId;
    userBookings=db.bookings.filter(x=>x.userId=userID);
    const specific=userBookings.find(x=>x.bookingId);

    if(!specific){
        return res.status(401).json({
            success:false,
            message:"Could not find booking"
        })
    }
    const movie=db.movies.find(x=>x.id==specific.movieId);
    const show=movie.shows.find(x=>x.showId==specific.showId);
    if(!movie || !show){
        return res.status(401).json({
            success:false,
            message:"Could not find movie or show"
        })
    }

    if(specific.status=="Cancelled"){
        return res.status(401).json({
            success:false,
            message:"Booking already cancelled"
        });
    }

    const udata=db.summary.find(x=>x.userId==userID);
    udata.totalSeatsBooked-=specific.seats;
    show.availableSeats+=specific.seats;
    specific.seats=0;
    specific.status="Cancelled";
    specific.totAmt=specific.totAmt/2;

    udata.totalAmountSpent-=specific.totAmt;
    udata.confirmedBookings-=1;
    udata.cancelledBookings+=1;


    res.json({
        success:true,
        message:"Booking Cancelled successfully"
    })
})

app.get('/summary/:userId', (req, res)=>{
    const userID=req.params.userId;
    const udata=db.summary.find(x=>x.userId==userID);

    if(!udata){
        return res.status(401).json({
            success:false,
            message:"Could not find summary"
        })
    }

    res.json({
        success:true,
        data:udata
    })
})

app.listen(3000);