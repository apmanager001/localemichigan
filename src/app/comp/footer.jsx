import React from "react";
import Link from "next/link";
// import Newsletter from "./newsletter";
// import { gameLinks, kidLinks } from "./headerComps/headerLinks";
import { Home, Gamepad2, ClipboardList, Menu } from "lucide-react";
// import FooterDrawer from "./footerDrawer";

const Footer = () => {
  return (
    <>
      <footer className="block mt-auto w-full z-10 bg-base-200">
        <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="col-span-full lg:col-span-1">
              <a
                className="flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
                href="#"
                aria-label="Brand"
              >
                Locale Michigan
              </a>
            </div>

            <div className="col-span-1">
              <div className="mt-3 grid space-y-3">
                <ul className="flex flex-col gap-y-2  ">
                  <ol>
                    <Link
                      href="/cities"
                      className="hover:text-gray-600 hover:underline"
                    >
                      All City's
                    </Link>
                  </ol>
                  <ol>
                    <Link
                      href="/about"
                      className="hover:text-gray-600 hover:underline"
                    >
                      About Us
                    </Link>
                  </ol>
                </ul>
              </div>
            </div>

            <div className="col-span-1">
              <div className="mt-3 grid space-y-3 ">
                <p>
                  <Link className="" href="/lighthouses">
                    Lighthouses
                  </Link>
                </p>
                <p>
                  <Link className="" href="/parks">
                    Parks
                  </Link>
                </p>
                <p>
                  <Link className="" href="/lakes">
                    Lakes
                  </Link>
                </p>
                <p>
                  <Link className="" href="/museum">
                    Museums
                  </Link>
                </p>
              </div>
            </div>

            <div className="col-span-2">
              {/* <h4 className="font-semibold">
                Get Updates on New Games:
              </h4> */}

              {/* <Newsletter /> */}
            </div>
          </div>

          <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">© 2025 Locale Michigan.</p>
            </div>

            <div className="underline">
              <a href="mailto:contact@localemichigan.com">
                contact@localemichigan.com
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* <footer className="block md:hidden fixed bottom-0 left-0 right-0 bg-base-200 p-2 w-full">
        <div className="flex justify-around items-center">
          <a
            href="/"
            className=""
            aria-label="Home"
          >
            <Home size={36} />
          </a>
          <a
            href="/games"
            className=""
            aria-label="Games"
          >
            <Gamepad2 size={36} />
          </a>
          <a
            href="/leaderboard"
            className=""
            aria-label="Leaderboard"
          >
            <ClipboardList size={36} />
          </a>
          <div className="drawer drawer-end w-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content text-gray-400 hover:text-gray-200 transition-all duration-300">
              <label htmlFor="my-drawer-4">
                <Menu size={36} className="cursor-pointer" />
              </label>
            </div>
         <FooterDrawer /> 
          </div>
        </div>
      </footer> 
      */}
    </>
  );
};

export default Footer;
