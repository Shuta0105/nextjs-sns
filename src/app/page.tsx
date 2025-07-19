import MainContent from "@/components/component/MainContent";
import LeftSidebar from "@/components/component/LeftSidebar";
import RightSidebar from "@/components/component/RighSidebar";


export default async function Home() {
  return (
    <div className="flex">
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
}
