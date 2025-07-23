import AllCardNewsLists from "../../molecules/allCardNewsLists";

const styles = {
  contentWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "24px",
    background: "#000",
  },
  contentInner: {
    width: "100%",
    maxWidth: 1200,
  },
};

const AllNewsSection: React.FC = () => {
    return (
        <div style={styles.contentWrapper}>
            <div style={styles.contentInner}>
                <AllCardNewsLists />
            </div>
        </div>
    );
}

export default AllNewsSection;