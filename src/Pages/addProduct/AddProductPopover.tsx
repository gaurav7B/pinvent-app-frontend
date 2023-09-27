import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

interface AddProductPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const AddProductPopover: React.FC<AddProductPopoverProps> = ({
  anchorEl,
  open,
  onClose,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Typography>Popover Content Here</Typography>
    </Popover>
  );
};

export default AddProductPopover;
