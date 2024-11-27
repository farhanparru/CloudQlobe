"use client"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faStar,
  faCheckCircle,
  faPlusCircle,
  faFilter,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./RatesNavbar.module.css";

// Helper function to extract customerId from JWT
const getCustomerIdFromToken = () => {
  const token = localStorage.getItem("token"); // Replace with appropriate token retrieval method
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.customerId || "Guest";
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
  return "Not signed in";
};

const RatesNavbar: React.FC = () => {
  const [customerId, setCustomerId] = useState<string>("");

  useEffect(() => {
    const id = getCustomerIdFromToken();
    setCustomerId(id);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <div className={styles.navbarItem}>
            <div className={styles.navbarItemIcon}>
              <FontAwesomeIcon icon={faChartLine} size="lg" />
            </div>
            <div className={styles.navbarItemText}>CLI Rates</div>
          </div>
          <div className={styles.navbarItem}>
            <div className={styles.navbarItemIcon}>
              <FontAwesomeIcon icon={faStar} size="lg" />
            </div>
            <div className={styles.navbarItemText}>Special Rates</div>
          </div>
          <div className={styles.navbarItem}>
            <div className={styles.navbarItemIcon}>
              <FontAwesomeIcon icon={faCheckCircle} size="lg" />
            </div>
            <div className={styles.navbarItemText}>Select Rates</div>
          </div>
          <div className={styles.navbarItem}>
            <div className={styles.navbarItemIcon}>
              <FontAwesomeIcon icon={faPlusCircle} size="lg" />
            </div>
            <div className={styles.navbarItemText}>Add Rates</div>
          </div>
          <div className={styles.navbarItem}>
            <div className={styles.navbarItemIcon}>
              <FontAwesomeIcon icon={faFilter} size="lg" />
            </div>
            <div className={styles.navbarItemText}>Filter Rates</div>
          </div>
        </div>
        <div className={styles.navbarProfile}>
          {customerId} &ensp;<FontAwesomeIcon icon={faUserCircle} size="lg" />
        </div>
      </nav>
    </header>
  );
};

export default RatesNavbar;
