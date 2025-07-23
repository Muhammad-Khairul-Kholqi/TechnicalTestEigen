import CardNewsLists from '../../molecules/cardNewsLists';

const styles = {
  contentWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "24px",
    background: "#0F0E14",
  },
  contentInner: {
    width: "100%",
    maxWidth: 1200,
  },
};

const NewsSection: React.FC = () => {
  return (
    <div style={styles.contentWrapper}>
      <div style={styles.contentInner}>
        <CardNewsLists />
      </div>
    </div>
  );
};

export default NewsSection;