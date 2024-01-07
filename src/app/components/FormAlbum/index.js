import Modal from '../Modal';
import Button from '../Button';

const index = ({
  isUpdate,
  onSubmit,
  title,
  setTitle,
  cover,
  artists,
  handleCoverChange,
  selectedType,
  setSelectedType,
  selectedArtist,
  setSelectedArtist,
  types,
}) => {
  return (
    <div>
      {isUpdate ? (
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center p-4 space-y-4">
          <input
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            value={title}
            className="w-full text-black px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-second"
          />
          <label className="flex items-center justify-center w-full p-4 bg-gray-100 border-2  rounded cursor-pointer">
            <span className="text-base text-gray-600">
              {cover ? cover.name : 'Upload Cover Image'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />
          </label>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="w-full px-4 py-2 rounded text-black">
            <option value="">Select album genre</option>
            {types &&
              types.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>
          <Button type="submit">Update</Button>
        </form>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center p-4 space-y-4">
          <input
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2  rounded text-black"
          />
          <label className="flex items-center justify-center w-full p-4 bg-gray-100  rounded cursor-pointer">
            <span className="text-base text-gray-600">
              {cover ? cover.name : 'Upload Cover Image'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />
          </label>
          <select
            value={selectedArtist}
            onChange={e => setSelectedArtist(e.target.value)}
            className="w-full px-4 py-2  rounded text-black">
            <option value="">Select Artist</option>
            {artists &&
              artists.map(artist => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
          </select>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="w-full px-4 py-2 rounded text-black">
            <option value="">Select Music Type</option>
            {types &&
              types.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>
          <Button type="submit">Create Album</Button>
        </form>
      )}
    </div>
  );
};
export default index;
