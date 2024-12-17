import WeekRank from "../components/WeekRank";
import WeekChart from "../components/WeekChart";
import Contact from "../layout/Setting/Component/Contact";
import Introduce from "../layout/Setting/Component/Introduce";
import Discover from "../pages/Discover/Discover";
import FavoriteSong from "../pages/FavoriteSong/FavoriteSong";
import History from "../pages/History/History";
import Login from "../pages/Login/Login";
import NewMusic from "../pages/NewMusic/NewMusic";
import Album from "../pages/Album/Album";
import AllSong from "../pages/ProfileSinger/AllSong";
import ProfileSinger from "../pages/ProfileSinger/ProfileSinger";
import ProfileUser from "../pages/ProfileUser/ProfileUser";
import Radio from "../pages/Radio/Radio";
import Register from "../pages/Register/Register";
import Search from "../pages/Search/Search";
import SearchAll from "../pages/Search/SearchAll";
import SearchPlaylist from "../pages/Search/SearchPlaylist";
import SearchSongs from "../pages/Search/SearchSongs";
import TopicAndGenre from "../pages/TopicAndGenre/TopicAndGenre";
import Zingchart from "../pages/Zingchart/Zingchart";
import PlayList from "../pages/PlayList/PlayList";
import Payment from "../pages/Payment/Payment";
import PaymentPlus from "../pages/Payment/PaymentPlus";
import PaymentPremium from "../pages/Payment/PaymentPremium";
import PaymentQRCode from "../pages/Payment/PaymentQRCode";
import ContactAdmin from "../../Admin/pages/contact";
import Header from "../../Admin/pages/Header";
import Sidebar from "../../Admin/layout/SideBar";
import Users from "../../Admin/pages/Users";
import Songs from "../../Admin/pages/Songs";
import Playlists from "../../Admin/pages/Playlists";
import Singers from "../../Admin/pages/Singers";
import Statistical from "../../Admin/pages/Statistical";
import PaymentQRCodePlus from "../pages/Payment/PaymentQRCodePlus";
import Upgrade from "../../Admin/pages/Upgrade";

const publicRoutes = [
  {
    path: "/",
    page: ProfileUser,
  },
  {
    path: "/discover",
    page: Discover,
  },
  {
    path: "album/:title/:pid",
    page: Album,
  },
  {
    path: "playlist/:title/:pid",
    page: Album,
  },
  {
    path: "/zing-chart",
    page: Zingchart,
  },
  {
    path: "/playlist",
    page: PlayList,
  },
  {
    path: "/zing-chart-tuan/:title/:pid",
    page: WeekRank,
  },
  {
    path: "/new-music",
    page: NewMusic,
  },
  {
    path: "/topics-and-genres",
    page: TopicAndGenre,
  },
  {
    path: "/history",
    page: History,
  },
  {
    path: "/favorite-songs",
    page: FavoriteSong,
  },
  {
    path: "/radio",
    page: Radio,
  },
  {
    path: "/introduce",
    page: Introduce,
  },
  {
    path: "/contact",
    page: Contact,
  },
  {
    path: "/vip/upgrade",
    page: Payment,
    layout: null,
  },
  {
    path: "/vip/upgrade/plus",
    page: PaymentPlus,
    layout: null,
  },
  {
    path: "/vip/upgrade/premium",
    page: PaymentPremium,
    layout: null,
  },
  {
    path: "/vip/upgrade/premium/payment",
    page: PaymentQRCode,
    layout: null,
  },
  {
    path: "/vip/upgrade/plus/payment",
    page: PaymentQRCodePlus,
    layout: null,
  },
  {
    path: "/:singer/",
    page: ProfileSinger,
    children: [
      {
        path: "bai-hat",
        page: AllSong,
      },
    ],
  },
  {
    path: "nghe-si/:singer",
    page: ProfileSinger,
  },
  {
    path: "/weekly-chart/:title/:pid",
    page: WeekChart,
  },
  {
    path: "/login",
    page: Login,
    layout: null,
  },
  {
    path: "/register",
    page: Register,
    layout: null,
  },
  {
    path: "/tim-kiem/",
    page: Search,
    children: [
      {
        path: "bai-hat",
        page: SearchSongs,
      },
      {
        path: "tat-ca",
        page: SearchAll,
      },
      {
        path: "playlist",
        page: SearchPlaylist,
      },
    ],
  },
];

const privateRoutes = [
  {
    path: "/admin/header",
    page: Header,
  },
  {
    path: "/admin",
    page: Sidebar,
  },
  {
    path: "/admin/users",
    page: Users,
  },
  {
    path: "/admin/songs",
    page: Songs,
  },
  {
    path: "/admin/playlists",
    page: Playlists,
  },
  {
    path: "/admin/singers",
    page: Singers,
  },
  {
    path: "/admin/contacts",
    page: ContactAdmin,
  },
  {
    path: "/admin/statistical",
    page: Statistical,
  },
  {
    path: "/admin/upgrade",
    page: Upgrade,
  },
];

export { publicRoutes, privateRoutes };
