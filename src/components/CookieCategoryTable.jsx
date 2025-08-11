import styles from '../styles/CookieTable.module.css';

const CATEGORY_INFO = {
    1: {
        title: "Necessary cookies",
        subtitle:
        "Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.",
    },
    2: {
        title: "Preference cookies",
        subtitle:
        "Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region that you are in.",
    },
    3: {
        title: "Statistics cookies",
        subtitle:
        "Statistic cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.",
    },
    4: {
        title: "Marketing cookies",
        subtitle:
        "Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.",
    },
    5: {
        title: "Unclassified cookies",
        subtitle:
        "Unclassified cookies are cookies that we are in the process of classifying, together with the providers of individual cookies.",
    },
};

/**
 * CookieCategoryTable component to display cookies in a categorised table format.
 *
 * @param {object} props - The properties for the component.
 * - {number} props.category - The category of cookies to display.
 * - {Array} [props.cookies=[]] - The list of cookies in this category
 * - {boolean} [props.showAdvanced=false] - Whether to show advanced cookie details.
 * @returns {JSX.Element|null} The rendered table of cookies or null if no cookies are present.
 */
export default function CookieCategoryTable({ category, cookies = [], showAdvanced = false }) {
  if (!cookies.length) return null;

  const { title, subtitle } = CATEGORY_INFO[category] || {
    title: "Unclassified cookies",
    subtitle: CATEGORY_INFO[5].subtitle,
  };

  return (
    <div>
      <h3 className={styles.h3}>{title}</h3>
      {subtitle ? <p className={styles.cookieSubtitle}>{subtitle}</p> : null}
      <div className={styles.tableResponsive}>
        <table className={styles.table}>
          <caption className={styles.srOnly}>{title}</caption>
          <thead>
            <tr>
              <th className={styles.th} scope="col">Name</th>
              <th className={styles.th} scope="col">Provider</th>
              <th className={styles.th} scope="col">Purpose</th>
              <th className={styles.th} scope="col">Expiry</th>
              <th className={styles.th} scope="col">Type</th>
              {showAdvanced && (
                <>
                  <th className={styles.th} scope="col">HttpOnly</th>
                  <th className={styles.th} scope="col">Secure</th>
                  <th className={styles.th} scope="col">3rd party</th>
                  <th className={styles.th} scope="col">Persistent</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {cookies.map((c, idx) => (
              <tr key={`${c.name || "cookie"}-${c.provider || "prov"}-${idx}`}>
                <td className={styles.td}>{c.name || "—"}</td>
                <td className={styles.td}>{c.provider || "—"}</td>
                <td className={styles.td}>{c.purpose || "—"}</td>
                <td className={styles.td}>{c.maxStorageDuration || c.expireDescription || "—"}</td>
                <td className={styles.td}>{c.type || c.trackerTypeName || "—"}</td>
                {showAdvanced && (
                  <>
                    <td className={styles.td}>{c.httpOnly ? "Yes" : "No"}</td>
                    <td className={styles.td}>{c.secure ? "Yes" : "No"}</td>
                    <td className={styles.td}>{c.thirdParty ? "Yes" : "No"}</td>
                    <td className={styles.td}>{c.persistent ? "Yes" : "No"}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}