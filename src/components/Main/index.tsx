import AssetsGrid from "../AssetsGrid";
import SearchBar from "../SearchBar";

const Main = () => {
  return (
    <>
      <main className="flex flex-col-reverse p-2 md:flex-col bg-background-white">
        <div className="fixed bottom-0 left-0 right-0 flex justify-center p-2 bg-background-white md:top-0 md:bottom-auto">
          <SearchBar />
        </div>
        <AssetsGrid />
      </main>
    </>
  );
};

export default Main;
