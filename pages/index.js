import Link from "next/link";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  console.log(useSelector((state) => state.authState));
  return (
    <main>
      <Header />
      Home
      <Link href="/signin">Sign In</Link>
      <Link href="/signup">Sign Up</Link>
    </main>
  );
}
