import "~/app.css";
export default function Compositions() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      {[
        {
          title: "Sunset",
          src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=400&q=80",
        },
        {
          title: "Forest",
          src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&h=400&q=80",
        },
        {
          title: "Mountains",
          src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&h=400&q=80",
        },
        {
          title: "Ocean",
          src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=400&q=80",
        },
      ].map((img) => (
        <div
          key={img.title}
          className="rounded-xl overflow-hidden shadow bg-white flex flex-col items-center p-4"
        >
          <div className="rounded-lg overflow-hidden h-full w-full object-cover">
            <img
              src={img.src}
              alt={img.title}
              className="rounded-lg overflow-hidden w-full object-cover"
            />
          </div>
          <h2 className="mt-4 mb-2 text-lg">{img.title}</h2>
        </div>
      ))}
    </div>
  );
}
