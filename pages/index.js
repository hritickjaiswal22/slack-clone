import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      Home
      <Link href="/signin">Sign In</Link>
      <Link href="/signup">Sign Up</Link>
    </div>
  );
}
