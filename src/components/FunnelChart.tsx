import { useSpring, animated } from "react-spring";
import styles from "./FunnelChart.module.css"; // Ensure you have the styles

const FunnelChart = () => {
  // Animated values for numbers
  const animatedValues = {
    rawSignals: useSpring({ from: { val: 0 }, to: { val: 53532120 }, config: { duration: 5000 } }),
    keyObservations: useSpring({ from: { val: 0 }, to: { val: 289304 }, config: { duration: 5000 } }),
    opportunities: useSpring({ from: { val: 0 }, to: { val: 48189 }, config: { duration: 5000 } }),
    discoveries: useSpring({ from: { val: 0 }, to: { val: 2532 }, config: { duration: 5000 } }),
  };

  // Animated values for progress bars
  const progressWidths = {
    rawSignals: useSpring({ from: { width: "0%" }, to: { width: "100%" }, config: { duration: 5000 } }),
    keyObservations: useSpring({ from: { width: "0%" }, to: { width: "85%" }, config: { duration: 5000 } }),
    opportunities: useSpring({ from: { width: "0%" }, to: { width: "65%" }, config: { duration: 5000 } }),
    discoveries: useSpring({ from: { width: "0%" }, to: { width: "40%" }, config: { duration: 5000 } }),
  };

  return (
    <div className={styles.moduleBody}>
      <div className={styles.funnelContainer}>
        <div className={styles.funnelMetric} style={{ top: "10%" }}>
          <div className={styles.row} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span className={styles.label}>Raw Signals Detected</span>
            <span className={styles.value}>
              <animated.span>{animatedValues.rawSignals.val.to((val) => Math.floor(val))}</animated.span>
            </span>


          </div>
          <animated.div className={styles.bar} style={progressWidths.rawSignals}></animated.div>
        </div>

        <div className={styles.funnelMetric} style={{ top: "35%" }}>
          <div className={styles.row} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span className={styles.label}>Key Observations</span>
            <span className={styles.value}>
              <animated.span>{animatedValues.keyObservations.val.to((val) => Math.floor(val))}</animated.span>
            </span>
          </div>
          <animated.div className={styles.bar} style={progressWidths.keyObservations}></animated.div>
        </div>

        <div className={styles.funnelMetric} style={{ top: "60%" }}>
          <div className={styles.row} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span className={styles.label}>Opportunities Identified</span>
            <span className={styles.value}>
              <animated.span>{animatedValues.opportunities.val.to((val) => Math.floor(val))}</animated.span>
            </span>
          </div>
          <animated.div className={styles.bar} style={progressWidths.opportunities}></animated.div>
        </div>

        <div className={styles.funnelMetric} style={{ top: "85%" }}>
          <div className={styles.row} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span className={styles.label}>Breakthrough Discoveries</span>
            <span className={styles.value}>
              <animated.span>{animatedValues.discoveries.val.to((val) => Math.floor(val))}</animated.span>
            </span>
          </div>
          <animated.div className={styles.bar} style={progressWidths.discoveries}></animated.div>
        </div>
      </div>
    </div>
  );
};

export default FunnelChart;
