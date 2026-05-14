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
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" type="text" placeholder="Value" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact-enquiry">Enquiry</label>
            <input id="contact-enquiry" type="text" placeholder="Value" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" type="email" placeholder="Value" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" placeholder="Value" rows={3} />
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
              playsInline
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>
    </section>
  );
}