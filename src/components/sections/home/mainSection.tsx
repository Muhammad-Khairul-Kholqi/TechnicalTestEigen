import PopularNews from "../../molecules/popularNews";
import LatestNews from "../../molecules/latestNews";
import { Row } from "antd";

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
                <Row gutter={[20, 20]}>
                    <PopularNews />
                    <LatestNews />
                </Row>
            </div>
        </div>
    );
}

export default MainSection;