import { Logo } from "@/app/(signin-required)/(dashboard)/_components/logo"
import { UserButton } from "@/components/user-button"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm justify-between">
      <Logo/>
      <p></p>
      <UserButton/>
    </div>
  )
}