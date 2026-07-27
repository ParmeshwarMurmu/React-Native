export const showSnackBar = (message, type = "success", setSnackBar) => {
  setSnackBar({
    visible: true,
    message,
    type,
  });
};
