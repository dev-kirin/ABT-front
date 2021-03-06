import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={`abt ${styles.normal}`}>
      <h1 className={styles.title}>ABT</h1>
      {props.children}
    </div>
  );
}

export default BasicLayout;
