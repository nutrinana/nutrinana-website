import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Timeline from "@/components/Timeline";

export default function TestPage() {
  return (
    <div>
      {/* <Banner /> */}
      {/* <Navbar /> */}
      <main className="p-10">
        <h1 className="text-3xl font-bold">Component Preview</h1><br/>
      <Timeline />
      </main>
      {/* <Footer /> */}
    </div>
  );
}