import { redirect } from "next/navigation";

export const metadata = { title: "AWS Student Builder Group at DIA" };

export default function AWSWingRedirect() {
  redirect("https://aws.diapc.dev");
}
