import dotenv from 'dotenv';
dotenv.config();

//Functions to get [id]

export const getArtist = async id => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/artists/${id}/`,
    );
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/albums/${id}/`,
    );
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

export const deleteArtist = async id => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artists/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

export const deleteAudio = async id => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/audios/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

export const deleteAudioAlbum = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/audioFromAlbum/${id}`,
    {
      method: 'DELETE',
    },
  );
  const data = await res.json();
  return data;
};

//Functions to get all

export const getArtists = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artists`, {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`);
  const data = await response.json();
  return data;
};

export const getAudios = async page => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/audios?page=${page}`,
  );
  const data = await response.json();
  return data;
};

// Function update

export const updateArtist = async (id, data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/artists/${id}`,
    {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    },
  );
  const res = await response.json();
  return res;
};

export const updateAlbum = async (id, data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/albums/${id}`,
    {
      method: 'PUT',
      body: data,
    },
  );
  const res = await response.json();
  return res;
};

export const updateAudio = async (id, data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/audios/${id}`,
    {
      method: 'PUT',
      body: data,
    },
  );
  const res = await response.json();
  return res;
};

export const updateAudioAlbum = async (id, data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/audioFromAlbum/${id}`,
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};

export const createAlbum = async formData => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/album`, {
    method: 'POST',
    body: formData,
  });
  const res = await response.json();
  return res;
};

export const createAudio = async formData => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/audio`, {
    method: 'POST',
    body: formData,
    cache: 'no-cache',
  });
  const data = await response.json();
  return data;
};

export const createAudioAlbum = async formData => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/audioFromAlbum`,
    {
      method: 'POST',
      body: formData,
      cache: 'no-cache',
    },
  );
  const data = await response.json();
  return data;
};

// Function count

export const getListenCount = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countListenTotal`,
  );
  const data = await response.json();
  return data;
};

export const getCountAlbums = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/countAlbum`);
  const data = await response.json();
  return data;
};

export const getCountAudios = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/countAudio`);
  const data = await response.json();
  return data;
};

export const getCountArtist = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countArtist`,
  );
  const data = await response.json();
  return data;
};
