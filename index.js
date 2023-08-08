const lyrics = document.querySelector(".lyrics-container > p");
const songThumbnail = document.querySelector(".player-container > img");
const songTitle = document.querySelector(".player-container > h2");
const songArtist = document.querySelector(".player-container > p");

const getAPI = async () => {
  try {
    const songDetails = {
      method: "GET",
      url: "https://genius-song-lyrics1.p.rapidapi.com/song/details/",
      params: { id: "1393981" },
      headers: {
        "X-RapidAPI-Key": "6a16507df5msh23d164fb0009391p1dce14jsn96546fdbc5a8",
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };

    const lyricsApi = {
      method: "GET",
      url: "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/",
      params: { id: "1393981" },
      headers: {
        "X-RapidAPI-Key": "6a16507df5msh23d164fb0009391p1dce14jsn96546fdbc5a8",
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };

    const [songData, lyricsData] = await Promise.all([
      axios(songDetails),
      axios(lyricsApi),
    ]);

    const thumbnailUrl = songData.data.song.header_image_thumbnail_url;
    const songTitle = songData.data.song.title;
    const artistName = songData.data.song.artist_names;
    const songLyrics = lyricsData.data.lyrics.lyrics.body.html;

    songThumbnail.src = thumbnailUrl;
    songTitle.textContent = songTitle;
    songArtist.textContent = artistName;
    lyrics.innerHTML = songLyrics;
  } catch (err) {
    console.error(err);
  }
};

getAPI();
