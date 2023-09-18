import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ isActive }) => {
  return (
    <button
      type="button"
      id="north_tab_close_btn"
      className="btn"
      data-container="body"
    >
      <CloseIcon fontSize="small" style={{ color: isActive ? "#609AE2" : "#C3C8CC" }} />
    </button>
  );
};

export default CloseButton;