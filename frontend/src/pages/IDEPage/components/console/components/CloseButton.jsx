import CloseIcon from "@mui/icons-material/Close";

const CloseButton = () => {
  return (
    <button
      type="button"
      id="south_tab_close_btn"
      className="btn"
      data-container="body"
    >
      <CloseIcon />
    </button>
  );
};

export default CloseButton;
