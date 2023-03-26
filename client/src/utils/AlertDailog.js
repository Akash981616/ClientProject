import swal from "sweetalert";

export const alertBox = ({ error, data, confirmText = "ok" }) => {
  // debugger;
  return swal(error?.message || data?.message, {
    closeOnClickOutside: false,
    closeOnEsc: false,

    buttons: {
      cancel: false,
      confirm: {
        text: confirmText,
        className: "btn",
        value: true,
      },
    },
  });
};
