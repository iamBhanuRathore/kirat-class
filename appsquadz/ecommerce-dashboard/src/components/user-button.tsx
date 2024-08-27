import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";
import { getInitials } from "../lib/utils";
export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Box>
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt="Remy Sharp"
          onClick={handleClick}
          className="cursor-pointer"
          src="/broken-image.jpg">
          {getInitials(user?.username || "Username")}
        </Avatar>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <Box sx={{ p: 2 }}>
          <Typography sx={{ p: 1 }}>Username: {user?.username}</Typography>
          <Typography sx={{ p: 1 }}>Email: {user?.email}</Typography>
          <Button
            sx={{ my: 1 }}
            size="small"
            onClick={() => dispatch(logout())}
            variant="contained">
            Logout
          </Button>
        </Box>
      </Popover>
    </div>
  );
}
