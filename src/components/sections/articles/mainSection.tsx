const styles = {
  contentWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "100px 24px 24px",
    background: "#000",
  },
  contentInner: {
    width: "100%",
    maxWidth: 1200,
  },
};

const MainSection: React.FC = () => {
    return (
        <div style={styles.contentWrapper}>
            <div style={styles.contentInner}>
              <h1 style={{ color: "#fff", textAlign: "center", fontSize: 40 }}>
                A Window to the World:<br /> Trusted International News
              </h1>
              <p style={{ 
                color: "#DDDDDD", 
                textAlign: "center", 
                fontSize: 15, 
              }}> 
                The latest news from around the world, presented with high accuracy and credibility. Always up to date, always relevant.
              </p>
            </div>
        </div>
    );
}

export default MainSection;