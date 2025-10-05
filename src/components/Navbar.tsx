import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-center gap-4 sm:gap-6 py-4 text-sm font-medium px-4">
      <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
      <Link href="/scene" className="hover:text-brand-scene transition-colors">Scene</Link>
      <Link href="/sense" className="hover:text-brand-sense transition-colors">Sense</Link>
      <Link href="/system" className="hover:text-brand-system transition-colors">System</Link>
      <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
    </nav>
  );
}
