"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeImage from "./themeImage";

import styles from "./footer.module.scss";
import { notosansMedium } from "@/styles/_font";

const Footer = () => {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(/^\/algorithm\/detail(?:\/[^\/]+)?\/?$/);
  const pathname = usePathname();

  return (
    <>
      {!regex.test(pathname) && (
        <div className={styles.footer}>
          <div className={styles.centerBox}>
            <div className={styles.contactBox}>
              <div className={styles.logoBox}>
                <Image
                  src="/svgs/logo.svg"
                  alt="로고 이미지"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <div className={styles.infoBox}>
                  <div className={styles.img}>
                    <ThemeImage
                      lightSrc="/svgs/email_black.svg"
                      darkSrc="/svgs/email_white.svg"
                      alt="이메일 아이콘"
                      width={20}
                      height={20}
                    />
                  </div>
                  <Link href="mailto:kseungyong20@gmail.com">
                    kseungyong20@gmail.com
                  </Link>
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.img}>
                    <ThemeImage
                      lightSrc="/svgs/email_black.svg"
                      darkSrc="/svgs/email_white.svg"
                      alt="이메일 아이콘"
                      width={20}
                      height={20}
                    />
                  </div>
                  <Link href="mailto:dbstjdqls14@gmail.com">
                    dbstjdqls14@gmail.com
                  </Link>
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.img}>
                    <ThemeImage
                      lightSrc="/svgs/phone_black.svg"
                      darkSrc="/svgs/phone_white.svg"
                      alt="전화 아이콘"
                      width={20}
                      height={20}
                    />
                  </div>
                  <Link href="tel:01085297193">010-8529-7193</Link>
                </div>
              </div>
            </div>
            <div className={styles.termsBox}>
              <div
                className={`${styles.termsTitle} ${notosansMedium.className}`}
              >
                약관
              </div>
              <div className={styles.terms}>
                <Link href="/privacy-policy">개인정보 처리방침</Link>
              </div>
              <div className={styles.terms}>
                <Link href="/terms-of-use">이용약관</Link>
              </div>
            </div>
            <div className={styles.snsBox}>
              <div className={`${styles.snstitle} ${notosansMedium.className}`}>
                SNS
              </div>
              <div className={styles.snsLineBox}>
                <div className={styles.imgBox}>
                  <Link href="https://www.facebook.com" target="_blank">
                    <ThemeImage
                      lightSrc="/svgs/facebook_black.svg"
                      darkSrc="/svgs/facebook_white.svg"
                      alt="페이스북"
                      width={24}
                      height={24}
                    />
                  </Link>
                </div>
                <div className={styles.imgBox}>
                  <Link href="https://www.twitter.com" target="_blank">
                    <ThemeImage
                      lightSrc="/svgs/twitter_black.svg"
                      darkSrc="/svgs/twitter_white.svg"
                      alt="트위터"
                      width={24}
                      height={24}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.underTitle}>
            © 2023 Company. All rights reserved.
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
