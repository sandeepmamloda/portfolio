'use client';

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./journal-individual.module.css";

const JournalIndividualContent = function () {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title    = searchParams.get("title")    || "";
  const image    = searchParams.get("image")    || "";
  const date     = searchParams.get("date")     || "";
  const duration = searchParams.get("duration") || "";
  const subtitle = searchParams.get("subtitle") || "";

  let content = [];
  try {
    content = JSON.parse(searchParams.get("content") || "[]");
  } catch {
    content = [];
  }

  return (
    <article className={styles["article-wrapper"]}>

      <div className={styles["header"]}>
        <button className={styles["back-btn"]} onClick={() => router.back()}>
          BACK
        </button>
        <h1>{title}</h1>
      </div>

      <div className={styles["title-section"]}>
        <p className={styles["subtitle"]}>{subtitle}</p>
        <div className={styles["meta"]}>
          <span>{date}</span>
          <span className={styles["dot"]}>·</span>
          <span>{duration}</span>
        </div>
      </div>

      <div className={styles["hero-image"]}>
        <Image src={image} alt={title} fill style={{ objectFit: "cover" }} priority />
      </div>

      <div className={styles["article-body"]}>
        {content.map((section, index) => (
          <section key={index} className={styles["section"]}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>

    </article>
  );
};

const JournalIndividual = function () {
  return (
    <Suspense fallback={<div className={styles["loading"]}>Loading...</div>}>
      <JournalIndividualContent />
    </Suspense>
  );
};

export default JournalIndividual;