import Link from "next/link"
import { useRouter } from "next/router" // Change from "next/navigation"
import { motion } from "framer-motion"
import {
  HiEnvelope,
  HiHome,
  HiRectangleGroup,
  HiUser,
  HiViewColumns,
} from "react-icons/hi2"

// links
const links = [
  { name: "home", path: "/", icon: <HiHome /> },
  { name: "about", path: "/about", icon: <HiUser /> },
  { name: "features", path: "#features", icon: <HiRectangleGroup /> },
  // { name: "work", path: "/work", icon: <HiViewColumns /> },
  // { name: "contact", path: "/contact", icon: <HiEnvelope /> },
]

const Nav = () => {
  const router = useRouter()
  const pathname = router.pathname

  return (
    <motion.nav
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.25 }}
      className="fixed inset-y-0 z-50 mt-auto flex h-max w-full flex-col items-center gap-y-4 p-8 lg:left-[2rem] lg:h-screen lg:w-16 lg:max-w-md lg:justify-center"
    >
      <div className="flex items-center justify-center gap-8 rounded-full border border-zinc-50 bg-black p-4 text-2xl text-white lg:flex-col">
        {links.map((link, index) => {
          return (
            <Link href={link.path} key={index}>
              <a
                className={`${
                  link.path === pathname ? "text-accent" : "text-white" // Add else condition to set text to white
                } group flex items-center transition-all duration-300 hover:text-accent`}
              >
                <div className="absolute left-20 hidden xl:group-hover:flex">
                  <div className="relative rounded-[0.5rem] bg-white p-[0.5rem] text-[12px] capitalize leading-none text-primary">
                    {link.name}
                  </div>
                  <div className="absolute -left-1 top-1 border-y-8 border-l-0 border-r-8 border-solid border-y-transparent border-r-white"></div>
                </div>
                <div className="text-blue-400 hover:text-green-300">
                  {link.icon}
                </div>
              </a>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}

export default Nav
