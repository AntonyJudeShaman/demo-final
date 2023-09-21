"use client";
import {
    HiHome,
    HiUser,
    HiRectangleGroup,
    HiViewColumns,
    HiEnvelope,
    
  } from "react-icons/hi2";
  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { motion } from "framer-motion";
  
  //  links
  const links = [
    { name: "home", path: "/", icon: <HiHome /> },
    { name: "about", path: "/about", icon: <HiUser /> },
    { name: "features", path: "#features", icon: <HiRectangleGroup /> },
    // { name: "work", path: "/work", icon: <HiViewColumns /> },
    // { name: "contact",path: "/contact", icon: <HiEnvelope />, },
  ];
  
  const Nav = () => {
    const router = useRouter();
    const pathname = router.pathname;
  
    return (
      <motion.nav
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay:0.25 }}
        className="flex flex-col items-center p-8 lg:justify-center gap-y-4 fixed h-max bottom-0 mt-auto lg:left-[2rem] z-50 top-0 w-full lg:w-16 lg:max-w-md lg:h-screen"
      >
        <div className="flex lg:flex-col gap-8 text-white bg-black border border-zinc-50 p-4 justify-center items-center text-2xl rounded-full">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`${
                  link.path === pathname && "text-accent"
                } items-center hover:text-accent transition-all duration-300 flex group`}
              >
                <div className="absolute left-20 hidden xl:group-hover:flex ">
                  <div className="bg-white text-primary text-[12px] p-[0.5rem] rounded-[0.5rem] relative leading-none capitalize">
                    {link.name}
                  </div>
                  <div className="top-1 border-solid border-r-white border-r-8 border-y-transparent border-y-8 border-l-0 absolute -left-1"></div>
                </div>
                <div className="hover:text-green-300 text-blue-400">{link.icon}</div>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    );
  };
  
  export default Nav;
  