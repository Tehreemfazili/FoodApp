"use client";

import { useEffect } from "react";
import styles from "../styles/tabs.module.css";
import Image from "next/image";
import { DrupalParagraph } from "next-drupal";

interface TabClientComponentProps {
  tab: DrupalParagraph[];
}

export default function TabClientComponent({ tab }: TabClientComponentProps) {
  useEffect(() => {
    const tabs = document.querySelectorAll(`.${styles.tabs} li`);
    const divs = document.querySelectorAll(`.${styles.content} > div`);
    const tabsArray = Array.from(tabs);
    const divsArray = Array.from(divs) as HTMLElement[];

    divsArray.forEach((div, index) => {
      div.style.display = index === 0 ? "block" : "none";
    });

    tabsArray.forEach((tab, tabIndex) => {
      tab.addEventListener("click", () => {
        tabsArray.forEach((tab) => tab.classList.remove(styles.active));
        divsArray.forEach((div) => (div.style.display = "none"));
        tabsArray[tabIndex].classList.add(styles.active);
        divsArray[tabIndex].style.display = "block";
      });
    });

    return () => {
      tabsArray.forEach((tab) => tab.removeEventListener("click", () => {}));
    };
  }, []);

  return (
    <div className={styles.tabsContainer}>
      <ul className={styles.tabs}>
        {tab.map((item, index) => (
          <li key={index} className={index === 0 ? styles.active : ""}>
            {item.field_tab_title}
          </li>
        ))}
      </ul>
      <div className={styles.content}>
        {tab.map((item, index) => (
          <div key={index} id={`tab-${index}`}>
            {item.imageUrl ? (
              <Image src={item.imageUrl} width={540} height={540} alt="" />
            ) : (
              <p>No image available</p>
            )}
            <div>
              <h1>{item.field_tab_title}</h1>
              <p>{item.field_tab_content_description?.value || "No description available"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
