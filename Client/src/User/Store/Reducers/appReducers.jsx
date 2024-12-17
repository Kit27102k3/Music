import actionTypes from "../Action/actionTypes";

const initState = {
  banner : null,
  new_song : {},
  chill : {},   
  friday : {},
  newEveryday : {},
  hotAlbum: {},
  weekchart : [],
  chart : {},
  rank : [],
  chartData : {},
  singer : null
};

const appReducers = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner: action.homeData?.find(item => item.sectionType === 'banner')?.items || null,
        friday: action.homeData?.find(item => item.sectionId === 'hEditorTheme1') || {},
        chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
        chartData : action.homeData?.find(item => item.sectionId === 'hNewrelease') || [],
        new_song: action.homeData?.find(item => item.sectionType === 'new-release') || {},
        top100 : action.homeData?.find(item => item.sectionId === 'h100') || {},
        hotAlbum : {...action.homeData?.find(item => item.sectionId === 'hAlbum'), title: 'Album hot'} || {},
        weekchart : action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
        chart : action.homeData?.find(item => item.sectionId === 'hZC') || {},
        promotes : action.homeData?.find(item => item.sectionId === 'hZC') || [],
      };
    case actionTypes.LOADING: {
      return {
        ...state,
        isLoading: action.flag,
      };
    }
    default:
      return state;
  }
};

export default appReducers;