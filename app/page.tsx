import Middle from "./components/Middle";
import GetRobux from "./components/GetRobux";

export default async function Home() {
  return (
    <div className="home-container">
      <Middle />
      <GetRobux />
    </div>
  );
}
