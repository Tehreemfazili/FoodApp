"use client";

import { fetchMenuItems } from "@/api/FetchMenuItems";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";

interface MenuItem {
  title: string;
  url: string;
}

export default function Header() {
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      }
    };

    loadMenuItems();
  }, []);

  return (
    <header>
      <div>
        <nav className={styles.menu}>
          <ul className={styles.page_menu_list}>
            {menuItems?.map((item, index) => (
              <li key={index} className={styles.page_menu_item}>
                <Link href={item.url}>
                  <span className="text-white">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
