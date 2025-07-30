import { Hospital } from "lucide-react";
import { Link } from "react-router";
import { menuItems } from "../constant";

const Footer = () => {
  return (
    <div className="bg-[#101828]">
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1  p-4 md:p-8 lg:gap-15">
        <div className="space-y-2">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Hospital className="text-blue-600" />
              {/* Optional: Add text beside logo */}
              <span className="ml-2 md:text-2xl font-bold text-blue-600">
                Med Help
              </span>
            </Link>
          </div>
          <div className="text-white text-wrap">
            At Med Help, we are dedicated to connecting patients in urgent need
            with nearby volunteers and medical support. Whether it’s guidance,
            first aid, or emergency response, our goal is to ensure no call for
            help goes unanswered. Compassion, speed, and community are at the
            heart of everything we do.
          </div>
        </div>
        <div className="text-white">
          <h1 className="text-2xl font-semibold underline">Quick Links</h1>
          <div className="flex flex-col gap-2 my-2">
            {menuItems.map((link) => (
              <Link to={link.path} key={link.path}>
                <span className="text-white hover:text-blue-500">
                  {link.label}
                </span>
              </Link>
            ))}
            <Link to="login">
              <span className="text-white hover:text-blue-500">Login</span>
            </Link>
            <Link to="register">
              <span className="text-white hover:text-blue-500">Register</span>
            </Link>
          </div>
        </div>
        <div className="text-white">
          <h1 className="text-2xl font-semibold underline">Contact us</h1>
          <div className="grid grid-cols-5 my-2">
            <div className="col-span-1">
              <p>Email:</p>
              <p>Phone:</p>
            </div>
            <div className="col-span-4">
              <p>support@medHelp.com</p>
              <p>+880 17XXXXXXXX</p>
            </div>
          </div>
          <p className="my-8">
            Daffodil International University 3rd Year Students, CSE Dept.
          </p>
          <img src="./DIU-Logo.png" alt="diu logo" width={200} height={100} />
        </div>
      </div>

      <div className="text-center text-white">
        <p>© 2025 MedHelp. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
