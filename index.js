const songId = "1355237";
const artistID = "6baezjDaGyBqrW8xGqw3a5";
const lyrics = document.querySelector(".lyrics-container > p");
const songThumbnail = document.querySelector(".player-container > img");
const songTitle = document.querySelector(".player-container > h2");
const songArtist = document.querySelector(".player-container > p");
const tabsHeader = document.querySelectorAll(".tabs-header > a");
const lyricsContainer = document.getElementById("lyrics");
const albumsContainer = document.getElementById("albums");
const artistsContainer = document.getElementById("artist");
const detailsContainer = [lyricsContainer, albumsContainer, artistsContainer];

const songHeaders = {
  "X-RapidAPI-Key": "6a16507df5msh23d164fb0009391p1dce14jsn96546fdbc5a8",
  "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
};

const albumArtistheaders = {
  "X-RapidAPI-Key": "6a16507df5msh23d164fb0009391p1dce14jsn96546fdbc5a8",
  "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
};

const songConfig = {
  method: "GET",
  url: "https://genius-song-lyrics1.p.rapidapi.com/song/details/",
  params: { id: songId },
  headers: songHeaders,
};

const lyricsConfig = {
  method: "GET",
  url: "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/",
  params: { id: songId },
  headers: songHeaders,
};

const albumsConfig = {
  method: "GET",
  url: "https://spotify23.p.rapidapi.com/artist_albums/",
  params: {
    id: artistID,
    offset: "0",
    limit: "100",
  },
  headers: albumArtistheaders,
};

const artistConfig = {
  method: "GET",
  url: "https://spotify23.p.rapidapi.com/artist_related/",
  params: {
    id: artistID,
  },
  headers: albumArtistheaders,
};

const showTabContent = (e) => {
  detailsContainer.forEach((item) => {
    item.classList.add("show-hide");
    if (item.id === e.target.ariaLabel) {
      item.classList.remove("show-hide");
    }
  });
};
tabsHeader.forEach((tabs) => {
  tabs.addEventListener("click", (e) => {
    showTabContent(e);
  });
});

const MusicPlayer = (data) => {
  const { thumbnail, title, artistName } = data;

  songThumbnail.setAttribute("src", thumbnail);
  songTitle.innerHTML = title;
  songArtist.innerHTML = artistName;
};

const renderAlbums = (albums) => {
  const albumElements = albums
    .map(
      (item) => `
    <div class="album">
      <a href=${item.releases.items[0].sharingInfo.shareUrl}>
        <div class="album-image-container">
          <img src=${item.releases.items[0].coverArt.sources[2].url} alt="album image"/>
        </div>
      </a>
      <p class="album-name">${item.releases.items[0].name}</p>
      <p class="album-date">${item.releases.items[0].date.year}</p>
    </div>
  `
    )
    .join("");

  albumsContainer.innerHTML = albumElements;
};

const createArtistElement = (artist) => {
  const artistDiv = document.createElement("div");
  artistDiv.className = "artist";

  const artistLink = document.createElement("a");
  artistLink.href = artist.external_urls.spotify;

  const artistImgDiv = document.createElement("div");
  artistImgDiv.className = "artist-image-container";

  const artistImg = document.createElement("img");
  artistImg.src = artist.images[0].url;

  const artistName = document.createElement("p");
  artistName.innerHTML = artist.name;

  artistImgDiv.appendChild(artistImg);
  artistLink.appendChild(artistImgDiv);
  artistDiv.appendChild(artistLink);
  artistLink.insertAdjacentElement("afterend", artistName);

  return artistDiv;
};

const renderArtists = (artists) => {
  const artistElements = artists.map(createArtistElement);
  artistsContainer.innerHTML = "";
  artistElements.forEach((element) => {
    artistsContainer.appendChild(element);
  });
};

const getAPI = async () => {
  try {
    const songDetails = await axios(songConfig);
    const lyricsData = await axios(lyricsConfig);
    const albumsData = await axios(albumsConfig);
    const relatedArtistsData = await axios(artistConfig);

    const musicPlayerData = {
      thumbnail: songDetails.data.song.header_image_thumbnail_url,
      title: songDetails.data.song.title,
      artistName: songDetails.data.song.artist_names,
    };
    const songLyrics = lyricsData.data.lyrics.lyrics.body.html;
    const otherAlbums = albumsData.data.data.artist.discography.albums.items;
    const relatedArtists = relatedArtistsData.data.artists;

    MusicPlayer(musicPlayerData);
    lyricsContainer.innerHTML = songLyrics;
    renderAlbums(otherAlbums);
    renderArtists(relatedArtists);
  } catch (err) {
    console.log(err);
  }
};

getAPI();
