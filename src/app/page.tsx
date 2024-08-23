import LeftPannel from "@/components/home/left-panel";
import RightPanel from "@/components/home/right-panel";

export default function Home() {
  return (
    <main className='m-5'>
      <div className='flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-left-panel'>
        <div className='fixed top-0 left-0 w-full h-36 bg-green-primary dark:bg-transparent -z-30' />
        <LeftPannel />
        <RightPanel />
      </div>
    </main>
  );
}