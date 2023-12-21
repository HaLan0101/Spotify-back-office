import Button from '@/app/components/Button';

const AudioForm = ({
  onSubmit,
  audioTitle,
  setAudioTitle,
  audioFile,
  setAudioFile,
  isUpdate,
  albums,
  selectedAlbum,
  setSelectedAlbum,
  audioFirst,
}) => {
  return (
    <div>
      {audioFirst ? (
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center p-4 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={audioTitle}
            onChange={e => setAudioTitle(e.target.value)}
            className="w-full px-4 py-2 rounded"
            required
          />
          <label className="flex items-center justify-center w-full p-4 bg-gray-100 rounded cursor-pointer">
            <span className="text-base text-gray-600">
              {audioFile ? audioFile.name : 'Upload audio file'}
            </span>
            <input
              type="file"
              accept="audio/*"
              onChange={e => setAudioFile(e.target.files[0])}
              className="hidden"
              required
            />
          </label>
          <select
            value={selectedAlbum}
            onChange={e => setSelectedAlbum(e.target.value)}
            className="w-full px-4 py-2  rounded "
            required>
            <option value="">Select Album</option>
            {albums.map(album => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
          <Button type="submit">Create</Button>
        </form>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center p-4 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={audioTitle}
            onChange={e => setAudioTitle(e.target.value)}
            className="w-full px-4 py-2 rounded"
            required
          />
          <label className="flex items-center justify-center w-full p-4 bg-gray-100 rounded cursor-pointer">
            <span className="text-base text-gray-600">
              {audioFile ? audioFile.name : 'Upload audio file'}
            </span>
            <input
              type="file"
              accept="audio/*"
              onChange={e => setAudioFile(e.target.files[0])}
              className="hidden"
            />
          </label>
          <Button type="submit">
            {isUpdate ? 'Update Audio' : 'Create Audio'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default AudioForm;
