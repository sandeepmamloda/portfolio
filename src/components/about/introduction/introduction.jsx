import styles from "./introduction.module.css";

const Introduction = function () {
  return (
    <>
      <section className={styles["introduction-wrapper"]}>
        <div className={styles["introduction-main"]}>
          <div className={styles["introduction-left"]}>
            <h2>introduction</h2>
          </div>
          <div className={styles["introduction-right"]}>
            <p>Honey is an Indian-Canadian writer-director who graduated from the film production MFA from New York University’s Tisch School of the Arts Asia in Singapore in 2015. For the past four years, Honey has been writing, directing and producing short films, music videos and commercials which have won awards and played at film festivals. Honey’s short film HEER (2015) has won many awards including Best Short Film at the London Asian Film Festival and Emerging Female Filmmaker at the Dada Saheb Phalke Film Festival in Delhi, India. HEER was screened at some of the most prestigious film festivals geared towards children including Toronto International Film Festival for Kids, Doha’s Ajyal Youth Film Festival and the Montreal World Film Festival. Honey’s first-ever commercial, which she wrote-directed for the MOFILM competition, won 3rd place and subsequently Haagen Dazs incorporated it in their China campaign so it played in movie theatres all over the country this past spring. Honey was invited to attend the NALIP’s Diverse Women in Media Residency Lab 2015 (which is the only screenplay lab in the world geared towards women-of-colour) to further develop her South Asian cross-cultural romantic-comedy script with other female creatives and mentors. Honey is currently developing her first feature film which is a East-meets-West cross-cultural romantic comedy titled I AM A BANANA! The film has been chosen for the 15th Hong Kong - Asia Film Financing Forum (HAF).</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Introduction;