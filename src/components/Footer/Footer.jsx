import { Link } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export default function Footer() {
  return (
    <footer className="py-12 px-6 text-gray-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <EventAvailableIcon className="text-gray-900" />
              <span className="font-bold text-xl">Crypto Scheduler</span>
            </Link>
            <p className="text-sm text-gray-700">
              Schedule and automate your crypto transactions with ease.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-gray-700">
          © {new Date().getFullYear()} Crypto Scheduler. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
