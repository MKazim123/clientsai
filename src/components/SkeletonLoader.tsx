
const SkeletonLoader = () => {
  return (
    <div
      role="status"
      style={{
        width: "100%",
        maxWidth: "500px",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Title Skeleton */}
      <div
        style={{
          height: "10px",
          width: "120px",
          backgroundColor: "#e0e0e0",
          borderRadius: "5px",
          marginBottom: "10px",
          animation: "pulse 1.5s infinite",
        }}
      ></div>
      <div
        style={{
          height: "10px",
          width: "200px",
          backgroundColor: "#e0e0e0",
          borderRadius: "5px",
          marginBottom: "20px",
          animation: "pulse 1.5s infinite",
        }}
      ></div>

      {/* Bar Chart Skeleton */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {[40, 60, 80, 50, 90, 70, 100, 40, 60, 80, 50, 90, 70, 100].map(
          (height, index) => (
            <div
              key={index}
              style={{
                width: "20px",
                height: `${height}px`,
                backgroundColor: "#e0e0e0",
                borderRadius: "4px 4px 0 0",
                animation: "pulse 1.5s infinite",
              }}
            ></div>
          )
        )}
      </div>

      {/* Hidden Screen Reader Loading Text */}
      <span style={{ visibility: "hidden", position: "absolute" }}>Loading...</span>

      {/* Add the animation inside a <style> tag */}
      <style>
        {`
          @keyframes pulse {
            0% { background-color: #f0f0f0; }
            50% { background-color: #e0e0e0; }
            100% { background-color: #f0f0f0; }
          }
        `}
      </style>
    </div>
  );
};

export default SkeletonLoader;
