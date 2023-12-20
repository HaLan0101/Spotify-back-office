//Functions to get [id]

export const getArtist = async id => {
  try {
    const response = await fetch(`http://localhost:3000/api/artists/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch artist');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching artist:', error);
    throw new Error('Failed to fetch artist');
  }
};

export const getAlbum = async id => {
  try {
    const response = await fetch(`http://localhost:3000/api/albums/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch artist');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching artist:', error);
    throw new Error('Failed to fetch artist');
  }
};
//Functions to delete [id]

export const deleteAlbum = async id => {
  const res = await fetch(`http://localhost:3000/api/albums/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

export const deleteArtist = async id => {
  const res = await fetch(`http://localhost:3000/api/artists/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

export const deleteAudio = async id => {
  const res = await fetch(`http://localhost:3000/api/audios/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

export const deleteAudioAlbum = async id => {
  const res = await fetch(`http://localhost:3000/api/audioFromAlbum/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

//Functions to get all

export const getArtists = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/artists', {
      cache: 'no-cache',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};

export const getAlbums = async () => {
  const response = await fetch('http://localhost:3000/api/albums');
  const data = await response.json();
  return data;
};

export const getAudios = async page => {
  const response = await fetch(`http://localhost:3000/api/audios?page=${page}`);
  const data = await response.json();
  return data;
};

// Function update

export const updateArtist = async (id, data) => {
  const response = await fetch(`http://localhost:3000/api/artists/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};

export const updateAlbum = async (id, data) => {
  const response = await fetch(`http://localhost:3000/api/albums/${id}`, {
    method: 'PUT',
    body: data,
  });
  const res = await response.json();
  return res;
};

export const updateAudio = async (id, data) => {
  const response = await fetch(`http://localhost:3000/api/audios/${id}`, {
    method: 'PUT',
    body: data,
  });
  const res = await response.json();
  return res;
};

export const updateAudioAlbum = async (id, data) => {
  const response = await fetch(
    `http://localhost:3000/api/audioFromAlbum/${id}`,
    {
      method: 'PUT',
      body: data,
    },
  );
  const res = await response.json();
  return res;
};

//  Function create

export const createArtist = async data => {
  const response = await fetch('http://localhost:3000/api/artist', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};

export const createAlbum = async formData => {
  const response = await fetch('http://localhost:3000/api/album', {
    method: 'POST',
    body: formData,
  });
  const res = await response.json();
  return res;
};

export const createAudio = async formData => {
  const response = await fetch('http://localhost:3000/api/audio', {
    method: 'POST',
    body: formData,
    cache: 'no-cache',
  });
  const data = await response.json();
  return data;
};

export const createAudioAlbum = async formData => {
  const response = await fetch('http://localhost:3000/api/audioFromAlbum', {
    method: 'POST',
    body: formData,
    cache: 'no-cache',
  });
  const data = await response.json();
  return data;
};

// Function count

export const getListenCount = async () => {
  const response = await fetch('http://localhost:3000/api/countListenTotal');
  const data = await response.json();
  return data;
};

export const getCountAlbums = async () => {
  const response = await fetch('http://localhost:3000/api/countAlbum');
  const data = await response.json();
  return data;
};

export const getCountAudios = async () => {
  const response = await fetch('http://localhost:3000/api/countAudio');
  const data = await response.json();
  return data;
};
