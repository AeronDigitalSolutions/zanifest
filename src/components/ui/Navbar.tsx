import React, { useState } from "react";

import styles from "@/styles/components/ui/Navbar.module.css";
import { useRouter } from "next/router";

import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { FaPaperPlane } from "react-icons/fa";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const DROPDOWNLIST = [
  "Family Floater Health Insurance",
  "Critical Illness Cover",
  "Personal Accident Policy",
];

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [listIndex, setListIndex] = useState<number>(0);
  const router = useRouter();
  return (
    <div className={styles.cont}>
      <div
        className={styles.logoCont}
        onClick={() => {
          router.push("/");
        }}
      >
        <h3 className={styles.logo}>
          <Image
            src={require("@/assets/logo.png")}
            alt="logo"
            className={styles.logoImage}
          />
        </h3>
        
      </div>

      <div
        className={styles.openMenu}
        onClick={() => {
          setShowMobileMenu((prev) => !prev);
        }}
      >
        {!showMobileMenu && <IoMdMenu />}
        {showMobileMenu && <IoCloseSharp />}
      </div>
      {showMobileMenu && (
        <div className={`${styles.mobileMenuList} ${styles.hideMenu}`}>
          <div
            className={styles.menuItem}
            onClick={() => {
              if (listIndex == 1) {
                setListIndex(0);
              } else {
                setListIndex(1);
              }
            }}
          >
            <div className={`${styles.heading} ${styles.activeMenu}`}>
              Health
              <div className={styles.mobilearrow}>
                <IoIosArrowDown />
              </div>
            </div>
            <div className={styles.totalLine}></div>
            <AnimatePresence initial={false}>
              {listIndex == 1 ? (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                  className={styles.dropDownMobile}
                >
                  {DROPDOWNLIST.map((item, index) => {
                    return (
                      <>
                        <div key={index} className={styles.dropItemMobile}>
                          {item}
                          <div className={styles.totalLine}></div>
                        </div>
                      </>
                    );
                  })}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => {
              if (listIndex == 2) {
                setListIndex(0);
              } else {
                setListIndex(2);
              }
            }}
          >
            <div className={`${styles.heading} ${styles.activeMenu}`}>
              Motor
              <div className={styles.mobilearrow}>
                <IoIosArrowDown />
              </div>
            </div>

            <div className={styles.totalLine}></div>
            <AnimatePresence initial={false}>
              {listIndex == 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                  className={styles.dropDownMobile}
                >
                  {DROPDOWNLIST.map((item, index) => {
                    return (
                      <>
                        <div key={index} className={styles.dropItemMobile}>
                          {item}
                          <div className={styles.totalLine}></div>
                        </div>
                      </>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => {
              if (listIndex == 3) {
                setListIndex(0);
              } else {
                setListIndex(3);
              }
            }}
          >
            <div className={`${styles.heading} ${styles.activeMenu}`}>
              Other
              <div className={styles.mobilearrow}>
                <IoIosArrowDown />
              </div>
            </div>

            <div className={styles.totalLine}></div>
            <AnimatePresence initial={false}>
              {listIndex == 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                  className={styles.dropDownMobile}
                >
                  {DROPDOWNLIST.map((item, index) => {
                    return (
                      <div key={index} className={styles.dropItemMobile}>
                        {item}
                        <div className={styles.totalLine}></div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.menuItem}>
            <div className={`${styles.heading} `}>Raise a Claim</div>
          </div>

          <div
            className={styles.loginButton}
            onClick={() => {
              router.push("/login");
            }}
          >
            <p className={styles.loginText}>
              Get A Quote <FaPaperPlane />
            </p>
          </div>
        </div>
      )}
      <div className={styles.menuCont}>
        <div className={styles.menuItem}>
          <div className={`${styles.heading} ${styles.activeMenu}`}>
            Health
            <div className={styles.arrow}>
              <IoIosArrowDown />
            </div>
          </div>
          <div className={styles.dropDown}>
            {DROPDOWNLIST.map((item, index) => {
              return (
                <div key={index} className={styles.dropItem}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.menuItem}>
          <div className={`${styles.heading} ${styles.activeMenu}`}>
            Motor
            <div className={styles.arrow}>
              <IoIosArrowDown />
            </div>
          </div>

          <div className={styles.dropDown}>
            {DROPDOWNLIST.map((item, index) => {
              return (
                <div key={index} className={styles.dropItem}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.menuItem}>
          <div className={`${styles.heading} ${styles.activeMenu}`}>
            Other
            <div className={styles.arrow}>
              <IoIosArrowDown />
            </div>
          </div>

          <div className={styles.dropDown}>
            {DROPDOWNLIST.map((item, index) => {
              return (
                <div key={index} className={styles.dropItem}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.menuItem}>
          <div className={`${styles.heading} `}>Raise a Claim</div>
        </div>
      </div>
      <div className={styles.loginCont}>
        <div
          className={styles.loginButton}
          onClick={() => {
            router.push("/login");
          }}
        >
          <p className={styles.loginText}>
            Get A Quote <FaPaperPlane />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
