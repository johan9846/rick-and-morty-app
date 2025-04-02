import CharacterSelected from "../../components/organisms/Character-Selected/CharacterSelected";
import SideBar from "../../components/organisms/SideBar/SideBar";

const Destktop = () => {
  return (
    <main className="hidden md:grid md:grid-cols-[theme(spacing.375)_1fr] md:h-screen bg-white">
      <SideBar />
      <CharacterSelected />
    </main>
  );
};

export default Destktop;
