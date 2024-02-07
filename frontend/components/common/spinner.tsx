import styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <span className={styles.loader} />
    </div>
  );
};

export default Spinner;
