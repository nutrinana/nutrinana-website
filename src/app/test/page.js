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
        <Timeline
        timelineData={[
            {
                year: "2021",
                text: "The magic begins! Nana perfects her activated granola recipe and starts selling it to her local neighbourhood.",
                image: "/timeline/first_batch.jpg"
            },
            {
                year: "2022",
                text: "Nutrinana goes digital! The Activated Granola hits the virtual shelves on DELLI, making its way to kitchens across the UK.",
                image: "/timeline/DELLI_package.jpeg"
            },
            {
                year: "2023",
                text: "Nana joins forces with a group of green-thumbed garden enthusiasts to grow her own veggies in a shared allotment. Fresh, home-grown ingredients inspire new recipes, which she shares with her growing Instagram family.",
                image: "/timeline/allotment.jpg"
            },
            {
                year: "2024",
                text: "Nutrinana’s Activated Granola finds a home in the Black Farmers Shop in Brixton, bringing the taste of Nana’s kitchen to even more happy customers. This is only just the beginning!",
                image: "/timeline/TBF_shelf.jpeg"
            }
            // ,
            // {
            //     year: "2025",
            //     text: "Lorem Ipsum Dolor Sit Amet",
            //     image: "https://placehold.co/200x216"
            // }
            // ,
            // {
            //     year: "2025",
            //     text: "Lorem Ipsum Dolor Sit Amet",
            //     image: "https://placehold.co/200x216"
            // }
        ]}
        />  
      </main>
      {/* <Footer /> */}
    </div>
  );
}