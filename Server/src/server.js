const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const router = require("./routes/ZingRouter");

//Import Controller
const LoginFaceBook = require("./controllers/User/POST/LoginFaceBook");
const LoginGoogle = require("./controllers/User/POST/LoginGoogle");
const DownSongs = require("./controllers/User/POST/DownSongs");
const getSong = require("./controllers/User/GET/getSong");
const postFaSong = require("./controllers/User/POST/postFaSong");
const getFaSong = require("./controllers/User/GET/getFaSong");
const postFaPlaylist = require("./controllers/User/POST/postFaPlaylist");
const getFaPlaylist = require("./controllers/User/GET/getFaPlaylist");
const deleteFaSong = require("./controllers/User/DELETE/deleteFaSong");
const deleteFaPlaylist = require("./controllers/User/DELETE/deleteFaPlaylist");
const postSinger = require("./controllers/User/POST/postSinger");
const getSinger = require("./controllers/User/GET/getSinger");
const deleteSinger = require("./controllers/User/DELETE/deleteSinger");
const postContact = require("./controllers/User/POST/postContact");
const getContact = require("./controllers/Admin/getContact");
const postPayment = require("./controllers/User/POST/postPayment");
const getPayment = require("./controllers/User/GET/getPayment");
const deletePayment = require("./controllers/User/DELETE/deletePayment");
const User = require("./controllers/Admin/Users");

//Import Middlewares
const validateFacebookLogin = require("./middlewares/validateFacebookLogin");
const validateDownSongs = require("./middlewares/validateDownSongs");
const validateFaSong = require("./middlewares/validateFaSong");
const validateFaPlaylist = require("./middlewares/validateFaPlaylist");
const Song = require("./controllers/Admin/Song");
const playlist = require("./controllers/Admin/Playlist");
const singers = require("./controllers/Admin/singers");
const totalRevenue = require("./controllers/Admin/totalRevenue");
const Contacts = require("./controllers/Admin/Contacts");
const totalUser = require("./controllers/Admin/totalUser");
const totalSong = require("./controllers/Admin/totalSong");
const totalPlaylist = require("./controllers/Admin/totalPlaylist");
const totalSinger = require("./controllers/Admin/totalSinger");
const totalPayment = require("./controllers/Admin/totalPayment");
const titlePayment = require("./controllers/Admin/titlePayment");
const Payment = require("./models/Payment/Payment");

const app = express();
const port = process.env.PORT || 5000; // Default to port 5000 if not specified

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Routes
app.use("/api", router);

// Cấu hình headers mặc định
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const URI = process.env.MONGODB_URI;
// Kết nối MongoDB và kiểm tra admin
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    await deleteExpiredPayments();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

async function deleteExpiredPayments() {
  try {
    const currentDate = new Date();
    const expiredPayments = await Payment.find({
      upgrade: { $lt: currentDate },
    });
    if (expiredPayments.length > 0) {
      const result = await Payment.deleteMany({
        upgrade: { $lt: currentDate },
      });
      console.log(`Đã xóa ${result.deletedCount} giao dịch hết hạn.`);
    } else {
    }
  } catch (error) {
    console.error("Lỗi khi xóa giao dịch hết hạn:", error);
  }
}

cron.schedule(
  "0 0 * * *",
  async () => {
    await deleteExpiredPayments();
  },
  {
    timezone: "Asia/Ho_Chi_Minh",
  }
);

//Đăng nhập bằng FaceBook
app.post("/login-facebook", validateFacebookLogin, LoginFaceBook);

// Đăng nhập với Google
app.post("/login", LoginGoogle);

// Endpoint cho các bài hát tải xuống
app.post("/api/song/download", validateDownSongs, DownSongs);

// Endpoint lấy danh sách bài hát đã tải xuống
app.get("/api/song/download", getSong);

// Endpoint cho bài hát yêu thích
app.post("/api/song/favorite", validateFaSong, postFaSong);

// Endpoint lấy danh sách bài hát yêu thích
app.get("/api/song/favorite", getFaSong);

// Endpoint thêm playlist yêu thích
app.post("/api/detailplaylist/favorites", validateFaPlaylist, postFaPlaylist);

// Endpoint lấy danh sách playlist yêu thích
app.get("/api/favoritePlaylists", getFaPlaylist);

// Endpoint xóa bài hát yêu thích
app.delete("/api/song/favorite", deleteFaSong);

// Endpoint xóa playlist yêu thích
app.delete("/api/favoritePlaylists", deleteFaPlaylist);

// Endpoint theo dõi singer
app.post("/api/follower", postSinger);

// Endpoint lấy danh sách singer đã theo dõi
app.get("/api/checkFollower", getSinger);

app.get("/api/singer/follower", getSinger);

// Endpoint bỏ theo dõi singer
app.delete("/api/follower", deleteSinger);

// Endpoint gửi phản hồi
app.post("/contact", postContact);

// Endpoint lấy danh sách phản hồi
app.get("/api/contacts", getContact);

// Endpoint đăng ký thanh toán
app.post("/api/payment", postPayment);

// Endpoint kiểm tra thanh toán người dùng
app.get("/api/payment/checkUser/:userId", getPayment);

app.delete("/api/payments/user/:userId", deletePayment);

// ADMIN ROUTES
app.get("/api/songs", Song);

app.get("/api/users", User);

app.get("/api/playlists", playlist);

app.get("/api/singers", singers);

app.get("/api/payment/totalRevenue", totalRevenue);

app.get("/api/contact/totalFeedback", Contacts);

app.get("/api/user/totalUsers", totalUser);

// Endpoint to count total favorite songs
app.get("/api/song/totalSongs", totalSong);

// Endpoint to count total playlists
app.get("/api/playlist/totalPlaylists", totalPlaylist);

// Endpoint to count total singers
app.get("/api/singer/totalSingers", totalSinger);

app.get("/api/user/title/:userId", titlePayment);

app.get("/api/payment/allUsers", totalPayment);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
