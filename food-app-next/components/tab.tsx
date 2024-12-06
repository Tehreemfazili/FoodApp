"use client";

import { useEffect } from "react";
import styles from "../styles/tabs.module.css";
import Image from "next/image";
import pageStyles from "@/app/page.module.css";
import { DrupalParagraph } from "next-drupal";

interface TabClientComponentProps {
  tab: DrupalParagraph[];
}

export default function TabClientComponent({ tab }: TabClientComponentProps) {
  useEffect(() => {
    const tabs = document.querySelectorAll(`.${styles.tabs} li`);
    const divs = document.querySelectorAll(`.${styles.content_wrapper} > div`);
    const tabsArray = Array.from(tabs);
    const divsArray = Array.from(divs) as HTMLElement[];

    // divsArray.forEach((div, index) => {
    //   div.style.display = index === 0 ? "block" : "none";
    // });

    divsArray.forEach((div, index) => {
      if (index === 0) {
        div.classList.add(styles.active); // Add active class to the first element
      } else {
        div.classList.remove(styles.active); // Remove active class from other elements
      }
    });

    tabsArray.forEach((tab, tabIndex) => {
      tab.addEventListener("click", () => {
        tabsArray.forEach((tab) => tab.classList.remove(styles.active));
        divsArray.forEach((div) => div.classList.remove(styles.active));
        tabsArray[tabIndex].classList.add(styles.active);
        divsArray[tabIndex].classList.add(styles.active);
      });
    });

    return () => {
      tabsArray.forEach((tab) => tab.removeEventListener("click", () => {}));
    };
  }, []);

  return (
    <div className={`${styles.tabsContainer} ${pageStyles.container}`}>
      <ul className={styles.tabs}>
        {tab.map((item, index) => (
          <li key={index} className={index === 0 ? styles.active : ""}>
            {item.iconUrl ? (
              <Image
                src={item.iconUrl}
                width={47}
                height={40}
                alt=""
                className={styles.icon_image}
              />
            ) : (
              <p>No image available</p>
            )}
            {item.field_tab_title}
          </li>
        ))}
      </ul>
      <div className={styles.content_wrapper}>
        {tab.map((item, index) => (
          <div key={index} id={`tab-${index}`} className={styles.content_item}>
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                width={540}
                height={540}
                alt=""
                className={styles.content_image}
              />
            ) : (
              <p>No image available</p>
            )}
            <div className={styles.content}>
              <h1 className={styles.content_title}>{item.field_tab_title}</h1>
              <p className={styles.content_description}>
                {item.field_tab_content_description?.value ||
                  "No description available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
