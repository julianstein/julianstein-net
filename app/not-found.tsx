import Link from "next/link";
import { PageTransition } from "@/components/page-transition";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="px-1.5 pt-3 text-sm">
        <p>404 page</p>
      </div>
    </PageTransition>
  );
}
