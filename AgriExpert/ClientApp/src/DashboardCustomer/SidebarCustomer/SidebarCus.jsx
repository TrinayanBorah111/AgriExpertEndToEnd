import "../SidebarCustomer/SidebarCus.css";
import { GiFallingLeaf } from "react-icons/gi";
import { UilSignOutAlt, UilBars, UilShoppingCart } from "@iconscout/react-unicons";

import {
  UilUserCheck,
  UilUserTimes,
  UilUserSquare,
  UilNerd,
  UilNotes
} from "@iconscout/react-unicons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function SidebarCus() {
  const [expanded, setExpanded] = useState(false);
  const [screenSize, setScreenSize] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setScreenSize("mobile");
      } else {
        setScreenSize("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sidebarVariants = {
    mobileExpanded: {
      left: "0"
    },
    mobileCollapsed: {
      left: "-68%"
    },
    desktopExpanded: {
      left: "6%"
    },
    desktopCollapsed: {
      left: "68%"
    }
  };

  const sidebarAnimation =
    screenSize === "mobile"
      ? `${expanded ? "mobileExpanded" : "mobileCollapsed"}`
      : `${expanded ? "desktopExpanded" : "desktopCollapsed"}`;

  return (
    <>
      <div
        className="bar"
        style={expanded ? { left: "68%" } : { left: "6%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>

      <motion.div
        className="Sidebar"
        variants={sidebarVariants}
        animate={sidebarAnimation}
      >
        {/* logo */}
        <div className="logo">
          <logo-icon>
            <GiFallingLeaf color="green" size="3rem" />
          </logo-icon>
          <span>
            das<span>HB</span>oard
          </span>
        </div>

        {/* Menu */}
        <div className="menu">
          <a href="/dashboardcustomer">
            <div>
              <div className="sjj">
                <UilNerd />
              </div>
              <span className="sp"> Information </span>
            </div>
          </a>

          <a href="/solquescus">
            <div>
              <div className="sjj">
                <UilUserCheck />
              </div>
              <span className="sp"> Solved Questions </span>
            </div>
          </a>

          <a href="/unsolquescus">
            <div>
              <div className="sjj">
                <UilUserTimes />
              </div>
              <span className="sp"> Unsolved Questions </span>
            </div>
          </a>

          <a href="/askquescus">
            <div>
              <div className="sjj">
                <UilUserSquare />
              </div>
              <span className="sp"> Ask a Question </span>
            </div>
          </a>

          <a href="/subscription">
            <div>
              <div className="sjj">
                <UilNotes />
              </div>
              <span className="sp"> Subscription </span>
            </div>
          </a>
            <a href="/orders">
            <div>
              <div className="sjj">
                <UilShoppingCart />
              </div>
              <span className="sp"> Orders </span>
            </div>
          </a>
          <div className="signbutton">
            <a href="/signup">
              <UilSignOutAlt color="black" />
              <span> Log Out </span>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default SidebarCus;
