import React from 'react'
import "./Header.css"

function Header() {
  return (
    <>
    <div className='z-10 fixed top-0 w-full'>
      <div class="header">
        <div>
          <svg
            class="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 25 150 25"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            
            <g class="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="#2c1057"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="#411882"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="#4c1c98"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="7"
                fill="#5720ae"
              />
            </g>
          </svg>
          <div>
            <a href='/'>
            <span className="absolute top-0 left-0 translate-x-2 font-bold text-2xl tracking-wider text-black dark:text-white">Projects</span>
            <span className="absolute top-0 right-0 -translate-x-2 font-bold text-2xl tracking-wider text-black dark:text-white">Aniket Soni</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Header