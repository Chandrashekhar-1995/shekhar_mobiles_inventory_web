import React from "react"

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-gray-800 text-white p-4 fixed insert-x-0 bottom-0">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by JMD Mobiles Shop</p>
  </aside>
</footer>
  )
}

export default Footer