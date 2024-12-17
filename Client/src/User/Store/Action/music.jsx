import actionTypes from "./actionTypes";
import * as apis from "../../../apis";

export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
  payload: sid,
});

export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
  payload: flag,
});

export const playAlbum = (flag) => ({
  type: actionTypes.SET_ALBUM,
  flag,
});

export const setPlaylist = (songs) => ({
  type: actionTypes.PLAYLIST,
  songs,
});

export const setCurSongData = (data) => ({
  type: actionTypes.SET_CUR_SONG_DATA,
  data,
});

export const setCurAlbumId = (pid) => ({
  type: actionTypes.SET_CUR_ALBUM_ID,
  pid,
});

export const setRecent = (data) => ({
  type: actionTypes.SET_RECENT,
  data,
});

export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});

// export const fetchDetailPlaylist = (pid) => async (dispatch) => {
//   try {
//     const response = await apis.apiGetDetailPlaylist(pid)
//     if (response?.data?.err === 0) {
//       dispatch({
//         type: actionTypes.PLAYLIST,
//         songs: response?.data?.data?.song?.items
//       });
//     }

//   } catch (error) {
//     dispatch({
//       type: actionTypes.PLAYLIST,
//       songs: null
//     })
//   }
// }

// export const setPlaylist = (flag) => ({
//   type: actionTypes.PLAYLIST,
//   flag,
// });

export const search = (keyword) => async (dispatch) => {
  try {
    const response = await apis.apiSearch(keyword);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.SEARCH,
        data: response?.data?.data,
        keyword,
      });
    } else {
      dispatch({ type: actionTypes.SEARCH, data: null });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH,
      data: null,
    });
  }
};

export const getSearchSongSinger = (keyword) => async (dispatch) => {
  try {
    const response = await apis.apiSearch(keyword);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.SEARCH,
        data: response?.data?.data,
        keyword,
      });
    } else {
      dispatch({ type: actionTypes.SEARCH, data: null });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH,
      data: null,
    });
  }
};

export const getSearchSongs = (singerId) => async (dispatch) => {
  try {
    const response = await apis.apiGetArtistSongs(singerId);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.PLAYLIST,
        songs: response.data.data.items,
      });
    } else {
      dispatch({ type: actionTypes.PLAYLIST, songs: null });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.PLAYLIST,
      data: null,
    });
  }
};

export const getPlaylistSongs = (playlistId) => async (dispatch) => {
  try {
    const response = await apis.apiGetDetailPlaylist(playlistId);
    if (response && response.data && response.data.err === 0) {
      const songsList = response.data.data.items;
      dispatch({
        type: actionTypes.PLAYLIST,
        data: songsList,
      });
      return songsList;
    } else {
      dispatch({ type: actionTypes.PLAYLIST, data: null });
      return null;
    }
  } catch (error) {
    console.error("Error fetching playlist songs:", error);
    dispatch({
      type: actionTypes.PLAYLIST,
      data: null,
    });
    return null;
  }
};
