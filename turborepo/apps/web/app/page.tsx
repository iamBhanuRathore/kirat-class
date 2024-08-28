"use client";
// import Image from "next/image";
// import { Button } from "@repo/ui/components/button";
// import styles from "./page.module.css";
import { myType } from "@repo/common/index";
export default function Home() {
  const obj = {
    name: "bhanu",
    age: 21,
  };
  const isOk = myType.safeParse(obj);
  console.log(isOk);
  return <div className="bg-red-300">hello</div>;
}
