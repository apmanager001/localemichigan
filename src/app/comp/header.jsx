import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import HomepageWeather from './homepageWeather';

const Header = () => {

  const menu = (
    <>
      <li>
        <a href="/cities">Cities</a>
      </li>
      <li>
        <a href="/lighthouses">Lighthouses</a>
      </li>
      <li>
        <a href="/lakes">Lakes</a>
      </li>
      <li>
        <a href="/parks">Parks</a>
      </li>
      <li>
        <a href="/museum">Museums</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      {/* <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Item 3</a>
      </li> */}
    </>
  );

  return (
    <div className="navbar flex-col sm:flex-row items-start sm:items-center bg-base-100 shadow-sm">
      <div className="navbar-start flex flex-1">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menu}

          </ul>
        </div>
        <div className="navbar-start">
          <Image
            src="/icon.png"
            height={100}
            width={100}
            alt="Logo Icon"
            priority
          />
          <Link href="/" className="btn btn-ghost text-xl">
            Locale Michigan
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden md:flex justify-center flex-1">
        <ul className="menu menu-horizontal px-1 font-extrabold text-lg">
          {menu}
        </ul>
      </div>
      <div className="navbar-end w-full md:w-auto flex gap-4 justify-center md:justify-end flex-1" >
        <a className="btn btn-soft btn-success scroll-smooth" href="#map">
          Map
        </a>
        {/* <HomepageWeather /> */}
      </div>
    </div>
  );
}

export default Header