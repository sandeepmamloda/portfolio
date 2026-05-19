'use client';

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./articles-individual.module.css";

const ArticlesIndividualContent = function () {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get("title") || "";
  const image = searchParams.get("image") || "";
  const date = searchParams.get("date") || "";
  const duration = searchParams.get("duration") || "";

  return (
    <article className={styles["article-wrapper"]}>

      {/* Header */}
      <div className={styles["header"]}>
        <button
          className={styles["back-btn"]}
          onClick={() => router.back()}
        >
          BACK
        </button>
        <h1>{title}</h1>
      </div>

      {/* Subtitle aur Meta */}
      <div className={styles["title-section"]}>
        <p className={styles["subtitle"]}>
          Stories, filmmaking insights, and creative explorations shaping the future of cinema and visual storytelling.
        </p>
        <div className={styles["meta"]}>
          <span>{date}</span>
          <span className={styles["dot"]}>·</span>
          <span>{duration}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className={styles["hero-image"]}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Article Body */}
      <div className={styles["article-body"]}>

        <section className={styles["section"]}>
          <h2>Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>

        <section className={styles["section"]}>
          <h2>Behind the Process</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </section>

        <section className={styles["section"]}>
          <h2>The Creative Vision</h2>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
            excepturi sint occaecati cupiditate non provident.
          </p>
        </section>

        <section className={styles["section"]}>
          <h2>Crafting the Narrative</h2>
          <p>
            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus
            saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
            Itaque earum rerum hic tenetur a sapiente delectus.
          </p>
          <p>
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.
          </p>
        </section>

        <section className={styles["section"]}>
          <h2>Conclusion</h2>
          <p>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
            cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
            maxime placeat facere possimus.
          </p>
          <p>
            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus
            saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          </p>
        </section>

      </div>
    </article>
  );
};

const ArticlesIndividual = function () {
  return (
    <Suspense fallback={<div className={styles["loading"]}>Loading...</div>}>
      <ArticlesIndividualContent />
    </Suspense>
  );
};

export default ArticlesIndividual;