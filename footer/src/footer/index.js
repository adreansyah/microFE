import React from "react";

import "../index.scss";

const Footer = () => (
    <footer className="relative left-0 right-0 bottom-0 p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://tmdb.com/" className="hover:no-underline no-underline">TMDB™</a>. All Rights Reserved.
        </span>
        <ul className="flex  flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="#" className="mr-4 hover:no-underline no-underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:no-underline no-underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:no-underline no-underline md:mr-6">Licensing</a>
            </li>
            <li>
                <a href="#" className="hover:no-underline no-underline">Contact</a>
            </li>
        </ul>
    </footer>
);
export default Footer
