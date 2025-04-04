import CharacterSelected from "../../components/organisms/Character-Selected/CharacterSelected";
import SideBar from "../../components/organisms/SideBar/SideBar";
import { useCharacters } from "../../hooks/UseAllCharacters/useAllCharacters";

const Destktop = () => {
  const { loading } = useCharacters();

  return (
    <main className="hidden md:grid md:grid-cols-[375px_1fr] md:h-screen bg-white">
      <SideBar loading={loading} />
      <CharacterSelected />
    </main>
  );
};

export default Destktop;
