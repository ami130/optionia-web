"use client";

import { Input } from "@/components/ui/input";
import { Dribbble, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-10 px-6 md:px-12 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-8 gap-10  ">
        {/* Logo + Subscribe */}
        <div className="col-span-3">
          <div className="flex items-center space-x-2 text-white mb-4">
            <span className="font-semibold text-lg">Inkybey</span>
          </div>

          <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
            <Input
              type="email"
              placeholder="Enter email to receive updates"
              className="bg-transparent rounded border-gray-300 text-gray-300 placeholder:text-gray-500"
            />
          </div>

          <p className="text-sm mb-3">Connect with us</p>
          <div className="flex space-x-3">
            <a
              href="#"
              className="hover:bg-black hover:border text-white p-2 rounded-full bg-gray-700 duration-300 hover:duration-300"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="hover:bg-black hover:border text-white p-2 rounded-full bg-gray-700 duration-300 hover:duration-300"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="hover:bg-black hover:border text-white p-2 rounded-full bg-gray-700 duration-300 hover:duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="hover:bg-black hover:border text-white p-2 rounded-full bg-gray-700 duration-300 hover:duration-300"
            >
              <Dribbble size={20} />
            </a>
          </div>
        </div>

        <div className="col-span-3 flex justify-between gap-5 ">
          {/* The Project */}
          <div className="">
            <h3 className="text-white font-semibold mb-3">The Project</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press Kit
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Iconathon
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Draft.LA
                </a>
              </li>
            </ul>
          </div>

          {/* Learn More */}
          <div className="">
            <h3 className="text-white font-semibold mb-3">Learn More</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Mac App
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Teams
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Creators
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Support + Ad */}
          <div className="">
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-xs mb-5">
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Creators Handbook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Creator Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-2 space-x-2 ">
          <h3 className="text-white font-semibold mb-3">Add The desk</h3>

          <Image
            src="/placeholder-ad.png"
            alt="Ad preview"
            width={100}
            height={60}
            className="rounded"
          />
          <p className="text-xs">
            Unite your creative team in one place. Share visual files & get
            feedback. Try it now.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Noun Project — All rights reserved.
      </div>
    </footer>
  );
}
