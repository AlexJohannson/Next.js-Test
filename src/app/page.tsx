import Link from "next/link";
import React from "react";
import Menu from "@/components/menu/Menu";
import {IUser} from "@/models/usersModels/IUser";



export default function Home() {

  return (
    <div>
        <h1>Hi, you need to <Link href={'/auth'}>LOGIN</Link> in to authenticate!</h1>
    </div>
  );
}
