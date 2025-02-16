import Link from "next/link";


export default function Home() {

  return (
    <div>
        <h1>Hi, you need to <Link href={'/auth'}>LOGIN</Link> in to authenticate!</h1>
    </div>
  );
}
