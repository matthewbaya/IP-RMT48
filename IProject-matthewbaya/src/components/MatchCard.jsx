export default function MatchCard({ user }) {
  return (
    <>
      <div className="flex-1 p-10 h-3/4">
        <div className="w-80 mx-auto mt-8 rounded-lg shadow-md overflow-hidden">
          <img
            src={user.imageUrl}
            alt="https://ih1.redbubble.net/image.1061922538.9003/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
            className="w-full h-96 object-cover"
          />

          <div className="p-4">
            <h2 className="text-xl font-semibold">{user.displayName}</h2>
            <p className="text-gray-600">{user.bio}</p>

            <div className="mt-4 flex justify-between items-center">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                Uninterested
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                Like
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
