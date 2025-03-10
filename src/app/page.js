import Image from "next/image";
import styles from "../app/styles/globals.css";
import additionalStyles from "../app/styles/Home.module.css";

export default function Home() {
  return (
    <div className={additionalStyles.container}>
      <header className={additionalStyles.header}>
        <Image
          src="/NUTRINA_LOGO.png"
          alt="Nutrinana Logo"
          width={500}
          height={500}
          layout="intrinsic"
          className={additionalStyles.logo}
        />
        <p>
          Stay Tuned! Website coming soon :)
          <br />
          But for now, shop on{" "}
          <a
            href="https://delli.market/products/nutrinanas-special-granola?srsltid=AfmBOorT2Xj4IWGiK9IT7sG_UsL4JRnW2bHQ-DzvnvsATtaQmOhrfS3m"
            className={additionalStyles.link}
          >
            DELLI
          </a>
        </p>
      </header>
    </div>
  );
}