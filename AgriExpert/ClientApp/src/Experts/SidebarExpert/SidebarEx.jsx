import "../SidebarExpert/SidebarEx.css"
import { GiFallingLeaf } from "react-icons/gi";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";

import {
  UilUserCheck,
  UilUserTimes
} from "@iconscout/react-unicons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function SidebarEx() {
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
    const handleLogout = () => {
        sessionStorage.clear()
    }
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
          <a href="/dashboardexpert">
            <div>
              <div className="sjj">
                <UilUserCheck />
              </div>
              <span className="sp"> Solved Questions </span>
            </div>
          </a>

          <a href="/expertunsolved">
            <div>
              <div className="sjj">
                <UilUserTimes />
              </div>
              <span className="sp"> Unsolved Questions </span>
            </div>
          </a>
          <div className="signbutton">
            <a href="/expertsignin" >
              <UilSignOutAlt color="black" />
              <span onClick={handleLogout}> Log Out </span>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default SidebarEx;
