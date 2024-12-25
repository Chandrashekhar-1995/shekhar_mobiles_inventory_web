import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box className="bg-gray-800 text-white py-6 fixed inset-x-0 bottom-0">
      {/* Links Section */}
      <Box className="flex justify-center space-x-6 mb-4">
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
        <Link href="/services" className="text-white hover:underline">
          Services
        </Link>
        <Link href="/shop" className="text-white hover:underline">
          Shop
        </Link>
        <Link href="/about-us" className="text-white hover:underline">
          About Us
        </Link>
        <Link href="/contact" className="text-white hover:underline">
          Contact
        </Link>
      </Box>

      {/* Social Media Icons */}
      <Box className="flex justify-center space-x-4 mb-4">
        <IconButton href="https://facebook.com" target="_blank" className="text-white">
          <FacebookIcon />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" className="text-white">
          <TwitterIcon />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" className="text-white">
          <InstagramIcon />
        </IconButton>
        <IconButton href="https://linkedin.com" target="_blank" className="text-white">
          <LinkedInIcon />
        </IconButton>
      </Box>

      {/* Copyright Section */}
      <Typography variant="body2" className="text-center">
        &copy; {new Date().getFullYear()} Shop Name. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
