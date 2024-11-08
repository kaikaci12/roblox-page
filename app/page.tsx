import Head from "next/head";
import NavBar from "./components/NavBar";
import RobuxBox from "./components/RobuxBox";
import Middle from "./components/Middle";
import GetRobux from "./components/GetRobux";
export default function Home() {
  return (
    <div className="home-container">
      <Middle />
      <GetRobux />
    </div>
  );
}
