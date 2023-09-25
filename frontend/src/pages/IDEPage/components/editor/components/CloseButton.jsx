import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ isActive, onClick }) => {
  return (
    <button
      type="button"
      id="north_tab_close_btn"
      className="btn"
      data-container="body"
      onClick={onClick}
    >
      <CloseIcon
        fontSize="small"
        style={{ color: isActive ? "#609AE2" : "#C3C8CC" }}
      />
    </button>
  );
};

export default CloseButton;
