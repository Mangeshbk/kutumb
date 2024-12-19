"use client";
import React, { useState } from "react";
import "./index.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiUserCircleDuotone } from "react-icons/pi";

export default function Navbar() {
  const router = useRouter();
  const username = localStorage.getItem("username");
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const handleToLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <main className='navbar_wrapper'>
      <div className='navbar_container'>
        <div>
          <Link href={`/`} as={`/`}>
            <h1>Quote</h1>
          </Link>
          <Link
            href={`/create-quote`}
            as={`/create-quote`}
            className='page-link'
          >
            Create Quote
          </Link>
        </div>
        {/* <div className='user_section'>
          {username ? (
            <>
              <PiUserCircleDuotone size={36} /> {username}
            </>
          ) : (
            <button onClick={handleToLogin}>Login</button>
          )}
        </div> */}
        <div className='user_section'>
          {username ? (
            <div className='user-popover-wrapper'>
              <div
                className='user-display'
                onClick={togglePopover}
                role='button'
                tabIndex={0}
              >
                <PiUserCircleDuotone size={36} />
                {username}
              </div>
              {showPopover && (
                <div className='popover'>
                  <button className='logout-button' onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleToLogin}>Login</button>
          )}
        </div>
      </div>
    </main>
  );
}
