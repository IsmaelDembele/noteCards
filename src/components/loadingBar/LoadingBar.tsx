import './loadingBar.css'
import LinearProgress from "@mui/material/LinearProgress";

const LoadingBar: React.FC = () => {
  return (
    <div className="loading-bar">
      <LinearProgress color="success" />
    </div>
  );
};

export default LoadingBar;
