export const getArrSlider = (start, end, number) => {
  const limit = start > end ? number : end;
  let output = [];
  for (let i = start; i <= limit; i++) {
    output.push(i);
  }
  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i);
    }
  }
  return output;
};

export const handleNumber = (number) => {
  if (number >= Math.pow(10, 9)) {
    return `${Math.round((number * 10) / Math.pow(10, 9)) / 10}B`; // Tỷ
  } else if (number >= Math.pow(10, 6)) {
    return `${Math.round((number * 10) / Math.pow(10, 6)) / 10}M`; // Triệu
  } else if (number >= 1000) {
    return `${Math.round((number * 10) / Math.pow(10, 3)) / 10}K`; // Nghìn
  } else {
    return number.toString(); // Đối với các số nhỏ hơn 1000
  }
};

export const normalizeText = (text) =>
  text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .replace(/\s+/g, "");

import { useState, useEffect } from "react";
import axios from "axios";

export const useFavoritePlaylists = () => {
  const [favoritePlaylists, setFavoritePlaylists] = useState([]);

  const fetchFavoritePlaylists = async () => {
    try {
      const userAccount = JSON.parse(localStorage.getItem("account"));
      if (userAccount) {
        const userId = userAccount.userId;
        const response = await axios.get(
          `http://localhost:3000/api/favoritePlaylists?userId=${userId}`
        );
        const sortedPlaylists = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setFavoritePlaylists(sortedPlaylists);
      }
    } catch (error) {
      console.error("Error fetching favorite playlists:", error);
    }
  };

  useEffect(() => {
    fetchFavoritePlaylists();
  }, []);

  return { favoritePlaylists, fetchFavoritePlaylists, setFavoritePlaylists };
};
