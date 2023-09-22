import React from 'react';
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import LogoutButton from "../components/LogoutButton";
import styles from './Homepage.module.css';

export default function Homepage() {
  return (
    <div className={styles.homepage}>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>subzero</title>
      </head>

      <nav>
  <div className={styles.nav__content}>
    <img src="/public/subzero_logo_og.svg" alt="Subzero Logo" className={styles.logo} />

    <SignedOut>
      <Link to="/signup" className={styles.button}>SIGN UP</Link>
      <Link to="/login" className={styles.button}>SIGN IN</Link>
    </SignedOut>

    <SignedIn>
      <div className={styles.flex}>
        <div className={styles.userButtonWrapper}>
          <UserButton />
        </div>
        <LogoutButton />
      </div>
    </SignedIn>
  </div>
</nav>

      <main>
        <section>
          <h1 className={styles['custom-h1']}>Zero in on What Matters</h1>

          <div className={`${styles.box} ${styles['box--two']}`}>
            <div className={styles.box__content0}>
              <p>Elevate Essentials, Freeze Out the Waste — Decide What Stays</p>
            </div>
          </div>

          <div className={styles['bleed-canvas']}>
            <img className={styles.moneyhand} src="/public/moneyhand.png" alt="Moneyhand" />
            <img className={styles.dashboardlaptop} src="/public/Dashboardbglaptop.png" alt="Dashboard Laptop" />
            <img className={styles.subzerologoicon} src="/public/subzero_logo_icon.png" alt="" />
          </div>
        </section>

        <section>
          <p>Welcome to the ultimate in subscription oversight.</p>

          <div className={styles['dashboard-image']}>
            <img src="/public/Dashboardbgbrowsertilt.png" alt="Dashboard Image" />
          </div>

          <p className={styles['small-black-text']} style={{ fontSize: '2em', color: 'black' }}>
            The dashboard, offers a 360-degree view of your subscription landscape. 
            It merges all elements from a monthly report right into the dashboard, providing a dynamic summary.
            Actionable insights like Potential Savings, Most and least used.
          </p>
        </section>

        <section>
          <h2>Are you still watching?</h2>
        </section>

        <section>
          <div className={styles['spacing-box']}></div>

          <div className={styles.box}>
            <div className={styles.box__content}>
              <p>
                Taking a cue from Netflix's iconic "Are you still watching?", SubZero respectfully inquires, "Are you still using Netflix?” 
                
                Our insights might just prompt you to hit 'pause' on that seldom-used subscription and tip the scales back in favor of your finances.
              </p>
            </div>
          </div>

          <div className={styles.sticky}>
            <img src="/public/ReminderModalplain.png" alt="Reminder Modal" />
          </div>

          <div className={`${styles.box} ${styles['box--two']}`}>
            <div className={styles.box__content}>
              <p>
                <span className={styles.logo}></span>
                <span>Join today</span>, and take control of your subscriptions.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className={styles['bento--mini']}>
            <div></div>
            <div></div>
          </div>

          <div className={styles['bento--mini']}>
            <div></div>
            <div></div>  
          </div>
        </section>

        <section>
          <div className={styles.section__content}>
            <h2></h2>
          </div>
        </section>
      </main>
    </div>
  );
}

