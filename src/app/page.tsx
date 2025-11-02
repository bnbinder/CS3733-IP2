import Image from "next/image";
import styles from "./page.module.css";
import InputComponent from "./IntroPage/InputComponent";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>BidMaster</h1>
                    <p>
                        Enter Your Event Name
                    </p>
                    <br />
                    <InputComponent />
                </div>
            </main>
        </div>
    );
}
