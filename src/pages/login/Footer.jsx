import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-white"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-gray-100" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-gray-400 font-semibold py-1">
                Copyright © {new Date().getFullYear()}{" "}
                <span
                  className="text-sm font-semibold py-1"
                >
                  Adedeji Stephen - 17/67AA/163
                </span>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <span
                    className="text-gray-400 text-sm font-semibold block py-1 px-3"
                  >
                    Final Year Student Project
                  </span>
                </li>
                <li>
                  <a
                    href="https://github.com/ionware/fyp-frontend"
                    className="text-gray-400 hover:text-green-500 text-sm font-semibold block py-1 px-3"
                  >
                    GitHub Repo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}