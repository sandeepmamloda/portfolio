"use client";

import styles from "./contact-us.module.css";

export default function ContactSection() {
  return (
    <section className={styles.contactSection}>
      {/* Header — card ke bahar */}
      <div className={styles.contactHeader}>
        <h1 className={styles.contactTitle}>CONTACT</h1>
        <p className={styles.contactDesc}>
          Sharing personal thoughts, work-in-progress ideas, and deep-dives
          about design. Learnings from a decade in the industry.
        </p>
      </div>

      {/* Body Card — form + video dono andar */}
      <div className={styles.contactCard}>
        {/* Form */}
        <div className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input type="text" placeholder="Value" />
          </div>

          <div className={styles.formGroup}>
            <label>Enquiry</label>
            <input type="text" placeholder="Value" />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" placeholder="Value" />
          </div>

          <div className={styles.formGroup}>
            <label>Message</label>
            <textarea placeholder="Value" rows={3} />
          </div>

          <button className={styles.submitBtn}>Submit</button>
        </div>

        {/* Video Section */}
        <div className={styles.contactVideoWrapper}>
          <div className={styles.videoFrame}>
            <video
              className={styles.contactVideo}
              src="/videos/contact-us/contact-us.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}